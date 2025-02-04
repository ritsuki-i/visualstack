interface FooterProps {
    className?: string
  }
  
  export default function Footer({ className = "" }: FooterProps) {
    return (
      <footer className={`bg-gray-800 text-white ${className}`}>
        <div className="container mx-auto px-4 h-full flex items-center justify-center">
          <p>&copy; 2025 Ritsuki Ishikawa</p>
        </div>
      </footer>
    )
  }
  
  