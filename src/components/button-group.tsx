import styles from '@/styles/button-group.module.css';

interface ButtonGroupProps {
  children?: React.ReactNode;
}

export function ButtonGroup({ children }: ButtonGroupProps) {
  return <div className={styles.root}>{children}</div>;
}
