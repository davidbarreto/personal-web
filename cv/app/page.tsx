import { getResume } from '../lib/resume'
import ThemeToggle from '../components/ThemeToggle'
import Header from '../components/Header'
import WorkExperience from '../components/WorkExperience'
import Education from '../components/Education'
import Publications from '../components/Publications'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Languages from '../components/Languages'

export default function Home() {
  const resume = getResume()

  return (
    <main style={{ maxWidth: '760px', margin: '0 auto', padding: '48px 24px 96px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '48px' }}>
        <ThemeToggle />
      </div>

      <Header basics={resume.basics} />
      <WorkExperience work={resume.work} />
      <Education education={resume.education} />
      <Publications publications={resume.publications} />
      <Skills skills={resume.skills} />
      <Projects projects={resume.projects} />
      <Languages languages={resume.languages} />
    </main>
  )
}