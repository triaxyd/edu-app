'use client';

import { useEffect, useState } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/router';
import Sidebar from '@/components/Sidebar/SideBar';
import styles from '@/styles/Stats.module.css';
import { courses } from '@/data/courses';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';

export default function StatsPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            router.push('/');
            return;
        }

        const fetchStats = async () => {
            const db = getDatabase();
            const userCourses = {};

            for (const courseId in courses) {
                const courseRef = ref(db, `users/${user.uid}/courses/${courseId}`);
                const snapshot = await get(courseRef);

                if (snapshot.exists()) {
                    const lessons = courses[courseId].lessons.filter(l => l.id !== 'overview');
                    const data = snapshot.val();
                    const totalLessons = lessons.length;
                    const read = lessons.filter(l => data[l.id]?.lesson_read).length;
                    const scores = lessons.map(l => data[l.id]?.lesson_score || 0);
                    const avgScore = scores.reduce((a, b) => a + b, 0) / lessons.length;

                    userCourses[courseId] = {
                        title: courses[courseId].title,
                        progress: Math.round((read / totalLessons) * 100),
                        avgScore: Math.round(avgScore),
                        cumulative: data.cumulative_test_score || null,
                    };
                }
            }

            setStats(userCourses);
            setLoading(false);
        };

        fetchStats();
    }, [user]);

    const chartData = Object.entries(stats).map(([courseId, stat]) => ({
        name: stat.title,
        'Lesson Completion %': stat.progress,
        'Avg Quiz Score %': stat.avgScore,
    }));

    return (
        <>
            <Sidebar />
            <div className={styles.page}>
                <div className={styles.content}>
                    <h1 className={styles.title}>📈 Your Learning Stats</h1>
                    <div className={styles.divider}></div>

                    {loading ? (
                        <p className={styles.loadingText}>Fetching your progress...</p>
                    ) : (
                        <>
                            {Object.entries(stats).map(([courseId, stat]) => (
                                <div key={courseId} className={styles.card}>
                                    <div className={styles.courseName}>{stat.title}</div>
                                    <div className={styles.cardText}>Lesson Completion: <strong>{stat.progress}%</strong></div>
                                    <div className={styles.cardText}>Average Quiz Score: <strong>{stat.avgScore}%</strong></div>
                                    {stat.cumulative !== null && (
                                        <div className={styles.cardText}>Cumulative Test Score: <strong>{stat.cumulative}%</strong></div>
                                    )}
                                </div>
                            ))}

                            <h2 className={styles.sectionTitle}>Visual Overview</h2>
                            <div className={styles.chartWrapper}>
                                <ResponsiveContainer width="100%" height={350}>
                                    <BarChart data={chartData} margin={{ top: 20, right: 40, left: 0, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis domain={[0, 100]} />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="Lesson Completion %" fill="#211e56" />
                                        <Bar dataKey="Avg Quiz Score %" fill="#a79de8" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
