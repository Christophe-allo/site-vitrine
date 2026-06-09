'use client'

import { useEffect, useState, type MouseEvent, type ReactNode } from 'react'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet'
import { PrimaryOrionButton } from '@/components/ui/orion-button'

import { cn } from '@/lib/utils'

import OrionLogo from '@/assets/svg/orion-logo'
import { MenuIcon, ChevronRightIcon, CircleSmallIcon } from 'lucide-react'

type NavigationSection = {
  type: 'section'
  title: string
  items: NavigationItem[]
}

type NavigationItem = {
  title: string
  href: string
  targetTab?: string
  icon?: ReactNode
  badge?: ReactNode
  description?: string
}

type Navigation = {
  title: string
  contentClassName?: string
} & (
  | {
      items: NavigationSection[]
      splitItems: true
      href?: never
    }
  | {
      items: NavigationItem[]
      splitItems?: never | false
      href?: never
    }
  | {
      items?: never
      splitItems?: never
      href: string
    }
)

const ListItem = (props: {
  title: NavigationItem['title']
  href: NavigationItem['href']
  targetTab?: NavigationItem['targetTab']
  icon?: NavigationItem['icon']
  badge?: NavigationItem['badge']
  description?: NavigationItem['description']
  splitItems?: boolean
}) => {
  const { title, href, targetTab, icon, badge, description, splitItems } = props

  const handleClick = () => {
    if (!targetTab || typeof window === 'undefined') {
      return
    }

    window.dispatchEvent(
      new CustomEvent('hero-tab:navigate', {
        detail: { tab: targetTab }
      })
    )
  }

  return (
    <li className={cn({ 'h-19.5': description && splitItems })}>
      <NavigationMenuLink
        href={href}
        onClick={handleClick}
        className={cn({ 'flex flex-row items-start gap-2': icon })}
      >
        {icon && (
          <span className='bg-popover [&>svg]:text-popover-foreground! flex aspect-square size-7.5 shrink-0 items-center justify-center rounded-sm border [&>svg]:size-4.5!'>
            {icon}
          </span>
        )}
        {description ? (
          <div className='space-y-1'>
            <div className={cn('font-medium', { 'flex items-center gap-1.5': badge })}>
              {title}
              {badge}
            </div>
            <p className='text-muted-foreground line-clamp-2'>{description}</p>
          </div>
        ) : (
          <div className={cn('font-medium', { 'flex items-center gap-1.5': badge })}>
            {title}
            {badge}
          </div>
        )}
      </NavigationMenuLink>
    </li>
  )
}

const HeroNavigation = ({
  navigationData,
  navigationClassName
}: {
  navigationData: Navigation[]
  navigationClassName?: string
}) => {
  const handleRootLinkClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) {
      return
    }

    const target = document.querySelector(href)

    if (!target) {
      return
    }

    event.preventDefault()
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  return (
    <NavigationMenu viewport={false} className={cn('hidden lg:block', navigationClassName)}>
      <NavigationMenuList className='flex-wrap gap-0'>
        {navigationData.map(navItem => {
          if (navItem.href) {
            // Root link item
            return (
              <NavigationMenuItem key={navItem.title}>
                <NavigationMenuLink
                  href={navItem.href}
                  onClick={(event) => handleRootLinkClick(event, navItem.href)}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'bg-transparent px-3 py-1.5 text-base text-blue-600 hover:bg-transparent hover:text-blue-500 focus:bg-transparent focus:text-blue-500'
                  )}
                >
                  {navItem.title}
                </NavigationMenuLink>
              </NavigationMenuItem>
            )
          }

          // Section with dropdown
          return (
            <NavigationMenuItem key={navItem.title}>
              <NavigationMenuTrigger className='bg-transparent px-3 py-1.5 text-base text-blue-600 hover:bg-transparent hover:text-blue-500 focus:bg-transparent focus:text-blue-500 data-open:bg-transparent data-open:text-blue-500 data-open:hover:bg-transparent data-open:hover:text-blue-500 data-open:focus:bg-transparent data-open:focus:text-blue-500 [&_svg]:ml-2 [&_svg]:size-4'>
                {navItem.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent className='absolute left-1/2 w-auto -translate-x-1/2 shadow-lg!'>
                {navItem.splitItems ? (
                  <div className={cn('grid grid-cols-1 gap-2', navItem.contentClassName)}>
                    {navItem.items.map(section => (
                      <div key={section.title} className='grid grid-cols-1 gap-3'>
                        <div className='text-muted-foreground px-2 text-sm'>{section.title}</div>
                        <ul
                          className={cn('grid grid-cols-1 gap-0.5', {
                            'gap-3': section.items.find(item => item.description)
                          })}
                        >
                          {section.items.map((item, index) => (
                            <ListItem
                              key={index}
                              icon={item.icon}
                              title={item.title}
                              description={item.description}
                              href={item.href}
                              targetTab={item.targetTab}
                              badge={item.badge}
                              splitItems={navItem.splitItems}
                            />
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul
                    className={cn(
                      'grid grid-cols-1 gap-0.5',
                      { 'gap-2': navItem.items?.find(item => item.description) },
                      navItem.contentClassName
                    )}
                  >
                    {navItem.items?.map((item, index) => (
                      <ListItem
                        key={index}
                        icon={item.icon}
                        title={item.title}
                        description={item.description}
                        href={item.href}
                        targetTab={item.targetTab}
                        badge={item.badge}
                      />
                    ))}
                  </ul>
                )}
              </NavigationMenuContent>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const HeroNavigationSmallScreen = ({
  navigationData,
  triggerClassName,
  screenSize = 1023
}: {
  navigationData: Navigation[]
  triggerClassName?: string
  screenSize?: number
}) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${screenSize}px)`)
    const handleChange = (matches: boolean) => {
      if (!matches) {
        setOpen(false)
      }
    }

    handleChange(mediaQuery.matches)

    const listener = (event: MediaQueryListEvent) => {
      handleChange(event.matches)
    }

    mediaQuery.addEventListener('change', listener)

    return () => {
      mediaQuery.removeEventListener('change', listener)
    }
  }, [screenSize])

  const handleLinkClick = () => {
    setOpen(false)
  }

  const handleRootLinkClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) {
      handleLinkClick()
      return
    }

    const target = document.querySelector(href)

    if (!target) {
      handleLinkClick()
      return
    }

    event.preventDefault()
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
    handleLinkClick()
  }

  const handleTargetTabClick = (targetTab?: string) => {
    if (targetTab) {
      window.dispatchEvent(
        new CustomEvent('hero-tab:navigate', {
          detail: { tab: targetTab }
        })
      )
    }

    handleLinkClick()
  }

  const handleHomeClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    window.dispatchEvent(new CustomEvent('hero-home:navigate'))
    handleLinkClick()
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <PrimaryOrionButton className={cn('inline-flex size-10 px-0 lg:hidden', triggerClassName)}>
          <MenuIcon />
          <span className='sr-only'>Menu</span>
        </PrimaryOrionButton>
      </SheetTrigger>
      <SheetContent side='left' className='w-75 gap-0 p-0'>
        <SheetHeader className='p-4'>
          <SheetTitle hidden />
          <SheetDescription hidden />
          <a href='#' onClick={handleHomeClick} className='self-start'>
            <div className='flex items-center gap-3'>
              <OrionLogo className='size-8' />
              <span className='font-[family-name:var(--font-montserrat)] text-xl font-bold text-blue-600'>Alloclinic</span>
            </div>
          </a>
        </SheetHeader>
        <div className='space-y-0.5 overflow-y-auto p-2'>
          {navigationData.map((navItem, index) => {
            if (navItem.href) {
              return (
                <a
                  key={navItem.title}
                  href={navItem.href}
                  className='hover:bg-accent flex items-center gap-2 rounded-sm px-3 py-2 text-sm text-blue-600'
                  onClick={(event) => handleRootLinkClick(event, navItem.href)}
                >
                  {navItem.title}
                </a>
              )
            }

            return (
              <Collapsible key={index} className='w-full'>
                <CollapsibleTrigger className='hover:bg-accent group flex w-full items-center justify-between rounded-sm px-3 py-2 text-sm text-blue-600'>
                  <div className='flex items-center gap-2'>{navItem.title}</div>
                  <ChevronRightIcon className='size-4 shrink-0 transition-transform duration-300 group-data-open:rotate-90' />
                </CollapsibleTrigger>
                <CollapsibleContent className='data-closed:animate-collapsible-up data-open:animate-collapsible-down overflow-hidden transition-all duration-300'>
                  {navItem.splitItems
                    ? navItem.items.map((item, i) => (
                        <div key={i} className='mt-1.5'>
                          <div className='text-muted-foreground mb-1 pl-4.5 text-xs font-medium'>{item.title}</div>
                          {item.items.map((subItem, j) => (
                            <a
                              key={j}
                              href={subItem.href}
                              className='hover:bg-accent ml-4.5 flex items-center gap-2 rounded-sm px-3 py-2 text-sm'
                              onClick={() => handleTargetTabClick(subItem.targetTab)}
                            >
                              {subItem.icon ? (
                                subItem.icon
                              ) : (
                                <CircleSmallIcon className='size-4' />
                              )}
                              {subItem.title}
                            </a>
                          ))}
                        </div>
                      ))
                    : navItem.items?.map(item => (
                        <a
                          key={item.title}
                          href={item.href}
                          className='hover:bg-accent ml-3 flex items-center gap-2 rounded-sm px-3 py-2 text-sm'
                          onClick={() => handleTargetTabClick(item.targetTab)}
                        >
                          {item.icon ? (
                            item.icon
                          ) : (
                            <CircleSmallIcon className='size-4' />
                          )}
                          {item.title}
                        </a>
                      ))}
                </CollapsibleContent>
              </Collapsible>
            )
          })}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export { HeroNavigation, HeroNavigationSmallScreen, type Navigation, type NavigationItem, type NavigationSection }
