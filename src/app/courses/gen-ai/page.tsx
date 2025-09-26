'use client';
import { CourseLayout } from '../CourseLayout';

const courseContent = {
  title: 'Generative AI Fundamentals',
  description: 'Dive into the fascinating world of Generative AI. Learn the principles behind large language models (LLMs), diffusion models for image generation, and how to build applications with them.',
  learningObjectives: [
    'Understand the core concepts of generative models.',
    'Learn how LLMs like GPT work.',
    'Explore text generation, summarization, and translation.',
    'Understand image generation with models like DALL-E and Stable Diffusion.',
    'Learn prompt engineering techniques for better results.',
    'Build a simple generative AI application.',
  ],
  modules: [
    { title: 'Introduction to Generative AI', description: 'What is it and why is it important?' },
    { title: 'Large Language Models (LLMs)', description: 'The technology behind ChatGPT.' },
    { title: 'Prompt Engineering', description: 'Getting the most out of AI models.' },
    { title: 'Image Generation Models', description: 'Creating art and images from text.' },
    { title: 'Building with AI APIs', description: 'Integrating generative AI into your projects.' },
    { title: 'The Future of AI', description: 'Exploring the ethics and future trends.' },
  ],
  bannerUrl: 'https://picsum.photos/600/400',
  bannerAiHint: 'generative ai',
};

export default function GenAiCoursePage() {
  return <CourseLayout {...courseContent} />;
}
