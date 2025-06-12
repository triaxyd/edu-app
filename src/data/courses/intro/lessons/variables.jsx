// src/data/courses/intro/lessons/variables.jsx
import React, { useState, useEffect} from 'react';
import { getDatabase, ref, get, update } from "firebase/database";
import styles from '@/styles/LessonContent.module.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { variablesQuiz } from '@/data/courses/intro/quizzes/variablesQuiz';
import QuizSection from '@/components/Quiz/QuizSection';
import { markLessonAsRead } from '@/lib/dbUtils';
import { useAuth } from '@/context/authContext';

export default function VariablesLesson({ courseId, lessonId }) {
    const { user } = useAuth();
    const [isRead, setIsRead] = useState(false);
    useEffect(() => {
        if (!user) return;

        const fetchStatus = async () => {
            const db = getDatabase();
            const path = `users/${user.uid}/courses/${courseId}/${lessonId}`;
            const snapshot = await get(ref(db, path));
            if (snapshot.exists()) {
                setIsRead(!!snapshot.val().lesson_read);
            }
        };

        fetchStatus();
    }, [user, courseId, lessonId]);

    const [showQuiz, setShowQuiz] = useState(false);

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
            <h1 className={styles.heading}>Variables and Constants</h1>
            <div className={styles.divider}></div>
            <p className={styles.paragraph}>
                In programming, a <strong>variable</strong> is like a container that holds data. You can give this container a name,
                store something inside it, and retrieve or change it later. JavaScript allows you to create variables using the
                keywords <code>let</code>, <code>const</code>, and historically, <code>var</code>. Each has different characteristics, and choosing the right one
                is essential for writing clean and predictable code.
            </p>

            <h2 className={styles.subheading}>Declaring Variables with <code>let</code></h2>
            <p className={styles.paragraph}>
                The <code>let</code> keyword allows you to declare variables whose values can change over time.
                This is useful when the value you're storing is expected to be reassigned or updated.
            </p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`let score = 10;
score = 15; // score is now 15`}
            </SyntaxHighlighter>

            <h2 className={styles.subheading}>Using <code>const</code> for Constants</h2>
            <p className={styles.paragraph}>
                The <code>const</code> keyword, short for "constant", is used to declare variables whose values should not change.
                Once you assign a value to a <code>const</code>, attempting to reassign it will cause an error.
                This makes your code more predictable and easier to debug.
            </p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`const pi = 3.14159;
pi = 3.14; // ❌ Error! Constants cannot be reassigned`}
            </SyntaxHighlighter>
            <p className={styles.paragraph}>
                However, it's important to note that <code>const</code> does not make the value itself immutable.
                If the value is an object or array, its contents can still be changed.
            </p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`const user = { name: "Alice" };
user.name = "Bob"; // This is allowed`}
            </SyntaxHighlighter>

            <h2 className={styles.subheading}>Avoid Using <code>var</code></h2>
            <p className={styles.paragraph}>
                JavaScript originally used the <code>var</code> keyword, but it has quirks that can lead to bugs, especially related to scope.
                Nowadays, <code>let</code> and <code>const</code> are preferred and should be used in almost all situations.
            </p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`var count = 1; // Works, but avoid using var in modern code`}
            </SyntaxHighlighter>

            <h2 className={styles.subheading}>Best Practices</h2>
            <p className={styles.paragraph}>
                • Use <code>const</code> by default to prevent accidental changes.<br/>
                • Use <code>let</code> only when you need to reassign the variable.<br/>
                • Avoid using <code>var</code> unless you have a specific reason and understand its behavior.
            </p>

            <h2 className={styles.subheading}>Why Variables Matter</h2>
            <p className={styles.paragraph}>
                Variables are one of the most fundamental concepts in programming. They allow your programs to store information,
                make decisions, and remember results. Whether you're tracking the score in a game, storing user input,
                or managing complex data structures, variables make it possible.
            </p>

            <p className={styles.paragraph}>
                Understanding how to use variables effectively is the first step toward becoming a proficient JavaScript developer.
            </p>
            <div className={styles.buttonRow}>
                <button
                    className={styles.readButton}
                    onClick={handleMarkAsRead}
                >
                    {isRead ? "Mark as Unread" : "Mark Lesson as Read"}
                </button>

                <button className={styles.quizButton} onClick={() => setShowQuiz(!showQuiz)}>
                    {showQuiz ? 'Hide Quiz' : 'Take Quiz'}
                </button>
            </div>

            {showQuiz && (
                <QuizSection
                    courseId={courseId}
                    lessonId={lessonId}
                    questions={variablesQuiz}
                />
            )}
        </div>
    );
}
