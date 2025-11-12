import prisma from '../client.ts';
import { Prisma, ContactForm } from '../generated/prisma/index.js';
import ApiError from '../utils/ApiError.ts';
import httpStatus from 'http-status';

/**
 * Create a contact form submission
 * @param {Object} contactData
 * @returns {Promise<ContactForm>}
 */
const createContactForm = async (name: string, email: string, subject: string, message: string): Promise<ContactForm> => {
    return prisma.contactForm.create({
        data: {
            name,
            email,
            subject,
            message
        }
    });
};

/**
 * Query for contact form submissions
 * @param {Object} filter - Prisma filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryContactForms = async <Key extends keyof ContactForm>(
    filter: object,
    options: {
        limit?: number;
        page?: number;
        sortBy?: string;
        sortType?: 'asc' | 'desc';
    },
    keys: Key[] = ['id', 'name', 'email', 'subject', 'message', 'createdAt'] as Key[]
): Promise<Pick<ContactForm, Key>[]> => {
    const page = options.page ?? 1;
    const limit = options.limit ?? 10;
    const sortBy = options.sortBy;
    const sortType = options.sortType ?? 'desc';
    const contactForms = await prisma.contactForm.findMany({
        where: filter,
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
        skip: (page - 1) * limit,
        take: limit,
        orderBy: sortBy ? { [sortBy]: sortType } : { createdAt: 'desc' }
    });
    return contactForms as Pick<ContactForm, Key>[];
};

/**
 * Get contact form by id
 * @param {number} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<ContactForm, Key> | null>}
 */
const getContactFormById = async <Key extends keyof ContactForm>(
    id: number,
    keys: Key[] = ['id', 'name', 'email', 'subject', 'message', 'createdAt'] as Key[]
): Promise<Pick<ContactForm, Key> | null> => {
    return (await prisma.contactForm.findUnique({
        where: { id },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    })) as Promise<Pick<ContactForm, Key> | null>;
};

/**
 * Delete contact form by id
 * @param {number} contactFormId
 * @returns {Promise<ContactForm>}
 */
const deleteContactFormById = async (contactFormId: number): Promise<ContactForm> => {
    const contactForm = await getContactFormById(contactFormId);
    if (!contactForm) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Contact form submission not found');
    }
    await prisma.contactForm.delete({ where: { id: contactForm.id } });
    return contactForm;
};

/**
 * Get contact form count for pagination
 * @param {Object} filter - Prisma filter
 * @returns {Promise<number>}
 */
const getContactFormCount = async (filter: object): Promise<number> => {
    return prisma.contactForm.count({ where: filter });
};

export default {
    createContactForm,
    queryContactForms,
    getContactFormById,
    deleteContactFormById,
    getContactFormCount
};