import Header from './components/header'
import Footer from './components/Footer'

import About from './sections/About'
import Education from './sections/Education'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Skills from './sections/Skills'

function App() {
  return (
    <>
      <Header />
      <main>
        <About />
        <Education />
        <Experience />
        <Projects />
        <Skills />
      </main>
      <Footer />
    </>
  )
}

export default App
