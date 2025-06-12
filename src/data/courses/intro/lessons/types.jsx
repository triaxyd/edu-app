import React, { useState, useEffect } from 'react';
import styles from '@/styles/LessonContent.module.css';
import { getDatabase, ref, get, update } from "firebase/database";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import QuizSection from '@/components/Quiz/QuizSection';
import { dataTypesQuiz } from '@/data/courses/intro/quizzes/dataTypesQuiz';
import { markLessonAsRead } from '@/lib/dbUtils';
import { useAuth } from '@/context/authContext';

export default function DataTypesLesson({courseId, lessonId}) {
    const { user } = useAuth();
    const [showQuiz, setShowQuiz] = useState(false);
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
            <h1 className={styles.heading}>Data Types</h1>
            <div className={styles.divider}></div>

            <h2 className={styles.subheading}>What is a Data Type?</h2>
            <p className={styles.paragraph}>
                A <strong>data type</strong> defines the kind of value a variable can hold. It determines how the value behaves and what operations
                can be performed on it. In JavaScript, data types are dynamic — the same variable can hold different types of values at different times.
            </p>

            <h2 className={styles.subheading}>Primitive Data Types</h2>
            <p className={styles.paragraph}>
                JavaScript includes several <strong>primitive</strong> (basic) data types:
            </p>
            <p className={styles.paragraph}>
                •  <strong>Number</strong>: for all numbers, including decimals<br/>
                •  <strong>String</strong>: text enclosed in quotes<br/>
                •  <strong>Boolean</strong>: either <code>true</code> or <code>false</code><br/>
                •  <strong>Null</strong>: an intentional absence of a value<br/>
                • ️ <strong>Undefined</strong>: a variable that has been declared but not assigned<br/>
            </p>

            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`let age = 30;             // Number
let name = "Alice";        // String
let isLoggedIn = true;     // Boolean
let user = null;           // Null
let score;                 // Undefined`}
            </SyntaxHighlighter>

            <h2 className={styles.subheading}>Objects and Arrays</h2>
            <p className={styles.paragraph}>
                In addition to primitives, JavaScript also supports **complex data types**:
            </p>
            <p className={styles.paragraph}>
                •  <strong>Objects</strong>: collections of key-value pairs<br/>
                •  <strong>Arrays</strong>: ordered lists of values<br/>
            </p>

            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`let person = {
  name: "Alice",
  age: 25,
  isStudent: true
};

let colors = ["red", "green", "blue"];`}
            </SyntaxHighlighter>

            <h2 className={styles.subheading}>Type Checking</h2>
            <p className={styles.paragraph}>
                You can check the type of a variable using the <code>typeof</code> operator:
            </p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`typeof "hello";    // "string"
typeof 123;         // "number"
typeof true;        // "boolean"
typeof undefined;   // "undefined"
typeof null;        // "object" ← this is a well-known JavaScript quirk!`}
            </SyntaxHighlighter>

            <h2 className={styles.subheading}>Why It Matters</h2>
            <p className={styles.paragraph}>
                Understanding data types helps you write predictable, bug-free code. It’s the foundation for making decisions, validating data,
                looping through collections, and structuring programs effectively.
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
                    courseId="intro"
                    lessonId="types"
                    questions={dataTypesQuiz}
                />
            )}
        </div>

    );
}
