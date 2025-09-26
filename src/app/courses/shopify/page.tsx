'use client';
import { CourseLayout } from '../CourseLayout';

const courseContent = {
  title: 'Shopify E-commerce Blueprint',
  description: 'Build a successful online store from scratch with Shopify. This course guides you through store setup, product sourcing, theme customization, marketing, and scaling your e-commerce business.',
  learningObjectives: [
    'Set up and configure a Shopify store.',
    'Find and add winning products to your store.',
    'Customize your store theme to match your brand.',
    'Implement effective marketing and SEO strategies.',
    'Manage orders, shipping, and customer service.',
    'Analyze your store data to scale your business.',
  ],
  modules: [
    { title: 'Getting Started with Shopify', description: 'Setting up your account and store.' },
    { title: 'Product and Collection Management', description: 'Sourcing and organizing your products.' },
    { title: 'Theme Customization and Branding', description: 'Creating a beautiful storefront.' },
    { title: 'Marketing and Sales Channels', description: 'Driving traffic and making sales.' },
    { title: 'Order Fulfillment and Customer Service', description: 'Managing the day-to-day operations.' },
    { title: 'Analytics and Scaling', description: 'Using data to grow your empire.' },
  ],
  bannerUrl: 'https://picsum.photos/600/400',
  bannerAiHint: 'ecommerce online',
};

export default function ShopifyCoursePage() {
  return <CourseLayout {...courseContent} />;
}
