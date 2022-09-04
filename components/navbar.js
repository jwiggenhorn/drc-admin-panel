import Link from 'next/link'

export default function Navbar() {
  return (
    <span>
      <button>
        <Link href="/">Home</Link>
      </button>
      <button>
        <Link href="/create-study">New Study</Link>
      </button>
    </span>
  )
}
