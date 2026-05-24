import Redis from "ioredis";
import { env } from "../config/env";

export class RedisClient {
  private client: Redis | null = null;
  private url: string;

  constructor(url?: string) {
    this.url = url || env.cache.url;
  }

  private async connect(): Promise<void> {
    if (this.client) return;

    this.client = new Redis(this.url, {
      retryStrategy: (times) => {
        if (times >= 5) {
          console.error(
            "❌ Redis failed to reconnect after 5 attempts. Stopping server..."
          );
          process.exit(1);
        }

        const delay = Math.min(times * 2000, 10000); // exponential backoff up to 10s
        console.warn(
          `⚠️ Redis reconnect attempt ${times}, retrying in ${delay / 1000}s...`
        );
        return delay; // return milliseconds to wait before next retry
      },
    });

    this.client.on("connect", () => {
      console.log("✅ Connected to Redis");
    });

    this.client.on("error", (err: Error) => {
      console.error("❌ Redis error:", err);
    });

    this.client.on("close", () => {
      console.warn("⚠️ Redis connection closed");
    });
  }
  async ensureConnection(): Promise<void> {
    if (!this.client) {
      await this.connect();
    }
  }

  async disconnect() {
    if (!this.client) return;

    await this.client.quit();
    this.client = null;
    console.log("🔌 Redis disconnected");
  }

  async setVal(key: string, data: any) {
    await this.ensureConnection();
    const value = typeof data === "string" ? data : JSON.stringify(data);
    await this.client!.set(key, value);
  }

  async getVal<T = unknown>(key: string): Promise<T | null> {
    await this.ensureConnection();

    const val = await this.client!.get(key);
    if (!val) return null;

    try {
      return JSON.parse(val) as T;
    } catch {
      return val as unknown as T;
    }
  }
}

// export const redisClient = new RedisClient();
