import { useRouter } from 'next/router';
import { courses } from '@/data/courses';
import SideBar from "@/components/SideBar/SideBar";
import styles from "@/styles/Course.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { useAuth } from "@/context/authContext";
import {toggleLessonReadStatus} from "@/lib/dbUtils";

export default function CourseOverview() {
    const router = useRouter();
    const { courseId } = router.query;

    const course = courses[courseId];
    const { user } = useAuth();
    const [lessonProgress, setLessonProgress] = useState({});

    useEffect(() => {
        if (!user || !courseId) return;

        const fetchProgress = async () => {
            const db = getDatabase();
            const userPath = `users/${user.uid}/courses/${courseId}`;
            const snapshot = await get(ref(db, userPath));
            if (snapshot.exists()) {
                const data = snapshot.val();
                setLessonProgress(data || {});
            }
        };

        fetchProgress();
    }, [user, courseId]);

    if (!course) return <p>Loading or invalid course ID...</p>;
    const getLessonProgressIcon = (lessonId) => {
        const isRead = lessonProgress[lessonId]?.lesson_read;
        return isRead ? "/icons/read.png" : "/icons/unread.png";
    };

    return (
        <>
            <SideBar />
            <div className={styles.page}>
                <div className={styles.content}>
                    <div className={styles.headerRow}>
                        <h1 className={styles.title}>{course.title}</h1>
                        <p>{course.description}</p>
                    </div>

                    <div className={styles.courseList}>
                        {course.lessons.map((lesson, index) => (
                            <div className={styles.courseCard} style={{ animationDelay: `${0.5 + index * 0.2}s` }}>
                                <Link
                                    href={`/course/${courseId}/lesson/${lesson.id}`}
                                    style={{ textDecoration: 'none', flex: 1 }}
                                >
                                    <div className={styles.courseInfo}>
                                        <div
                                            className={`${styles.courseTitle} ${
                                                lesson.id === 'overview' ? styles.overviewTitle : ''
                                            }`}
                                        >
                                            {lesson.title}
                                        </div>
                                        <div className={styles.courseSubtitle}>{lesson.description}</div>
                                    </div>
                                </Link>

                                {lesson.id === 'overview' ? (
                                    <div className={styles.courseProgress}>
                                        {lessonProgress?.cumulative_score != null
                                            ? `${lessonProgress.cumulative_score}%`
                                            : '0%'}
                                    </div>
                                ) : (
                                    <img
                                        src={getLessonProgressIcon(lesson.id)}
                                        alt={lessonProgress[lesson.id]?.lesson_read ? "Read" : "Unread"}
                                        style={{ width: '40px', height: '40px', marginLeft: '16px', cursor: 'pointer' }}
                                        onClick={async (e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            const current = lessonProgress[lesson.id]?.lesson_read || false;
                                            await toggleLessonReadStatus(courseId, lesson.id, current, user.uid);
                                            setLessonProgress(prev => ({
                                                ...prev,
                                                [lesson.id]: {
                                                    ...prev[lesson.id],
                                                    lesson_read: !current
                                                }
                                            }));
                                        }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
