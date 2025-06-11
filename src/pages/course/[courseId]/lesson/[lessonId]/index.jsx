import { useRouter } from 'next/router';
import SideBar from '@/components/SideBar/SideBar';
import styles from '@/styles/Course.module.css';

// import lesson content
import * as IntroLessons from "@/data/courses/intro/lessons";
import * as BasicsLessons from "@/data/courses/basics/lessons";
import * as AdvancedLessons from "@/data/courses/advanced/lessons";

const lessonMap = {
    intro: IntroLessons,
    basics: BasicsLessons,
    advanced: AdvancedLessons,
};

export default function LessonPage() {
    const router = useRouter();
    const { courseId, lessonId } = router.query;

    if (!courseId || !lessonId) return <p>Loading...</p>;

    const LessonComponent = lessonMap[courseId]?.[lessonId];

    return (
        <>
            <SideBar />
            <div className={styles.page}>
                <div className={styles.content}>
                    {LessonComponent ? (
                        <LessonComponent />
                    ) : (
                        <p>Lesson not found.</p>
                    )}
                </div>
            </div>
        </>
    );
}
