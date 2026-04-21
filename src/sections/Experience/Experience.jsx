import styles from './experience.module.css';

export default function Experience() {
  return (
    <section className={styles.section}>
      <h2>./view_experience.sh</h2>
      
      <div className={styles.content}>
        
        {/* Job Experience */}
        <article className={styles.experienceItem}>
          <div className={styles.experienceHeader}>
            <h3>Software Developer Intern @ PT Digdaya Solusi Teknologi</h3> 
            <span className={styles.date}>JAN 2026 — PRESENT</span>
          </div>
          <ul>
            <li>Developed a custom administrative dashboard for non-technical staff to independently manage website content. </li>
            <li>Spearheaded the redesign of a sister company's profile website using PHP and Tailwind CSS with interactive UI elements. </li>
            <li>Collaborated with the internal team to build a comprehensive corporate website using PHP, managing both frontend aesthetics and backend logic. </li>
            <li>Partnered with Digital Marketing to develop a high-impact interactive portfolio. </li>
            <li>Developed a food-ordering web application featuring a seamless checkout system and real-time order status management. </li>
          </ul>
        </article>

        {/* Organization Experience 1 */}
        <article className={styles.experienceItem}>
          <div className={styles.experienceHeader}>
            <h3>Coordinator, Secretariat Division @ FIT Competition 2025</h3> 
            <span className={styles.date}>2025</span> 
          </div>
          <ul>
            <li>Coordinated secretariat tasks and managed participant documentation.</li>
          </ul>
        </article>

        {/* Organization Experience 2 */}
        <article className={styles.experienceItem}>
          <div className={styles.experienceHeader}>
            <h3>Secretariat Division Member @ LDKM 2</h3>
            <span className={styles.date}>2024</span>
          </div>
          <ul>
            <li>Managed participant registration data and event documentation.</li>
          </ul>
        </article>

        {/* Organization Experience 3 */}
        <article className={styles.experienceItem}>
          <div className={styles.experienceHeader}>
            <h3>Secretary @ KBM Technology Community</h3> 
            <span className={styles.date}>2023</span> 
          </div>
          <ul>
            <li>Handled official correspondence and internal documentation. </li>
          </ul>
        </article>

      </div>
    </section>
  )
}