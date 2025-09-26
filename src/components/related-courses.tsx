import { Palette, Code, Bot, Film, ShoppingCart, DollarSign, Search, Tv } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

const allCourses = [
  {
    title: 'CSS',
    href: '/courses/css',
    icon: <Palette className="h-6 w-6" />,
  },
  {
    title: 'HTML',
    href: '/courses/html',
    icon: <Code className="h-6 w-6" />,
  },
  {
    title: 'Gen AI',
    href: '/courses/gen-ai',
    icon: <Bot className="h-6 w-6" />,
  },
  {
    title: 'TikTok',
    href: '/courses/tiktok',
    icon: <Film className="h-6 w-6" />,
  },
  {
    title: 'Shopify',
    href: '/courses/shopify',
    icon: <ShoppingCart className="h-6 w-6" />,
  },
  {
    title: 'AI Money',
    href: '/courses/ai-money',
    icon: <DollarSign className="h-6 w-6" />,
  },
  {
    title: 'AI Coding',
    href: '/courses/ai-coding',
    icon: <Bot className="h-6 w-6" />,
  },
  {
    title: 'Deepseek',
    href: '/courses/deepseek',
    icon: <Search className="h-6 w-6" />,
  },
  {
    title: 'JavaScript',
    href: '/courses/javascript',
    icon: <Code className="h-6 w-6" />,
  },
  {
    title: 'After Effects',
    href: '/courses/after-effects',
    icon: <Film className="h-6 w-6" />,
  },
  {
    title: 'Premiere Pro',
    href: '/courses/premiere-pro',
    icon: <Tv className="h-6 w-6" />,
  },
];

export function RelatedCourses({ currentCourseTitle }: { currentCourseTitle: string }) {
  const relatedCourses = allCourses.filter(course => course.title !== currentCourseTitle).slice(0, 6);
  return (
    <div className="mt-16 md:mt-24">
      <h2 className="text-3xl font-extrabold text-black text-center mb-8">Related Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {relatedCourses.map((course) => (
          <Link href={course.href} key={course.href}>
            <Card className="h-full flex flex-col items-center text-center p-6 border-gray-200 hover:shadow-lg transition-shadow">
              <div className="p-4 bg-gray-100 rounded-lg w-fit mb-4">
                  {course.icon}
              </div>
              <h3 className="text-lg font-bold font-headline">{course.title}</h3>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
