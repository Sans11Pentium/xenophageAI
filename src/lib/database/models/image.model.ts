export interface IImage{
  id: string;
  title: string;
  transformationType: string;
  publicId: string;
  secureURL: string; 
  width?: number;
  height?: number;
  config?: object; 
  transformationUrl?: string; 
  aspectRatio?: string;
  color?: string;
  prompt?: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
  }
  createdAt?: Date;
  updatedAt?: Date;
}