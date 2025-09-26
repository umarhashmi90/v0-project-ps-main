'use client';
import { CourseLayout } from '../CourseLayout';

const courseContent = {
  title: 'Adobe After Effects for Beginners',
  description: 'Bring your creative ideas to life with Adobe After Effects. This course will teach you the fundamentals of motion graphics and visual effects, from basic animations to complex compositions.',
  learningObjectives: [
    'Navigate the After Effects interface and workflow.',
    'Create animations using keyframes, shapes, and text.',
    'Understand and apply visual effects and presets.',
    'Work with masks, mattes, and compositing techniques.',
    'Learn the basics of 3D space and camera movement.',
    'Render and export your projects for various platforms.',
  ],
  modules: [
    { title: 'Getting Started', description: 'Understanding the workspace and basic tools.' },
    { title: 'Animation Principles', description: 'Bringing motion to life with keyframes.' },
    { title: 'Shape Layers and Text Animation', description: 'Creating dynamic graphic elements.' },
    { title: 'Visual Effects and Compositing', description: 'Adding magic to your videos.' },
    { title: 'Working in 3D Space', description: 'Creating depth and perspective.' },
    { title: 'Rendering and Exporting', description: 'Sharing your work with the world.' },
  ],
  bannerUrl: 'https://picsum.photos/600/400',
  bannerAiHint: 'motion graphics',
};

export default function AfterEffectsCoursePage() {
  return <CourseLayout {...courseContent} />;
}
