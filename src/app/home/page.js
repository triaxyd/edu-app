'use client';
import Link from 'next/link';
import { useAuth } from '../../context/authContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const modules = [
  {
    id: 'intro',
    title: 'Introduction to JavaScript',
    description: 'Learn what JavaScript is and why it is important.',
  },
  {
    id: 'basics',
    title: 'Basic JavaScript Concepts',
    description: 'Learn variables, data types, and functions.',
  },
  {
    id: 'advanced',
    title: 'Advanced JavaScript Techniques',
    description: 'Explore async programming, objects, and the DOM.',
  },
];

export default function HomePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  // Redirect to login if not logged in
  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Welcome to JavaScript Learning</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Log Out
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {modules.map((module) => (
          <div key={module.id} className="p-4 border rounded-lg shadow">
            <h2 className="text-xl font-semibold">{module.title}</h2>
            <p className="mb-2">{module.description}</p>
            <Link href={`/modules/${module.id}`}>
              <span className="text-blue-500 hover:underline">Start Module</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
