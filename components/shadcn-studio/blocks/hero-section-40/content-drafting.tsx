'use client'

import { motion } from 'motion/react'
import { Badge } from '@/components/ui/badge'

import ArrowBottom from '@/components/shadcn-studio/blocks/hero-section-40/arrow-bottom'
import ArrowRight from '@/components/shadcn-studio/blocks/hero-section-40/arrow-right'
import WorkflowItem from '@/components/shadcn-studio/blocks/hero-section-40/workflow-item'
import { MessageCircleIcon, SearchIcon, LoaderIcon, FileTextIcon, MessageSquareTextIcon, RouteIcon, ThumbsUpIcon, DatabaseIcon } from 'lucide-react'

const ContentDrafting = () => {
  return (
    <div className='flex max-md:flex-col max-md:space-y-8 md:items-start'>
      <WorkflowItem
        type='input'
        badgeIcon={<MessageCircleIcon className='size-4' />}
        icon={
          <MessageCircleIcon />
        }
        title="Demande d'information"
        description='Demande d&apos;information concernant le cabinet par le patient (Horaires, adresse, paiements, soins...)'
        time='0.0 sec'
        hasMenu={false}
        showHeaderTime={false}
        showTimeBadge={false}
        className='relative text-base md:mr-4 md:w-[360px] md:self-end'
      >
        <div className='bg-muted rounded-lg px-2.5 py-3'>
          <div className='inline-flex items-center gap-2 rounded-md border border-black/80 px-2 py-1 dark:border-white/80'>
            <RouteIcon className='size-4.5 text-blue-600 dark:text-blue-400' />
            <span className='text-foreground text-sm'>Deterministic Conversational Mapping</span>
          </div>
        </div>

        {/* Arrow for large screens */}
        <motion.svg
          width='137'
          height='223'
          viewBox='0 0 137 223'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='absolute top-9 -right-4 -translate-y-full max-md:hidden'
        >
          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
              delay: 0.1
            }}
            d='M6 210.038L12 216.038L6 222.038L0 216.038L6 210.038Z'
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
            d='M6 216.038V27.3579C6 16.3122 14.9543 7.3579 26 7.3579H135.712'
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
            d='M129.329 1L135.712 7.35817L129.329 13.7158'
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
          <SearchIcon />
        }
        title='Recherche information'
        time='16 sec'
        hasMenu={false}
        showHeaderTime={false}
        showTimeBadge={false}
        showActionBadge={false}
        delay={1.2}
        className='relative text-base md:-mt-[30px] md:mr-16'
      >
        <div className='bg-muted rounded-lg px-2.5 py-3'>
          <div className='flex items-center gap-2'>
            <DatabaseIcon className='size-5 text-green-600 dark:text-green-400' />
            <span className='text-muted-foreground text-sm'>Base de données</span>
          </div>
        </div>
        <div className='bg-muted space-y-2.5 rounded-lg px-2.5 py-3'>
          <div className='text-muted-foreground flex items-center justify-between gap-2'>
            <Badge variant='outline' className='h-auto rounded-sm px-1.5'>
              Recherche en cours ...
            </Badge>
            <LoaderIcon className='size-4' />
          </div>
          <p className='text-muted-foreground text-sm'>Recherche de l&apos;information du cabinet dans la base de données</p>
        </div>

        {/* Arrow for large screens */}
        <ArrowRight delay={1.3} className='translate-y-[calc(-50%-1.875rem)]' />

        {/* Arrow for small screens */}
        <ArrowBottom delay={1.3} />
      </WorkflowItem>

      <div className='flex flex-col gap-8 md:gap-6'>
        <WorkflowItem
          type='pending'
          badgeLabel='Note inférieure à 4/5'
          showTopBadge={false}
          icon={
            <MessageCircleIcon />
          }
          title='Génération de la réponse'
          time='6 min'
          hasMenu={false}
          showHeaderTime={false}
          showPendingAction={false}
          delay={2.4}
          className='relative text-base md:w-[360px]'
        >
          <div className='bg-muted rounded-lg px-2.5 py-3'>
            <p className='text-muted-foreground text-sm'>Réponse retourné au patient en accord avec les information de la base de données</p>
          </div>
          <div className='bg-muted rounded-lg px-2.5 py-3'>
            <div className='inline-flex items-center gap-2 rounded-md border border-black/80 px-2 py-1 dark:border-white/80'>
              <RouteIcon className='size-4.5 text-blue-600 dark:text-blue-400' />
              <span className='text-foreground text-sm'>Deterministic Conversational Mapping</span>
            </div>
          </div>

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
              d='M91.1494 104.312L84.7912 110.695L78.4336 104.313'
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
          title='Service client assuré'
          description='Service client toujours asuré par téléphone 24/7'
          time='4.1 sec'
          hasMenu={false}
          showHeaderTime={false}
          showTimeBadge={false}
          delay={3.6}
          className='text-base md:ml-41 md:w-72.5'
        />
      </div>
    </div>
  )
}

export default ContentDrafting
