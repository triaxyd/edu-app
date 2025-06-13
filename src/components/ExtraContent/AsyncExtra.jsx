import React from 'react';
import styles from '@/styles/LessonContent.module.css';

export default function AsyncExtra({ difficultyLevel }) {
    return (
        <div className={styles.questionBlock}>
            {difficultyLevel === 1 ? (
                <>
                    <h2 className={styles.subheading}> Understanding Asynchronous Behavior</h2>
                    <p className={styles.paragraph}>
                        If you’re still getting comfortable with async code, try to focus on these mental models:
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.paragraph}>Think of <code>setTimeout()</code> like a kitchen timer — it won’t stop other cooking while it waits.</li>
                        <li className={styles.paragraph}>A <code>Promise</code> is like a package that hasn’t arrived yet. You use <code>.then()</code> to say what to do once it does.</li>
                        <li className={styles.paragraph}>With <code>async/await</code>, your code "waits" as if it were synchronous — but under the hood, it’s still non-blocking.</li>
                        <li className={styles.paragraph}>Use <code>console.log()</code> between lines to see what runs when. Timing is everything in async!</li>
                    </ul>
                </>
            ) : (
                <>
                    <h2 className={styles.subheading}>⚙ Mastering Async Control Flow</h2>
                    <p className={styles.paragraph}>
                        You’re ready to go deeper — here are some powerful ideas to keep in mind:
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.paragraph}>Understand the event loop: JavaScript tasks are queued and executed after the call stack is clear.</li>
                        <li className={styles.paragraph}>Avoid "callback hell" by always returning promises or using <code>await</code>.</li>
                        <li className={styles.paragraph}>Use <code>Promise.all()</code> to run multiple async tasks in parallel and wait for all of them.</li>
                        <li className={styles.paragraph}>Use <code>AbortController</code> with <code>fetch()</code> to cancel slow or unnecessary network calls.</li>
                    </ul>
                    <p className={styles.paragraph}>
                        Asynchronous design is key for real-time, scalable apps — take your time to experiment with delays and concurrency.
                    </p>
                </>
            )}
        </div>
    );
}
