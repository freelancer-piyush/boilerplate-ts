import kafka, { Topic } from "../../configs/kafka";

export const consumeMessages = async (topics: Topic[], group: string) => {
  const consumer = kafka.consumer({ groupId: group });
  try {
    await consumer.connect();
    await consumer.subscribe({
      topics,
      fromBeginning: true,
    });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(`${group}: [${topic}]: PART:${partition}:`, message.value);
      },
    });
  } catch (error) {
    throw error;
  }
};
