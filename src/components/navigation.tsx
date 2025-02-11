'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/auth'
import { supabase } from '@/lib/supabase'

export function Navigation() {
  const { user } = useAuth()

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <Link 
              href="/" 
              className="flex items-center font-serif text-xl font-medium text-gray-900"
            >
              LoremIpsum
            </Link>
            <div className="ml-10 flex items-center space-x-4">
              <Link 
                href="/books" 
                className="text-gray-500 hover:text-gray-900"
              >
                Books
              </Link>
              <Link 
                href="/authors" 
                className="text-gray-500 hover:text-gray-900"
              >
                Authors
              </Link>
            </div>
          </div>
          
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  href="/dashboard" 
                  className="text-gray-500 hover:text-gray-900"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => supabase.auth.signOut()}
                  className="text-gray-500 hover:text-gray-900"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 