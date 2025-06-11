// src/utils/defaultUserData.js
export const defaultUserData = {
    difficulty_level: 1,
    badges: [],
    stats: {
        average_score: 0,
        quizzes_taken: 0,
    },
    courses: {
        intro: {
            variables: { lesson_score: 0, lesson_read: false },
            types: { lesson_score: 0, lesson_read: false },
            operators: { lesson_score: 0, lesson_read: false },
            cumulative_test_score: 0,
        },
        basics: {
            functions: { lesson_score: 0, lesson_read: false },
            conditions: { lesson_score: 0, lesson_read: false },
            loops: { lesson_score: 0, lesson_read: false },
            cumulative_test_score: 0,
        },
        advanced: {
            async: { lesson_score: 0, lesson_read: false },
            dom: { lesson_score: 0, lesson_read: false },
            oop: { lesson_score: 0, lesson_read: false },
            cumulative_test_score: 0,
        },
    },
};
