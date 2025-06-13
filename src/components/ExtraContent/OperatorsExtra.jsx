import React from 'react';
import styles from '@/styles/LessonContent.module.css';

export default function OperatorsExtra({ difficultyLevel }) {
    return (
        <div className={styles.questionBlock}>
            {difficultyLevel === 1 ? (
                <>
                    <h2 className={styles.subheading}> Extra Help: Making Sense of Operators</h2>
                    <p className={styles.paragraph}>
                        Still getting comfortable with operators? That’s okay — think of them as symbols that do work in your code.
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.paragraph}><strong>+</strong> adds numbers or joins strings like <code>"Hello " + "World"</code>.</li>
                        <li className={styles.paragraph}><strong>==</strong> compares values, but doesn’t care about type.</li>
                        <li className={styles.paragraph}><strong>===</strong> is stricter — it checks both value *and* type.</li>
                        <li className={styles.paragraph}><strong>||</strong> means “or” and gives you the first true value.</li>
                        <li className={styles.paragraph}><strong>&&</strong> means “and” — both sides must be true.</li>
                    </ul>
                    <p className={styles.paragraph}>
                        Try typing examples in the browser console to see what each one does. Play with combining conditions!
                    </p>
                </>
            ) : (
                <>
                    <h2 className={styles.subheading}> Deep Dive: Understanding Operator Behavior</h2>
                    <p className={styles.paragraph}>
                        You’re progressing well — let’s explore how JavaScript evaluates expressions more deeply:
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.paragraph}><strong>Short-circuiting</strong>: <code>true || anything</code> returns <code>true</code> immediately, <code>false && anything</code> returns <code>false</code>.</li>
                        <li className={styles.paragraph}><strong>Loose vs strict equality</strong>: Always prefer <code>===</code> over <code>==</code> to avoid unexpected coercion.</li>
                        <li className={styles.paragraph}>Assignment operators like <code>+=</code> are shorthand for writing cleaner, more concise logic.</li>
                        <li className={styles.paragraph}>Boolean values from expressions can drive conditional rendering in frameworks like React.</li>
                    </ul>
                    <p className={styles.paragraph}>
                        The more fluent you are with operators, the more readable and effective your code becomes.
                    </p>
                </>
            )}
        </div>
    );
}
