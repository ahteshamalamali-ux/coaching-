export type Course = {
  id: string
  name: string
  tagline: string
  duration: string
  fee: number
  features: string[]
  popular?: boolean
}

export const courses: Course[] = [
  {
    id: 'jee',
    name: 'JEE Main + Advanced',
    tagline: 'For Class 11, 12 & droppers aiming for IITs and NITs',
    duration: '2 years',
    fee: 145000,
    features: ['Physics, Chemistry & Maths', 'Weekly All-India mock tests', 'Doubt-solving labs daily', 'IIT-alumni mentors'],
    popular: true,
  },
  {
    id: 'neet',
    name: 'NEET-UG',
    tagline: 'Complete medical entrance prep with NCERT mastery',
    duration: '2 years',
    fee: 135000,
    features: ['Physics, Chemistry & Biology', 'NCERT line-by-line sessions', 'Fortnightly full-length tests', 'Personal performance tracker'],
  },
  {
    id: 'foundation',
    name: 'Foundation (Class 9-10)',
    tagline: 'Build strong concepts early for boards & olympiads',
    duration: '1 year',
    fee: 65000,
    features: ['Science & Maths focus', 'Olympiad & NTSE prep', 'Monthly parent meetings', 'Small batches of 25'],
  },
  {
    id: 'boards',
    name: 'Board Excellence (Class 11-12)',
    tagline: 'CBSE & UP Board score booster program',
    duration: '1 year',
    fee: 55000,
    features: ['PCM / PCB streams', 'Sample paper drills', 'Answer-writing workshops', 'Pre-board mock exams'],
  },
]

export const faculty = [
  { name: 'Dr. Rajesh Sharma', subject: 'Physics', exp: '18 yrs', creds: 'Ph.D., IIT Kanpur', image: '/images/faculty-1.png' },
  { name: 'Ms. Priya Agarwal', subject: 'Chemistry', exp: '12 yrs', creds: 'M.Sc., IIT Delhi', image: '/images/faculty-2.png' },
  { name: 'Prof. S.K. Verma', subject: 'Mathematics', exp: '25 yrs', creds: 'M.Tech., IIT Roorkee', image: '/images/faculty-3.png' },
  { name: 'Dr. Meena Gupta', subject: 'Biology', exp: '15 yrs', creds: 'MBBS, KGMU Lucknow', image: '/images/faculty-4.png' },
]

export const stories = [
  {
    name: 'Aarav Jain',
    result: 'JEE Advanced AIR 312',
    college: 'IIT Bombay, Computer Science',
    image: '/images/student-1.png',
    quote:
      'I joined Pinnacle in Class 11 with average marks. The weekly tests showed me exactly where I was losing marks, and Verma sir’s problem sessions completely changed how I approached maths.',
  },
  {
    name: 'Ananya Singh',
    result: 'NEET 2026 — 698/720',
    college: 'AIIMS New Delhi, MBBS',
    image: '/images/student-2.png',
    quote:
      'Dr. Meena ma’am made biology feel like a story. The NCERT line-by-line sessions and the personal tracker kept me consistent through the toughest months.',
  },
  {
    name: 'Kabir Khan',
    result: 'JEE Main 99.87 percentile',
    college: 'NIT Trichy, Electronics',
    image: '/images/student-3.png',
    quote:
      'As a dropper, I needed discipline and belief. The mentors called my parents every month and never let me lose focus. I owe my NIT seat to this team.',
  },
]

export type ResultCategory = 'JEE' | 'NEET' | 'Boards'

export const results: Record<ResultCategory, { stats: { label: string; value: number; suffix: string }[]; toppers: { name: string; score: string; detail: string }[] }> = {
  JEE: {
    stats: [
      { label: 'IIT selections', value: 48, suffix: '' },
      { label: 'NIT selections', value: 162, suffix: '' },
      { label: 'Above 99 percentile', value: 37, suffix: '' },
    ],
    toppers: [
      { name: 'Aarav Jain', score: 'AIR 312', detail: 'JEE Advanced 2026' },
      { name: 'Ishita Bansal', score: 'AIR 587', detail: 'JEE Advanced 2026' },
      { name: 'Kabir Khan', score: '99.87%ile', detail: 'JEE Main 2026' },
      { name: 'Rohan Mittal', score: '99.71%ile', detail: 'JEE Main 2026' },
    ],
  },
  NEET: {
    stats: [
      { label: 'Govt. MBBS seats', value: 94, suffix: '' },
      { label: 'Scored 650+', value: 41, suffix: '' },
      { label: 'Qualified', value: 96, suffix: '%' },
    ],
    toppers: [
      { name: 'Ananya Singh', score: '698/720', detail: 'NEET-UG 2026' },
      { name: 'Vivek Yadav', score: '685/720', detail: 'NEET-UG 2026' },
      { name: 'Sana Qureshi', score: '676/720', detail: 'NEET-UG 2026' },
      { name: 'Aditya Goyal', score: '670/720', detail: 'NEET-UG 2026' },
    ],
  },
  Boards: {
    stats: [
      { label: 'Scored 95%+', value: 128, suffix: '' },
      { label: 'Average score', value: 89, suffix: '%' },
      { label: 'District toppers', value: 6, suffix: '' },
    ],
    toppers: [
      { name: 'Tanvi Arora', score: '99.2%', detail: 'CBSE Class 12' },
      { name: 'Harsh Chauhan', score: '98.8%', detail: 'CBSE Class 12' },
      { name: 'Riya Saxena', score: '98.4%', detail: 'UP Board Class 12' },
      { name: 'Dev Pratap', score: '98.0%', detail: 'CBSE Class 10' },
    ],
  },
}

export type Review = {
  id: string
  name: string
  role: string
  rating: number
  message: string
  date: string
}

export const initialReviews: Review[] = [
  { id: 'r1', name: 'Sunita Jain', role: 'Parent, JEE batch', rating: 5, message: 'Regular updates on my son’s progress and very approachable teachers. The monthly parent meetings gave us real clarity.', date: 'Sep 2026' },
  { id: 'r2', name: 'Mohit Sharma', role: 'Student, NEET batch', rating: 5, message: 'Doubt sessions are the best part. You never feel hesitant to ask anything, and the test analysis is very detailed.', date: 'Aug 2026' },
  { id: 'r3', name: 'Pooja Verma', role: 'Student, Foundation', rating: 4, message: 'Small batch size means teachers actually know you. Olympiad prep helped me clear the first round easily.', date: 'Aug 2026' },
  { id: 'r4', name: 'Rakesh Agarwal', role: 'Parent, Boards batch', rating: 5, message: 'My daughter improved from 78% to 94% in one year. Safe campus near Sanjay Place and very disciplined environment.', date: 'Jul 2026' },
]

export const navLinks = [
  { href: '/#courses', label: 'Courses' },
  { href: '/#results', label: 'Results' },
  { href: '/#stories', label: 'Success Stories' },
  { href: '/#faculty', label: 'Faculty' },
  { href: '/#reviews', label: 'Reviews' },
]

export const formatINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)
