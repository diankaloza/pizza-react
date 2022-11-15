import styles from "./NotFoundBlock.module.scss";

export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span> :( </span>
        <br />
        Нічого не знайдено
      </h1>
      <p className={styles.description}>На жаль дана сторінка відсутня.</p>
    </div>
  );
};
