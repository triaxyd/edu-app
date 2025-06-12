import React, { useState,useEffect} from 'react';
import { getDatabase, ref, get, update } from "firebase/database";
import styles from '@/styles/LessonContent.module.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import QuizSection from '@/components/Quiz/QuizSection';
import { functionsQuiz } from '@/data/courses/basics/quizzes/functionsQuiz';
import { markLessonAsRead } from '@/lib/dbUtils';
import { useAuth } from '@/context/authContext';

export default function FunctionsLesson({courseId, lessonId}) {
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
            <h1 className={styles.heading}>Functions in JavaScript</h1>
            <div className={styles.divider}></div>

            <h2 className={styles.subheading}>What is a Function?</h2>
            <p className={styles.paragraph}>
                A function is a reusable block of code designed to perform a specific task.
                Instead of repeating code, you can define it once inside a function and reuse it whenever needed.
                Functions help make your code modular, readable, and easier to maintain.
            </p>

            <h2 className={styles.subheading}>Declaring a Function</h2>
            <p className={styles.paragraph}>
                The most common way to create a function is by using the <code>function</code> keyword followed by a name,
                parentheses for parameters, and curly braces containing the code to run.
            </p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`function greet() {
    console.log("Hello!");
}`}
            </SyntaxHighlighter>
            <p className={styles.paragraph}>
                To use the function, you "call" it by using its name followed by parentheses:
            </p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`greet(); // Output: Hello!`}
            </SyntaxHighlighter>

            <h2 className={styles.subheading}>Function Parameters</h2>
            <p className={styles.paragraph}>
                Functions can accept values known as <strong>parameters</strong>. You can use them to pass data into a function.
            </p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`function greetUser(name) {
    console.log("Hello, " + name + "!");
}

greetUser("Alice"); // Output: Hello, Alice!`}
            </SyntaxHighlighter>

            <h2 className={styles.subheading}>Returning Values</h2>
            <p className={styles.paragraph}>
                Functions can return a value using the <code>return</code> statement.
                This lets the function output data back to the part of the program that called it.
            </p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`function add(a, b) {
    return a + b;
}

let result = add(3, 4); // result is 7`}
            </SyntaxHighlighter>

            <h2 className={styles.subheading}>Arrow Functions</h2>
            <p className={styles.paragraph}>
                ES6 introduced a more concise syntax called arrow functions. They work like regular functions but use the <code>=&gt;</code> syntax.
            </p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`const multiply = (x, y) => {
    return x * y;
};`}
            </SyntaxHighlighter>

            <h2 className={styles.subheading}>Best Practices</h2>
            <p className={styles.paragraph}>
                • Give functions clear, descriptive names<br/>
                • Keep them short and focused on a single task<br/>
                • Use parameters and return values to make them flexible<br/>
            </p>

            <p className={styles.paragraph}>
                Understanding functions is a major step forward in learning JavaScript, and they'll be used in almost every program you write.
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
                    courseId="basics"
                    lessonId="functions"
                    questions={functionsQuiz}
                />
            )}
        </div>
    );
}
