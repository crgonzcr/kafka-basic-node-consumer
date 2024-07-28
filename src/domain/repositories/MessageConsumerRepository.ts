import { EachMessagePayload } from 'kafkajs';

export interface MessageConsumerRepository {
  consumeMessage(message: EachMessagePayload): Promise<void>;
  startConsuming(): Promise<void>;
}
