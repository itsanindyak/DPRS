import badgeService from "../services/badge.service";
import { mq } from "../services/rabbitmq.service";

export const registerSubscribers = () => {
  mq.subscribe("game.session.created", async (msg: any) => {
    try {
      await badgeService.checkAndGrantBadges(msg);
      console.log("✅ Badge check completed");
    } catch (error) {
      console.error("❌ Error processing badge check:", error);
    }
  });
};
