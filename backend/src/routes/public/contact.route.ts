import { contactController } from '../../controllers/index.ts';
import validate from '../../middlewares/validate.ts';
import { contactValidation } from '../../validations/index.ts';
import express from 'express';

const router = express.Router();

// Public contact form submission endpoint
router
    .route('/')
    .post(validate(contactValidation.createContactForm), contactController.createContactForm);

export default router;

/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: Contact form operations
 */

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Submit contact form
 *     description: Submit a contact form message (public endpoint - no authentication required).
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - subject
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 100
 *                 description: Contact person's name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Contact person's email address
 *               subject:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 200
 *                 description: Subject of the message
 *               message:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 2000
 *                 description: Message content
 *             example:
 *               name: John Doe
 *               email: john@example.com
 *               subject: Question about your service
 *               message: I have a question about your service pricing and features.
 *     responses:
 *       "200":
 *         description: Contact form submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Thank you for your message! We'll get back to you soon."
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "500":
 *         $ref: '#/components/responses/InternalServerError'
 */