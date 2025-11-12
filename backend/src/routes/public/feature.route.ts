import { featureController } from '../../controllers/index.ts';
import express from 'express';

const router = express.Router();

// Public route for getting features (no authentication required)
router
    .route('/')
    .get(featureController.getPublicFeatures);

export default router;

/**
 * @swagger
 * tags:
 *   name: Public Features
 *   description: Public feature display endpoint
 */

/**
 * @swagger
 * /api/features:
 *   get:
 *     summary: Get list of application features
 *     description: Get all application features for public display (no authentication required).
 *     tags: [Public Features]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 features:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       icon:
 *                         type: string
 *                       color:
 *                         type: string
 *               example:
 *                 features:
 *                   - id: "1"
 *                     title: "Fast Performance"
 *                     description: "Lightning fast application performance"
 *                     icon: "zap"
 *                     color: "blue"
 *                   - id: "2"
 *                     title: "Secure"
 *                     description: "Enterprise-grade security features"
 *                     icon: "shield"
 *                     color: "green"
 *       "500":
 *         $ref: '#/components/responses/InternalServerError'
 */