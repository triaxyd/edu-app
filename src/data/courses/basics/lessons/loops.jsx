import React, { useState,useEffect} from 'react';
import { getDatabase, ref, get, update } from "firebase/database";
import styles from '@/styles/LessonContent.module.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import QuizSection from '@/components/Quiz/QuizSection';
import { loopsQuiz } from '@/data/courses/basics/quizzes/loopsQuiz';
import { markLessonAsRead } from '@/lib/dbUtils';
import { useAuth } from '@/context/authContext';

export default function LoopsLesson({courseId, lessonId}) {
    const { user } = useAuth();
    const [showQuiz, setShowQuiz] = useState(false);
    const [isRead, setIsRead] = useState(false);
    const [quizScore, setQuizScore] = useState(null);
    useEffect(() => {
        if (!user) return;

        const fetchStatus = async () => {
            const db = getDatabase();
            const path = `users/${user.uid}/courses/${courseId}/${lessonId}`;
            const snapshot = await get(ref(db, path));
            if (snapshot.exists()) {
                const data = snapshot.val();
                setIsRead(!!data.lesson_read);
                if (typeof data.lesson_score === 'number') {
                    setQuizScore(data.lesson_score);
                }
            }
        };

        fetchStatus();
    }, [user, courseId, lessonId]);

    const handleMarkAsRead = async () => {
        if (!user) return;

        const newStatus = !isRead;
        const db = getDatabase();
        const path = `users/${user.uid}/courses/${courseId}/${lessonId}`;
        await update(ref(db, path), {
            lesson_read: newStatus,
        });

        setIsRead(newStatus);
    };

    return (
        <div className={styles.lessonContainer}>
            <h1 className={styles.heading}>Loops in JavaScript</h1>
            <div className={styles.divider}></div>

            <h2 className={styles.subheading}>What Are Loops?</h2>
            <p className={styles.paragraph}>
                Loops allow you to repeat a block of code multiple times. They are essential when you want to perform the same operation for a range of values, items in a list, or until a condition is met.
            </p>

            <h2 className={styles.subheading}>The <code>for</code> Loop</h2>
            <p className={styles.paragraph}>
                A <code>for</code> loop is useful when you know ahead of time how many times you want to repeat a block of code.
            </p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`for (let i = 0; i < 5; i++) {
    console.log("Count:", i);
}`}
            </SyntaxHighlighter>

            <h2 className={styles.subheading}>The <code>while</code> Loop</h2>
            <p className={styles.paragraph}>
                A <code>while</code> loop keeps running as long as the given condition is true.
            </p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`let count = 0;

while (count < 3) {
    console.log("Count is", count);
    count++;
}`}
            </SyntaxHighlighter>

            <h2 className={styles.subheading}>The <code>do...while</code> Loop</h2>
            <p className={styles.paragraph}>
                This variation runs the code block at least once, and then repeats it while the condition remains true.
            </p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`let i = 0;

do {
    console.log("i is", i);
    i++;
} while (i < 3);`}
            </SyntaxHighlighter>

            <h2 className={styles.subheading}>Looping Through Arrays</h2>
            <p className={styles.paragraph}>
                JavaScript arrays are often looped over using a <code>for</code> loop or using methods like <code>for...of</code> or <code>forEach()</code>.
            </p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`const fruits = ["apple", "banana", "cherry"];

for (let fruit of fruits) {
    console.log(fruit);
}`}
            </SyntaxHighlighter>

            <h2 className={styles.subheading}>Breaking and Continuing</h2>
            <p className={styles.paragraph}>
                • <code>break</code> exits the loop completely<br/>
                • <code>continue</code> skips to the next iteration
            </p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`for (let i = 0; i < 5; i++) {
    if (i === 2) continue;
    if (i === 4) break;
    console.log(i);
}`}
            </SyntaxHighlighter>

            <h2 className={styles.subheading}>Best Practices</h2>
            <p className={styles.paragraph}>
                • Avoid infinite loops by ensuring your conditions will eventually become false<br/>
                • Choose the loop that best fits your use case<br/>
                • Keep loop logic simple and easy to read
            </p>

            <p className={styles.paragraph}>
                Loops are a core building block in programming. Mastering them allows you to handle repetitive tasks, process collections, and control flow with precision.
            </p>
            <div className={styles.buttonRow}>
                <button
                    className={styles.readButton}
                    onClick={handleMarkAsRead}
                >
                    {isRead ? "Mark as Unread" : "Mark Lesson as Read"}
                </button>

                <button
                    className={styles.quizButton}
                    onClick={() => setShowQuiz(!showQuiz)}
                >
                    {showQuiz ? 'Hide Quiz' : (quizScore > 0 ? 'Retake Quiz' : 'Take Quiz')}
                </button>

                {quizScore > 0 && (
                    <div className={styles.quizResult}>
                        Score: {quizScore}%
                    </div>
                )}
            </div>

            {showQuiz && (
                <QuizSection
                    courseId="basics"
                    lessonId="loops"
                    questions={loopsQuiz}
                />
            )}
        </div>
    );
}
