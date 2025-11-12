import prisma from '../client.ts';
import { Prisma, Feature } from '../generated/prisma/index.js';
import ApiError from '../utils/ApiError.ts';
import httpStatus from 'http-status';

/**
 * Create a feature
 * @param {Object} featureBody
 * @returns {Promise<Feature>}
 */
const createFeature = async (title: string, description: string, icon: string, color: string): Promise<Feature> => {
    return prisma.feature.create({
        data: {
            title,
            description,
            icon,
            color
        }
    });
};

/**
 * Query for features
 * @param {Object} filter - Prisma filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryFeatures = async <Key extends keyof Feature>(
    filter: object,
    options: {
        limit?: number;
        page?: number;
        sortBy?: string;
        sortType?: 'asc' | 'desc';
    },
    keys: Key[] = ['id', 'title', 'description', 'icon', 'color', 'createdAt', 'updatedAt'] as Key[]
): Promise<Pick<Feature, Key>[]> => {
    const page = options.page ?? 1;
    const limit = options.limit ?? 10;
    const sortBy = options.sortBy;
    const sortType = options.sortType ?? 'desc';
    const features = await prisma.feature.findMany({
        where: filter,
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
        skip: page * limit,
        take: limit,
        orderBy: sortBy ? { [sortBy]: sortType } : undefined
    });
    return features as Pick<Feature, Key>[];
};

/**
 * Get all features (for public API endpoint)
 * @returns {Promise<Feature[]>}
 */
const getAllFeatures = async (): Promise<Feature[]> => {
    return prisma.feature.findMany({
        orderBy: { createdAt: 'asc' }
    });
};

/**
 * Get feature by id
 * @param {number} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<Feature, Key> | null>}
 */
const getFeatureById = async <Key extends keyof Feature>(
    id: number,
    keys: Key[] = ['id', 'title', 'description', 'icon', 'color', 'createdAt', 'updatedAt'] as Key[]
): Promise<Pick<Feature, Key> | null> => {
    return (await prisma.feature.findUnique({
        where: { id },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    })) as Promise<Pick<Feature, Key> | null>;
};

/**
 * Update feature by id
 * @param {number} featureId
 * @param {Object} updateBody
 * @returns {Promise<Feature>}
 */
const updateFeatureById = async <Key extends keyof Feature>(
    featureId: number,
    updateBody: Prisma.FeatureUpdateInput,
    keys: Key[] = ['id', 'title', 'description', 'icon', 'color'] as Key[]
): Promise<Pick<Feature, Key> | null> => {
    const feature = await getFeatureById(featureId, ['id']);
    if (!feature) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Feature not found');
    }
    const updatedFeature = await prisma.feature.update({
        where: { id: feature.id },
        data: updateBody,
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    });
    return updatedFeature as Pick<Feature, Key> | null;
};

/**
 * Delete feature by id
 * @param {number} featureId
 * @returns {Promise<Feature>}
 */
const deleteFeatureById = async (featureId: number): Promise<Feature> => {
    const feature = await getFeatureById(featureId);
    if (!feature) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Feature not found');
    }
    await prisma.feature.delete({ where: { id: feature.id } });
    return feature;
};

export default {
    createFeature,
    queryFeatures,
    getAllFeatures,
    getFeatureById,
    updateFeatureById,
    deleteFeatureById
};