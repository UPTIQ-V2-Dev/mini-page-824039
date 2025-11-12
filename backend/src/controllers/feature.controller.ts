import { featureService } from '../services/index.ts';
import ApiError from '../utils/ApiError.ts';
import catchAsync from '../utils/catchAsync.ts';
import catchAsyncWithAuth from '../utils/catchAsyncWithAuth.ts';
import pick from '../utils/pick.ts';
import httpStatus from 'http-status';

const createFeature = catchAsyncWithAuth(async (req, res) => {
    const { title, description, icon, color } = req.body;
    const feature = await featureService.createFeature(title, description, icon, color);
    res.status(httpStatus.CREATED).send(feature);
});

const getFeatures = catchAsyncWithAuth(async (req, res) => {
    const filter = pick(req.validatedQuery, ['title']);
    const options = pick(req.validatedQuery, ['sortBy', 'limit', 'page']);
    const result = await featureService.queryFeatures(filter, options);
    res.send(result);
});

const getPublicFeatures = catchAsync(async (req, res) => {
    const features = await featureService.getAllFeatures();
    // Transform the features to match the API spec (id as string)
    const transformedFeatures = features.map(feature => ({
        ...feature,
        id: feature.id.toString()
    }));
    res.send({ features: transformedFeatures });
});

const getFeature = catchAsyncWithAuth(async (req, res) => {
    const feature = await featureService.getFeatureById(parseInt(req.params.featureId));
    if (!feature) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Feature not found');
    }
    res.send(feature);
});

const updateFeature = catchAsyncWithAuth(async (req, res) => {
    const feature = await featureService.updateFeatureById(parseInt(req.params.featureId), req.body);
    res.send(feature);
});

const deleteFeature = catchAsyncWithAuth(async (req, res) => {
    await featureService.deleteFeatureById(parseInt(req.params.featureId));
    res.status(httpStatus.NO_CONTENT).send();
});

export default {
    createFeature,
    getFeatures,
    getPublicFeatures,
    getFeature,
    updateFeature,
    deleteFeature
};