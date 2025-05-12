import Link from 'next/link';
import styles from '@/styles/LinkText.module.css';

export default function LinkText({ href, preText, linkText }) {
    return (
        <p className={styles.text}>
            {preText}
            <Link href={href} className={styles.link}>
                {linkText}
            </Link>
        </p>
    );
}
