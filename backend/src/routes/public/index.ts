import featureRoute from './feature.route.ts';
import contactRoute from './contact.route.ts';
import express from 'express';

const router = express.Router();

const publicRoutes = [
    {
        path: '/features',
        route: featureRoute
    },
    {
        path: '/contact',
        route: contactRoute
    }
];

publicRoutes.forEach(route => {
    router.use(route.path, route.route);
});

export default router;