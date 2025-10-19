import express from 'express';
import { getUserByPhone,getUser, updateUser,getAllUsers } from '../controller/user.js';

const router = express.Router();

router.get('/phone', getUserByPhone);
router.get('/', getUser);
router.put('/:id', updateUser); 
router.get('/alluser',getAllUsers);

export default router;
