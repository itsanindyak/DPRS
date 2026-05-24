// mq.ts
import * as amqp from "amqplib";
import { env } from "../config/env";

export default class MQ {
  private url: string;
  private connection: any = null; 
  private channels: Map<string, amqp.Channel> = new Map();
  private reconnectDelay: number = 2000; 
  private connectionPromise: Promise<void> | null = null;

  constructor(url?: string, queue?: string) {
    this.url = env.rabbitMQ.url;
  }

  private async ensureConnection(): Promise<void> {
    if (this.connection) return;
    if (this.connectionPromise) return this.connectionPromise;

    this.connectionPromise = (async () => {
      try {
        this.connection = await amqp.connect(this.url);

        this.connection.on("close", () => {
          console.warn("🔌 Connection closed, reconnecting...");
          this.connection = null;
          setTimeout(() => this.ensureConnection(), this.reconnectDelay);
        });

        this.connection.on("error", (err: Error) => {
          console.error("⚠️ Connection error:", err.message);
        });

        console.log("✅ RabbitMQ connection established");
      } finally {
        this.connectionPromise = null;
      }
    })();

    return this.connectionPromise;
  }

  private async getChannel(name: string): Promise<amqp.Channel> {
    if (this.channels.has(name)) return this.channels.get(name)!;

    await this.ensureConnection();

    const channel = await this.connection!.createChannel();

    this.channels.set(name, channel);

    return channel;
  }

  public async publish(
    name: string,
    message: object | string,
    useExchange: boolean = false,
  ): Promise<void> {
    const channel = await this.getChannel(name);

    const msg = typeof message === "string" ? message : JSON.stringify(message);

    if (useExchange) {
      await channel.assertExchange(name, "fanout", { durable: true });
      channel.publish(name, "", Buffer.from(msg));

      console.log(`📢 Published to exchange ${name}:`, msg);
    } else {
      await channel.assertQueue(name, { durable: true });
      channel.sendToQueue(name, Buffer.from(msg), { persistent: true });

      console.log(`Published to ${name}:`, msg);
    }
  }

  public async subscribe(
    name: string,
    onMessage: (msg: any) => Promise<void>,
    useExchange: boolean = false,
  ): Promise<void> {
    const channel = await this.getChannel(name);

    if (useExchange) {
      await channel.assertExchange(name, "fanout", { durable: true });

      const q = await channel.assertQueue("", { exclusive: true });

      channel.bindQueue(q.queue, name, "");

      await channel.consume(
        q.queue,
        async (msg: amqp.Message | null) => {
          if (!msg) return;

          let data: any;
          try {
            data = JSON.parse(msg.content.toString());
          } catch (err) {
            console.error("Failed to parse message:", err);
            channel?.nack(msg, false, false); // send to DLX if configured
            return;
          }

          await onMessage(data);
          channel?.ack(msg);
        },
        { noAck: false },
      );

      console.log(`👂 Subscribed to exchange ${name} with queue ${q.queue}`);
    } else {
      await channel.consume(
        name,
        async (msg: amqp.Message | null) => {
          if (!msg) return;

          let data: any;
          try {
            data = JSON.parse(msg.content.toString());
          } catch (err) {
            console.error("Failed to parse message:", err);
            channel?.nack(msg, false, false); // send to DLX if configured
            return;
          }

          await onMessage(data);
          channel?.ack(msg);
        },
        { noAck: false },
      );

      console.log("Subscribed to queue:", name);
    }
  }

  public async close(): Promise<void> {
    for (const ch of this.channels.values()) await ch.close();
    this.channels.clear();
    if (this.connection) await this.connection.close();
    this.connection = null;
    console.log("🔌 MQ connection closed");
  }
}

export const mq = new MQ();
