import express from 'express';

import requireToken from '../middlewares/requireToken.js';

import {
  sendTask,
  getTasks,
  updateTask,
  deleteTask,
  completeTask,
} from '../controllers/taskController.js';

const router = express.Router();

router.post('/', requireToken, sendTask);
router.get('/', requireToken, getTasks);
router
  .route('/:id')
  .put(requireToken, updateTask)
  .delete(requireToken, deleteTask)
  .post(requireToken, completeTask);

export default router;
