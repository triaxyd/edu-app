import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get, update } from "firebase/database";
import styles from '@/styles/LessonContent.module.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import QuizSection from '@/components/Quiz/QuizSection';
import { domQuiz } from '@/data/courses/advanced/quizzes/domQuiz';
import DomExtra from '@/components/ExtraContent/DomExtra';
import { useAuth } from '@/context/authContext';

export default function DomLesson({courseId, lessonId}) {
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

    const levelForThisLesson = quizScore > 67 ? 2 : 1;   //  deep-dive if ≥ 67 %

    return (
        <div className={styles.lessonContainer}>
            <h1 className={styles.heading}>The DOM (Document Object Model)</h1>
            <div className={styles.divider}></div>

            <h2 className={styles.subheading}>What is the DOM?</h2>
            <p className={styles.paragraph}>
                The DOM stands for the <strong>Document Object Model</strong>. It is a programming interface that represents the structure of a web page.
                When a browser loads a webpage, it creates a DOM — a tree-like structure — where each element becomes an object that can be accessed and manipulated using JavaScript.
            </p>

            <p className={styles.paragraph}>
                Think of the DOM as a live map of the webpage that JavaScript can read, change, add to, or delete from.
            </p>

            <h2 className={styles.subheading}>Accessing Elements</h2>
            <p className={styles.paragraph}>
                JavaScript provides several ways to select and interact with elements in the DOM. The most common methods include:
            </p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`// Select element by ID
const title = document.getElementById("main-title");

// Select elements by class name
const items = document.getElementsByClassName("item");

// Select elements using a CSS selector
const firstButton = document.querySelector("button");`}
            </SyntaxHighlighter>

            <h2 className={styles.subheading}>Changing Content and Attributes</h2>
            <p className={styles.paragraph}>
                Once you've selected an element, you can modify its content or attributes using JavaScript.
            </p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`// Change the text inside an element
title.textContent = "Welcome to the DOM!";

// Change the HTML inside an element
title.innerHTML = "<strong>Bold Title</strong>";

// Change an attribute (like image source)
document.querySelector("img").src = "new-image.jpg";`}
            </SyntaxHighlighter>

            <h2 className={styles.subheading}>Creating and Removing Elements</h2>
            <p className={styles.paragraph}>
                You can also create new elements or remove existing ones from the DOM.
            </p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`// Create a new paragraph element
const newPara = document.createElement("p");
newPara.textContent = "This was added with JavaScript";

// Add it to the page
document.body.appendChild(newPara);

// Remove an element
const removeMe = document.getElementById("remove-this");
removeMe.remove();`}
            </SyntaxHighlighter>

            <h2 className={styles.subheading}>Responding to Events</h2>
            <p className={styles.paragraph}>
                The DOM lets you make pages interactive by responding to user actions with <strong>event listeners</strong>.
            </p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`const button = document.querySelector("button");

button.addEventListener("click", () => {
    alert("Button clicked!");
});`}
            </SyntaxHighlighter>

            <h2 className={styles.subheading}>Why the DOM Matters</h2>
            <p className={styles.paragraph}>
                The DOM is what allows JavaScript to bring web pages to life. Every button click, form input, or dynamic content change happens through DOM manipulation.
            </p>

            <p className={styles.paragraph}>
                Mastering the DOM is essential for building modern, interactive web applications.
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
            {showExtra && <DomExtra difficultyLevel={levelForThisLesson} />}

            {showQuiz && (
                <QuizSection
                    courseId="advanced"
                    lessonId="dom"
                    questions={domQuiz}
                    onScore={(newPercent) => setQuizScore(newPercent)}
                />

            )}

        </div>
    );
}
