import { Router } from 'express';

import UserController from '../controllers/user.controller';

import Privileges from '../middlewares/privileges';
import { seeUserScope } from '../constants/scopes';

const userRouter = Router();

userRouter.get('/all', Privileges.userScope(seeUserScope), UserController.getAll);
userRouter.get('/me', Privileges.requireLogin(), UserController.getMe);
userRouter.get('/:id', Privileges.userScope(seeUserScope), UserController.getById);

userRouter.post('/push-notifications', Privileges.requireLogin(), UserController.setExpoPushToken);

export default userRouter;
