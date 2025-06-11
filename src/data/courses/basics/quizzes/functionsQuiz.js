export const functionsQuiz = [
    {
        id: 'q1',
        question: 'What will this code output?\n\n```javascript\nfunction sayHello() {\n  console.log("Hello!");\n}\n\nsayHello();\n```',
        options: ['Nothing', 'sayHello', 'Hello!', 'undefined'],
        answer: 2,
        explanation: 'The function `sayHello()` prints "Hello!" to the console when it is called.'
    },
    {
        id: 'q2',
        question: 'Which of the following correctly defines a function that adds two numbers and returns the result?',
        options: [
            'function add(a, b) { console.log(a + b); }',
            'function add(a, b) { return a + b; }',
            'function add = (a, b) => a + b;',
            'add(a, b) => { return a + b; }',
        ],
        answer: 1,
        explanation: '`return a + b;` ensures that the result is returned for further use.'
    },
    {
        id: 'q3',
        question: 'What is the main difference between a regular function and an arrow function?',
        options: [
            'Arrow functions cannot accept parameters',
            'Arrow functions always return undefined',
            'Arrow functions use the `=>` syntax and have a different `this` context',
            'Regular functions cannot return values',
        ],
        answer: 2,
        explanation: 'Arrow functions use `=>` and do not bind their own `this`, unlike regular functions.'
    }
];
