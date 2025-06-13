// src/components/Lessons/AdaptiveLessonExtras.jsx
import styles from '@/styles/LessonContent.module.css';

export default function IntroToJsExtra({ difficultyLevel }) {
    return (
        <div className={styles.questionBlock}>
            {difficultyLevel === 1 ? (
                <>
                    <h3 className={styles.subheading}>Extra Help: Breaking it Down Further</h3>
                    <p className={styles.paragraph}>
                        JavaScript might seem overwhelming at first, but think of it like giving instructions to the web browser.
                        Just like a recipe guides a cook step by step, your JavaScript code tells the browser what to do.
                    </p>
                    <p className={styles.paragraph}>
                        For example, if you want a message to appear when a user clicks a button, you write that instruction in JavaScript.
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.paragraph}>
                            JavaScript lets you control behavior — like showing a message, changing colors, or responding to input.
                        </li>
                        <li className={styles.paragraph}>
                            It works *with* HTML (structure) and CSS (style) to make your site interactive.
                        </li>
                        <li className={styles.paragraph}>
                            You don’t need to memorize everything — practice and building small projects will help it stick.
                        </li>
                    </ul>
                    <p className={styles.paragraph}>
                        Here's a good place to start practicing: use <code>console.log()</code> to print messages and experiment with variables:
                    </p>
                    <p className={styles.codeBlock}>
                        <code>let name = "Alex";<br/>console.log("Hello, " + name + "!");</code>
                    </p>
                    <p className={styles.paragraph}>
                        As you go forward, focus on understanding what each line of code is doing. That’s the key to building confidence.
                    </p>
                </>
            ) : (
                <>
                    <h3 className={styles.subheading}>Deep Dive: Beyond the Basics</h3>
                    <p className={styles.paragraph}>
                        You've shown strong understanding — let’s build on that. JavaScript isn’t just a language that manipulates webpages;
                        it’s a powerful tool that powers major applications like Google Docs, Spotify, and even parts of desktop apps.
                    </p>
                    <p className={styles.paragraph}>
                        Here are some key ideas and deeper concepts worth exploring next:
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.paragraph}>
                            Learn how the <strong>JavaScript engine</strong> (like Google’s V8) parses, optimizes, and executes your code.
                        </li>
                        <li className={styles.paragraph}>
                            Understand the <strong>event loop</strong> — how JavaScript handles asynchronous operations like user input and fetching data.
                        </li>
                        <li className={styles.paragraph}>
                            Dive into <strong>hoisting</strong> and how different declarations (<code>var</code>, <code>let</code>, <code>const</code>) behave.
                        </li>
                        <li className={styles.paragraph}>
                            Practice DOM manipulation — learn how to create and modify elements dynamically using <code>document.createElement</code> and more.
                        </li>
                    </ul>
                    <p className={styles.paragraph}>
                        Here’s an example of dynamic interaction:
                    </p>
                    <p className={styles.codeBlock}>
                        <code>
                            const button = document.createElement("button");<br/>
                            button.textContent = "Click Me";<br/>
                            button.onclick = () =&gt; alert("You clicked it!");<br/>
                            document.body.appendChild(button);
                        </code>
                    </p>
                    <p className={styles.paragraph}>
                        Keep experimenting and reading source code of small apps — curiosity and consistent practice is how developers truly grow.
                    </p>
                </>
            )}
        </div>
    );
}
