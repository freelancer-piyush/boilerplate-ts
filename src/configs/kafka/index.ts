import { Kafka } from "kafkajs";

const CLIENT_ID = "BOILER_PLATE";
const BROKER = "";

export enum Topic {
  LOCATION = "LOCATION",
  MESSAGES = "MESSAGES",
}

export default new Kafka({
  clientId: CLIENT_ID,
  brokers: ["<PRIVATE_IP>:9092"],
});
