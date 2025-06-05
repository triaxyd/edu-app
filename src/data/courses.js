export const courses = {
    intro: {
        title: 'Introduction to JavaScript',
        description: 'Learn what JavaScript is and why it is important.',
        lessons: [
            {
                id: 'variables',
                title: 'Variables and Constants',
                description: 'Understand how to declare and use variables and constants in JavaScript.',
                progress: '100%',
            },
            {
                id: 'types',
                title: 'Data Types',
                description: 'Explore JavaScript data types like strings, numbers, and booleans.',
                progress: '80%',
            },
        ],
    },
    basics: {
        title: 'Basic JavaScript Concepts',
        description: 'Learn variables, data types and functions.',
        lessons: [
            {
                id: 'functions',
                title: 'Functions',
                description: 'Learn how to define, invoke and work with functions in JavaScript.',
                progress: '60%',
            },
            {
                id: 'conditions',
                title: 'Conditionals',
                description: 'Master if-else statements and logical operations to control program flow.',
                progress: '45%',
            },
        ],
    },
    advanced: {
        title: 'Advanced JavaScript Techniques',
        description: 'Explore async programming, objects, and the DOM.',
        lessons: [
            {
                id: 'async',
                title: 'Async & Promises',
                description: 'Understand asynchronous code and how to use promises effectively.',
                progress: '30%',
            },
            {
                id: 'dom',
                title: 'The DOM',
                description: 'Learn how to interact with the HTML document using the DOM.',
                progress: '10%',
            },
        ],
    },
};