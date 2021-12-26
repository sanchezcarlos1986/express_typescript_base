import {Router, Request, Response} from 'express';
import Task from '../models/Task';

const router = Router();

router.get('/tasks', async (_, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/tasks/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await Task.findById(req.params.id);
    res.send(task);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/tasks', async (req: Request, res: Response): Promise<void> => {
  try {
    const {title, description} = req.body;
    const task = new Task({title, description});
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete(
  '/tasks/:id',
  async (req: Request, res: Response): Promise<void> => {
    try {
      await Task.findByIdAndDelete(req.params.id);
      res.send(`Task ${req.params.id} deleted.`);
    } catch (err) {
      res.status(500).send(err);
    }
  },
);

router.put('/tasks/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(task);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
