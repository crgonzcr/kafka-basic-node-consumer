import { MessageConsumerRepository } from '../../domain/repositories/MessageConsumerRepository';

export class ConsumerService {
  constructor(private consumerRepository: MessageConsumerRepository) {}

  async consumeMessages(): Promise<void> {
    await this.consumerRepository.startConsuming();
  }
}
