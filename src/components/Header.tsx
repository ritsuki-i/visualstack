import Link from "next/link"

interface HeaderProps {
  className?: string
}

export default function Header({ className = "" }: HeaderProps) {
  return (
    <header className={`bg-gray-800 text-white ${className}`}>
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          Visual Stack with HandTracking
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-300">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-300">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

