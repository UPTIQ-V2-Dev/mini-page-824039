import { contactController } from '../../controllers/index.ts';
import auth from '../../middlewares/auth.ts';
import validate from '../../middlewares/validate.ts';
import { contactValidation } from '../../validations/index.ts';
import express from 'express';

const router = express.Router();

// Authenticated administrative routes for contact form management
router
    .route('/')
    .get(auth('manageContactForms'), validate(contactValidation.getContactForms), contactController.getContactForms);

router
    .route('/:contactFormId')
    .get(auth('getContactForms'), validate(contactValidation.getContactForm), contactController.getContactForm)
    .delete(auth('manageContactForms'), validate(contactValidation.deleteContactForm), contactController.deleteContactForm);

export default router;

/**
 * @swagger
 * tags:
 *   name: Contact Forms
 *   description: Administrative contact form management
 */

/**
 * @swagger
 * /contact:
 *   get:
 *     summary: Get contact form submissions
 *     description: Get paginated list of contact form submissions with optional filters (admin only).
 *     tags: [Contact Forms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by contact name
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Filter by contact email
 *       - in: query
 *         name: subject
 *         schema:
 *           type: string
 *         description: Filter by subject
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. createdAt:desc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         default: 10
 *         description: Maximum number of results
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
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ContactForm'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /contact/{id}:
 *   get:
 *     summary: Get a contact form submission
 *     description: Get a specific contact form submission by ID (admin only).
 *     tags: [Contact Forms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Contact form submission ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ContactForm'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a contact form submission
 *     description: Delete a contact form submission by ID (admin only).
 *     tags: [Contact Forms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Contact form submission ID
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
 *     ContactForm:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         subject:
 *           type: string
 *         message:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: 1
 *         name: John Doe
 *         email: john@example.com
 *         subject: Question about your service
 *         message: I have a question about your service pricing and features.
 *         createdAt: 2025-11-12T10:30:45Z
 */