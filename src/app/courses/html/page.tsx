'use client';
import { CourseLayout } from '../CourseLayout';

const courseContent = {
  title: 'Advanced HTML5',
  description: 'Go beyond the basics and master the full power of HTML5. This course covers semantic markup, accessibility, multimedia integration, and modern APIs to build structured and meaningful web content.',
  learningObjectives: [
    'Write clean, semantic, and accessible HTML.',
    'Integrate audio, video, and interactive elements.',
    'Understand and use the Canvas API for graphics.',
    'Work with modern form controls and validation.',
    'Learn about Web Storage, Geolocation, and other APIs.',
    'Optimize HTML for performance and SEO.',
  ],
  modules: [
    { title: 'Semantic HTML', description: 'Structuring your content for meaning.' },
    { title: 'Multimedia Elements', description: 'Embedding audio and video.' },
    { title: 'Advanced Forms', description: 'Creating interactive and accessible forms.' },
    { title: 'Canvas and SVG', description: 'Drawing graphics on the web.' },
    { title: 'Web APIs', description: 'Using browser APIs like Geolocation and Web Storage.' },
    { title: 'Accessibility (a11y)', description: 'Making your websites usable for everyone.' },
  ],
  bannerUrl: 'https://picsum.photos/600/400',
  bannerAiHint: 'html code',
};

export default function HtmlCoursePage() {
  return <CourseLayout {...courseContent} />;
}
