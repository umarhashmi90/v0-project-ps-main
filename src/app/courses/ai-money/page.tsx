'use client';
import { CourseLayout } from '../CourseLayout';

const courseContent = {
  title: 'Monetizing AI Skills',
  description: 'Learn how to turn your AI knowledge into a profitable venture. This course covers freelancing, building AI-powered SaaS products, consulting, and creating content to monetize your expertise.',
  learningObjectives: [
    'Identify profitable niches in the AI industry.',
    'Price your AI services and products effectively.',
    'Find clients and projects as an AI freelancer.',
    'Develop and launch a simple AI-powered SaaS application.',
    'Build a personal brand as an AI expert.',
    'Create and sell AI-related digital products or courses.',
  ],
  modules: [
    { title: 'The AI Gold Rush', description: 'Opportunities for monetization in the AI space.' },
    { title: 'AI Freelancing and Consulting', description: 'Selling your skills to businesses.' },
    { title: 'Building and Selling AI SaaS', description: 'From idea to recurring revenue.' },
    { title: 'Creating AI-Powered Content', description: 'Monetizing your knowledge through content.' },
    { title: 'Marketing for AI Ventures', description: 'How to attract customers and clients.' },
    { title: 'Ethical Considerations', description: 'Building a sustainable and responsible AI business.' },
  ],
  bannerUrl: 'https://picsum.photos/600/400',
  bannerAiHint: 'ai money',
};

export default function AiMoneyCoursePage() {
  return <CourseLayout {...courseContent} />;
}
