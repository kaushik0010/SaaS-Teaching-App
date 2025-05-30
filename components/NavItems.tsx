'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const navItems = [
    {label: 'Home', href: '/'},
    {label: 'Pricing', href: '/subscription'},
    {label: 'Companions', href: '/companions'},
    {label: 'My Journey', href: '/my-journey'},
]

const NavItems = ({ mobile = false }: { mobile?: boolean }) => {
  const pathname = usePathname();

  return (
    <nav className={mobile ? 'flex flex-col gap-1' : 'flex items-center gap-4'}>
      {navItems.map(({ label, href }) => (
        <Link 
          href={href} 
          key={label} 
          className={cn(
            'block px-4 py-3 rounded-md transition-colors',
            pathname === href 
              ? 'bg-primary/10 text-primary font-semibold' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-800',
            mobile ? 'text-lg' : ''
          )}
          onClick={() => mobile && (document.activeElement as HTMLElement)?.blur()}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}

export default NavItems