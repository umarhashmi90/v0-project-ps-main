'use client';
import { CourseLayout } from '../CourseLayout';

const courseContent = {
  title: 'AI-Powered Coding',
  description: 'Supercharge your development workflow with AI tools. Learn how to use AI code assistants, generate code from prompts, debug with AI, and automate repetitive coding tasks to become a 10x developer.',
  learningObjectives: [
    'Master AI code completion tools like GitHub Copilot.',
    'Write effective prompts to generate functional code.',
    'Use AI for code explanation, refactoring, and optimization.',
    'Leverage AI for automated testing and debugging.',
    'Integrate AI into your CI/CD pipeline.',
    'Understand the future of software development with AI.',
  ],
  modules: [
    { title: 'Introduction to AI Code Assistants', description: 'Getting started with tools like Copilot.' },
    { title: 'Prompt-Driven Development', description: 'Generating code from natural language.' },
    { title: 'AI-Assisted Debugging', description: 'Finding and fixing bugs faster.' },
    { title: 'Code Refactoring and Optimization', description: 'Improving code quality with AI.' },
    { title: 'Automated Testing with AI', description: 'Generating test cases automatically.' },
    { title: 'The Future of AI in Software Engineering', description: 'What to expect next.' },
  ],
  bannerUrl: 'https://picsum.photos/600/400',
  bannerAiHint: 'ai code',
};

export default function AiCodingCoursePage() {
  return <CourseLayout {...courseContent} />;
}
