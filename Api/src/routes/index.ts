import {Router} from 'express';
import dogsRoute from './dogs';

const router = Router();

router.use('/dogs', dogsRoute);

export default router;
