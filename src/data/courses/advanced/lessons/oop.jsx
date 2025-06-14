import React, { useState, useEffect} from 'react';
import { getDatabase, ref, get, update } from "firebase/database";
import styles from '@/styles/LessonContent.module.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import QuizSection from '@/components/Quiz/QuizSection';
import { oopQuiz } from '@/data/courses/advanced/quizzes/oopQuiz';
import { useAuth } from '@/context/authContext';
import OopExtra from '@/components/ExtraContent/OopExtra';


export default function OOPLesson({courseId, lessonId}) {
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
            <h1 className={styles.heading}>Object-Oriented Programming (OOP)</h1>
            <div className={styles.divider}></div>

            <h2 className={styles.subheading}>What is OOP?</h2>
            <p className={styles.paragraph}>
                Object-Oriented Programming (OOP) is a programming paradigm centered around the concept of <strong>objects</strong>.
                Objects represent real-world things and group related data and behaviors together in one place.
            </p>
            <p className={styles.paragraph}>
                OOP promotes code organization, reusability, and modularity by encapsulating logic and state inside objects and classes.
            </p>

            <h2 className={styles.subheading}>Objects in JavaScript</h2>
            <p className={styles.paragraph}>
                An object in JavaScript is a collection of key-value pairs. It can hold properties (data) and methods (functions).
            </p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`const car = {
  brand: "Toyota",
  model: "Corolla",
  start: function () {
    console.log("Engine started");
  }
};

car.start(); // Output: Engine started`}
            </SyntaxHighlighter>

            <h2 className={styles.subheading}>Creating Classes</h2>
            <p className={styles.paragraph}>
                Classes are templates for creating objects. JavaScript introduced the <code>class</code> syntax in ES6, providing a cleaner and more structured way to define object blueprints.
            </p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(\`\${this.name} makes a sound\`);
  }
}

const dog = new Animal("Buddy");
dog.speak(); // Output: Buddy makes a sound`}
            </SyntaxHighlighter>

            <h2 className={styles.subheading}>Inheritance</h2>
            <p className={styles.paragraph}>
                Inheritance allows a class to use methods and properties from another class. This enables you to build specialized classes based on generic ones.
            </p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`class Dog extends Animal {
  speak() {
    console.log(\`\${this.name} barks\`);
  }
}

const max = new Dog("Max");
max.speak(); // Output: Max barks`}
            </SyntaxHighlighter>

            <h2 className={styles.subheading}>Encapsulation</h2>
            <p className={styles.paragraph}>
                Encapsulation is the practice of keeping data and methods that operate on that data bundled together. It also includes restricting direct access to some components (like using private fields).
            </p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`class Counter {
  #count = 0; // private field

  increment() {
    this.#count++;
    console.log(this.#count);
  }
}

const counter = new Counter();
counter.increment(); // Output: 1
// counter.#count;  Error: Private field '#count' must be declared in an enclosing class`}
            </SyntaxHighlighter>

            <h2 className={styles.subheading}>Why Use OOP?</h2>
            <p className={styles.paragraph}>
                • Helps organize code logically around real-world entities<br/>
                • Encourages reuse through inheritance and modular design<br/>
                • Makes code easier to maintain and scale
            </p>

            <p className={styles.paragraph}>
                While JavaScript supports multiple paradigms, learning OOP is crucial for writing clean, maintainable code in large applications.
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
            {showExtra && <OopExtra difficultyLevel={levelForThisLesson} />}

            {showQuiz && (
                <QuizSection
                    courseId="advanced"
                    lessonId="oop"
                    questions={oopQuiz}
                    onScore={(newPercent) => setQuizScore(newPercent)}
                />

            )}

        </div>
    );
}
