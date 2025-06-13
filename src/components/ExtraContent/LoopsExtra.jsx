// src/components/ExtraContent/LoopsExtra.jsx
import React from 'react';
import styles from '@/styles/LessonContent.module.css';

export default function LoopsExtra({ difficultyLevel }) {
    return (
        <div className={styles.questionBlock}>
            {difficultyLevel === 1 ? (
                <>
                    <h2 className={styles.subheading}> Loops Made Simple</h2>
                    <p className={styles.paragraph}>
                        If loops feel confusing, here's how to break them down:
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.paragraph}>Think of a loop as a way to repeat something automatically.</li>
                        <li className={styles.paragraph}><code>for</code> loops are great when you know how many times to repeat.</li>
                        <li className={styles.paragraph}><code>while</code> loops are used when you're waiting for something to happen.</li>
                        <li className={styles.paragraph}>Try writing a loop that counts from 1 to 10 or lists all characters in a string!</li>
                    </ul>
                    <p className={styles.paragraph}>
                        You can even draw shapes or animations with loops once you get the hang of it.
                    </p>
                </>
            ) : (
                <>
                    <h2 className={styles.subheading}> Going Deeper with Loops</h2>
                    <p className={styles.paragraph}>
                        You're ready to start thinking about how loops interact with data and performance:
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.paragraph}>Use <code>forEach</code>, <code>map</code>, <code>filter</code>, and <code>reduce</code> to manipulate arrays in functional style.</li>
                        <li className={styles.paragraph}>Avoid mutating arrays inside loops if possible — prefer returning new arrays.</li>
                        <li className={styles.paragraph}>Be cautious of nested loops — they can slow performance if not optimized.</li>
                        <li className={styles.paragraph}>Leverage <code>break</code> and <code>continue</code> smartly to control flow.</li>
                    </ul>
                    <p className={styles.paragraph}>
                        Advanced looping patterns will help you write cleaner, faster, and more expressive code.
                    </p>
                </>
            )}
        </div>
    );
}
