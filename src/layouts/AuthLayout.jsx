import styles from '@/styles/AuthLayout.module.css';

export default function AuthLayout({ children, style }) {
    return (
        <div className={styles.authLayout} style={style}>
            {children}
        </div>
    );
}
