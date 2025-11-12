export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface FeaturesResponse {
  features: Feature[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
}