export default function Header() {
  return (
    <header className="profile">
      <div className="div1">Foto Profile</div>

      <div className="div2">
        <h1>SHERLY SEPTIANI</h1>
        <h4>Undergraduate Informatics Engineer Student</h4>

        <nav>
          <ul>
            <li><a href="#about">About Me</a></li>
            <li><a href="#education">Education</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#skills">Skills</a></li>
          </ul>
        </nav>

        <ul className="contact-info">
          <li>Email: sherlyseptianisp@gmail.com</li>
          <li><a href="https://www.linkedin.com/in/sherly-septiani-4556282b7" target="_blank">LinkedIn</a></li>
          <li><a href="https://github.com/arselia" target="_blank">GitHub</a></li>
          <li><a href="https://instagram.com/sherly_lily_04" target="_blank">Instagram</a></li>
        </ul>
      </div>
    </header>
  )
}
