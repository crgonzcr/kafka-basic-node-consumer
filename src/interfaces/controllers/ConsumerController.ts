import { Request, Response } from 'express';
import { ConsumerService } from '../../application/services/ConsumerService';
import { KafkaMessageConsumerRepository } from '../../infrastructure/kafka/KafkaMessageConsumerRepository';

export class ConsumerController {
  private consumerService: ConsumerService;

  constructor() {
    const consumerRepository = new KafkaMessageConsumerRepository();
    this.consumerService = new ConsumerService(consumerRepository);
  }

  async startConsumer(req: Request, res: Response): Promise<void> {
    try {
      await this.consumerService.consumeMessages();
      res.status(200).send({ message: 'Consumer started' });
    } catch (error) {
      res.status(500).send({ message: 'Failed to start consumer', error });
    }
  }
}
