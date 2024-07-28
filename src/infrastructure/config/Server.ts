import express from 'express';
import { consumerRouter } from '../../interfaces/routers/ConsumerRouter';

const app = express();
app.use(express.json());
app.use('/api', consumerRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

