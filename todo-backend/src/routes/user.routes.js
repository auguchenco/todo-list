import express from 'express';
import { meCtrl } from '../controllers/user.controller.js';

const userRoutes = express.Router();

userRoutes.get('/me', meCtrl);

export default userRoutes;