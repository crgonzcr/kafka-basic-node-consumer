import { EachMessagePayload } from 'kafkajs';
import { KafkaMessageConsumerRepository } from '../src/infrastructure/kafka/KafkaMessageConsumerRepository';
import { ConsumerService } from '../src/application/services/ConsumerService';

describe('ConsumerService', () => {
  let consumerService: ConsumerService;
  let kafkaMessageConsumerRepository: KafkaMessageConsumerRepository;

  beforeEach(() => {
    kafkaMessageConsumerRepository = new KafkaMessageConsumerRepository();
    consumerService = new ConsumerService(kafkaMessageConsumerRepository);
  });

  it('should consume messages', async () => {
    // Mock the methods in KafkaMessageConsumerRepository
    const connectMock = jest.spyOn(kafkaMessageConsumerRepository['consumer'], 'connect').mockImplementation(async () => {});
    const subscribeMock = jest.spyOn(kafkaMessageConsumerRepository['consumer'], 'subscribe').mockImplementation(async () => {});
    const runMock = jest.spyOn(kafkaMessageConsumerRepository['consumer'], 'run').mockImplementation(async (config: any) => {
      const messagePayload: EachMessagePayload = {
        topic: 'messages',
        partition: 0,
        message: {
          value: Buffer.from('test message'),
          offset: '0',
          size: 0,
          attributes: 0,
          timestamp: '0',
          key: null,
          headers: undefined,
        },
        heartbeat: async () => {},
        pause(): () => void {
          return function () {
          };
        }
      };
      await config.eachMessage(messagePayload);
    });

    const consumeMessageMock = jest.spyOn(kafkaMessageConsumerRepository, 'consumeMessage').mockImplementation(async (message: EachMessagePayload) => {
      expect(message.message.value?.toString()).toBe('test message');
    });

    await consumerService.consumeMessages();

    expect(connectMock).toHaveBeenCalled();
    expect(subscribeMock).toHaveBeenCalledWith({ topic: 'messages', fromBeginning: true });
    expect(runMock).toHaveBeenCalled();
    expect(consumeMessageMock).toHaveBeenCalled();
  });
});
