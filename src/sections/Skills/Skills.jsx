// src/sections/skills/Skills.jsx
import { skillsData } from '../../data/portfolioData';
import styles from './Skills.module.css';

export default function Skills() {
  const row1 = skillsData.slice(0, 3);
  const row2 = skillsData.slice(3, 7);
  const row3 = skillsData.slice(7, 10);

  const renderHex = (skill, index) => (
    <div key={index} className={styles.hexWrapper}>
      <div className={styles.glassHex}>
        <div className={styles.iconContainer}>
          <img 
            src={skill.icon} 
            alt={skill.name} 
            onError={(e) => { e.target.src = 'https://via.placeholder.com/60?text=</>' }}
            className={styles.iconImage}
          />
        </div>
        <div className={styles.name}>{skill.name}</div>
      </div>
    </div>
  );

  return (
    <section className={styles.section}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Core Capabilities</h2>
        <div className={styles.modernLine}></div>
      </div>
      
      {/* The sleek, frosted-glass cluster */}
      <div className={styles.hiveCluster}>
        <div className={styles.hexRow}>{row1.map(renderHex)}</div>
        <div className={styles.hexRow}>{row2.map(renderHex)}</div>
        <div className={styles.hexRow}>{row3.map(renderHex)}</div>
      </div>
    </section>
  );
}