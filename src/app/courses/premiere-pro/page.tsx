'use client';
import { CourseLayout } from '../CourseLayout';

const courseContent = {
  title: 'Adobe Premiere Pro Fundamentals',
  description: 'Learn professional video editing with Adobe Premiere Pro. This course covers the entire workflow from importing footage and creating sequences to color correction, audio mixing, and exporting.',
  learningObjectives: [
    'Master the Premiere Pro interface and editing tools.',
    'Organize and manage your media effectively.',
    'Learn cutting, trimming, and sequencing techniques.',
    'Apply transitions, effects, and color correction.',
    'Edit and mix audio like a pro.',
    'Export high-quality video for any platform.',
  ],
  modules: [
    { title: 'Introduction to Premiere Pro', description: 'Navigating the workspace and importing media.' },
    { title: 'The Editing Workflow', description: 'From rough cut to fine cut.' },
    { title: 'Working with Audio', description: 'Mixing sound and adding music.' },
    { title: 'Color Correction and Grading', description: 'Creating a cinematic look.' },
    { title: 'Titles, Graphics, and Effects', description: 'Adding professional polish.' },
    { title: 'Exporting and Sharing', description: 'Delivering your final video.' },
  ],
  bannerUrl: 'https://picsum.photos/600/400',
  bannerAiHint: 'video editing',
};

export default function PremiereProCoursePage() {
  return <CourseLayout {...courseContent} />;
}
