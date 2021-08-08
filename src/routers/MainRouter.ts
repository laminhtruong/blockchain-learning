import express, { Request, Response } from 'express';
import MainController from '../controllers/MainController';
const MainRouter = express.Router({ caseSensitive: true });

MainRouter.get('/register', (req: Request, res: Response) =>
{
    res.sendStatus(200);
});

MainRouter.post('/register', (req: Request, res: Response) =>
{
    MainController.Register(req, res);
});

export default MainRouter;