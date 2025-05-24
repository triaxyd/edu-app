import styles from '@/styles/SideBar.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <div className={styles.logoWrapper}>
                <Image
                    src="/icons/logo.png"
                    alt="Logo"
                    width={90}
                    height={90}
                    className={styles.logo}
                />
            </div>
            <div className={styles.iconWrapper}>

                <Link href="/home">
                    <Image src="/icons/home.png" alt="Home" width={32} height={32} className={styles.icon} />
                </Link>
                <Link href="/navigation">
                    <Image src="/icons/navigation.png" alt="Navigation" width={32} height={32} className={styles.icon} />
                </Link>
                <Link href="/stats">
                    <Image src="/icons/stats.png" alt="Stats" width={32} height={32} className={styles.icon} />
                </Link>
            </div>
        </div>
    );
}
