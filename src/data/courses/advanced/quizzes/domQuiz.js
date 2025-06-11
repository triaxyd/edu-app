export const domQuiz = [
    {
        id: 'q1',
        question: 'What does the DOM represent in a web page?',
        options: [
            'A list of all CSS styles',
            'The database structure of the site',
            'A tree-like structure of HTML elements',
            'The JavaScript runtime environment'
        ],
        answer: 2,
        explanation: 'The DOM is a tree-like representation of the HTML elements in a web page that JavaScript can interact with.'
    },
    {
        id: 'q2',
        question: 'How can you select an element by its ID in JavaScript?',
        options: [
            'document.querySelector(".idName")',
            'document.getElementById("elementId")',
            'document.getElementsByClassName("elementId")',
            'document.getElementByName("elementId")'
        ],
        answer: 1,
        explanation: 'document.getElementById() is the correct method to select an element by its ID.'
    },
    {
        id: 'q3',
        question: 'What does this code do?\n\n`element.addEventListener("click", () => alert("Clicked!"));`',
        options: [
            'Removes an event handler',
            'Adds an alert to run when the page loads',
            'Adds a click listener that shows an alert',
            'Changes the element’s HTML'
        ],
        answer: 2,
        explanation: 'It adds a click event listener that triggers an alert when the element is clicked.'
    }
];
