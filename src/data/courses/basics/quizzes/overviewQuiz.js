export const basicsOverviewQuiz = [
    {
        id: 'q1',
        question: 'What keyword is used to define a function in JavaScript?',
        options: ['func', 'def', 'function', 'define'],
        answer: 2,
        explanation: 'The correct keyword is "function" to declare a function in JavaScript.',
    },
    {
        id: 'q2',
        question: 'Which loop is best when you know how many times to repeat?',
        options: ['while loop', 'do...while loop', 'for loop', 'if statement'],
        answer: 2,
        explanation: 'The "for loop" is best when the number of iterations is known.',
    },
    {
        id: 'q3',
        question: 'What does the === operator check?',
        options: ['Equality with type coercion', 'Assignment', 'Strict equality', 'Inequality'],
        answer: 2,
        explanation: 'The === operator checks both value and type.',
    },
    {
        id: 'q4',
        question: 'How do you call a function named "sayHello"?',
        options: ['sayHello', 'call sayHello()', 'sayHello()', 'function sayHello'],
        answer: 2,
        explanation: 'You call a function by using its name followed by parentheses: sayHello().',
    },
    {
        id: 'q5',
        question: 'Which of these is a correct way to loop through an array?',
        options: [
            'for (i in array)',
            'loop(array)',
            'for (let item of array)',
            'array.loop()'
        ],
        answer: 2,
        explanation: 'The "for...of" loop is commonly used to iterate through arrays in JavaScript.',
    },
    {
        id: 'q6',
        question: 'What is the result of: 5 === "5"?',
        options: ['true', 'false', 'undefined', 'error'],
        answer: 1,
        explanation: '5 is a number and "5" is a string, so === returns false due to strict comparison.',
    },
    {
        id: 'q7',
        question: 'What is a ternary operator?',
        options: [
            'A loop that runs three times',
            'A way to create three conditions',
            'A shorthand for if/else',
            'A function with three parameters'
        ],
        answer: 2,
        explanation: 'The ternary operator is a shorthand for simple if/else logic: condition ? a : b',
    },
];
