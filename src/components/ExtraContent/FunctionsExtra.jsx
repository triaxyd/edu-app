import React from 'react';
import styles from '@/styles/LessonContent.module.css';

export default function FunctionsExtra({difficultyLevel}) {
    return (
        <div className={styles.questionBlock}>
            {difficultyLevel === 1 ? (
                <>
                    <h2 className={styles.subheading}>Extra Help: Understanding Functions</h2>
                    <p className={styles.paragraph}>
                        Still wrapping your head around functions? Let’s break it down:
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.paragraph}>A <strong>function</strong> is like a recipe — it tells the
                            computer what to do when you run it.
                        </li>
                        <li className={styles.paragraph}>You define it once, and then you can run it as many times as
                            you want using its name.
                        </li>
                        <li className={styles.paragraph}>Parameters are like ingredients — you send them into the
                            function so it knows what to work with.
                        </li>
                        <li className={styles.paragraph}>Use <code>return</code> when you want the function to send a
                            result back to you.
                        </li>
                    </ul>
                    <p className={styles.paragraph}>
                        Practice writing tiny functions that greet someone or do simple math — you’ll get more confident
                        with each one!
                    </p>
                </>
            ) : (
                <>
                    <h2 className={styles.subheading}>Deep Dive: Power of Functions in JavaScript</h2>
                    <p className={styles.paragraph}>
                        Now that you’ve got the basics, let’s explore deeper:
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.paragraph}>Functions in JS are <strong>first-class citizens</strong> — you
                            can pass them as arguments, store them in variables, and return them from other functions.
                        </li>
                        <li className={styles.paragraph}>Arrow functions have no <code>this</code> binding, making them
                            ideal for callbacks but not constructors.
                        </li>
                        <li className={styles.paragraph}>Avoid side effects when possible — functions should do one
                            thing and return results without changing external state.
                        </li>
                    </ul>
                    <p className={styles.paragraph}>
                        Understanding functions deeply will help you write clean, testable, and scalable JavaScript as
                        you build larger applications.
                    </p>
                </>
            )}
        </div>
    );
}
