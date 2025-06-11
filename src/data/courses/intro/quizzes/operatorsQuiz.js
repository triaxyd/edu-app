export const operatorsQuiz = [
    {
        id: 'q1',
        question: 'What is the result of the following code?\n\n`5 === "5"`',
        options: ['true', 'false', 'undefined', 'Error'],
        answer: 1,
        explanation: '`===` checks both value and type. Since one is a number and the other is a string, the result is `false`.'
    },
    {
        id: 'q2',
        question: 'Which operator returns `true` only if both operands are true?',
        options: ['||', '&&', '!', '!='],
        answer: 1,
        explanation: '`&&` (AND) returns true only if both operands are true.'
    },
    {
        id: 'q3',
        question: 'What does this expression evaluate to?\n\n`10 % 3`',
        options: ['1', '3', '0', '10'],
        answer: 0,
        explanation: '`%` is the modulus operator and returns the remainder. 10 divided by 3 leaves a remainder of 1.'
    }
];
