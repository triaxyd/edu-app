export const asyncQuiz = [
    {
        id: 'q1',
        question: 'What is the purpose of asynchronous programming in JavaScript?',
        options: [
            'To slow down code execution',
            'To run code on multiple threads',
            'To avoid blocking other operations while waiting',
            'To make JavaScript behave like Python'
        ],
        answer: 2,
        explanation: 'Asynchronous programming lets JavaScript perform tasks (like data fetching) without freezing the rest of the app.'
    },
    {
        id: 'q2',
        question: 'Which of these statements is true about Promises?',
        options: [
            'They replace all loops in JavaScript',
            'They allow blocking operations',
            'They represent a value that may be available in the future',
            'They cannot be chained'
        ],
        answer: 2,
        explanation: 'A Promise is a placeholder for a future value, often used for async operations like fetching data.'
    },
    {
        id: 'q3',
        question: 'What is the main benefit of using async/await?',
        options: [
            'It eliminates all errors in code',
            'It pauses the browser while waiting',
            'It makes async code look like regular code',
            'It speeds up network requests'
        ],
        answer: 2,
        explanation: 'Async/await improves readability by allowing async code to be written in a synchronous style.'
    }
];
