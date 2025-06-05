'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import SideBar from '@/components/Sidebar/SideBar';
import { useAuth } from '@/context/authContext';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';

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
        <>
            <SideBar />
            <div className={styles.page}>
                <div className={styles.content}>
                    <div className={styles.headerRow}>
                        <h1 className={styles.title}>Hello, {user?.email || 'User'}!</h1>
                        <img
                            src="/icons/settings.png"
                            alt="Settings"
                            className={styles.settingsIcon}
                        />
                    </div>
                    <div className={styles.divider}></div>

                    <h2 className={styles.sectionTitle}>My Courses</h2>

                    <div className={styles.courseList}>
                        {modules.map((mod) => (
                            <Link key={mod.id} href={`/course/${mod.id}`} style={{ textDecoration: 'none' }}>
                                <div className={styles.courseCard}>
                                    <img src={mod.image} alt={mod.title} className={styles.courseImage} />
                                    <div className={styles.courseInfo}>
                                        <div className={styles.courseTitle}>{mod.title}</div>
                                        <div className={styles.courseSubtitle}>{mod.subtitle}</div>
                                    </div>
                                    <div className={styles.courseProgress}>{mod.progress}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className={styles.tipBox}>
                        <h3 className={styles.tipLabel}>Tip of the Day</h3>
                        <p className={styles.tipText}>
                            You can declare a variable with <code>let</code> and <code>const</code> — but <code>const</code> can’t be reassigned!
                        </p>
                    </div>
                    <div className={styles.progressOverview}>
                        <div className={styles.statBlock}>
                            <div className={styles.statNumber}>3</div>
                            <div className={styles.statLabel}>Modules</div>
                        </div>
                        <div className={styles.statBlock}>
                            <div className={styles.statNumber}>63%</div>
                            <div className={styles.statLabel}>Average Progress</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
