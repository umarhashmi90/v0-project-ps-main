'use client';
import { CourseLayout } from '../CourseLayout';

const courseContent = {
  title: 'Mastering CSS',
  description: 'Unlock the full potential of web styling with our comprehensive CSS course. From fundamentals to advanced animations, you will learn how to create beautiful and responsive websites.',
  learningObjectives: [
    'Understand CSS syntax, selectors, and the cascade.',
    'Master the box model, positioning, and layout techniques.',
    'Learn Flexbox and Grid for modern, responsive designs.',
    'Create stunning animations and transitions.',
    'Apply best practices for writing clean and maintainable CSS.',
    'Explore advanced topics like variables and pre-processors.',
  ],
  modules: [
    { title: 'Introduction to CSS', description: 'The basics of CSS and how it works with HTML.' },
    { title: 'Selectors and Specificity', description: 'Targeting elements with precision.' },
    { title: 'The Box Model', description: 'Understanding margins, padding, and borders.' },
    { title: 'Layouts with Flexbox', description: 'Building flexible and responsive layouts.' },
    { title: 'Advanced Grid Systems', description: 'Mastering two-dimensional layouts.' },
    { title: 'Transitions and Animations', description: 'Bringing your web pages to life.' },
  ],
  bannerUrl: 'https://picsum.photos/600/400',
  bannerAiHint: 'css code',
};

export default function CssCoursePage() {
  return <CourseLayout {...courseContent} />;
}
