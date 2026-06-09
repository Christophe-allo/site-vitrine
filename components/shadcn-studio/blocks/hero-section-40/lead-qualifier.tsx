'use client'

import { motion } from 'motion/react'
import { Badge } from '@/components/ui/badge'

import ArrowBottom from '@/components/shadcn-studio/blocks/hero-section-40/arrow-bottom'
import WorkflowItem from '@/components/shadcn-studio/blocks/hero-section-40/workflow-item'
import { FileInputIcon, ArrowDownUpIcon, CalendarDaysIcon, PhoneIcon, RouteIcon, DatabaseIcon } from 'lucide-react'

const LeadQualifier = () => {
  return (
    <div className='flex max-md:flex-col max-md:space-y-8 md:items-start'>
      <WorkflowItem
        type='input'
        badgeLabel='Input'
        badgeIcon={
          <PhoneIcon className='size-4' />
        }
        icon={
          <FileInputIcon />
        }
        title='Appel entrant'
        description='Reconnaissance des patients deja enregistres et creation des nouveaux dossiers patients dans votre base de donnees.'
        time='54 sec'
        className='relative text-base md:mr-22'
      >
        <div className='bg-muted space-y-2.5 rounded-lg px-2.5 py-3'>
          <Badge variant='outline' className='h-auto rounded-sm px-1.5'>
            Création dossier patient ...
          </Badge>
          <div className='flex items-center gap-2'>
            <img
              src='https://cdn.shadcnstudio.com/ss-assets/template/landing-page/orion/image-44.png'
              alt='Sheets logo'
              className='size-4.5'
            />
            <span className='text-muted-foreground text-sm'>Dossiers patients</span>
          </div>
          <div className='flex items-center gap-2'>
            <DatabaseIcon className='size-4.5 text-green-600 dark:text-green-400' />
            <span className='text-muted-foreground text-sm'>Base de données</span>
          </div>
        </div>

        {/* Arrow for large screens */}
        <motion.svg
          width='121'
          height='87'
          viewBox='0 0 121 87'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='absolute right-1.5 bottom-5.5 translate-x-full max-md:hidden'
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
            d='M6 6H93.2683C104.314 6 113.268 14.9543 113.268 26V85.671'
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
            d='M106.91 79.2884L113.268 85.671L119.626 79.2887'
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
          <ArrowDownUpIcon />
        }
        title='Recherche de créneaux disponibles'
        time='0,1 sec'
        delay={1.2}
        showTimeBadge={false}
        actionBadgeIcon={
          <RouteIcon className='size-4.5 text-blue-600 dark:text-blue-400' />
        }
        className='relative text-base md:mt-68 md:mr-15'
      >
        <div className='bg-muted rounded-lg px-2.5 py-3'>
          <p className='text-muted-foreground text-sm'>Echange avec le patient supporté par notre technologie de Deterministic Conversational Mapping.</p>
        </div>

        {/* Arrow for large screens */}
        <motion.svg
          width='151'
          height='121'
          viewBox='0 0 151 121'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='absolute top-9 right-0 translate-x-15 -translate-y-full max-md:hidden'
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
            d='M6 114.626V27.3579C6 16.3122 14.9543 7.35791 26 7.35791H149.146'
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
            d='M142.763 1L149.145 7.35817L142.763 13.7158'
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

      <WorkflowItem
        type='output'
        icon={
          <CalendarDaysIcon />
        }
        title='Prise de rendez-vous'
        description='Intégration des rendez-vous dans vos agendas de manière fluide et précise.'
        time='0.0 sec'
        delay={2.4}
        className='text-base md:mt-17'
      >
        <div className='bg-muted space-y-2.5 rounded-lg px-2.5 py-3'>
          <Badge variant='outline' className='h-auto rounded-sm px-1.5'>
            Saisie des rendez-vous ...
          </Badge>
          <div className='flex items-center gap-2'>
            <img
              src='https://cdn.shadcnstudio.com/ss-assets/template/landing-page/orion/image-40.png'
              alt='Analyzing data logo'
              className='size-4.5'
            />
            <span className='text-muted-foreground text-sm'>Message de confirmation au patient</span>
          </div>
          <div className='flex items-center gap-2'>
            <img
              src='https://cdn.simpleicons.org/googlecalendar/4285F4'
              alt='Google Agenda logo'
              className='size-4.5'
            />
            <span className='text-muted-foreground text-sm'>Intégration dans vos agendas.</span>
          </div>
        </div>
      </WorkflowItem>
    </div>
  )
}

export default LeadQualifier
