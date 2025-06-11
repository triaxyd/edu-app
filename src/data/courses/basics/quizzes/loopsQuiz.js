export const loopsQuiz = [
    {
        id: 'q1',
        question: 'What will this loop output?\n\n```javascript\nfor (let i = 0; i < 3; i++) {\n  console.log(i);\n}\n```',
        options: ['0 1 2', '1 2 3', '0 1 2 3', '0 1 2 3 4'],
        answer: 0,
        explanation: 'The loop runs while `i` is less than 3, so it prints 0, 1, and 2.'
    },
    {
        id: 'q2',
        question: 'Which loop guarantees at least one execution of its block?',
        options: ['for', 'while', 'do...while', 'for...of'],
        answer: 2,
        explanation: '`do...while` executes its block first before checking the condition, so it always runs at least once.'
    },
    {
        id: 'q3',
        question: 'What does the `continue` keyword do in a loop?',
        options: [
            'Stops the entire loop',
            'Skips the rest of the loop and exits',
            'Skips the current iteration and moves to the next one',
            'Repeats the current iteration'
        ],
        answer: 2,
        explanation: '`continue` skips to the next iteration without finishing the current loop block.'
    }
];
