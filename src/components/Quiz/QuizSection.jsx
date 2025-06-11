import { useState, useEffect  } from 'react';
import styles from '@/styles/QuizSection.module.css';
import {markLessonAsRead, saveLessonProgress} from '@/lib/dbUtils';

export default function QuizSection({ questions, courseId, lessonId }) {
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (qId, index) => {
        setAnswers(prev => ({ ...prev, [qId]: index }));
    };

    const getScore = () => {
        return questions.filter(q => answers[q.id] === q.answer).length;
    };

    useEffect(() => {
        if (submitted) {
            const score = getScore();
            const percent = Math.round((score / questions.length) * 100);
            saveLessonProgress(courseId, lessonId, { lesson_score: percent });
        }
    }, [submitted]);


    return (
        <div className={styles.quizContainer}>
            <h2 className={styles.quizHeading}>Lesson Quiz</h2>

            {questions.map(q => (
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
                <button className={styles.submitButton} onClick={() => setSubmitted(true)}>
                    Submit Answers
                </button>
            ) : (
                <div className={styles.resultBox}>
                    <p>Your Score: {getScore()} / {questions.length}</p>
                </div>
            )}
        </div>
    );

}
