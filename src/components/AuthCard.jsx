import styles from '@/styles/AuthCard.module.css';

export default function AuthCard({ illustration, header, form }) {
    return (
        <div className={styles.authCard}>
            <div className={styles.illustration}>
                <img src={illustration} alt="" className={styles.image} />
            </div>
            <div className={styles.content}>
                <div className={styles.header}>{header}</div>
                <div className={styles.form}>{form}</div>
            </div>
        </div>
    );
}
