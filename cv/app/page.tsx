import { getResume } from '../lib/resume'
import CvPage from '../components/CvPage'

export default function Home() {
  const resume = getResume()
  return <CvPage resume={resume} />
}
