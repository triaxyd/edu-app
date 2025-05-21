'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '@/context/authContext';
import styles from '@/styles/Home.module.css';

const modules = [ /* ...your modules array... */ ];

export default function HomePage() {
    const { user, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) router.push('/');
    }, [user]);

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                {/* Left sidebar */}
                <div className={styles.sidebar} />

                {/* Main content area */}
                <div className={styles.content}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                        <h1>Hello, {user?.email}!</h1>
                        <button onClick={logout}>Log Out</button>
                    </div>
                    <h2 style={{ marginTop: 24 }}>My Courses</h2>

                    <div style={{ marginTop: 16, display:'grid', gap:16 }}>
                        {modules.map((mod) => (
                            <div
                                key={mod.id}
                                style={{
                                    padding: 16,
                                    background: 'white',
                                    borderRadius: 8,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <div>
                                    <strong>{mod.title}</strong>
                                    <p style={{ margin: '4px 0 0', color: '#666' }}>
                                        {mod.description}
                                    </p>
                                </div>
                                <span>{mod.progress || '0%'}{/* or calculate */}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
