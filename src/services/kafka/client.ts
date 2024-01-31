import kafka, { Topic } from "../../configs/kafka";

type ProduceMessage = {
  data: unknown;
  topic: Topic;
  key: string;
  partition?: number;
};

export const produceMessage = async (produceMessage: ProduceMessage) => {
  const producer = kafka.producer();
  try {
    await producer.connect();
    await producer.send({
      topic: produceMessage.topic,
      messages: [
        {
          partition: produceMessage.partition || 0,
          key: produceMessage.key,
          value: JSON.stringify(produceMessage?.data),
        },
      ],
    });
  } catch (error) {
    throw error;
  } finally {
    await producer.disconnect();
  }
};
