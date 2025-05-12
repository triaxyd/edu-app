import styles from '@/styles/SignInButton.module.css';

export default function SignInButton({ children, ...props }) {
    return (
        <button className={styles.button} {...props}>
            {children}
        </button>
    );
}
