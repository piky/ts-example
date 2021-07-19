import { Router } from 'express';

const usersRouter = Router();

usersRouter.get('/', (req, res) => {
    res.send("You're welcome.")
});

usersRouter.post('/mirror', (req, res) => {
    console.log('bodyParser :', req.body);
    res.status(200).json(req.body);
});

export default usersRouter;
