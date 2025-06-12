import { getDatabase, ref, update,set } from 'firebase/database';
import { auth } from './firebase';

export const saveLessonProgress = async (courseId, lessonId, data) => {
    const user = auth.currentUser;
    if (!user) return;

    const db = getDatabase();
    const path = `users/${user.uid}/courses/${courseId}/${lessonId}`;
    await update(ref(db, path), data);
};

export const markLessonAsRead = async (courseId, lessonId, uid) => {
    const db = getDatabase();
    const path = `users/${uid}/courses/${courseId}/${lessonId}`;
    await update(ref(db, path), {
        lesson_read: true,
    });
};

export const saveCumulativeScore = async (courseId, uid, score) => {
    const db = getDatabase();
    const path = `users/${uid}/courses/${courseId}/cumulative_score`;
    await set(ref(db, path), score);
};
