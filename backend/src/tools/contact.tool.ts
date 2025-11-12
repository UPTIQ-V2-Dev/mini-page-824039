import { contactService } from '../services/index.ts';
import { MCPTool } from '../types/mcp.ts';
import pick from '../utils/pick.ts';
import { z } from 'zod';

const contactFormSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    subject: z.string(),
    message: z.string(),
    createdAt: z.string()
});

// NOTE: We do NOT create a tool for creating contact forms as that's handled by the public API endpoint
// Following the pattern from the existing tools, we only create management tools for administrative purposes

const getContactFormsTool: MCPTool = {
    id: 'contact_get_all',
    name: 'Get All Contact Form Submissions',
    description: 'Get all contact form submissions with optional filters and pagination',
    inputSchema: z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
        subject: z.string().optional(),
        sortBy: z.string().optional(),
        limit: z.number().int().optional(),
        page: z.number().int().optional()
    }),
    outputSchema: z.object({
        contactForms: z.array(contactFormSchema),
        totalResults: z.number(),
        page: z.number(),
        limit: z.number(),
        totalPages: z.number()
    }),
    fn: async (inputs: { name?: string; email?: string; subject?: string; sortBy?: string; limit?: number; page?: number }) => {
        const filter = pick(inputs, ['name', 'email', 'subject']);
        const options = pick(inputs, ['sortBy', 'limit', 'page']);
        
        const contactForms = await contactService.queryContactForms(filter, options);
        const totalResults = await contactService.getContactFormCount(filter);
        const page = options.page || 1;
        const limit = options.limit || 10;
        const totalPages = Math.ceil(totalResults / limit);
        
        return { 
            contactForms, 
            totalResults, 
            page, 
            limit, 
            totalPages 
        };
    }
};

const getContactFormTool: MCPTool = {
    id: 'contact_get_by_id',
    name: 'Get Contact Form By ID',
    description: 'Get a single contact form submission by its ID',
    inputSchema: z.object({
        contactFormId: z.number().int()
    }),
    outputSchema: contactFormSchema,
    fn: async (inputs: { contactFormId: number }) => {
        const contactForm = await contactService.getContactFormById(inputs.contactFormId);
        if (!contactForm) {
            throw new Error('Contact form submission not found');
        }
        return contactForm;
    }
};

const deleteContactFormTool: MCPTool = {
    id: 'contact_delete',
    name: 'Delete Contact Form',
    description: 'Delete a contact form submission by its ID',
    inputSchema: z.object({
        contactFormId: z.number().int()
    }),
    outputSchema: z.object({
        success: z.boolean()
    }),
    fn: async (inputs: { contactFormId: number }) => {
        await contactService.deleteContactFormById(inputs.contactFormId);
        return { success: true };
    }
};

const getContactFormCountTool: MCPTool = {
    id: 'contact_get_count',
    name: 'Get Contact Form Count',
    description: 'Get the total count of contact form submissions with optional filters',
    inputSchema: z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
        subject: z.string().optional()
    }),
    outputSchema: z.object({
        count: z.number()
    }),
    fn: async (inputs: { name?: string; email?: string; subject?: string }) => {
        const filter = pick(inputs, ['name', 'email', 'subject']);
        const count = await contactService.getContactFormCount(filter);
        return { count };
    }
};

export const contactTools: MCPTool[] = [
    getContactFormsTool,
    getContactFormTool,
    deleteContactFormTool,
    getContactFormCountTool
];