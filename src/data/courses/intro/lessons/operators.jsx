import React, {useState, useEffect} from 'react';
import { getDatabase, ref, get, update } from "firebase/database";
import styles from '@/styles/LessonContent.module.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import QuizSection from '@/components/Quiz/QuizSection';
import { operatorsQuiz } from '@/data/courses/intro/quizzes/operatorsQuiz';
import { useAuth } from '@/context/authContext';
import OperatorsExtra from '@/components/ExtraContent/OperatorsExtra';

export default function OperatorsLesson( {courseId, lessonId}) {
    const { user } = useAuth();
    const [showQuiz, setShowQuiz] = useState(false);
    const [isRead, setIsRead] = useState(false);
    const [quizScore, setQuizScore] = useState(null);
    const [showExtra, setShowExtra] = useState(false);

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
    const levelForThisLesson = quizScore > 67 ? 2 : 1;
    return (
        <div className={styles.lessonContainer}>
            <h1 className={styles.heading}>JavaScript Operators</h1>
            <div className={styles.divider}></div>

            <h2 className={styles.subheading}>What are Operators?</h2>
            <p className={styles.paragraph}>
                Operators are special symbols or keywords used to perform operations on values and variables.
                JavaScript includes a wide variety of operators for arithmetic, comparison, logic, assignment, and more.
            </p>

            <h2 className={styles.subheading}>Arithmetic Operators</h2>
            <p className={styles.paragraph}>
                Arithmetic operators perform basic mathematical operations:
            </p>
            <p className={styles.paragraph}>
                • <code>+</code> Addition<br/>
                • <code>-</code> Subtraction<br/>
                • <code>*</code> Multiplication<br/>
                • <code>/</code> Division<br/>
                • <code>%</code> Modulus (Remainder)<br/>
            </p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`let a = 10;
let b = 3;

console.log(a + b); // 13
console.log(a % b); // 1`}
            </SyntaxHighlighter>

            <h2 className={styles.subheading}>Comparison Operators</h2>
            <p className={styles.paragraph}>
                Comparison operators are used to compare values and return a Boolean result:
            </p>
            <p className={styles.paragraph}>
                • <code>==</code> Equal to (loose comparison)<br/>
                • <code>===</code> Strict equal (type & value)<br/>
                • <code>!=</code> Not equal<br/>
                • <code>!==</code> Strict not equal<br/>
                • <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code><br/>
            </p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`console.log(5 == "5");   // true
console.log(5 === "5");  // false
console.log(10 >= 8);    // true`}
            </SyntaxHighlighter>

            <h2 className={styles.subheading}>Logical Operators</h2>
            <p className={styles.paragraph}>
                Logical operators are used to combine or invert Boolean values:
            </p>
            <p className={styles.paragraph}>
                • <code>&&</code> AND — true if both are true<br/>
                • <code>||</code> OR — true if at least one is true<br/>
                • <code>!</code> NOT — inverts a Boolean<br/>
            </p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`let isLoggedIn = true;
let isAdmin = false;

console.log(isLoggedIn && isAdmin); // false
console.log(isLoggedIn || isAdmin); // true
console.log(!isAdmin);              // true`}
            </SyntaxHighlighter>

            <h2 className={styles.subheading}>Assignment Operators (Bonus)</h2>
            <p className={styles.paragraph}>
                Assignment operators assign values to variables. The most common is <code>=</code>, but others combine assignment with arithmetic:
            </p>
            <p className={styles.paragraph}>
                • <code>=</code> Simple assignment<br/>
                • <code>+=</code>, <code>-=</code>, <code>*=</code>, <code>/=</code> — update and assign<br/>
            </p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`let total = 10;
total += 5;  // total is now 15`}
            </SyntaxHighlighter>

            <h2 className={styles.subheading}>Why Operators Matter</h2>
            <p className={styles.paragraph}>
                Operators are everywhere in JavaScript. Whether you're doing math, checking conditions in an <code>if</code> statement,
                or combining values, understanding operators is essential for writing logic that works correctly.
            </p>
            <div className={styles.buttonRow}>
                <button
                    className={styles.readButton}
                    onClick={handleMarkAsRead}
                >
                    {isRead ? "Mark as Unread" : "Mark Lesson as Read"}
                </button>

                <button
                    className={styles.moreButton}
                    onClick={() => setShowExtra(!showExtra)}
                >
                    {showExtra ? 'Hide Extra Content' : 'See More'}
                </button>

                <button
                    className={styles.quizButton}
                    onClick={() => setShowQuiz(!showQuiz)}
                >
                    {showQuiz ? 'Hide Quiz' : (quizScore > 0 ? 'Retake Quiz' : 'Take Quiz')}
                </button>

                {quizScore > 0 && (
                    <div className={styles.quizResult}>
                        Last Score: {quizScore}%
                    </div>
                )}


            </div>

            {showExtra && <OperatorsExtra difficultyLevel={levelForThisLesson} />}


            {showQuiz && (
                <QuizSection
                    courseId="intro"
                    lessonId="operators"
                    questions={operatorsQuiz}
                    onScore={(newPercent) => setQuizScore(newPercent)}
                />
            )}

        </div>
    );
}
