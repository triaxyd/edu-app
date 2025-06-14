import React from 'react';
import styles from '@/styles/LessonContent.module.css';

export default function DomExtra({ difficultyLevel }) {
    return (
        <div className={styles.questionBlock}>
            {difficultyLevel === 1 ? (
                <>
                    <h2 className={styles.subheading}>Beginner DOM Tips</h2>
                    <p className={styles.paragraph}>
                        DOM manipulation can feel new and magical at first — here’s how to grow your confidence:
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.paragraph}>Try changing the text of an element using <code>textContent</code>.</li>
                        <li className={styles.paragraph}>Use <code>console.log()</code> to inspect elements you select with <code>getElementById()</code>.</li>
                        <li className={styles.paragraph}>Don’t worry if <code>querySelector</code> feels complex — start with IDs or tags like <code>document.querySelector("p")</code>.</li>
                        <li className={styles.paragraph}>Practice by creating and removing elements dynamically to see how JavaScript reshapes the page!</li>
                    </ul>
                </>
            ) : (
                <>
                    <h2 className={styles.subheading}>Going Deeper with the DOM</h2>
                    <p className={styles.paragraph}>
                        You’ve got the basics — now refine your DOM skills with more advanced ideas:
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.paragraph}>Understand the DOM tree structure: each node is an object, and you can traverse parents, children, and siblings.</li>
                        <li className={styles.paragraph}>Use <code>event delegation</code> for efficiency when working with dynamically added elements.</li>
                        <li className={styles.paragraph}>Try <code>document.createDocumentFragment()</code> for batch DOM insertions without performance hiccups.</li>
                        <li className={styles.paragraph}>Combine the DOM with state and conditional rendering logic to build reactive UIs (a preview of frameworks like React!).</li>
                    </ul>
                    <p className={styles.paragraph}>
                        The DOM is your bridge between user interaction and application logic — the better you know it, the more powerful your apps become.
                    </p>
                </>
            )}
        </div>
    );
}
