// src/components/ExtraContent/TypesExtra.jsx
import React from 'react';
import styles from '@/styles/LessonContent.module.css';

export default function TypesExtra({ difficultyLevel }) {
    return (
        <div className={styles.questionBlock}>
            {difficultyLevel === 1 ? (
                <>
                    <h2 className={styles.subheading}>Extra Support: Understanding Data Types Better</h2>
                    <p className={styles.paragraph}>
                        Struggling to tell the difference between data types? No worries — this can take a little time to click.
                        Here's another way to understand them:
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.paragraph}><strong>Strings</strong> are words or sentences in quotes, like <code>"hello"</code>.</li>
                        <li className={styles.paragraph}><strong>Numbers</strong> are just that — values like <code>3</code>, <code>99.9</code>, or <code>-1</code>.</li>
                        <li className={styles.paragraph}><strong>Booleans</strong> are logic switches: <code>true</code> or <code>false</code>.</li>
                        <li className={styles.paragraph}><strong>Null</strong> means "nothing here" — like an empty box you planned to fill later.</li>
                        <li className={styles.paragraph}><strong>Undefined</strong> is when a box exists but hasn't been opened or used yet.</li>
                    </ul>
                    <p className={styles.paragraph}>
                        Try logging each one with <code>console.log(typeof value)</code> to see how JavaScript views them!
                    </p>
                </>
            ) : (
                <>
                    <h2 className={styles.subheading}>Deep Dive: Type Nuances in JavaScript</h2>
                    <p className={styles.paragraph}>
                        Now that you're comfortable with the basics, let's level up your understanding of data types.
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.paragraph}><strong>Dynamic typing</strong>: JavaScript variables can change type — <code>let x = 5; x = "hi"</code> is valid!</li>
                        <li className={styles.paragraph}><strong>Falsy values</strong>: <code>false, 0, "", null, undefined, NaN</code> all evaluate as "falsey" in conditions.</li>
                        <li className={styles.paragraph}><strong>typeof null</strong> returns <code>"object"</code> — this is a bug in the language, but now it’s part of the spec.</li>
                        <li className={styles.paragraph}>Use <code>Array.isArray()</code> to distinguish arrays from generic objects.</li>
                    </ul>
                    <p className={styles.paragraph}>
                        For serious projects, understanding these subtleties helps you avoid type-related bugs and write safer code.
                    </p>
                </>
            )}
        </div>
    );
}
