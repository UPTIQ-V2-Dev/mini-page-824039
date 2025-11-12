import { apiClient } from '../lib/api';
import type { FeaturesResponse, ContactFormData, ContactFormResponse } from '../types/content';
import { MOCK_FEATURES } from '../data/features';

export const getFeatures = async (): Promise<FeaturesResponse> => {
  if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
    return { features: MOCK_FEATURES };
  }
  
  const response = await apiClient.get<FeaturesResponse>('/api/features');
  return response.data;
};

export const submitContactForm = async (data: ContactFormData): Promise<ContactFormResponse> => {
  if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      success: true,
      message: 'Thank you for your message! We\'ll get back to you soon.'
    };
  }
  
  const response = await apiClient.post<ContactFormResponse>('/api/contact', data);
  return response.data;
};