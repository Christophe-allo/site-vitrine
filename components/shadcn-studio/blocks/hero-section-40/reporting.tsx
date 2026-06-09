'use client'
import ArrowBottom from '@/components/shadcn-studio/blocks/hero-section-40/arrow-bottom'
import ArrowRight from '@/components/shadcn-studio/blocks/hero-section-40/arrow-right'
import WorkflowItem from '@/components/shadcn-studio/blocks/hero-section-40/workflow-item'
import { FileAudioIcon, FileChartPieIcon, FileSpreadsheetIcon, FileTextIcon, PhoneCallIcon, PhoneIcon, PhoneOffIcon, DatabaseIcon, RefreshCcwDotIcon } from 'lucide-react'

const Reporting = () => {
  return (
    <div className='flex max-md:flex-col max-md:space-y-8 md:items-center md:space-x-16'>
      <WorkflowItem
        type='input'
        badgeIcon={<PhoneIcon className='size-4' />}
        icon={
          <PhoneOffIcon />
        }
        title="Fin d'appel"
        description="L'agent active un rapport d'appel"
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
          <FileChartPieIcon />
        }
        title="Récupération données d'appel"
        time='18 sec'
        showTimeBadge={false}
        showActionBadge={false}
        delay={1.2}
        className='relative text-base'
      >
        <div className='bg-muted space-y-2.5 rounded-lg px-2.5 py-3'>
          <div className='flex items-center gap-2'>
            <RefreshCcwDotIcon className='size-5 text-blue-600 dark:text-blue-400' />
            <span className='text-muted-foreground text-sm'>Transcription de l'appel, audio, données du patient ...</span>
          </div>
          <div className='flex items-center gap-2'>
            <DatabaseIcon className='size-5 text-green-600 dark:text-green-400' />
            <span className='text-muted-foreground text-sm'>Transfert des imports dans base de données</span>
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
          <FileSpreadsheetIcon />
        }
        title="Génération du Tableau d'appel"
        description="Transfère automatisé des données vers le tableau d'appel"
        time='1.1 sec'
        showTimeBadge={false}
        delay={2.4}
        className='text-base md:w-72.5'
      >
        <div className='bg-muted space-y-2.5 rounded-lg px-2.5 py-3'>
          <div className='flex items-center gap-2'>
            <img
              src='https://cdn.shadcnstudio.com/ss-assets/template/landing-page/orion/image-44.png'
              alt='Sheets logo'
              className='size-4.5'
            />
            <span className='text-muted-foreground text-sm'>Données de l&apos;appel et du patient collecté</span>
          </div>
          <div className='flex items-center gap-2'>
            <FileTextIcon className='size-4.5 text-orange-500 dark:text-orange-400' />
            <span className='text-muted-foreground text-sm'>Transcription</span>
          </div>
          <div className='flex items-center gap-2'>
            <FileAudioIcon className='size-4.5 text-blue-500 dark:text-blue-400' />
            <span className='text-muted-foreground text-sm'>Audio</span>
          </div>
        </div>
      </WorkflowItem>
    </div>
  )
}

export default Reporting
