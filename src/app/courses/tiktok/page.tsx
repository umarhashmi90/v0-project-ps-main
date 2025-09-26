'use client';
import { CourseLayout } from '../CourseLayout';

const courseContent = {
  title: 'TikTok Content Creation Mastery',
  description: 'Learn the secrets to creating viral content on TikTok. This course covers everything from finding trends and shooting engaging videos to mastering the algorithm and growing your audience.',
  learningObjectives: [
    'Understand the TikTok algorithm and how to use it to your advantage.',
    'Identify and capitalize on viral trends.',
    'Master video shooting, editing, and effects within the app.',
    'Develop a content strategy that builds a loyal following.',
    'Collaborate with other creators and brands.',
    'Monetize your TikTok presence effectively.',
  ],
  modules: [
    { title: 'Understanding the TikTok Ecosystem', description: 'Navigating the platform and its culture.' },
    { title: 'Content Strategy and Ideation', description: 'Planning your content for maximum impact.' },
    { title: 'Shooting and Editing Techniques', description: 'Creating high-quality, engaging videos.' },
    { title: 'Growth Hacking the Algorithm', description: 'Tips and tricks to go viral.' },
    { title: 'Monetization and Brand Deals', description: 'Turning your passion into a career.' },
  ],
  bannerUrl: 'https://picsum.photos/600/400',
  bannerAiHint: 'social media',
};

export default function TikTokCoursePage() {
  return <CourseLayout {...courseContent} />;
}
