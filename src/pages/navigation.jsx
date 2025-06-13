'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/router';
import { getDatabase, ref, get } from 'firebase/database';
import SideBar from '@/components/Sidebar/SideBar';
import styles from '@/styles/Navigation.module.css';
import { courses } from '@/data/courses';

export default function NavigationPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [courseStats, setCourseStats] = useState(null);
    const [bestCourse, setBestCourse] = useState(null);
    const [weakestCourse, setWeakestCourse] = useState(null);

    const projectSuggestions = {
        intro: {
            title: "Build a Tip Calculator",
            description: "This small project lets you practice basic arithmetic and DOM manipulation. Users enter a bill amount and tip percentage, and your JavaScript calculates the final total. It's a fun way to solidify your understanding of input handling, functions, and variables.",
        },
        basics: {
            title: "Make a Quiz App",
            description: "Design a simple multiple-choice quiz where users answer questions and receive a score at the end. You’ll work with arrays, conditionals, event listeners, and dynamic rendering. This project strengthens your grasp of core JavaScript logic and user interaction patterns.",
        },
        advanced: {
            title: "Create a Weather Dashboard",
            description: "Build a dynamic app that fetches real-time weather data from a public API based on the user's input city. You'll use async/await, fetch requests, error handling, and DOM updates. This project reinforces how to handle asynchronous JavaScript and work with APIs effectively.",
        },
    };


    useEffect(() => {
        if (!user) {
            router.push('/');
            return;
        }

        const fetchStats = async () => {
            const db = getDatabase();
            const stats = {};

            for (const courseId in courses) {
                const courseRef = ref(db, `users/${user.uid}/courses/${courseId}`);
                const snapshot = await get(courseRef);

                if (snapshot.exists()) {
                    const courseData = snapshot.val();
                    let totalScore = 0;
                    let lessonCount = 0;

                    for (const lessonId in courseData) {
                        if (lessonId === 'cumulative_test_score') continue;
                        const lesson = courseData[lessonId];
                        if (typeof lesson.lesson_score === 'number') {
                            totalScore += lesson.lesson_score;
                            lessonCount++;
                        }
                    }

                    const avg = lessonCount > 0 ? totalScore / lessonCount : 0;
                    stats[courseId] = {
                        averageScore: avg.toFixed(1),
                        lessonCount,
                    };
                }
            }

            // Determine best/worst
            let best = null;
            let worst = null;
            let highest = -1;
            let lowest = 101;

            for (const [id, stat] of Object.entries(stats)) {
                const avg = parseFloat(stat.averageScore);
                if (avg > highest) {
                    highest = avg;
                    best = id;
                }
                if (avg < lowest) {
                    lowest = avg;
                    worst = id;
                }
            }

            setCourseStats(stats);
            setBestCourse(best);
            setWeakestCourse(worst);
        };

        fetchStats();
    }, [user]);

    return (
        <>
            <SideBar />
            <div className={styles.page}>
                <div className={styles.content}>
                    <h1 className={styles.title}>Navigation & Recommendations</h1>
                    <div className={styles.divider}></div>

                    {!courseStats ? (
                        <p className={styles.loadingText}>Loading your course insights...</p>
                    ) : (
                        <>
                            <h2 className={styles.sectionTitle}>🗂️ Your Course Performance</h2>
                            <div className={styles.cardList}>
                                {Object.entries(courseStats).map(([courseId, stat]) => (
                                    <div key={courseId} className={styles.card}>
                                        <h3 className={styles.courseName}>{courses[courseId]?.title || courseId}</h3>
                                        <p className={styles.cardText}>
                                            Average Score: <strong>{stat.averageScore}%</strong>
                                        </p>
                                        <p className={styles.cardText}>
                                            Lessons Attempted: <strong>{stat.lessonCount}</strong>
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {bestCourse && (
                                <>
                                    <h2 className={styles.sectionTitle}>🏅 You're Best At</h2>
                                    <p className={styles.paragraph}>
                                        You've scored highest in <strong>{courses[bestCourse]?.title || bestCourse}</strong> with an average of{" "}
                                        <strong>{courseStats[bestCourse].averageScore}%</strong>.
                                    </p>
                                </>
                            )}

                            {weakestCourse && (
                                <>
                                    <h2 className={styles.sectionTitle}>🛠️ Practice Project</h2>
                                    <div className={styles.card}>
                                        <h3 className={styles.courseName}>Recommended Project from {courses[weakestCourse]?.title}</h3>
                                        <p className={styles.cardText}><strong>{projectSuggestions[weakestCourse].title}</strong></p>
                                        <p className={styles.cardText}>{projectSuggestions[weakestCourse].description}</p>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
