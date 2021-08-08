import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import MongoDB from './src/MongoDB';
import MainRouter from './src/routers/MainRouter';

dotenv.config();
const app = express();

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.all('*', (req, res, next) =>
{
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Credentials", "true");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");

    if ('OPTIONS' == req.method)
    {
        res.sendStatus(200);
    }
    else
    {
        next();
    }
});

app.set('case sensitive routing', true);
app.use('/site', express.static(__dirname + "/public"));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(cors());

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

MongoDB.Connect();

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.use('/', MainRouter);
app.listen(3456);

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export default app;