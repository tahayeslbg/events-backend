import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import dbConnection from './helpers/dbConnection';
import eventsRoute from './routes/eventsRoute';
import userRoute from './routes/userRoute';
import categoryRoute from './routes/categoryRoute';

dotenv.config({ path: './.env' });
const app: Express = express();

const port = process.env.PORT;

const cspDefaults = helmet.contentSecurityPolicy.getDefaultDirectives();
delete cspDefaults['upgrade-insecure-requests'];

//*MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  helmet({
    contentSecurityPolicy: { directives: cspDefaults },
  })
);
app.use(cors());

//*ROUTES
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome the my challenge :)');
});

app.use('/events', eventsRoute);
app.use('/users', userRoute);
app.use('/categories', categoryRoute);
app.listen(port, (): void => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  //*DB CONNECTION
  dbConnection();
});
