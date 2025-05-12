'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '@/context/authContext';

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

    // Redirect unauthenticated users back to login
    useEffect(() => {
        if (!user) {
            router.push('/');
        }
    }, [user]);

    return (
        <div style={{ padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h1 style={{ margin: 0 }}>Welcome, {user?.email}</h1>
                <button
                    onClick={logout}
                    style={{
                        background: '#e53e3e',
                        color: 'white',
                        border: 'none',
                        padding: '8px 12px',
                        borderRadius: 4,
                        cursor: 'pointer'
                    }}
                >
                    Log Out
                </button>
            </div>

            <div style={{ display: 'grid', gap: 12 }}>
                {modules.map((mod) => (
                    <div
                        key={mod.id}
                        style={{
                            padding: 16,
                            border: '1px solid #ddd',
                            borderRadius: 8,
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                    >
                        <h2 style={{ margin: '0 0 8px' }}>{mod.title}</h2>
                        <p style={{ margin: '0 0 12px' }}>{mod.description}</p>
                        <Link
                            href={`/modules/${mod.id}`}
                            style={{ color: '#3182ce', textDecoration: 'underline' }}
                        >
                            Start Module
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
