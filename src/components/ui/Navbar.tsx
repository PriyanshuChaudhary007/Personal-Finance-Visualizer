import { ThemeToggle } from "./ThemeToggle"

export function Navbar() {
  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-md border-b bg-background">
      <h1 className="text-xl font-bold">Finance Visualizer</h1>
      <ThemeToggle />
    </header>
  )
}
