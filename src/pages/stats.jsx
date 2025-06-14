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
            const userStats = {};

            for (const courseId in courses) {
                const courseRef = ref(db, `users/${user.uid}/courses/${courseId}`);
                const snapshot = await get(courseRef);

                if (snapshot.exists()) {
                    const courseData = snapshot.val();
                    const lessonIds = courses[courseId].lessons
                        .map(l => l.id)
                        .filter(id => id !== 'overview');

                    let scoreSum = 0;
                    let scoreCount = 0;
                    let readCount = 0;

                    for (const lessonId of lessonIds) {
                        const lesson = courseData[lessonId];
                        if (lesson) {
                            if (lesson.lesson_read) readCount++;
                            if (typeof lesson.lesson_score === 'number') {
                                scoreSum += lesson.lesson_score;
                                scoreCount++;
                            }
                        }
                    }

                    if (typeof courseData.cumulative_score === 'number') {
                        scoreSum += courseData.cumulative_score;
                        scoreCount++;
                    }

                    const avgScore = scoreCount > 0 ? scoreSum / scoreCount : 0;
                    const readPercent = lessonIds.length > 0 ? Math.round((readCount / lessonIds.length) * 100) : 0;

                    userStats[courseId] = {
                        title: courses[courseId].title,
                        readPercentage: readPercent,
                        avgScore: Math.round(avgScore),
                        cumulative: courseData.cumulative_score ?? null,
                    };
                }
            }

            setStats(userStats);
            setLoading(false);
        };

        fetchStats();
    }, [user]);

    const chartData = Object.entries(stats).map(([courseId, stat]) => ({
        name: stat.title,
        'Lesson Completion %': stat.readPercentage,
        'Avg Score %': stat.avgScore,
    }));

    return (
        <>
            <Sidebar />
            <div className={styles.page}>
                <div className={styles.content}>
                    <h1 className={styles.title}> Your Learning Stats</h1>
                    <div className={styles.divider}></div>

                    {loading ? (
                        <p className={styles.loadingText}>Fetching your progress...</p>
                    ) : (
                        <>
                            {Object.entries(stats).map(([courseId, stat]) => (
                                <div key={courseId} className={styles.card}>
                                    <div className={styles.courseName}>{stat.title}</div>
                                    <div className={styles.cardText}>Lessons Read: <strong>{stat.readPercentage}%</strong></div>
                                    <div className={styles.cardText}>Average Test Score: <strong>{stat.avgScore}%</strong></div>
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
                                        <Bar dataKey="Avg Score %" fill="#a79de8" />
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
