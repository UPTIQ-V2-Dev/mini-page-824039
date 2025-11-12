import { featureService } from '../services/index.ts';
import { MCPTool } from '../types/mcp.ts';
import pick from '../utils/pick.ts';
import { z } from 'zod';

const featureSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    icon: z.string(),
    color: z.string(),
    createdAt: z.string(),
    updatedAt: z.string()
});

const createFeatureTool: MCPTool = {
    id: 'feature_create',
    name: 'Create Feature',
    description: 'Create a new application feature',
    inputSchema: z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string(),
        color: z.string()
    }),
    outputSchema: featureSchema,
    fn: async (inputs: { title: string; description: string; icon: string; color: string }) => {
        const feature = await featureService.createFeature(inputs.title, inputs.description, inputs.icon, inputs.color);
        return feature;
    }
};

const getFeaturesTool: MCPTool = {
    id: 'feature_get_all',
    name: 'Get All Features',
    description: 'Get all application features with optional filters and pagination',
    inputSchema: z.object({
        title: z.string().optional(),
        sortBy: z.string().optional(),
        limit: z.number().int().optional(),
        page: z.number().int().optional()
    }),
    outputSchema: z.object({
        features: z.array(featureSchema)
    }),
    fn: async (inputs: { title?: string; sortBy?: string; limit?: number; page?: number }) => {
        const filter = pick(inputs, ['title']);
        const options = pick(inputs, ['sortBy', 'limit', 'page']);
        const result = await featureService.queryFeatures(filter, options);
        return { features: result };
    }
};

const getPublicFeaturesTool: MCPTool = {
    id: 'feature_get_public',
    name: 'Get Public Features',
    description: 'Get all features for public display',
    inputSchema: z.object({}),
    outputSchema: z.object({
        features: z.array(featureSchema)
    }),
    fn: async () => {
        const features = await featureService.getAllFeatures();
        return { features };
    }
};

const getFeatureTool: MCPTool = {
    id: 'feature_get_by_id',
    name: 'Get Feature By ID',
    description: 'Get a single feature by its ID',
    inputSchema: z.object({
        featureId: z.number().int()
    }),
    outputSchema: featureSchema,
    fn: async (inputs: { featureId: number }) => {
        const feature = await featureService.getFeatureById(inputs.featureId);
        if (!feature) {
            throw new Error('Feature not found');
        }
        return feature;
    }
};

const updateFeatureTool: MCPTool = {
    id: 'feature_update',
    name: 'Update Feature',
    description: 'Update feature information by ID',
    inputSchema: z.object({
        featureId: z.number().int(),
        title: z.string().optional(),
        description: z.string().optional(),
        icon: z.string().optional(),
        color: z.string().optional()
    }),
    outputSchema: featureSchema,
    fn: async (inputs: { featureId: number; title?: string; description?: string; icon?: string; color?: string }) => {
        const updateBody = pick(inputs, ['title', 'description', 'icon', 'color']);
        const feature = await featureService.updateFeatureById(inputs.featureId, updateBody);
        return feature;
    }
};

const deleteFeatureTool: MCPTool = {
    id: 'feature_delete',
    name: 'Delete Feature',
    description: 'Delete a feature by its ID',
    inputSchema: z.object({
        featureId: z.number().int()
    }),
    outputSchema: z.object({
        success: z.boolean()
    }),
    fn: async (inputs: { featureId: number }) => {
        await featureService.deleteFeatureById(inputs.featureId);
        return { success: true };
    }
};

export const featureTools: MCPTool[] = [
    createFeatureTool, 
    getFeaturesTool, 
    getPublicFeaturesTool,
    getFeatureTool, 
    updateFeatureTool, 
    deleteFeatureTool
];