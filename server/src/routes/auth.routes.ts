import { Router } from 'express';

import AuthController from '../controllers/auth.controller';
// import Privileges from '../middlewares/privileges';
// import { createUserScope } from '../constants/scopes';

const authRouter = Router();

authRouter.post('/login', AuthController.doLogin);
authRouter.post('/register', AuthController.doRegister);
authRouter.post('/verify-user-token', AuthController.verifyUserToken);

export default authRouter;
