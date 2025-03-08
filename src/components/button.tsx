import styles from '@/styles/button.module.css';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'plain';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  return <button type="button" className={clsx(styles.root, styles[variant], className)} {...props} />;
}
