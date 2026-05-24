import { RedisClient } from "./redis.service";

class RedisKey {
  private redisClient: RedisClient;

  constructor() {
    this.redisClient = new RedisClient();
  }

  async setSchool(schoolID: string, data: any) {
    const id = `school:${schoolID}`;
    await this.redisClient.setVal(id, data);
  }
  async getSchool(schoolID: string) {
    const id = `school:${schoolID}`;
    await this.redisClient.getVal(id);
  }
}

export const redKey = new RedisKey();
