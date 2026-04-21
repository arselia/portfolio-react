// src/sections/projects/Projects.jsx
import { projectsData } from '../../data/portfolioData';
import styles from './projects.module.css';

export default function Projects() {
  return (
    <section className={styles.section}>
      <div className={styles.contentWrapper}>
        <h2 className={styles.mainTitle}>Project Vault</h2>
        
        <div className={styles.grid}>
          {projectsData.map((project) => (
            <article key={project.id} className={styles.cardContainer}>
              
              {/* 1. The Cartridge (The data inside) */}
              <div className={styles.cartridge}>
                <div className={styles.description}>
                  {project.description}
                </div>
                
                <div className={styles.technologies}>
                  {project.techStack.map((tech, index) => (
                    <span key={index} className={styles.techBadge}>
                      {tech}
                    </span>
                  ))}
                </div>

                {project.liveUrl && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.button}
                  >
                    Launch Program
                  </a>
                )}
              </div>

              {/* 2. The Sleeve (The visual front) */}
              <div className={styles.sleeve}>
                {project.imageUrl ? (
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className={styles.projectImage} 
                  />
                ) : (
                  <div className={styles.imagePlaceholder}>
                    <span>No Tape Found</span>
                  </div>
                )}
                <h3 className={styles.projectTitle}>{project.title}</h3>
              </div>

            </article>
          ))}
        </div>
      </div>
    </section>
  );
}