'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import NavItems from './NavItems'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { RiMenu2Fill, RiCloseLine } from 'react-icons/ri'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && !(event.target as Element).closest('.mobile-menu-container')) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen])

  return (
    <nav className='navbar relative'>
      <button 
        className='md:hidden p-2'
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <RiCloseLine className="h-6 w-6" />
        ) : (
          <RiMenu2Fill className="h-6 w-6" />
        )}
      </button>

      <Link href="/">
        <div className='flex items-center gap-2.5 cursor-pointer'>
          <Image 
            src="/images/logo.svg" 
            alt='logo' 
            width={46} 
            height={44} 
          />
        </div>
      </Link>

      
      <div className={`
        mobile-menu-container
        fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-900 
        shadow-xl z-50 transform transition-transform duration-300 ease-in-out
        md:hidden
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-4 h-full flex flex-col">
          
          <Link href="/" className="mb-8" onClick={() => setIsMenuOpen(false)}>
            <Image 
              src="/images/logo.svg" 
              alt='logo' 
              width={46} 
              height={44} 
            />
          </Link>
          
          <NavItems mobile />
          
          <div className="mt-auto pb-4">
            <SignedOut>
              <SignInButton>
                <button 
                  className='btn-signin w-full' 
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="flex justify-center">
                <UserButton afterSignOutUrl='/' />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>

      <div className='hidden md:flex items-center gap-8'>
        <NavItems />
        <SignedOut>
          <SignInButton>
            <button className='btn-signin'>Sign In</button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl='/' />
        </SignedIn>
      </div>

      <div className={`md:hidden ml-auto ${isMenuOpen ? 'hidden' : 'block'}`}>
        <SignedOut>
          <SignInButton>
            <button className='btn-signin'>Sign In</button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl='/' />
        </SignedIn>
      </div>
    </nav>
  )
}

export default Navbar
