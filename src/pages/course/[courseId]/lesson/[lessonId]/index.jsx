import { useRouter } from 'next/router';
import SideBar from '@/components/SideBar/SideBar';
import styles from '@/styles/Course.module.css';

// import lesson content
import * as IntroLessons from "@/data/courses/intro/lessons";
import * as BasicsLessons from "@/data/courses/basics/lessons";
import * as AdvancedLessons from "@/data/courses/advanced/lessons";
import {courses} from "@/data/courses";
import Link from "next/link";

const lessonMap = {
    intro: IntroLessons,
    basics: BasicsLessons,
    advanced: AdvancedLessons,
};

export default function LessonPage() {
    const router = useRouter();
    const { courseId, lessonId } = router.query;

    if (!courseId || !lessonId) return <p>Loading...</p>;

    const course = courses[courseId];
    const LessonComponent = lessonMap[courseId]?.[lessonId];
    const lessonIndex = course?.lessons?.findIndex(l => l.id === lessonId);

    const prevLesson = lessonIndex > 0 ? course.lessons[lessonIndex - 1] : null;
    const nextLesson = lessonIndex < course.lessons.length - 1 ? course.lessons[lessonIndex + 1] : null;


    return (
        <>
            <SideBar />
            <div className={styles.page}>
                <div className={styles.content}>
                    {LessonComponent ? (
                        <>
                            <LessonComponent courseId={courseId} lessonId={lessonId} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '60px' }}>
                                {prevLesson ? (
                                    <Link className={styles.navigationLink} href={`/course/${courseId}/lesson/${prevLesson.id}`}>
                                        ← {prevLesson.title}
                                    </Link>
                                ) : <div />}

                                {nextLesson ? (
                                    <Link className={styles.navigationLink} href={`/course/${courseId}/lesson/${nextLesson.id}`}>
                                        {nextLesson.title} →
                                    </Link>
                                ) : <div />}
                            </div>
                        </>
                    ) : (
                        <p>Lesson not found.</p>
                    )}
                </div>
            </div>
        </>
    );
}
