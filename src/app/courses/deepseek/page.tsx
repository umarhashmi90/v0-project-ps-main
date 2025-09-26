'use client';
import { CourseLayout } from '../CourseLayout';

const courseContent = {
  title: 'Deepseek: Advanced Search & Analysis',
  description: 'Master the art of advanced search and data analysis with Deepseek. This course covers powerful query techniques, data extraction, pattern recognition, and leveraging AI for deep insights.',
  learningObjectives: [
    'Construct complex search queries for precise results.',
    'Extract and structure data from unstructured sources.',
    'Use AI-powered tools for sentiment analysis and topic modeling.',
    'Identify trends and patterns in large datasets.',
    'Automate research and data gathering tasks.',
    'Apply your skills to business intelligence and research.',
  ],
  modules: [
    { title: 'The Art of the Query', description: 'Beyond basic keyword searching.' },
    { title: 'Data Extraction Techniques', description: 'Scraping and parsing data from the web.' },
    { title: 'AI-Powered Text Analysis', description: 'Understanding text data at scale.' },
    { title: 'Pattern Recognition', description: 'Finding hidden insights in your data.' },
    { title: 'Automating Research Workflows', description: 'Building tools to gather information.' },
    { title: 'Practical Applications', description: 'Case studies in market research and OSINT.' },
  ],
  bannerUrl: 'https://picsum.photos/600/400',
  bannerAiHint: 'data analysis',
};

export default function DeepseekCoursePage() {
  return <CourseLayout {...courseContent} />;
}
