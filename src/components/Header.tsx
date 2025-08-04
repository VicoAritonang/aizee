'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
                  <Link href="/" className="flex items-center space-x-3 group">
          <img 
            src="https://i.imgur.com/DtxyEY6.png" 
            alt="Aizee Logo" 
            className="w-12 h-12 group-hover:scale-110 transition-transform duration-300"
          />
          <span className="text-2xl font-bold text-yellow-400 leading-none">Aizee</span>
        </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="#produk" 
              className="text-white/80 hover:text-white transition-colors duration-300 font-medium"
            >
              Produk
            </Link>
            <Link 
              href="#tentang" 
              className="text-white/80 hover:text-white transition-colors duration-300 font-medium"
            >
              Tentang Kami
            </Link>
            <Link 
              href="/auth/login" 
              className="text-white/80 hover:text-white transition-colors duration-300 font-medium"
            >
              Login
            </Link>
            <Link 
              href="/auth/register" 
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Register
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20 bg-white/10 backdrop-blur-md rounded-b-2xl">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="#produk" 
                className="text-white/80 hover:text-white transition-colors duration-300 font-medium px-4 py-2 hover:bg-white/10 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Produk
              </Link>
              <Link 
                href="#tentang" 
                className="text-white/80 hover:text-white transition-colors duration-300 font-medium px-4 py-2 hover:bg-white/10 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Tentang Kami
              </Link>
              <Link 
                href="/auth/login" 
                className="text-white/80 hover:text-white transition-colors duration-300 font-medium px-4 py-2 hover:bg-white/10 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                href="/auth/register" 
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 text-center mx-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
} 