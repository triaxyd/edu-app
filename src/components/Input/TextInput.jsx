import styles from '@/styles/TextInput.module.css';

export default function TextInput({
                                      label,
                                      name,
                                      type = 'text',
                                      placeholder,
                                      ...props
                                  }) {
    return (
        <div className={styles.wrapper}>
            <label htmlFor={name} className={styles.label}>
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                className={styles.input}
                {...props}
            />
        </div>
    );
}
