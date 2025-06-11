export const conditionsQuiz = [
    {
        id: 'q1',
        question: 'What will this code output?\n\n```javascript\nlet age = 20;\nif (age < 18) {\n  console.log("Minor");\n} else {\n  console.log("Adult");\n}\n```',
        options: ['Minor', 'Adult', 'Undefined', 'Error'],
        answer: 1,
        explanation: 'Since 20 is not less than 18, the else block runs, outputting "Adult".'
    },
    {
        id: 'q2',
        question: 'Which of the following correctly uses a ternary operator?',
        options: [
            'if age > 18 ? "Yes" : "No"',
            'age > 18 ? "Yes" : "No";',
            'age > 18 then "Yes" else "No";',
            '"Yes" if age > 18 else "No"',
        ],
        answer: 1,
        explanation: 'The ternary syntax is: `condition ? resultIfTrue : resultIfFalse`.'
    },
    {
        id: 'q3',
        question: 'What does the `&&` operator do?',
        options: [
            'Returns true if at least one condition is true',
            'Inverts a boolean value',
            'Returns true only if both conditions are true',
            'Ends the program if false',
        ],
        answer: 2,
        explanation: '`&&` (logical AND) returns true only when both sides are true.'
    }
];
