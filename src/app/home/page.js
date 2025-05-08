'use client';
import Link from 'next/link';
import { useAuth } from '../../context/authContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpenIcon, CodeIcon, RocketIcon } from '@heroicons/react/24/outline'; // Optional: HeroIcons

const modules = [
  {
    id: 'intro',
    title: 'Introduction to JavaScript',
    description: 'Start your journey by understanding what JavaScript is, its history, and why it’s essential in web development.',
    level: 'Beginner',
    icon: '📖',
    color: 'bg-indigo-100',
  },
  {
    id: 'basics',
    title: 'Basic JavaScript Concepts',
    description: 'Dive into the foundations: variables, data types, functions, and control flow. Build your first interactive scripts.',
    level: 'Intermediate',
    icon: '💻',
    color: 'bg-green-100',
  },
  {
    id: 'advanced',
    title: 'Advanced JavaScript Techniques',
    description: 'Master asynchronous programming, objects, the DOM, and best practices to create dynamic web applications.',
    level: 'Advanced',
    icon: '🚀',
    color: 'bg-yellow-100',
  },
];

export default function ModulesPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  // Redirect to login if not logged in
  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user]);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">JavaScript Learning Path</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition shadow"
        >
          Log Out
        </button>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((module) => (
          <div
            key={module.id}
            className={`relative p-6 rounded-2xl shadow hover:shadow-lg hover:scale-105 transition-transform duration-300 ${module.color}`}
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white shadow mb-4 text-3xl">
              {module.icon}
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{module.title}</h2>
            <span className="inline-block bg-white text-gray-700 text-xs font-semibold px-3 py-1 rounded-full shadow mb-4">
              {module.level}
            </span>
            <p className="text-gray-700 mb-4">{module.description}</p>
            <Link href={`/modules/${module.id}`}>
              <span className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-500 transition">
                Start Module
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
