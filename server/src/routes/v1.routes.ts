import { Router } from 'express';

import authRouter from './auth.routes';
import userRouter from './user.routes';
import coursesRouter from './course.routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/course', coursesRouter);
router.use('/user', userRouter);

export default router;
