// src/components/ExtraContent/VariablesExtra.jsx
import styles from '@/styles/LessonContent.module.css';

export default function VariablesExtra({ difficultyLevel }) {
    return (
        <div className={styles.questionBlock}>
            {difficultyLevel === 1 ? (
                <>
                    <h3 className={styles.subheading}>Extra Help: Understanding Variables</h3>
                    <p className={styles.paragraph}>
                        Think of a variable like a label on a box. You can put something inside the box (a number, a word, etc.) and use the label to refer to it later.
                        In JavaScript, variables help you remember and manage information as your code runs.
                    </p>
                    <p className={styles.paragraph}>
                        For example, if you want to remember a user’s name:
                    </p>
                    <p className={styles.codeBlock}>
                        <code>let userName = "Samantha";<br/>console.log(userName);</code>
                    </p>
                    <p className={styles.paragraph}>
                        Use <code>let</code> when the value might change, and <code>const</code> when it should stay the same.
                        If you're ever confused about which to use, start with <code>const</code>.
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.paragraph}>Variables hold all kinds of data: numbers, text, even whole lists!</li>
                        <li className={styles.paragraph}>Start small — try declaring and printing a few variables yourself.</li>
                        <li className={styles.paragraph}>Repetition is key to building confidence with this topic.</li>
                    </ul>
                </>
            ) : (
                <>
                    <h3 className={styles.subheading}>Deep Dive: Variable Nuances</h3>
                    <p className={styles.paragraph}>
                        Let’s look at how variable declarations affect memory, scoping, and behavior in your programs.
                        While <code>let</code> and <code>const</code> are block-scoped and predictable, <code>var</code> is function-scoped and hoisted — which can create subtle bugs.
                    </p>
                    <p className={styles.paragraph}>
                        Example of hoisting behavior:
                    </p>
                    <p className={styles.codeBlock}>
                        <code>
                            console.log(a); // undefined<br/>
                            var a = 5;
                        </code>
                    </p>
                    <p className={styles.paragraph}>
                        With <code>let</code> and <code>const</code>, trying to access the variable before its declaration results in a ReferenceError.
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.paragraph}>Understand the <strong>Temporal Dead Zone (TDZ)</strong> — the time between entering scope and declaration.</li>
                        <li className={styles.paragraph}>Use <code>const</code> for values that shouldn’t be reassigned, and <code>Object.freeze()</code> for immutability.</li>
                        <li className={styles.paragraph}>Explore best practices like naming conventions, avoiding global variables, and leveraging block scope in functions and loops.</li>
                    </ul>
                    <p className={styles.paragraph}>
                        As your programs grow, these nuances become critical in writing safe, maintainable code.
                    </p>
                </>
            )}
        </div>
    );
}
