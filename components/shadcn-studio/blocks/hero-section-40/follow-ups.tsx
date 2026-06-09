'use client'
import ArrowBottom from '@/components/shadcn-studio/blocks/hero-section-40/arrow-bottom'
import ArrowRight from '@/components/shadcn-studio/blocks/hero-section-40/arrow-right'
import WorkflowItem from '@/components/shadcn-studio/blocks/hero-section-40/workflow-item'
import { CalendarDaysIcon, BellRingIcon, UsersIcon, TrendingDownIcon, PhoneCallIcon } from 'lucide-react'

const FollowUps = () => {
  return (
    <div className='flex max-md:flex-col max-md:space-y-8 md:items-center md:space-x-16'>
      <WorkflowItem
        type='input'
        badgeIcon={<CalendarDaysIcon className='size-4' />}
        icon={
          <CalendarDaysIcon />
        }
        title='Prise de rendez-vous'
        description="Intégration du rdv dans l'agenda par l'agent"
        time='0.0 sec'
        showTimeBadge={false}
        className='relative text-base'
      >
        {/* Arrow for large screens */}
        <ArrowRight delay={0.1} />

        {/* Arrow for small screens */}
        <ArrowBottom delay={0.1} />
      </WorkflowItem>

      <WorkflowItem
        type='action'
        icon={
          <BellRingIcon />
        }
        title='Déclenchement automatisé'
        time='1.6 sec'
        showTimeBadge={false}
        showActionBadge={false}
        delay={1.2}
        className='relative text-base'
      >
        <div className='bg-muted space-y-2.5 rounded-lg px-2.5 py-3'>
          <div className='flex items-center gap-2'>
            <img
              src='https://cdn.simpleicons.org/googlecalendar/4285F4'
              alt='Google Agenda logo'
              className='size-4.5'
            />
            <span className='text-muted-foreground text-sm'>Intégration de déclencheurs automatiques dans vos agendas</span>
          </div>
          <div className='flex items-center gap-2'>
            <img
              src='https://cdn.shadcnstudio.com/ss-assets/template/landing-page/orion/image-40.png'
              alt='SMS logo'
              className='size-4.5'
            />
            <span className='text-muted-foreground text-sm'>Envoi d&apos;un message de rappel 24h avant la consultation</span>
          </div>
          <div className='flex items-center gap-2'>
            <PhoneCallIcon className='size-4.5 text-blue-600 dark:text-blue-400' />
            <span className='text-muted-foreground text-sm'>Appel de l&apos;agent si le patient ne confirme pas le rendez-vous</span>
          </div>
        </div>
        {/* Arrow for large screens */}
        <ArrowRight delay={1.3} />

        {/* Arrow for small screens */}
        <ArrowBottom delay={1.3} />
      </WorkflowItem>

      <WorkflowItem
        type='output'
        icon={
          <TrendingDownIcon />
        }
        title='Réduction des no-shows de 20%'
        time='0.3 sec'
        showTimeBadge={false}
        delay={2.4}
        className='text-base'
      >
        <div className='flex items-center gap-2'>
          <UsersIcon className='text-muted-foreground size-6' />
          <div className='bg-muted rounded-lg px-2.5 py-3'>
            <span className='text-muted-foreground text-sm'>Diminution drastique des oublis de rendez-vous et erreurs d'emploi du temps.</span>
          </div>
        </div>
      </WorkflowItem>
    </div>
  )
}

export default FollowUps
