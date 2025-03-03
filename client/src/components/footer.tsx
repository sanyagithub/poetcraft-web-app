import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-purple-800 mb-4">PoetCraft</h3>
            <p className="text-sm">Explore the art of poetry with Annie Finch</p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/learn" className="hover:text-purple-600">
                  Learn
                </Link>
              </li>
              <li>
                <Link href="/practice" className="hover:text-purple-600">
                  Practice
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-purple-600">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-purple-600">
                  Resources
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="hover:text-purple-600">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-purple-600">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-purple-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-purple-600">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-600">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-600">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-600">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-600">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} PoetCraft. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

