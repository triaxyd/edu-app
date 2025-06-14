import React from 'react';
import styles from '@/styles/LessonContent.module.css';

export default function OopExtra({ difficultyLevel }) {
    return (
        <div className={styles.questionBlock}>
            {difficultyLevel === 1 ? (
                <>
                    <h2 className={styles.subheading}>Beginner OOP Tips</h2>
                    <p className={styles.paragraph}>
                        Object-Oriented Programming might seem intimidating at first — here are some simple ways to get started:
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.paragraph}>Think of objects like “real-world things” with properties and actions.</li>
                        <li className={styles.paragraph}>Use objects to group related data (like a `car` with `brand` and `model`).</li>
                        <li className={styles.paragraph}>Try creating a few simple classes using <code>constructor()</code> and calling methods on them.</li>
                        <li className={styles.paragraph}>Use <code>console.log(this)</code> inside class methods to explore what <code>this</code> refers to.</li>
                    </ul>
                </>
            ) : (
                <>
                    <h2 className={styles.subheading}>Deepen Your OOP Mastery</h2>
                    <p className={styles.paragraph}>
                        Already comfortable with classes? Level up your OOP with these advanced insights:
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.paragraph}>Understand prototype chains and how JavaScript handles inheritance under the hood.</li>
                        <li className={styles.paragraph}>Explore <code>super()</code> and how it links subclass constructors to the parent.</li>
                        <li className={styles.paragraph}>Use private class fields (like <code>#count</code>) to enforce encapsulation.</li>
                        <li className={styles.paragraph}>Try refactoring a procedural program to use objects and classes for modularity.</li>
                    </ul>
                    <p className={styles.paragraph}>
                        Mastering OOP will set you up to write large-scale, maintainable code and contribute to real-world production projects.
                    </p>
                </>
            )}
        </div>
    );
}
