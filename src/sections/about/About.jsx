import styles from './about.module.css';

export default function About() {
  return (
    <section className={styles.wrapper}>
      {/* Playful floating bubbles */}
      <div className={`${styles.bubble} ${styles.bubbleOne}`}></div>
      <div className={`${styles.bubble} ${styles.bubbleTwo}`}></div>
      <div className={`${styles.bubble} ${styles.bubbleThree}`}></div>
      <div className={`${styles.bubble} ${styles.bubbleFour}`}></div>

      <div className={styles.container}>
        <div className={styles.headerColumn}>
          <div className={styles.titleWrapper}>
            <h2 className={styles.title}>About Me</h2>
            <span className={styles.sparkle}>✨</span>
          </div>
          <p className={styles.subtitle}>
            Backend-focused Software Engineer building scalable systems. 
          </p>
        </div>

        <div className={styles.contentColumn}>
          <div className={styles.cloudCard}>
            <p className={styles.bioText}>
              I'm an Informatics Engineering undergraduate at <b>Satya Wacana Christian University</b>. As a backend-focused <b>Software Engineer</b>, I specialize in developing RESTful APIs and designing efficient databases using MySQL and MongoDB.
            </p>
          </div>

          <div className={styles.highlightGrid}>
            <div className={styles.miniCard}>
              <h3>Location</h3>
              <p>Pati, ID</p> 
            </div>
            <div className={styles.miniCard}>
              <h3>Core Skills</h3>
              <p>Spring Boot, NestJS, PHP</p> 
            </div>
            <div className={styles.miniCard}>
              <h3>Current Focus</h3>
              <p>Scalable Web Apps</p> 
            </div>
          </div>

          <div className={styles.cloudCard}>
            <p className={styles.bioText}>
              Beyond crafting backend architecture, I am deeply passionate about video games. My ultimate goal is to fuse my engineering expertise with my hobbies to <b>develop an immersive game</b> that players will love! 🎮
            </p>
          </div>

          <div className={styles.actionContainer}>
            <a href="https://drive.google.com/file/d/1kgxY62b12PE6No79BwScSuVfXtgL3Fuy/view?usp=share_link" className={styles.bouncyButton}>
              Grab My Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}