import app from './app'; // the actual Express application
import logger from './utils/logger';
import { PORT } from './utils/config';

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});