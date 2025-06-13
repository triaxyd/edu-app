import {get, getDatabase, ref, update} from "firebase/database";

export async function setCourseDifficulty(uid, courseId) {
    const db = getDatabase();
    const coursePath = `users/${uid}/courses/${courseId}`;
    const difficultyPath = `users/${uid}/difficulty_level`;

    const snapshot = await get(ref(db, coursePath));
    if (!snapshot.exists()) return;

    const data = snapshot.val();

    let readCount = 0;
    let scoreTotal = 0;
    let scoreCount = 0;

    for (const lessonId in data) {
        const lesson = data[lessonId];

        if (lesson.lesson_read) readCount++;

        if (typeof lesson.lesson_score === 'number') {
            scoreTotal += lesson.lesson_score;
            scoreCount++;
        }
    }

    const lessonCount = Object.keys(data).filter(id => id !== 'cumulative_score').length;
    const completionPercent = lessonCount ? (readCount / lessonCount) * 100 : 0;

    const avgScore = scoreCount > 0 ? scoreTotal / scoreCount : 0;
    const cumulative = typeof data.cumulative_test_score === 'number' ? data.cumulative_test_score : 0;

    const weightedScore =  (avgScore * 0.5) + (cumulative * 0.3) + (completionPercent * 0.2);
    const level = weightedScore >= 75 ? 2 : 1;

    await update(ref(db), {
        [difficultyPath]: level
    });
    console.log("updated difficulty")

    return level;
}
