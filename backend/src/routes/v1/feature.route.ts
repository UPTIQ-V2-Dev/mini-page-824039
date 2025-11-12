import { featureController } from '../../controllers/index.ts';
import auth from '../../middlewares/auth.ts';
import validate from '../../middlewares/validate.ts';
import { featureValidation } from '../../validations/index.ts';
import express from 'express';

const router = express.Router();

// Authenticated routes for administrative feature management
router
    .route('/')
    .post(auth('manageFeatures'), validate(featureValidation.createFeature), featureController.createFeature)
    .get(auth('getFeatures'), validate(featureValidation.getFeatures), featureController.getFeatures);

router
    .route('/:featureId')
    .get(auth('getFeatures'), validate(featureValidation.getFeature), featureController.getFeature)
    .patch(auth('manageFeatures'), validate(featureValidation.updateFeature), featureController.updateFeature)
    .delete(auth('manageFeatures'), validate(featureValidation.deleteFeature), featureController.deleteFeature);

export default router;

/**
 * @swagger
 * tags:
 *   name: Features
 *   description: Feature management and retrieval
 */

/**
 * @swagger
 * /features:
 *   post:
 *     summary: Create a feature
 *     description: Create a new application feature (admin only).
 *     tags: [Features]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - icon
 *               - color
 *             properties:
 *               title:
 *                 type: string
 *                 description: Feature title
 *               description:
 *                 type: string
 *                 description: Feature description
 *               icon:
 *                 type: string
 *                 description: Feature icon name
 *               color:
 *                 type: string
 *                 description: Feature color
 *             example:
 *               title: Fast Performance
 *               description: Lightning fast application performance
 *               icon: zap
 *               color: blue
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Feature'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all features
 *     description: Get all application features with optional filters and pagination (admin only).
 *     tags: [Features]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter by feature title
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. title:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of features
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Feature'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /features/{id}:
 *   get:
 *     summary: Get a feature
 *     description: Get a specific feature by ID (admin only).
 *     tags: [Features]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Feature id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Feature'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a feature
 *     description: Update a feature by ID (admin only).
 *     tags: [Features]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Feature id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               icon:
 *                 type: string
 *               color:
 *                 type: string
 *             example:
 *               title: Updated Fast Performance
 *               description: Even faster application performance
 *               icon: bolt
 *               color: yellow
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Feature'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a feature
 *     description: Delete a feature by ID (admin only).
 *     tags: [Features]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Feature id
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Feature:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         icon:
 *           type: string
 *         color:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: 1
 *         title: Fast Performance
 *         description: Lightning fast application performance
 *         icon: zap
 *         color: blue
 *         createdAt: 2025-11-12T10:30:45Z
 *         updatedAt: 2025-11-12T10:30:45Z
 */