// src/components/ExtraContent/ConditionsExtra.jsx
import React from 'react';
import styles from '@/styles/LessonContent.module.css';

export default function ConditionsExtra({ difficultyLevel }) {
    return (
        <div className={styles.questionBlock}>
            {difficultyLevel === 1 ? (
                <>
                    <h2 className={styles.subheading}>Extra Help: Breaking Down Conditionals</h2>
                    <p className={styles.paragraph}>
                        Struggling with how conditionals work? You're not alone — here’s how to think about them more clearly:
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.paragraph}>Think of <code>if</code> as a simple “yes or no” test for a condition.</li>
                        <li className={styles.paragraph}>Use <code>else</code> to handle what should happen when the answer is “no.”</li>
                        <li className={styles.paragraph}>You can chain multiple decisions using <code>else if</code>.</li>
                        <li className={styles.paragraph}>Try writing simple conditionals based on age, temperature, or login status.</li>
                    </ul>
                    <p className={styles.paragraph}>
                        Practice helps a lot — try making a “weather bot” that prints messages based on the weather or temperature.
                    </p>
                </>
            ) : (
                <>
                    <h2 className={styles.subheading}>Deep Dive: Smarter Use of Conditionals</h2>
                    <p className={styles.paragraph}>
                        Ready for more powerful logic? Here's how conditionals scale in real-world JS:
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.paragraph}>Refactor nested <code>if-else</code> statements into <code>switch</code> or object maps for clarity.</li>
                        <li className={styles.paragraph}>Combine conditions with logical operators to reduce duplication.</li>
                        <li className={styles.paragraph}>Use ternary chains carefully — they're best for quick assignments, not full logic trees.</li>
                        <li className={styles.paragraph}>Leverage optional chaining (<code>?.</code>) when checking values that may not exist.</li>
                    </ul>
                    <p className={styles.paragraph}>
                        Mastering conditionals will help you write more concise, expressive, and error-proof code.
                    </p>
                </>
            )}
        </div>
    );
}
