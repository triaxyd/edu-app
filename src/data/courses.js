// src/data/courses.js
export const courses = {
    intro: {
        title: 'Introduction to JavaScript',
        description: 'Learn what JavaScript is and why it is important.',
        lessons: [
            {
                id: 'whatisjs',
                title: 'What is JavaScript?',
                description: 'An introduction to the JavaScript language and what it is used for.'
            },

            {
                id: 'variables',
                title: 'Variables and Constants',
                description: 'Understand how to declare and use variables and constants in JavaScript.'
            },
            {
                id: 'types',
                title: 'Data Types',
                description: 'Explore JavaScript data types like strings, numbers, and booleans.'
            },
            {
                id: 'operators',
                title: 'Operators',
                description: 'Get familiar with arithmetic, comparison, and logical operators in JavaScript.'
            },
            {
                id: "overview",
                title: "Course Overview",
                description: 'Quiz yourself on the introduction course material',
                type: "overview"
            }
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
            },
            {
                id: 'conditions',
                title: 'Conditionals',
                description: 'Master if-else statements and logical operations to control program flow.'
            },
            {
                id: 'loops',
                title: 'Loops',
                description: 'Use for and while loops to repeat tasks efficiently.'
            },
            {
                id: "overview",
                title: "Course Overview",
                description: 'Quiz yourself on the basics course material',
                type: "overview"
            }
        ],
    },
    advanced: {
        title: 'Advanced JavaScript Techniques',
        description: 'Explore async programming, objects, and the DOM.',
        lessons: [
            {
                id: 'async',
                title: 'Async & Promises',
                description: 'Understand asynchronous code and how to use promises effectively.'
            },
            {
                id: 'dom',
                title: 'The DOM',
                description: 'Learn how to interact with the HTML document using the DOM.'
            },
            {
                id: 'oop',
                title: 'Object-Oriented Programming',
                description: 'Dive into objects, classes, and OOP concepts in JavaScript.'
            },
            {
                id: "overview",
                title: "Course Overview",
                description: 'Quiz yourself on the advanced course material',
                type: "overview"
            }
        ],
    },
};
