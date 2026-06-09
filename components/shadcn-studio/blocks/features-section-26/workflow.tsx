'use client'

import { useEffect, useState } from 'react'

import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import {
  MoreVerticalIcon,
  CheckIcon,
  CalendarIcon,
  LayoutDashboardIcon,
  PlugIcon,
  PhoneIcon,
  DatabaseIcon
} from 'lucide-react'

const connectingItems = [
  {
    id: 1,
    text: 'Connexion à vos agendas',
    icon: CalendarIcon,
    iconClassName: 'text-green-600'
  },
  {
    id: 2,
    text: 'Connexion à vos logiciels de gestion',
    icon: LayoutDashboardIcon,
    iconClassName: 'text-orange-500'
  },
  {
    id: 3,
    text: 'Connexion au numéro de téléphone',
    icon: PhoneIcon,
    iconClassName: 'text-blue-600'
  },
  {
    id: 4,
    text: 'Connexion à la base de donnée',
    icon: DatabaseIcon,
    iconClassName: 'text-green-600'
  }
]

const STEP_DURATION = 6000

const Workflow = ({
  activeTab,
  setActiveTab,
  setWorkflowProgress,
  initialTabId,
  isPaused = false
}: {
  activeTab: string
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
  setWorkflowProgress: React.Dispatch<React.SetStateAction<number>>
  initialTabId: string
  isPaused?: boolean
}) => {
  const fullText = 'Intégration de Alloclinic à vos logiciels'
  const initialInputValue = activeTab === 'review-and-refine'
    ? 'Installation terminée avec succès !'
    : activeTab === 'connect-tools'
      ? fullText
      : ''

  const [inputValue, setInputValue] = useState(initialInputValue)
  const [showConnecting, setShowConnecting] = useState(activeTab === 'connect-tools')
  const [showExecutionSummary, setShowExecutionSummary] = useState(activeTab === 'review-and-refine')

  const handleDescribeWorkflow = (cleanup: () => void) => {
    setActiveTab(initialTabId)
    setInputValue('')
    setShowConnecting(false)
    setShowExecutionSummary(false)

    const characters = fullText.split('')
    let currentCharIndex = 0

    const typingInterval = setInterval(() => {
      if (currentCharIndex < characters.length) {
        setInputValue(characters.slice(0, currentCharIndex + 1).join(''))
        currentCharIndex++
      } else {
        clearInterval(typingInterval)
      }
    }, STEP_DURATION / characters.length)

    // Register cleanup for this interval
    cleanup()

    return typingInterval
  }

  const handleConnectTools = () => {
    setActiveTab('connect-tools')
    setInputValue(fullText)
    setShowConnecting(true)
    setShowExecutionSummary(false)
  }

  const handleReviewAndRefine = () => {
    setActiveTab('review-and-refine')
    setInputValue('Installation terminée avec succès !')
    setShowConnecting(false)
    setShowExecutionSummary(true)
  }

  useEffect(() => {
    if (isPaused) {
      return
    }

    let activeIntervals: NodeJS.Timeout[] = []
    let currentAnimationFrameId: number | null = null
    let isRunning = false

    const clearAllIntervals = () => {
      activeIntervals.forEach(interval => clearInterval(interval))
      activeIntervals = []

      if (currentAnimationFrameId !== null) {
        cancelAnimationFrame(currentAnimationFrameId)
        currentAnimationFrameId = null
      }
    }

    // Determine starting step based on activeTab
    const getStartingStep = () => {
      if (activeTab === 'connect-tools') return 2
      if (activeTab === 'review-and-refine') return 3

      return 1 // initialTabId (describe-workflow)
    }

    const runWorkflow = (startStep: number = 1) => {
      if (isRunning) return
      isRunning = true

      clearAllIntervals()
      let step = startStep - 1 // We'll increment it first in runStep

      const runStep = () => {
        step++

        if (step > 3) {
          setTimeout(() => {
            isRunning = false
            runWorkflow()
          }, 1000)

          return
        }

        // Execute the appropriate step function
        let stepInterval: NodeJS.Timeout | undefined

        if (step === 1) {
          stepInterval = handleDescribeWorkflow(clearAllIntervals)
        } else if (step === 2) {
          handleConnectTools()
        } else if (step === 3) {
          handleReviewAndRefine()
        }

        if (stepInterval) {
          activeIntervals.push(stepInterval)
        }

        // Animate progress from 0 to 100 over STEP_DURATION
        setWorkflowProgress(0)

        const startTime = Date.now()

        const animateProgress = () => {
          const elapsed = Date.now() - startTime
          const progress = Math.min((elapsed / STEP_DURATION) * 100, 100)

          setWorkflowProgress(progress)

          if (progress < 100) {
            currentAnimationFrameId = requestAnimationFrame(animateProgress)
          } else {
            currentAnimationFrameId = null

            // Move to next step after current step completes
            runStep()
          }
        }

        currentAnimationFrameId = requestAnimationFrame(animateProgress)
      }

      runStep()
    }

    // Start workflow from the clicked tab's step
    const startingStep = getStartingStep()

    runWorkflow(startingStep)

    return () => {
      clearAllIntervals()
      isRunning = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, isPaused])

  return (
    <div
      className={cn(
        'bg-background relative z-1 w-full max-w-99 flex-col rounded-xl shadow-lg',
        showExecutionSummary
          ? 'bg-[color-mix(in_oklab,var(--color-green-600)_30%,var(--card))] dark:bg-[color-mix(in_oklab,var(--color-green-400)_30%,var(--card))]'
          : 'bg-[color-mix(in_oklab,var(--color-sky-600)_30%,var(--card))] dark:bg-[color-mix(in_oklab,var(--color-sky-400)_30%,var(--card))]'
      )}
    >
      {(showConnecting || showExecutionSummary) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className='overflow-hidden'
        >
          <motion.div
            transition={{ duration: 0.5 }}
            className={cn('flex items-center justify-between rounded-t-xl p-3 pb-2')}
          >
            <motion.span
              transition={{ duration: 0.5 }}
              className={cn(
                'text-sm font-medium',
                showExecutionSummary ? 'text-green-600 dark:text-green-400' : 'text-sky-600 dark:text-sky-400'
              )}
            >
              {showExecutionSummary ? "Résumé de l'installation" : 'Connection au logiciel'}
            </motion.span>
            <MoreVerticalIcon className={cn(
                                      'size-4',
                                      showExecutionSummary ? 'text-green-600 dark:text-green-400' : 'text-sky-600 dark:text-sky-400'
                                    )} />
          </motion.div>
        </motion.div>
      )}
      <div className='bg-card rounded-t-xl border border-blue-200 !border-b-0 p-4 pb-2.5'>
        <Textarea
          id='text-prompt'
          value={inputValue}
          onChange={() => setInputValue(inputValue)}
          placeholder='What can i do for you?'
          className='bg-card! field-sizing-content min-h-10 w-full resize-none rounded-none border-0 p-0 text-lg! shadow-none focus-visible:ring-0'
        />
      </div>
      <div className='bg-card rounded-b-xl border border-blue-200 !border-t-0 p-4 pt-0'>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex items-center gap-3'>
            <span
              className={cn(
                'text-sm font-medium',
                showExecutionSummary ? 'text-blue-600 dark:text-blue-400' : 'text-muted-foreground'
              )}
            >
              {showExecutionSummary ? 'Prêt à recevoir les appels' : 'Installation en cours...'}
            </span>
            <span className='h-5 w-px bg-blue-200' />
            <Button
              size='icon'
              className={cn(
                'text-primary focus-visible:ring-primary/20 dark:focus-visible:ring-primary/40 size-7!',
                showConnecting && !showExecutionSummary && 'bg-transparent text-blue-600 hover:bg-transparent',
                showExecutionSummary && 'bg-transparent hover:bg-transparent',
                !showConnecting && !showExecutionSummary && 'bg-primary/10 hover:bg-primary/20'
              )}
            >
              {showExecutionSummary ? (
                <PhoneIcon className='animate-phone-pulse text-blue-600' />
              ) : (
                <PlugIcon className='animate-phone-pulse text-blue-600' />
              )}
              <span className='sr-only'>Attach a file</span>
            </Button>
          </div>
          {showExecutionSummary && (
            <Button size='icon' className='size-7! bg-green-600 text-white hover:bg-green-700'>
              <CheckIcon />
              <span className='sr-only'>Send to LLM</span>
            </Button>
          )}
        </div>
        {showConnecting && !showExecutionSummary && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
            className='mt-6 space-y-3 overflow-hidden'
          >
            {connectingItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.3 }}
                className='flex items-center gap-2.5 text-sm'
              >
                <item.icon className={cn('size-4 shrink-0', item.iconClassName)} />
                <span className='text-muted-foreground'>
                  {item.id}. {item.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Workflow
