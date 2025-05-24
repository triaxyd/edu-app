'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '@/context/authContext';
import styles from '@/styles/Home.module.css';

const modules = [
    {
        id: 'intro',
        title: 'Introduction to JavaScript',
        subtitle: 'Learn what JavaScript is and why it is important.',
        progress: '100%',
        image: '/illustrations/course1.png',
    },
    {
        id: 'basics',
        title: 'Basic JavaScript Concepts',
        subtitle: 'Learn variables, data types and functions.',
        progress: '70%',
        image: '/illustrations/course2.png',
    },
    {
        id: 'advanced',
        title: 'Advanced JavaScript Techniques',
        subtitle: 'Explore async programming, objects, and the DOM.',
        progress: '20%',
        image: '/illustrations/course3.png',
    },
];


export default function HomePage() {
    const { user, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) router.push('/');
    }, [user]);

    return (
        <div className={styles.page}>
            <div className={styles.sidebar}></div>
            <div className={styles.content}>
                <h1 className={styles.title}>Hello, {user?.email || 'User'}!</h1>
                <div className={styles.divider}></div>

                <h2 className={styles.sectionTitle}>My Courses</h2>

                <div className={styles.courseList}>
                    {modules.map((mod, index) => (
                        <div key={mod.id} className={styles.courseCard}>
                            <img
                                src={mod.image}
                                alt={mod.title}
                                className={styles.courseImage}
                            />
                            <div className={styles.courseInfo}>
                                <div className={styles.courseTitle}>{mod.title}</div>
                                <div className={styles.courseSubtitle}>{mod.subtitle}</div>
                            </div>
                            <div className={styles.courseProgress}>{mod.progress}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
