import express from 'express';
import cookieParser from 'cookie-parser';

import {
    getUser,
    logout,
    googleLogin,
    checkoutSessions,

    getReturberTasks,
    postReturberTask,
    acceptReturberTask,
    completeReturberTask,
    cancelReturberTask,

    createReturnPoint,
    updateReturnPoint,
    markForDeletionReturnPoint,
} from './handlers';

import {
    initializeGeocoder,
} from './services/geocoder';



const port = process.env.PORT || 8080;
const app = express();


const main = async () => {
    await initializeGeocoder();

    app.use(express.json({
        limit: '5mb',
    }));
    app.use(cookieParser());

    app.all('*', (req, res, next) => {
        const origin = req.get('origin');

        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With');
        res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');

        next();
    });

    app.post('/get-user', getUser);
    app.post('/logout', logout);
    app.post('/google-login', googleLogin);
    app.post('/stripe-checkout-sessions', checkoutSessions);

    app.post('/get-returber-tasks', getReturberTasks);
    app.post('/post-returber-task', postReturberTask);
    app.post('/accept-returber-task', acceptReturberTask);
    app.post('/complete-returber-task', completeReturberTask);
    app.post('/cancel-returber-task', cancelReturberTask);

    app.post('/create-return-point', createReturnPoint);
    app.post('/update-return-point', updateReturnPoint);
    app.post('/mark-for-deletion-return-point', markForDeletionReturnPoint);

    app.listen(port, () => {
        console.log(`Server started on ${port}`);
    });
}


main();
