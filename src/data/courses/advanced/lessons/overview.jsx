'use client';
import React, { useState, useEffect } from 'react';
import styles from '@/styles/LessonContent.module.css';
import { useAuth } from '@/context/authContext';
import { advancedOverviewQuiz } from '@/data/courses/advanced/quizzes/overviewQuiz';
import { saveCumulativeScore } from '@/lib/dbUtils';
import {get, getDatabase, ref} from "firebase/database";

export default function AdvancedOverview() {
    const { user } = useAuth();
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [lastScore, setLastScore] = useState(null);

    const handleChange = (qId, index) => {
        setAnswers((prev) => ({ ...prev, [qId]: index }));
    };

    const getScore = () => {
        return advancedOverviewQuiz.filter(q => answers[q.id] === q.answer).length;
    };

    useEffect(() => {
        if (submitted && user) {
            const raw = getScore();
            const percent = Math.round((raw / advancedOverviewQuiz.length) * 100);
            setScore(percent);
            saveCumulativeScore("advanced", user.uid, percent);
        }
    }, [submitted, user]);
    useEffect(() => {
        if (!user) return;

        const fetchLastScore = async () => {
            const db = getDatabase();
            const path = `users/${user.uid}/courses/advanced/cumulative_score`;
            const snapshot = await get(ref(db, path));
            if (snapshot.exists()) {
                const savedScore = snapshot.val();
                if (typeof savedScore === 'number' && savedScore > 0) {
                    setLastScore(savedScore);
                }
            }
        };

        fetchLastScore();
    }, [user]);

    return (
        <div className={styles.lessonContainer}>
            <h1 className={styles.heading}>Final Review: Advanced JavaScript</h1>
            {lastScore !== null && (
                <h2 className={styles.subheadingOverview}>Last Score: {lastScore}%</h2>
            )}
            <div className={styles.divider}></div>
            <p className={styles.paragraph}>
                Complete this final quiz to test your understanding of asynchronous programming, the DOM, and object-oriented concepts in JavaScript.
            </p>

            {advancedOverviewQuiz.map((q) => (
                <div key={q.id} className={styles.questionBlock}>
                    <p className={styles.question}>{q.question}</p>
                    {q.options.map((opt, i) => {
                        const isSelected = answers[q.id] === i;
                        const isCorrect = q.answer === i;
                        const isWrong = isSelected && i !== q.answer;

                        return (
                            <label
                                key={i}
                                className={`${styles.option} ${
                                    submitted && isCorrect ? styles.correct :
                                        submitted && isWrong ? styles.incorrect : ''
                                }`}
                            >
                                <input
                                    type="radio"
                                    name={`q-${q.id}`}
                                    value={i}
                                    disabled={submitted}
                                    checked={isSelected}
                                    onChange={() => handleChange(q.id, i)}
                                />
                                {opt}
                            </label>
                        );
                    })}
                    {submitted && answers[q.id] !== q.answer && (
                        <p className={styles.explanation}>❌ {q.explanation}</p>
                    )}
                </div>
            ))}

            {!submitted ? (
                <button className={styles.quizButton} onClick={() => setSubmitted(true)}>
                    Submit Answers
                </button>
            ) : (
                <div className={styles.resultBox}>
                    <p>Your Score: {score}%</p>
                </div>
            )}
        </div>
    );
}
