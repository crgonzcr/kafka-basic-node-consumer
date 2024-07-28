import { Kafka, EachMessagePayload } from 'kafkajs';
import { MessageConsumerRepository } from '../../domain/repositories/MessageConsumerRepository';

export class KafkaMessageConsumerRepository implements MessageConsumerRepository {
  private kafka: Kafka;
  private consumer: any;
  private connected: boolean = false;  // Estado para verificar la conexión

  constructor() {
    this.kafka = new Kafka({
      clientId: 'my-app',
      brokers: ['localhost:9092']
    });
    this.consumer = this.kafka.consumer({ groupId: 'test-group' });
  }

  async consumeMessage(message: EachMessagePayload): Promise<void> {
    const value = message.message.value?.toString();
    console.log({
      partition: message.partition,
      offset: message.message.offset,
      value: value !== undefined ? value : "null or undefined value",
    });
  }

  async startConsuming(): Promise<void> {
    if (this.connected) {
      console.log("Consumer is already connected");
      return;
    }

    try {
      await this.consumer.connect();
      this.connected = true;
      await this.consumer.subscribe({ topic: 'messages', fromBeginning: true });

      await this.consumer.run({
        eachMessage: async (payload: EachMessagePayload) => {
          await this.consumeMessage(payload);
        },
      });
    } catch (error) {
      this.connected = false;
      console.error("Failed to start consumer:", error);
      throw error;
    }
  }
}
