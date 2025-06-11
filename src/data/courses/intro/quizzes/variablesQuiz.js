export const variablesQuiz = [
    {
        id: 'q1',
        question: 'Which keyword should you use for a variable whose value will not change?',
        options: ['let', 'const', 'var', 'static'],
        answer: 1,
        explanation: '"const" is used for variables whose values should not change.'
    },
    {
        id: 'q2',
        question: 'What happens if you try to reassign a variable declared with const?',
        options: [
            'It updates the value.',
            'It throws an error.',
            'It silently fails.',
            'It converts to a let.'
        ],
        answer: 1,
        explanation: 'Reassigning a const variable results in a runtime error.'
    },
    {
        id: 'q3',
        question: 'Why is using "var" generally discouraged in modern JavaScript?',
        options: [
            'It is slower than let and const.',
            'It does not work in modern browsers.',
            'It has function scope, which can lead to unexpected behavior.',
            'It does not support numbers.'
        ],
        answer: 2,
        explanation: '"var" is function-scoped and can cause bugs that are hard to debug.'
    }
];
