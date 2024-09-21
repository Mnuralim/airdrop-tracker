import Link from 'next/link'

export default function NavBar() {
  return (
    <nav className="bg-darkBg border-b border-darkAccent py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-lg font-semibold">Airdrop Tracker</div>
        <div className="space-x-6">
          <Link href="/" className="hover:text-primary transition">
            Home
          </Link>
          <Link href="/airdrops" className="hover:text-primary transition">
            Airdrop List
          </Link>
        </div>
      </div>
    </nav>
  )
}
