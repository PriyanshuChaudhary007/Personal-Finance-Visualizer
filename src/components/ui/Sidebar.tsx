import Link from "next/link"

export function Sidebar() {
  return (
    <aside className="w-64 h-screen p-4 bg-muted hidden md:block">
      <nav className="space-y-2">
        <Link href="/" className="block px-2 py-1 rounded hover:bg-accent">Dashboard</Link>
        <Link href="/analytics" className="block px-2 py-1 rounded hover:bg-accent">Analytics</Link>
        <Link href="/settings" className="block px-2 py-1 rounded hover:bg-accent">Settings</Link>
      </nav>
    </aside>
  )
}
