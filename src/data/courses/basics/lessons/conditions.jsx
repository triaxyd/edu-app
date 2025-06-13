import React, {useState, useEffect} from 'react';
import { getDatabase, ref, get, update } from "firebase/database";
import styles from '@/styles/LessonContent.module.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import QuizSection from '@/components/Quiz/QuizSection';
import { conditionsQuiz } from '@/data/courses/basics/quizzes/conditionsQuiz';
import ConditionsExtra from '@/components/ExtraContent/ConditionsExtra';
import { setCourseDifficulty } from '@/lib/adaptiveLearning';
import { useAuth } from '@/context/authContext';

export default function ConditionsLesson({courseId, lessonId}) {
    const { user } = useAuth();
    const [showQuiz, setShowQuiz] = useState(false);
    const [isRead, setIsRead] = useState(false);
    const [quizScore, setQuizScore] = useState(null);
    const [difficultyLevel, setDifficultyLevel] = useState(1);
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

    useEffect(() => {
        if (!user) return;

        const fetchDifficulty = async () => {
            const db = getDatabase();
            const path = `users/${user.uid}/difficulty_level`;
            const snapshot = await get(ref(db, path));

            if (snapshot.exists()) {
                const level = snapshot.val();
                if (typeof level === 'number') {
                    setDifficultyLevel(level);
                }
            }
        };

        fetchDifficulty();
    }, [user]);

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


    return (
        <div className={styles.lessonContainer}>
            <h1 className={styles.heading}>Conditionals in JavaScript</h1>
            <div className={styles.divider}></div>

            <h2 className={styles.subheading}>What Are Conditionals?</h2>
            <p className={styles.paragraph}>
                Conditionals allow your program to make decisions based on certain conditions.
                By using <code>if</code> statements, your code can run different blocks of logic depending on whether something is true or false.
            </p>

            <h2 className={styles.subheading}>Using <code>if</code> Statements</h2>
            <p className={styles.paragraph}>
                The most basic conditional is the <code>if</code> statement. If the condition inside the parentheses is true, the block of code runs.
            </p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`let age = 18;

if (age >= 18) {
    console.log("You are an adult.");
}`}
            </SyntaxHighlighter>

            <h2 className={styles.subheading}>Adding <code>else</code></h2>
            <p className={styles.paragraph}>
                You can extend the <code>if</code> statement using <code>else</code> to run code when the condition is false.
            </p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`let isRaining = false;

if (isRaining) {
    console.log("Take an umbrella.");
} else {
    console.log("No umbrella needed.");
}`}
            </SyntaxHighlighter>

            <h2 className={styles.subheading}>Using <code>else if</code></h2>
            <p className={styles.paragraph}>
                When you want to test multiple conditions, you can chain them using <code>else if</code>.
            </p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`let score = 85;

if (score >= 90) {
    console.log("Grade: A");
} else if (score >= 75) {
    console.log("Grade: B");
} else {
    console.log("Grade: C");
}`}
            </SyntaxHighlighter>

            <h2 className={styles.subheading}>Logical Operators</h2>
            <p className={styles.paragraph}>
                You can combine conditions using logical operators:
            </p>
            <p className={styles.paragraph}>
                • <code>&&</code> (AND) — true if both conditions are true<br/>
                • <code>||</code> (OR) — true if at least one condition is true<br/>
                • <code>!</code> (NOT) — reverses the truth value<br/>
            </p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`let loggedIn = true;
let hasPermission = false;

if (loggedIn && hasPermission) {
    console.log("Access granted.");
} else {
    console.log("Access denied.");
}`}
            </SyntaxHighlighter>

            <h2 className={styles.subheading}>Ternary Operator</h2>
            <p className={styles.paragraph}>
                A shorter way to write simple if-else logic is with the ternary operator: <code>condition ? valueIfTrue : valueIfFalse</code>
            </p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`let age = 16;
let message = age >= 18 ? "Adult" : "Minor";
console.log(message);`}
            </SyntaxHighlighter>

            <h2 className={styles.subheading}>Best Practices</h2>
            <p className={styles.paragraph}>
                • Keep conditions simple and readable<br/>
                • Avoid deeply nested if-else structures<br/>
                • Use strict equality (<code>===</code>) to avoid type conversion issues<br/>
            </p>

            <p className={styles.paragraph}>
                Conditionals are the foundation of logic in your programs. They allow you to write dynamic and responsive code that behaves differently based on inputs, user actions, or data.
            </p>
            <div className={styles.buttonRow}>
                <button
                    className={styles.readButton}
                    onClick={handleMarkAsRead}
                >
                    {isRead ? "Mark as Unread" : "Mark Lesson as Read"}
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
                <button
                    className={styles.moreButton}
                    onClick={() => setShowExtra(!showExtra)}
                >
                    {showExtra ? 'Hide Extra Content' : 'See More'}
                </button>


            </div>
            {showExtra && <ConditionsExtra difficultyLevel={difficultyLevel} />}

            {showQuiz && (
                <QuizSection
                    courseId="basics"
                    lessonId="conditions"
                    questions={conditionsQuiz}
                    onScore={async () => {
                        if (user) {
                            const newLevel = await setCourseDifficulty(user.uid, courseId);
                            setDifficultyLevel(newLevel);
                        }
                    }}
                />

            )}

        </div>
    );
}
