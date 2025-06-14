import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get, update } from "firebase/database";
import styles from '@/styles/LessonContent.module.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import QuizSection from '@/components/Quiz/QuizSection';
import { asyncQuiz } from '@/data/courses/advanced/quizzes/asyncQuiz';
import { useAuth } from '@/context/authContext';
import AsyncExtra from '@/components/ExtraContent/AsyncExtra';


export default function AsyncLesson({courseId, lessonId}) {
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
            <h1 className={styles.heading}>Asynchronous JavaScript & Promises</h1>
            <div className={styles.divider}></div>

            <h2 className={styles.subheading}>Why Asynchronous Code?</h2>
            <p className={styles.paragraph}>
                JavaScript runs in a single-threaded environment, meaning it can only do one thing at a time. If your code has to wait for something slow — like loading data from a server — everything else would freeze unless you handle it asynchronously.
            </p>

            <p className={styles.paragraph}>
                To keep things smooth and responsive, JavaScript allows certain operations (like fetching data) to happen in the background, while the rest of your code continues running. This is called **asynchronous programming**.
            </p>

            <h2 className={styles.subheading}>Using <code>setTimeout()</code></h2>
            <p className={styles.paragraph}>
                One of the simplest examples of asynchronous behavior is <code>setTimeout</code>, which runs a function after a delay.
            </p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`console.log("Start");

setTimeout(() => {
    console.log("This runs later");
}, 2000);

console.log("End");`}
            </SyntaxHighlighter>

            <p className={styles.paragraph}>
                Output:<br/>
                Start<br/>
                End<br/>
                This runs later
            </p>

            <h2 className={styles.subheading}>What Are Promises?</h2>
            <p className={styles.paragraph}>
                A <strong>Promise</strong> represents a value that may be available now, in the future, or never. It helps handle asynchronous operations like data fetching.
            </p>

            <p className={styles.paragraph}>
                A promise has three states:<br/>
                • pending<br/>
                • fulfilled<br/>
                • rejected
            </p>

            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Data loaded!");
    }, 1000);
});

promise.then((data) => {
    console.log(data);
});`}
            </SyntaxHighlighter>

            <h2 className={styles.subheading}>Chaining Promises</h2>
            <p className={styles.paragraph}>
                You can chain multiple <code>.then()</code> calls to handle a sequence of asynchronous steps.
            </p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`fetch("https://api.example.com/data")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Error:", error));`}
            </SyntaxHighlighter>

            <h2 className={styles.subheading}>Async/Await</h2>
            <p className={styles.paragraph}>
                <code>async</code> and <code>await</code> make your asynchronous code look like regular synchronous code. It improves readability and helps avoid "callback hell".
            </p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`async function getData() {
    try {
        const response = await fetch("https://api.example.com/data");
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error:", error);
    }
}

getData();`}
            </SyntaxHighlighter>

            <h2 className={styles.subheading}>Summary</h2>
            <p className={styles.paragraph}>
                • Use async patterns to prevent blocking the main thread<br/>
                • Promises provide cleaner async handling than callbacks<br/>
                • <code>async/await</code> makes code easier to read and maintain<br/>
                • Always handle errors with <code>.catch()</code> or <code>try/catch</code> blocks
            </p>

            <p className={styles.paragraph}>
                Mastering async code is essential for working with APIs, real-time apps, and smooth user experiences in JavaScript.
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
                        Score: {quizScore}%
                    </div>
                )}



            </div>
            {showExtra && <AsyncExtra difficultyLevel={levelForThisLesson} />}

            {showQuiz && (
                <QuizSection
                    courseId="advanced"
                    lessonId="async"
                    questions={asyncQuiz}
                    onScore={(newPercent) => setQuizScore(newPercent)}
                />

            )}

        </div>
    );
}
