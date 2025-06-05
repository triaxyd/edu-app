import { useRouter } from 'next/router';
import { courses } from '@/data/courses';
import SideBar from "@/components/SideBar/SideBar";
import styles from "@/styles/Course.module.css";
import Link from "next/link";

export default function CourseOverview() {
    const router = useRouter();
    const { courseId } = router.query;

    const course = courses[courseId];

    if (!course) return <p>Loading or invalid course ID...</p>;

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
                        {course.lessons.map((lesson) => (
                            <Link
                                key={lesson.id}
                                href={`/course/${courseId}/lesson/${lesson.id}`}
                                style={{ textDecoration: 'none' }}
                            >
                                <div className={styles.courseCard}>
                                    <div className={styles.courseInfo}>
                                        <div className={styles.courseTitle}>{lesson.title}</div>
                                        <div className={styles.courseSubtitle}>{lesson.description}</div>
                                    </div>
                                    <div className={styles.courseProgress}>{lesson.progress || '0%'}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
