export const advancedOverviewQuiz = [
    {
        id: 'q1',
        question: 'What does asynchronous code help with in JavaScript?',
        options: [
            'Running faster than synchronous code',
            'Preventing the browser from freezing',
            'Reducing memory usage',
            'Compiling code to machine language'
        ],
        answer: 1,
        explanation: 'Asynchronous code helps prevent the main thread from blocking, keeping the app responsive.',
    },
    {
        id: 'q2',
        question: 'Which method is used to handle a successful Promise?',
        options: ['await()', 'done()', 'then()', 'success()'],
        answer: 2,
        explanation: 'Promises use `.then()` to handle resolved values.',
    },
    {
        id: 'q3',
        question: 'What does DOM stand for?',
        options: [
            'Document Output Manager',
            'Dynamic Object Module',
            'Data Object Mapping',
            'Document Object Model'
        ],
        answer: 3,
        explanation: 'DOM stands for Document Object Model — a programming interface for HTML documents.',
    },
    {
        id: 'q4',
        question: 'Which method adds a click handler to a button in the DOM?',
        options: [
            'button.onClickHandler()',
            'button.addListener()',
            'addEventListener("click")',
            'bindClick()'
        ],
        answer: 2,
        explanation: 'Use `addEventListener("click", ...)` to attach event handlers.',
    },
    {
        id: 'q5',
        question: 'What keyword creates a class in JavaScript?',
        options: ['object', 'class', 'new', 'prototype'],
        answer: 1,
        explanation: 'The `class` keyword is used to define classes in JavaScript.',
    },
    {
        id: 'q6',
        question: 'What is encapsulation in OOP?',
        options: [
            'Inheriting properties from a parent class',
            'Combining logic and data together inside an object',
            'Creating multiple instances of a class',
            'Sharing methods across all classes'
        ],
        answer: 1,
        explanation: 'Encapsulation refers to bundling data and logic together, and hiding internal details.',
    },
    {
        id: 'q7',
        question: 'What will `async` and `await` help you avoid?',
        options: [
            'Long lines of code',
            'Callback hell',
            'Using too many variables',
            'Global scope pollution'
        ],
        answer: 1,
        explanation: '`async/await` simplifies promise chaining and avoids deeply nested callbacks.',
    },
];
