import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get, update } from "firebase/database";
import styles from '@/styles/LessonContent.module.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import QuizSection from "@/components/Quiz/QuizSection";
import {introToJsQuiz} from "@/data/courses/intro/quizzes/introQuiz";
import {markLessonAsRead} from "@/lib/dbUtils";
import {useAuth} from "@/context/authContext";

export default function IntroToJsLesson({courseId, lessonId}) {
    const { user } = useAuth();
    const [showQuiz, setShowQuiz] = useState(false);
    const [isRead, setIsRead] = useState(false);
    useEffect(() => {
        if (!user) return;

        const fetchStatus = async () => {
            const db = getDatabase();
            const path = `users/${user.uid}/courses/${courseId}/${lessonId}`;
            const snapshot = await get(ref(db, path));
            if (snapshot.exists()) {
                setIsRead(!!snapshot.val().lesson_read);
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
    return (
        <div className={styles.lessonContainer}>
            <h1 className={styles.heading}>Introduction to JavaScript</h1>
            <div className={styles.divider}></div>

            <h2 className={styles.subheading}>What is JavaScript?</h2>
            <p className={styles.paragraph}>
                JavaScript is a <strong>programming language</strong> that allows you to make web pages interactive. It runs directly in your browser and
                lets websites respond to user actions, update content dynamically, validate forms, and much more.
                Alongside HTML and CSS, JavaScript is one of the core technologies of the web.
            </p>

            <h2 className={styles.subheading}>Why Learn JavaScript?</h2>
            <p className={styles.paragraph}>
                JavaScript is everywhere. It powers everything from simple websites to complex web applications. It's supported by all major browsers,
                and learning it opens doors to a wide range of fields like frontend development, backend APIs with Node.js, mobile apps, and even games.
            </p>
            <p className={styles.paragraph}>
                <strong>If you know JavaScript, you can:</strong>
            </p>
            <p className={styles.paragraph}>
                <strong>
                •  Build interactive websites<br/>
                •  Create mobile applications<br/>
                •  Develop desktop software<br/>
                •  Work with backend services using Node.js<br/>
                </strong>
            </p>

            <h2 className={styles.subheading}>Where Does JavaScript Run?</h2>
            <p className={styles.paragraph}>
                Originally, JavaScript was only run inside web browsers. But now, thanks to environments like <code>Node.js</code>,
                it can also run outside the browser, on servers or even command-line tools.
            </p>
            <p className={styles.paragraph}>
                That said, most of the time, when you're building a website, your JavaScript will run directly in the browser,
                responding to events like button clicks or page loads.
            </p>

            <h2 className={styles.subheading}>JavaScript + HTML/CSS</h2>
            <p className={styles.paragraph}>
                JavaScript works hand-in-hand with HTML and CSS:
            </p>
            <p className={styles.paragraph}>
                •  <strong>HTML</strong> provides the structure of the web page<br/>
                •  <strong>CSS</strong> provides the styling<br/>
                •  <strong>JavaScript</strong> adds interactivity and logic<br/>
            </p>
            <p className={styles.paragraph}>
                For example, JavaScript can change the content of a web page without needing to reload it, something HTML and CSS can't do alone.
            </p>

            <h2 className={styles.subheading}>Your First Line of Code</h2>
            <p className={styles.paragraph}>
                Let’s start with a very simple example: displaying a message with <code>alert()</code>.
                This pops up a dialog box in the browser.
            </p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`alert("Welcome to JavaScript!");`}
            </SyntaxHighlighter>

            <p className={styles.paragraph}>
                Or try logging something in the browser's developer console using <code>console.log()</code>:
            </p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`console.log("Hello from JavaScript!");`}
            </SyntaxHighlighter>

            <p className={styles.paragraph}>
                To try it yourself, right-click on any web page, choose <strong>Inspect</strong>, go to the <strong>Console</strong> tab,
                and paste the code in!
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
                    {showQuiz ? 'Hide Quiz' : 'Take Quiz'}
                </button>
            </div>

            {showQuiz && <QuizSection courseId={courseId} lessonId={lessonId} questions={introToJsQuiz} />}

        </div>
    );
}
