import Koa from 'koa';
import route from 'koa-route';
import mount from 'koa-mount';
import jwt from 'koa-jwt';
import { auth } from 'config';

import ezMasterConfig from '../../services/ezMasterConfig';
import initializeFields from '../../services/initializeFields';
import mongoClient from '../../services/mongoClient';

import exportPublishedDataset from './export';
import fieldRoutes from './field';
import login from './login';
import parsing from './parsing';
import publication from './publication';
import publish from './publish';
import publishedDataset from './publishedDataset';
import upload from './upload';

const app = new Koa();

app.use(ezMasterConfig);
app.use(mongoClient);
app.use(initializeFields);

app.use(mount('/export', exportPublishedDataset));
app.use(route.post('/login', login));
app.use(route.get('/publication', publication));
app.use(route.get('/publishedDataset', publishedDataset));

app.use(jwt({ secret: auth.cookieSecret, cookie: 'lodex_token', key: 'cookie' }));
app.use(jwt({ secret: auth.headerSecret, key: 'header' }));

app.use(mount('/field', fieldRoutes));
app.use(mount('/parsing', parsing));
app.use(mount('/publish', publish));
app.use(route.post('/upload', upload));

app.use(async (ctx) => {
    ctx.status = 404;
});

export default app;