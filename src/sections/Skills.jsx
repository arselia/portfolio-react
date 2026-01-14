import springboot from '../assets/images/icon-springboot.png'

export default function Skills() {
  return (
    <section id="skills" className="skills">
      <h2>Tools & Frameworks</h2>

      <div className="all-skills">
        <div className="skill-item">
          <img src={springboot} alt="Spring Boot" />
          <div>Spring Boot</div>
        </div>
      </div>
    </section>
  )
}
