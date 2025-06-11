export const dataTypesQuiz = [
    {
        id: 'q1',
        question: 'Which of the following is a primitive data type in JavaScript?',
        options: ['Array', 'Object', 'Boolean', 'Function'],
        answer: 2,
        explanation: `"Boolean" is a primitive type. Arrays, objects, and functions are complex types.`
    },
    {
        id: 'q2',
        question: 'What will `typeof null` return in JavaScript?',
        options: ['"null"', '"undefined"', '"object"', '"none"'],
        answer: 2,
        explanation: '`typeof null` returns "object" due to a historical bug in JavaScript.'
    },
    {
        id: 'q3',
        question: 'Which of the following represents an array?',
        options: [
            `{ name: "Alice", age: 25 }`,
            `["apple", "banana", "cherry"]`,
            `"JavaScript"`,
            `true`
        ],
        answer: 1,
        explanation: `Arrays are ordered lists enclosed in square brackets [].`
    }
];
