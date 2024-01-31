import kafka, { Topic } from "../../configs/kafka";

type CreateTopic = {
  topic: Topic;
  numPartitions?: number;
};

export const createTopic = async (createTopic: CreateTopic) => {
  const admin = kafka.admin();
  try {
    admin.connect();
    await admin.createTopics({
      topics: [
        {
          topic: createTopic.topic,
          numPartitions: createTopic.numPartitions || 1,
        },
      ],
    });
  } catch (error) {
    throw error;
  } finally {
    await admin.disconnect();
  }
};
