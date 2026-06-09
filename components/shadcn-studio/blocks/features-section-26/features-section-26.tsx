'use client'

// React Imports
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'

import DottedSheet from '@/components/shadcn-studio/blocks/features-section-26/dotted-sheet'
import Workflow from '@/components/shadcn-studio/blocks/features-section-26/workflow'

// Util Imports
import { cn } from '@/lib/utils'

type DataType = {
  id: string
  icon: ReactNode
  title: string
  description: string
}

const STEP_DURATION = 6000

const Features = ({ data }: { data: DataType[] }) => {
  const [activeTab, setActiveTab] = useState<string>(data[0].id)
  const [isAutoFlowPaused, setIsAutoFlowPaused] = useState(false)

  useEffect(() => {
    if (isAutoFlowPaused || activeTab !== data[0].id) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setActiveTab(data[1]?.id ?? data[0].id)
    }, STEP_DURATION)

    return () => window.clearTimeout(timeoutId)
  }, [activeTab, data, isAutoFlowPaused])

  const handlePressStart = (event: React.PointerEvent<HTMLDivElement>, tabId: string) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    setIsAutoFlowPaused(true)
    setActiveTab(tabId)
  }

  const handlePressEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    setIsAutoFlowPaused(false)
  }

  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <div>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <h2 className='mb-[100px] text-center font-[family-name:var(--font-montserrat)] text-2xl font-semibold md:text-3xl lg:text-4xl'>
            Comment se passe l&apos;installation de Alloclinic
          </h2>
          <div className='grid border border-blue-200 max-lg:divide-y max-lg:divide-y-reverse max-lg:divide-blue-200 lg:grid-cols-2 lg:divide-x lg:divide-blue-200'>
            <div className='grid h-full grid-rows-3 divide-y divide-blue-200 max-lg:order-2'>
              {data.map(tab => {
                const isActive = activeTab === tab.id

                return (
                  <div
                    key={tab.id}
                    role='button'
                    tabIndex={0}
                    onPointerDown={event => handlePressStart(event, tab.id)}
                    onPointerUp={handlePressEnd}
                    onPointerCancel={handlePressEnd}
                    onKeyDown={event => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        setIsAutoFlowPaused(true)
                        setActiveTab(tab.id)
                      }
                    }}
                    onKeyUp={event => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        setIsAutoFlowPaused(false)
                      }
                    }}
                    className={cn(
                      'focus-visible:ring-ring/50 relative flex cursor-pointer select-text flex-col gap-5 px-6 py-9 text-left transition-colors duration-300 outline-none focus-visible:z-1 focus-visible:ring-3'
                    )}
                  >
                    <div className='flex items-center gap-5'>
                      <span className={cn('text-muted-foreground [&>svg]:size-4.5', { 'text-foreground': isActive })}>
                        {tab.icon}
                      </span>
                      <h3 className={cn('font-[family-name:var(--font-montserrat)] text-muted-foreground text-xl font-medium', { 'text-foreground': isActive })}>
                        {tab.title}
                      </h3>
                    </div>
                    <p className='text-muted-foreground'>{tab.description}</p>
                    {isActive && (
                      <div data-state='workflow-progress' className='absolute inset-x-0 bottom-0 left-0 h-0.5 overflow-hidden'>
                        <div
                          key={activeTab}
                          className={cn(
                            'h-full origin-left animate-feature-26-progress bg-blue-600',
                            isAutoFlowPaused && '[animation-play-state:paused]'
                          )}
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <div className='relative flex items-center justify-center overflow-hidden px-4 max-lg:h-100'>
              <DottedSheet className='absolute inset-0 h-full w-full' />
              <div className='absolute inset-0 bg-[radial-gradient(circle,transparent_0%,var(--background)_80%)]' />
              {activeTab === data[0].id ? (
                <img
                  src='/images/audit.jpg'
                  alt='Audit de l’installation médicale'
                  className='relative z-1 h-auto w-full max-w-124 rounded-xl object-cover shadow-lg'
                />
              ) : (
                <Workflow
                  key={activeTab}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  setWorkflowProgress={() => {}}
                  initialTabId={data[0].id}
                  isPaused={isAutoFlowPaused}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
