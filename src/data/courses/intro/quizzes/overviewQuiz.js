export const introOverviewQuiz = [
    {
        id: 'q1',
        question: 'What is a variable in JavaScript?',
        options: [
            'A fixed value that cannot be changed',
            'A container for storing data values',
            'A keyword to define functions',
            'An error type'
        ],
        answer: 1,
        explanation: 'A variable is used to store data values for later use in the program.'
    },
    {
        id: 'q2',
        question: 'Which keyword is used to declare a constant variable?',
        options: ['let', 'var', 'const', 'define'],
        answer: 2,
        explanation: 'Use `const` to declare a variable that cannot be reassigned.'
    },
    {
        id: 'q3',
        question: 'What will `typeof null` return?',
        options: ['null', 'undefined', 'object', 'false'],
        answer: 2,
        explanation: '`typeof null` is a known JavaScript quirk that returns "object".'
    },
    {
        id: 'q4',
        question: 'Which function call will return 25 if passed the number 5?',
        options: ['square(5)', 'multiply(5)', 'return 5 * 2', 'return 5 * 5'],
        answer: 3,
        explanation: 'Multiplying 5 * 5 returns 25.'
    },
    {
        id: 'q5',
        question: 'Which method is used to attach a click event in the DOM?',
        options: [
            'onClick()',
            'clickEvent()',
            'addEventListener()',
            'handleClick()'
        ],
        answer: 2,
        explanation: '`addEventListener("click", callback)` is the correct way.'
    }
];
