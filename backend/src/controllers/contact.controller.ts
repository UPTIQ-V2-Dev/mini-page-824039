import { contactService } from '../services/index.ts';
import { emailService } from '../services/index.ts';
import ApiError from '../utils/ApiError.ts';
import catchAsync from '../utils/catchAsync.ts';
import catchAsyncWithAuth from '../utils/catchAsyncWithAuth.ts';
import pick from '../utils/pick.ts';
import httpStatus from 'http-status';

const createContactForm = catchAsync(async (req, res) => {
    const { name, email, subject, message } = req.body;
    const contactForm = await contactService.createContactForm(name, email, subject, message);
    
    // Send email notification (optional - catches errors to not break the flow)
    try {
        await emailService.sendEmail(
            'admin@example.com', // Replace with actual admin email
            `New Contact Form Submission: ${subject}`,
            `New contact form submission received:

Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}

Submitted at: ${new Date().toISOString()}`
        );
    } catch (emailError) {
        // Log error but don't break the flow
        console.error('Failed to send notification email:', emailError);
    }

    // Return the exact format specified in the API spec
    res.status(httpStatus.OK).send({
        success: true,
        message: "Thank you for your message! We'll get back to you soon."
    });
});

const getContactForms = catchAsyncWithAuth(async (req, res) => {
    const filter = pick(req.validatedQuery, ['name', 'email', 'subject']);
    const options = pick(req.validatedQuery, ['sortBy', 'limit', 'page']);
    
    const contactForms = await contactService.queryContactForms(filter, options);
    const totalResults = await contactService.getContactFormCount(filter);
    const page = options.page || 1;
    const limit = options.limit || 10;
    const totalPages = Math.ceil(totalResults / limit);

    res.send({
        results: contactForms,
        page,
        limit,
        totalPages,
        totalResults
    });
});

const getContactForm = catchAsyncWithAuth(async (req, res) => {
    const contactForm = await contactService.getContactFormById(parseInt(req.params.contactFormId));
    if (!contactForm) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Contact form submission not found');
    }
    res.send(contactForm);
});

const deleteContactForm = catchAsyncWithAuth(async (req, res) => {
    await contactService.deleteContactFormById(parseInt(req.params.contactFormId));
    res.status(httpStatus.NO_CONTENT).send();
});

export default {
    createContactForm,
    getContactForms,
    getContactForm,
    deleteContactForm
};