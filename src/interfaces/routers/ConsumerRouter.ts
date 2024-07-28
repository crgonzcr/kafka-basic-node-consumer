import { Router } from 'express';
import { ConsumerController } from '../controllers/ConsumerController';

const consumerRouter = Router();
const consumerController = new ConsumerController();

consumerRouter.post('/start-consumer', (req, res) => consumerController.startConsumer(req, res));

export { consumerRouter };
