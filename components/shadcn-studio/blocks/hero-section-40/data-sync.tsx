'use client'

import { motion } from 'motion/react'
import { Badge } from '@/components/ui/badge'

import ArrowBottom from '@/components/shadcn-studio/blocks/hero-section-40/arrow-bottom'
import WorkflowItem from '@/components/shadcn-studio/blocks/hero-section-40/workflow-item'
import { DatabaseIcon, SaveIcon, LoaderIcon, InboxIcon, ThumbsUpIcon, AppWindowIcon, RouteIcon, MessageCircleIcon } from 'lucide-react'

const DataSync = () => {
  return (
    <div className='flex max-md:flex-col max-md:space-y-8 md:items-start'>
      <WorkflowItem
        type='input'
        badgeIcon={<MessageCircleIcon className='size-4' />}
        icon={
          <MessageCircleIcon />
        }
        title='Demande de transmission de message'
        description='Le patient souhaite communiquer un message au cabinet'
        time='0.0 sec'
        showTimeBadge={false}
        className='relative text-base md:mt-10.5 md:mr-11.25 md:w-[340px]'
      >
        <div className='bg-muted rounded-lg px-2.5 py-3'>
          <div className='inline-flex items-center gap-2 rounded-md border border-black/80 px-2 py-1 dark:border-white/80'>
            <RouteIcon className='size-4.5 text-blue-600 dark:text-blue-400' />
            <span className='text-foreground text-sm'>Deterministic Conversational Mapping</span>
          </div>
        </div>

        {/* Arrow for large screens */}
        <motion.svg
          width='103'
          height='121'
          viewBox='0 0 103 121'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='absolute top-full right-0 translate-x-11.25 -translate-y-1.5 max-md:hidden'
        >
          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
              delay: 0.1
            }}
            d='M6 0L12 6L6 12L0 6L6 0Z'
            fill='var(--color-blue-600)'
            className='dark:fill-[color-mix(in_oklab,var(--color-sky-400)35%,var(--background))]'
          />
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
              delay: 0.4
            }}
            d='M6 6V93.2683C6 104.314 14.9543 113.268 26 113.268H101.997'
            stroke='var(--color-blue-600)'
            strokeWidth='2'
            className='dark:stroke-[color-mix(in_oklab,var(--color-sky-400)35%,var(--background))]'
          />
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: {
                duration: 0.35,
                ease: 'easeInOut',
                delay: 0.9
              },
              opacity: { duration: 0.1, delay: 0.9 }
            }}
            d='M95.6143 106.91L101.997 113.269L95.6146 119.626'
            stroke='var(--color-blue-600)'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='dark:stroke-[color-mix(in_oklab,var(--color-sky-400)35%,var(--background))]'
          />
        </motion.svg>

        {/* Arrow for small screens */}
        <ArrowBottom delay={0.1} />
      </WorkflowItem>

      <WorkflowItem
        type='action'
        icon={
          <SaveIcon />
        }
        title='Enregistrement du mesage'
        time='16 sec'
        showTimeBadge={false}
        showActionBadge={false}
        actionBadgeIcon={<RouteIcon className='size-4.5 text-blue-600 dark:text-blue-400' />}
        delay={1.2}
        className='relative text-base md:mt-56 md:mr-3.5'
      >
        <div className='bg-muted rounded-lg px-2.5 py-3'>
          <div className='flex items-center gap-2'>
            <DatabaseIcon className='size-4.5 text-green-600 dark:text-green-400' />
            <span className='text-muted-foreground text-sm'>Base de données</span>
          </div>
        </div>
        <div className='bg-muted space-y-2.5 rounded-lg px-2.5 py-3'>
          <div className='text-muted-foreground flex items-center justify-between gap-2'>
            <Badge variant='outline' className='h-auto rounded-sm px-1.5'>
              Enregistrement du message ...
            </Badge>
            <LoaderIcon className='size-4' />
          </div>
          <p className='text-muted-foreground text-sm'>
            L&apos;agent enregistre le message dans la base de données
            <br />
            Envoi confirmation au patient de la prise du message.
          </p>
        </div>

        {/* Arrow for large screens */}
        <motion.svg
          width='134'
          height='121'
          viewBox='0 0 134 121'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='absolute top-9 -right-3.5 -translate-y-full max-md:hidden'
        >
          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
              delay: 1.3
            }}
            d='M6 108.626L12 114.626L6 120.626L0 114.626L6 108.626Z'
            fill='var(--color-blue-600)'
            className='dark:fill-[color-mix(in_oklab,var(--color-sky-400)35%,var(--background))]'
          />
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
              delay: 1.6
            }}
            d='M6 114.626V27.3579C6 16.3122 14.9543 7.35791 26 7.35791H132.311'
            stroke='var(--color-blue-600)'
            strokeWidth='2'
            className='dark:stroke-[color-mix(in_oklab,var(--color-sky-400)35%,var(--background))]'
          />
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: {
                duration: 0.35,
                ease: 'easeInOut',
                delay: 2.1
              },
              opacity: { duration: 0.1, delay: 2.1 }
            }}
            d='M125.928 1L132.31 7.35817L125.928 13.7158'
            stroke='var(--color-blue-600)'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='dark:stroke-[color-mix(in_oklab,var(--color-sky-400)35%,var(--background))]'
          />
        </motion.svg>

        {/* Arrow for small screens */}
        <ArrowBottom delay={1.3} />
      </WorkflowItem>

      <div className='flex flex-col gap-8 md:gap-6'>
        <WorkflowItem
          type='pending'
          badgeLabel='En attente ...'
          icon={
            <InboxIcon />
          }
          title='Message en attente'
          time='24 min'
          showTimeBadge={false}
          showHeaderTime={false}
          showPendingAction={false}
          delay={2.4}
          className='relative text-base md:w-[340px]'
        >
          <div className='bg-muted rounded-lg px-2.5 py-3'>
            <div className='flex items-center gap-2'>
              <AppWindowIcon className='size-4.5 text-blue-600 dark:text-blue-400' />
              <span className='text-muted-foreground text-sm'>Dashboard Alloclinic</span>
            </div>
          </div>
          <p className='text-muted-foreground text-sm'>Message accessible dans le daschboard Alloclinic et envoyé par mail au cabinet.</p>

          {/* Arrow for large screens */}
          <motion.svg
            width='93'
            height='112'
            viewBox='0 0 93 112'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='absolute -bottom-13.5 left-full -translate-x-1.5 max-md:hidden'
          >
            <motion.path
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.5,
                ease: 'easeInOut',
                delay: 2.5
              }}
              d='M6 0L12 6L6 12L0 6L6 0Z'
              fill='var(--color-blue-600)'
              className='dark:fill-[color-mix(in_oklab,var(--color-sky-400)35%,var(--background))]'
            />
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 0.5,
                ease: 'easeInOut',
                delay: 2.8
              }}
              d='M6 6H64.792C75.8377 6 84.792 14.9543 84.792 26V110.695'
              stroke='var(--color-blue-600)'
              strokeWidth='2'
              className='dark:stroke-[color-mix(in_oklab,var(--color-sky-400)35%,var(--background))]'
            />
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: {
                  duration: 0.35,
                  ease: 'easeInOut',
                  delay: 3.3
                },
                opacity: { duration: 0.1, delay: 3.3 }
              }}
              d='M91.1494 104.146L84.7912 110.528L78.4336 104.146'
              stroke='var(--color-blue-600)'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='dark:stroke-[color-mix(in_oklab,var(--color-sky-400)35%,var(--background))]'
            />
          </motion.svg>

          {/* Arrow for small screens */}
          <ArrowBottom delay={2.5} />
        </WorkflowItem>

        <WorkflowItem
          type='output'
          icon={
            <ThumbsUpIcon />
          }
          title='Message traité'
          time='4.1 sec'
          showTimeBadge={false}
          delay={3.6}
          className='text-base md:ml-41 md:w-[350px]'
        >
          <div className='bg-muted rounded-lg px-2.5 py-3'>
            <div className='flex items-center gap-2'>
              <AppWindowIcon className='size-4.5 text-blue-600 dark:text-blue-400' />
              <span className='text-muted-foreground text-sm'>Dashboard Alloclinic</span>
            </div>
          </div>
          <p className='text-muted-foreground text-sm'>Message lu et traité par la secrétaire médicale</p>
        </WorkflowItem>
      </div>
    </div>
  )
}

export default DataSync
