'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SideBar from '@/components/Sidebar/SideBar';
import { useAuth } from '@/context/authContext';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';
import {getDatabase, ref, get} from 'firebase/database';
import {courses} from '@/data/courses';

export default function HomePage() {
    const { user } = useAuth();
    const router = useRouter();
    const [courseProgress, setCourseProgress] = useState({});

    useEffect(() => {
        if (!user) {
            router.push('/');
            return;
        }

        const fetchAllProgress = async () => {
            const db = getDatabase();
            const updates = {};

            for (const courseId in courses) {
                const snapshot = await get(ref(db, `users/${user.uid}/courses/${courseId}`));
                const courseLessons = courses[courseId].lessons.filter(l => l.id !== "overview");
                const totalLessons = courseLessons.length;

                let readCount = 0;
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    readCount = courseLessons.filter(l => data[l.id]?.lesson_read).length;
                }

                const percent = totalLessons > 0 ? Math.round((readCount / totalLessons) * 100) : 0;
                updates[courseId] = percent;
            }

            setCourseProgress(updates);
        };

        fetchAllProgress();
    }, [user]);
    const startedModules = Object.values(courseProgress).filter(p => p > 0);
    const averageProgress =
        startedModules.length > 0
            ? Math.round(startedModules.reduce((a, b) => a + b, 0) / startedModules.length)
            : 0;
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
                        {Object.entries(courses).map(([courseId, course]) => (
                            <Link key={courseId} href={`/course/${courseId}`} style={{ textDecoration: 'none' }}>
                                <div className={styles.courseCard}>
                                    <img
                                        src={`/illustrations/course${
                                            courseId === 'intro' ? 1 :
                                                courseId === 'basics' ? 2 : 3
                                        }.png`}
                                        alt={course.title}
                                        className={styles.courseImage}
                                    />
                                    <div className={styles.courseInfo}>
                                        <div className={styles.courseTitle}>{course.title}</div>
                                        <div className={styles.courseSubtitle}>{course.description}</div>
                                    </div>
                                    <div className={styles.courseProgress}>
                                        {courseProgress[courseId] !== undefined
                                            ? `${courseProgress[courseId]}%`
                                            : '...'}
                                    </div>
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
                            <div className={styles.statNumber}>{startedModules.length}</div>
                            <div className={styles.statLabel}>Courses Started</div>
                        </div>
                        <div className={styles.statBlock}>
                            <div className={styles.statNumber}>
                                {startedModules.length > 0 ? `${averageProgress}%` : '0%'}
                            </div>
                            <div className={styles.statLabel}>Average Progress</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}