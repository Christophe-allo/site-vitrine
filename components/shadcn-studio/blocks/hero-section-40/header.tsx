'use client'

import { useEffect, useState, type MouseEvent } from 'react'

import { SecondaryOrionButton } from '@/components/ui/orion-button'

import {
  HeroNavigation,
  HeroNavigationSmallScreen,
  type Navigation
} from '@/components/shadcn-studio/blocks/hero-section-40/hero-navigation'

import { cn } from '@/lib/utils'

type HeaderProps = {
  navigationData: Navigation[]
  className?: string
}

const Header = ({ navigationData, className }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false)

  const handleHomeClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    window.dispatchEvent(new CustomEvent('hero-home:navigate'))
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 h-16 w-full px-4 transition-all duration-300 sm:px-6 lg:px-8',
        {
          'bg-card/75 shadow-md backdrop-blur': isScrolled
        },
        className
      )}
    >
      <div className='mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8'>
        {/* Logo */}
        <a href='#' onClick={handleHomeClick}>
          <span className='font-[family-name:var(--font-montserrat)] text-xl font-bold text-blue-600'>Alloclinic</span>
        </a>

        {/* Navigation */}
        <HeroNavigation navigationData={navigationData} />

        {/* Actions */}
        <div className='flex gap-3'>
          <SecondaryOrionButton
            className='font-[family-name:var(--font-montserrat)] !bg-white !text-blue-600 rounded-full border border-blue-600 !shadow-none hover:!bg-blue-50'
            asChild
          >
            <a href='#contact-us'>Contactez-nous</a>
          </SecondaryOrionButton>

          <HeroNavigationSmallScreen navigationData={navigationData} />
        </div>
      </div>
    </header>
  )
}

export default Header
