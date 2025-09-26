'use client';
import { CourseLayout } from '../CourseLayout';

const courseContent = {
  title: 'JavaScript: The Advanced Concepts',
  description: 'Move beyond the fundamentals and master the core concepts of JavaScript. This course dives deep into closures, promises, async/await, prototypes, and modern ES6+ features.',
  learningObjectives: [
    'Gain a deep understanding of the JavaScript event loop.',
    'Master asynchronous programming with Promises and async/await.',
    'Understand closures, scope, and execution context.',
    'Learn about prototypal inheritance and object-oriented patterns.',
    'Work with modern data structures like Maps and Sets.',
    'Write clean, efficient, and modern JavaScript code.',
  ],
  modules: [
    { title: 'Asynchronous JavaScript', description: 'Callbacks, Promises, and Async/Await.' },
    { title: 'Core Concepts', description: 'Closures, Scope, and Hoisting.' },
    { title: 'Object-Oriented JavaScript', description: 'Prototypes, Classes, and Inheritance.' },
    { title: 'Functional Programming', description: 'Immutability, Pure Functions, and Higher-Order Functions.' },
    { title: 'Modern ES6+ Features', description: 'Destructuring, Spread/Rest, and Modules.' },
    { title: 'JavaScript Engine and Runtime', description: 'How JavaScript works under the hood.' },
  ],
  bannerUrl: 'https://picsum.photos/600/400',
  bannerAiHint: 'javascript code',
};

export default function JavaScriptCoursePage() {
  return <CourseLayout {...courseContent} />;
}
