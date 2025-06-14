'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/router';
import { getDatabase, ref, get } from 'firebase/database';
import SideBar from '@/components/Sidebar/SideBar';
import styles from '@/styles/Navigation.module.css';
import { courses } from '@/data/courses';
import Link from "next/link";
import { extraResources } from '@/data/lessonResources';


export default function NavigationPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [courseStats, setCourseStats] = useState(null);
    const [bestCourse, setBestCourse] = useState(null);
    const [weakestCourse, setWeakestCourse] = useState(null);
    const [lowestLesson, setLowestLesson] = useState(null);

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
            let lowestLessonScore = 101;
            let weakestLessonInfo = null;

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

                                // Track the lowest-scoring lesson
                                if (lesson.lesson_score < lowestLessonScore) {
                                    lowestLessonScore = lesson.lesson_score;
                                    weakestLessonInfo = {
                                        lessonId,
                                        score: lesson.lesson_score,
                                        courseId,
                                    };
                                }
                            }
                        }
                    }

                    if (typeof courseData.cumulative_score === 'number') {
                        scoreSum += courseData.cumulative_score;
                        scoreCount++;
                    }

                    const averageScore = scoreCount > 0 ? scoreSum / scoreCount : 0;
                    const readPercentage = lessonIds.length > 0 ? Math.round((readCount / lessonIds.length) * 100) : 0;

                    stats[courseId] = {
                        averageScore: averageScore.toFixed(1),
                        readPercentage,
                    };
                }
            }

            // Find best and worst courses based on average score
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
            setLowestLesson(weakestLessonInfo);
        };

        fetchStats();
    }, [user]);

    return (
        <>
            <SideBar />
            <div className={styles.page}>
                <div className={styles.content}>
                    <h1 className={styles.title}>Learning Suggestions</h1>
                    <div className={styles.divider}></div>

                    {!courseStats ? (
                        <p className={styles.loadingText}>Loading your course insights...</p>
                    ) : (
                        <>
                            {bestCourse && (
                                <>
                                    <h2 className={styles.sectionTitle}>You're Best At</h2>
                                    <p className={styles.paragraph}>
                                        You've scored highest in <strong>{courses[bestCourse]?.title || bestCourse}</strong> with an average of{" "}
                                        <strong>{courseStats[bestCourse].averageScore}%</strong>.
                                    </p>
                                </>
                            )}
                            {lowestLesson && (
                                <>
                                    <h2 className={styles.sectionTitle}>You Could Take a Look At </h2>
                                    <div className={styles.card}>
                                        <h3 className={styles.courseName}>
                                            Suggested Lesson in {courses[lowestLesson.courseId]?.title || lowestLesson.courseId}
                                        </h3>
                                        <p className={styles.cardText}>
                                            <strong>
                                                <Link href={`/course/${lowestLesson.courseId}/lesson/${lowestLesson.lessonId}`} className={styles.resourceLink}>
                                                    {courses[lowestLesson.courseId]?.lessons.find(l => l.id === lowestLesson.lessonId)?.title || lowestLesson.lessonId}
                                                </Link>
                                            </strong>
                                        </p>
                                        <p className={styles.cardText}>
                                            Your score: <strong>{lowestLesson.score}%</strong>
                                        </p>
                                        <p className={styles.cardText}>
                                            Consider visiting this topic for better mastery before moving on.
                                        </p>
                                        {extraResources[lowestLesson.lessonId] && (
                                            <div className={styles.paragraph}>
                                                <p className={styles.cardText}>
                                                    <strong>Here are some extra resources to help you understand this topic better:</strong>
                                                </p>
                                                <ul className={styles.resourceList}>
                                                    {extraResources[lowestLesson.lessonId].map((res, idx) => (
                                                        <li key={idx}>
                                                            <a href={res.url} target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>
                                                                {res.title}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>




                                </>
                            )}
                            {weakestCourse && (
                                <>
                                    <h2 className={styles.sectionTitle}>Practice Project</h2>
                                    <div className={styles.card}>
                                        <h3 className={styles.courseName}>
                                            Recommended Project for Practicing
                                            <Link href={`/course/${weakestCourse}`} className={styles.resourceLink}> {courses[weakestCourse]?.title}</Link>
                                        </h3>
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
