import pg from 'pg'

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })

const statements = [
  `CREATE TABLE IF NOT EXISTS reviews (
    id serial PRIMARY KEY,
    name varchar(60) NOT NULL,
    role varchar(60) NOT NULL,
    rating smallint NOT NULL CHECK (rating BETWEEN 1 AND 5),
    message varchar(500) NOT NULL,
    approved boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now()
  )`,
  `CREATE INDEX IF NOT EXISTS reviews_created_at_idx ON reviews (created_at DESC)`,
  `CREATE TABLE IF NOT EXISTS enrollments (
    id serial PRIMARY KEY,
    receipt_no varchar(20) NOT NULL UNIQUE,
    student_name varchar(80) NOT NULL,
    email varchar(120) NOT NULL,
    phone varchar(10) NOT NULL,
    course_id varchar(30) NOT NULL,
    course_name varchar(80) NOT NULL,
    plan varchar(20) NOT NULL,
    payment_method varchar(20) NOT NULL,
    amount_due integer NOT NULL,
    gst integer NOT NULL,
    total integer NOT NULL,
    status varchar(20) NOT NULL DEFAULT 'paid',
    created_at timestamptz NOT NULL DEFAULT now()
  )`,
  `CREATE INDEX IF NOT EXISTS enrollments_email_idx ON enrollments (email)`,
]

for (const s of statements) await pool.query(s)

const { rows } = await pool.query('SELECT count(*)::int AS n FROM reviews')
if (rows[0].n === 0) {
  const seed = [
    ['Sunita Jain', 'Parent, JEE batch', 5, 'Regular updates on my son’s progress and very approachable teachers. The monthly parent meetings gave us real clarity.', '2026-09-12'],
    ['Mohit Sharma', 'Student, NEET batch', 5, 'Doubt sessions are the best part. You never feel hesitant to ask anything, and the test analysis is very detailed.', '2026-08-20'],
    ['Pooja Verma', 'Student, Foundation', 4, 'Small batch size means teachers actually know you. Olympiad prep helped me clear the first round easily.', '2026-08-05'],
    ['Rakesh Agarwal', 'Parent, Boards batch', 5, 'My daughter improved from 78% to 94% in one year. Safe campus near Sanjay Place and very disciplined environment.', '2026-07-18'],
  ]
  for (const r of seed) {
    await pool.query('INSERT INTO reviews (name, role, rating, message, created_at) VALUES ($1, $2, $3, $4, $5)', r)
  }
}

const tables = await pool.query(
  "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name",
)
const count = await pool.query('SELECT count(*)::int AS n FROM reviews')
console.log('tables:', tables.rows.map((t) => t.table_name).join(', '), '| reviews:', count.rows[0].n)
await pool.end()
