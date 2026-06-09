'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PrimaryOrionButton } from '@/components/ui/orion-button'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'

import LeadQualifier from '@/components/shadcn-studio/blocks/hero-section-40/lead-qualifier'
import MeetingPrep from '@/components/shadcn-studio/blocks/hero-section-40/meeting-prep'
import FollowUps from '@/components/shadcn-studio/blocks/hero-section-40/follow-ups'
import DataSync from '@/components/shadcn-studio/blocks/hero-section-40/data-sync'
import Reporting from '@/components/shadcn-studio/blocks/hero-section-40/reporting'
import ContentDrafting from '@/components/shadcn-studio/blocks/hero-section-40/content-drafting'
import LogoCloud from '@/components/shadcn-studio/blocks/logo-cloud-04/logo-cloud-04'
import Features from '@/components/shadcn-studio/blocks/features-section-17/features-section-17'
import FeaturesSection09, {
  AppointmentBookingDemo,
  CalendarRangeSingleMonthDemo,
  PractitionerSettingsDemo,
  SimultaneousCallsDemo
} from '@/components/shadcn-studio/blocks/features-section-09/features-section-09'
import FeaturesSection26 from '@/components/shadcn-studio/blocks/features-section-26/features-section-26'
import {
  RefreshCcwIcon,
  BellRingIcon,
  SendIcon,
  FileSpreadsheetIcon,
  HeadsetIcon,
  PhoneIcon,
  SearchIcon,
  PlugIcon,
  PencilIcon,
  CalendarDaysIcon,
  ProportionsIcon,
  ShieldCheckIcon,
  ChartSplineIcon,
  HeartPulse,
  Compass,
  PhoneForwarded
} from 'lucide-react'

type CalQueueItem = unknown[]
type CalApi = ((...args: unknown[]) => unknown) & {
  loaded?: boolean
  ns?: Record<string, CalApi>
  q?: CalQueueItem[]
}

declare global {
  interface Window {
    Cal?: CalApi
  }
}

const CAL_NAMESPACE = '30min'
const CAL_ELEMENT_SELECTOR = '#my-cal-inline-30min'
const CAL_ORIGIN = 'https://app.cal.eu'
const CAL_SCRIPT_SRC = `${CAL_ORIGIN}/embed/embed.js`
const CAL_LINK = 'alloclinic/30min'
const CAL_MINIMUM_LOADING_TIME = 500

const tabs = [
  {
    name: 'Prise de rendez-vous',
    value: 'lead-qualifier',
    icon: (
      <PhoneIcon />
    ),
    content: <LeadQualifier />
  },
  {
    name: 'Déplacement et annulation',
    value: 'meeting-prep',
    icon: (
      <RefreshCcwIcon />
    ),
    content: <MeetingPrep />
  },
  {
    name: 'Rappel de rendez-vous',
    value: 'follow-ups',
    icon: (
      <BellRingIcon />
    ),
    content: <FollowUps />
  },
  {
    name: 'Transmission message',
    value: 'data-sync',
    icon: (
      <SendIcon />
    ),
    content: <DataSync />
  },
  {
    name: "Demande d'information",
    value: 'content-drafting',
    icon: (
      <HeadsetIcon />
    ),
    content: <ContentDrafting />
  },
  {
    name: "Tableau d'appels",
    value: 'reporting',
    icon: (
      <FileSpreadsheetIcon />
    ),
    content: <Reporting />
  }
]

const brandLogos = [
  {
    image: '/logos-medicaux/eclinicalworks-seeklogo.svg',
    name: 'eClinicalWorks',
    className: 'h-6 translate-y-1'
  },
  {
    image: '/logos-medicaux/simple-practice-clean.png',
    name: 'Simple Practice',
    className: 'h-8'
  },
  {
    image: '/logos-medicaux/athenahealth-clean.svg',
    name: 'athenahealth',
    className: 'h-8'
  },
  {
    image: '/logos-medicaux/logo-doctolib-svg.png',
    name: 'Doctolib',
    className: 'h-8'
  },
  {
    image: '/logos-medicaux/nextgen-healthcare-seeklogo.png',
    name: 'NextGen Healthcare',
    className: 'h-8'
  },
  {
    image: '/logos-medicaux/logo-maiia.png',
    name: 'Maiia',
    className: 'h-8'
  }
]

const deterministicSectionsData = [
  {
    badge: 'Une conversation avec le patient maîtrisée',
    title: (
      <>
        Des réponses programmées,
        <br />
        jamais improvisées...
      </>
    ),
    description: 'Basés sur des prompts et non du code, les agents IA peuvent produire des réponses imprécises ou inventées. C’est pourquoi le parcours de conversation de notre agent est codé de A à Z.',
    contentClassName: 'lg:w-[calc(100%+60px)]',
    features: [
      {
        title: 'La conversation, sans les hallucinations :',
        description: 'chaque réponse suit un parcours codé et validé.'
      },
      {
        title: 'Notre technologie DCM :',
        description: 'génère des réponses programmées à partir du contexte et de mots-clés précis, évitant ainsi les réponses improvisées que peuvent parfois produire les agents IA.'
      },
      {
        title: 'Un devoir d\'excellence :',
        description: (
          <>
            via les réponses de l&apos;agent, c&apos;est aussi la parole et la réputation du cabinet qui sont engagées.
            <span className='mt-[30px] block text-sm text-muted-foreground'>
              *Deterministic Conversational Mapping<sup className='relative -top-0.5 text-[0.65em]'>©</sup>
            </span>
          </>
        )
      }
    ],
    image: {
      src: '/images/features-top.jpg',
      alt: 'Financial Dashboard'
    },
    hideImage: true
  },
  {
    badge: 'réduction du temps de latence',
    contentClassName: 'lg:-ml-[60px] lg:w-[calc(100%+60px)]',
    title: (
      <>
        Une vitesse de réponse{' '}
        <motion.span
          className='font-bold'
          animate={{ color: ['var(--color-sky-400)', 'var(--color-blue-600)', 'var(--color-sky-400)'] }}
          transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
        >
          5x
        </motion.span>{' '}
        plus rapide que les agents IA.
      </>
    ),
    description: 'La latence des réponses peut créer du doute, casser l’échange et faire décrocher le patient. C’est pourquoi les réponses de l\'agent Alloclinic sont sous les 300 ms.',
    features: [
      {
        title: 'Une expérience plus fluide :',
        description: (
          <>
            la réponse arrive immédiatement
            <br />
            (&lt; 300 ms), le patient ne se demande pas si l’agent cherche ou a mal compris.
          </>
        )
      },
      {
        title: 'Une meilleure conversion :',
        description: 'moins d’abandon et d’agacement liés aux délais de réponse souvent perçus avec les IA génératives, plus de rendez-vous menés au bout.'
      },
      {
        title: 'La réputation du cabinet :',
        description: 'chaque échange reflète le sérieux et la qualité de votre cabinet.'
      }
    ],
    image: {
      src: '/images/features-bottom.jpg',
      alt: 'Dashboard Wireframe'
    },
    showSpeedometer: true
  }
]

const alloclinicBenefitsSectionsData = [
  {
    badge: 'Ne manquez plus aucun appel',
    title: (
      <>
        Une augmentation du taux de rendez-vous,
        <br />
        une meilleure prise en charge de vos patients.
      </>
    ),
    description: 'De la prise de rendez-vous aux confirmations et rappels.',
    features: [
      {
        title: 'Alloclinic automatise vos appels 24/7 :',
        description: 'répondez à 100% des appels entrants et convertissez plus de demandes en rendez-vous confirmés.'
      },
      {
        title: 'Jusqu’à 3h gagnées par les secrétaires :',
        description: "automatisez les tâches répétitives pour libérer du temps sur l'accueil et la prise en charge des patients."
      },
      {
        title: 'Réduction des no-shows de 20% :',
        description: 'automatisation des confirmations et rappels pour limiter les absences non prévenues.'
      }
    ],
    image: {
      src: '/images/features-top.jpg',
      alt: 'Financial Dashboard'
    },
    contentClassName: 'lg:w-[calc(100%+60px)]'
  },
  {
    badge: 'sécurité des données',
    title: 'Sécurité renforcée et certification adaptées au secteur médical',
    description: 'Les données de vos patients méritent la même attention que leurs soins. Alloclinic garantit leur protection avec un niveau de sécurité maximal, en totale conformité avec le RGPD.',
    features: [
      {
        title: 'Hébergement et sécurité :',
        description: 'Hébergement certifié HDS, sécurité conforme aux standards ISO 27001'
      },
      {
        title: 'Conformité RGPD :',
        description: 'traitement, conservation et accès aux données encadrés selon les exigences européennes.'
      },
      {
        title: 'Chiffrement des communications :',
        description: 'double protection avec un chiffrement de la communication (TLS) ainsi qu’un chiffrement du flux audio (SRTP).'
      }
    ],
    image: {
      src: '/images/shield.jpg',
      alt: 'Bouclier de sécurité des données'
    },
    contentClassName: 'lg:-ml-[60px]'
  }
]

const tabsData = [
  {
    id: 'describe-workflow',
    icon: (
      <SearchIcon />
    ),
    title: 'Audit de votre instalation médicale',
    description:
      'Audit de vos logiciels médicaux, du volume d’appels et de vos workflows afin de concevoir une intégration sur mesure de l’accueil téléphonique automatisé.'
  },
  {
    id: 'connect-tools',
    icon: (
      <PlugIcon />
    ),
    title: 'Connection à vos logiciels médicaux',
    description:
      'Connection de Alloclinic à vos logiciels médicaux, via des API sécurisées. Intégration des données d’appel à vos outils existant, sans changement de logiciel pour votre équipe. Installation sous 15 jours.'
  },
  {
    id: 'review-and-refine',
    icon: (
      <PencilIcon />
    ),
    title: 'Contrôle et optimisation',
    description:
      "Une fois l'intallation complété nous garantissons un contrôle et suivi quotidien des automatisations.\nActivez ou désactivez Alloclinic selon vos besoin."
  }
]

const featureSection09TabsData = [
  {
    name: 'Gestion calendriers multiples',
    icon: (
      <CalendarDaysIcon />
    ),
    value: 'upload-files',
    content: {
      buttonIcon: (
        <CalendarDaysIcon />
      ),
      title: 'Une prise de rendez-vous adaptée à chaque agenda',
      description:
        'Alloclinic prend en compte les disponibilités de chaque praticien, les absences et les créneaux réservés afin de proposer au patient un rendez-vous cohérent avec l’organisation réelle du cabinet.',
      image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-6.png',
      visual: 'calendar' as const,
      documentationLink: '#'
    }
  },
  {
    name: 'Appels en simultané',
    icon: (
      <PhoneForwarded />
    ),
    value: 'auto-responses',
    content: {
      buttonIcon: (
        <PhoneForwarded />
      ),
      title: 'Aucun appel perdu, même aux heures de pointe',
      description:
        'Aucun patient ne tombe sur une ligne occupée, même aux heures de pointe, pour garantir un accueil continu et ne manquer aucune demande.',
      image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-9.png',
      visual: 'simultaneousCalls' as const,
      documentationLink: '#'
    }
  },
  {
    name: 'Orientation vers praticiens',
    icon: (
      <Compass />
    ),
    value: 'field-validations',
    content: {
      buttonIcon: (
        <Compass />
      ),
      title: 'Le bon soin, avec le bon praticien',
      description:
        'Alloclinic analyse le besoin exprimé par le patient pour l’orienter vers le praticien le plus adapté, en tenant compte du motif, de la spécialité, du type de soin, de l’urgence et des préférences indiquées pendant l’appel.',
      image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-10.png',
      visual: 'appointment' as const,
      documentationLink: '#'
    }
  },
  {
    name: 'Règles et soins personnalisés',
    icon: (
      <HeartPulse />
    ),
    value: 'email-notifications',
    content: {
      buttonIcon: (
        <HeartPulse />
      ),
      title: 'Des règles adaptées à chaque praticien',
      description:
        'Chaque praticien peut avoir ses propres actes, durées de consultation et règles de prise de rendez-vous, pour proposer à chaque patient un créneau cohérent avec le soin demandé et l’organisation du cabinet.',
      image: 'https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-15.png',
      visual: 'settings' as const,
      documentationLink: '#'
    }
  }
]

const heroFeatureSlides = [
  {
    name: 'Gestion calendriers multiples',
    visual: <CalendarRangeSingleMonthDemo absenceBadgeLeft={8} />,
    className: 'translate-x-[80px]'
  },
  {
    name: 'Appels en simultané',
    visual: <SimultaneousCallsDemo />
  },
  {
    name: 'Orientation vers praticiens',
    visual: <AppointmentBookingDemo animateTitle showContinueButton={false} />
  },
  {
    name: 'Règles et soins personnalisés',
    visual: <PractitionerSettingsDemo rootClassName='w-[460px] rounded-lg border border-blue-200 bg-white p-4 shadow-sm' />
  }
]

const HERO_FEATURE_SLIDE_DURATION = 7000

const HeroFeatureVisualSlideshow = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const [slideCycle, setSlideCycle] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlideIndex(currentIndex => (currentIndex + 1) % heroFeatureSlides.length)
      setSlideCycle(currentCycle => currentCycle + 1)
    }, HERO_FEATURE_SLIDE_DURATION)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <div className='relative flex h-full w-[560px] items-center justify-center'>
      {heroFeatureSlides.map((slide, index) => (
        <div
          key={slide.name}
          className={cn(
            'absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out',
            slide.className,
            activeSlideIndex === index ? 'scale-100 opacity-100' : 'pointer-events-none scale-[0.98] opacity-0'
          )}
          aria-hidden={activeSlideIndex !== index}
        >
          {activeSlideIndex === index ? (
            <div key={`${slide.name}-${slideCycle}`}>
              {slide.visual}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  )
}

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.value || 'lead-qualifier')
  const [isAutoFlowPaused, setIsAutoFlowPaused] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [isCalEmbedReady, setIsCalEmbedReady] = useState(false)
  const [heroVisualResetKey, setHeroVisualResetKey] = useState(0)
  const isAutoFlowPausedRef = useRef(false)
  const heroCardRef = useRef<HTMLDivElement | null>(null)
  const tabsSectionRef = useRef<HTMLDivElement | null>(null)

  const showCalendarCard = useCallback(() => {
    if (!showCalendar) {
      setIsCalEmbedReady(false)
    }

    setShowCalendar(true)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [showCalendar])

  const showHeroCard = useCallback(() => {
    document.querySelector(CAL_ELEMENT_SELECTOR)?.replaceChildren()
    document.documentElement.classList.remove('cal-embed-loading')
    setShowCalendar(false)
    setIsCalEmbedReady(false)
    setHeroVisualResetKey(currentKey => currentKey + 1)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [])

  const pauseAutoFlow = useCallback(() => {
    isAutoFlowPausedRef.current = true
    setIsAutoFlowPaused(true)
  }, [])

  useEffect(() => {
    if (isAutoFlowPaused) {
      return
    }

    const interval = setInterval(() => {
      if (isAutoFlowPausedRef.current) {
        return
      }

      setActiveTab(currentTab => {
        const currentIndex = tabs.findIndex(tab => tab.value === currentTab)
        const nextIndex = (currentIndex + 1) % tabs.length

        return tabs[nextIndex].value
      })
    }, 7000)

    return () => clearInterval(interval)
  }, [isAutoFlowPaused])

  useEffect(() => {
    const validTabValues = new Set(tabs.map(tab => tab.value))

    const navigateToTab = (tabValue: string, shouldScroll: boolean) => {
      if (!validTabValues.has(tabValue)) {
        return
      }

      pauseAutoFlow()
      setActiveTab(tabValue)

      if (shouldScroll) {
        tabsSectionRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }

    const handleHeroTabNavigate = (event: Event) => {
      const customEvent = event as CustomEvent<{ tab?: string }>
      if (customEvent.detail?.tab) {
        navigateToTab(customEvent.detail.tab, true)
      }
    }

    window.addEventListener('hero-tab:navigate', handleHeroTabNavigate)

    return () => {
      window.removeEventListener('hero-tab:navigate', handleHeroTabNavigate)
    }
  }, [pauseAutoFlow])

  useEffect(() => {
    window.addEventListener('hero-home:navigate', showHeroCard)

    return () => {
      window.removeEventListener('hero-home:navigate', showHeroCard)
    }
  }, [showHeroCard])

  useEffect(() => {
    const handleCalendarNavigate = () => {
      showCalendarCard()
      heroCardRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }

    window.addEventListener('hero-calendar:navigate', handleCalendarNavigate)

    return () => {
      window.removeEventListener('hero-calendar:navigate', handleCalendarNavigate)
    }
  }, [showCalendarCard])

  useEffect(() => {
    if (!showCalendar) {
      return
    }

    const calElement = document.querySelector(CAL_ELEMENT_SELECTOR)
    const loadingStartedAt = Date.now()

    const markIframeReady = () => {
      const elapsedTime = Date.now() - loadingStartedAt
      const remainingTime = Math.max(CAL_MINIMUM_LOADING_TIME - elapsedTime, 0)

      window.setTimeout(() => {
        setIsCalEmbedReady(true)
      }, remainingTime)
    }

    const lockCalIframeScroll = (iframe: HTMLIFrameElement) => {
      iframe.setAttribute('scrolling', 'no')
      iframe.style.overflow = 'hidden'
    }

    const queueCalCall = (api: CalApi, args: CalQueueItem) => {
      api.q?.push(args)
    }

    if (!window.Cal) {
      const documentRef = window.document

      window.Cal = function CalEmbed(...args: unknown[]) {
        const cal = window.Cal

        if (!cal) {
          return
        }

        if (!cal.loaded) {
          cal.ns = {}
          cal.q = cal.q || []
          documentRef.head.appendChild(documentRef.createElement('script')).src = CAL_SCRIPT_SRC
          cal.loaded = true
        }

        if (args[0] === 'init') {
          const namespace = args[1]
          const api = function CalNamespace(...namespaceArgs: unknown[]) {
            queueCalCall(api, namespaceArgs)
          } as CalApi

          api.q = api.q || []

          if (typeof namespace === 'string') {
            cal.ns = cal.ns || {}
            cal.ns[namespace] = cal.ns[namespace] || api
            queueCalCall(cal.ns[namespace], args)
            queueCalCall(cal, ['initNamespace', namespace])
          } else {
            queueCalCall(cal, args)
          }

          return
        }

        queueCalCall(cal, args)
      } as CalApi
    }

    window.Cal('init', CAL_NAMESPACE, { origin: CAL_ORIGIN })
    window.Cal.ns?.[CAL_NAMESPACE]?.('inline', {
      elementOrSelector: CAL_ELEMENT_SELECTOR,
      config: {
        layout: 'month_view',
        useSlotsViewOnSmallScreen: 'true'
      },
      calLink: CAL_LINK
    })
    window.Cal.ns?.[CAL_NAMESPACE]?.('ui', {
      hideEventTypeDetails: false,
      layout: 'month_view'
    })

    const existingIframe = calElement?.querySelector('iframe')
    if (existingIframe) {
      lockCalIframeScroll(existingIframe)
      existingIframe.addEventListener('load', markIframeReady, { once: true })
    }

    const observer = new MutationObserver(() => {
      const iframe = calElement?.querySelector('iframe')

      if (!iframe) {
        return
      }

      lockCalIframeScroll(iframe)
      iframe.addEventListener('load', markIframeReady, { once: true })
      observer.disconnect()
    })

    if (calElement) {
      observer.observe(calElement, {
        childList: true,
        subtree: true
      })
    }

    const fallbackTimer = window.setTimeout(markIframeReady, 1200)

    return () => {
      existingIframe?.removeEventListener('load', markIframeReady)
      observer.disconnect()
      window.clearTimeout(fallbackTimer)
    }
  }, [showCalendar])

  useEffect(() => {
    document.documentElement.classList.toggle('cal-embed-loading', showCalendar && !isCalEmbedReady)

    return () => {
      document.documentElement.classList.remove('cal-embed-loading')
    }
  }, [isCalEmbedReady, showCalendar])

  return (
    <section className='relative flex flex-col overflow-hidden'>
      <div className='px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10 md:gap-8 lg:px-8 lg:py-12'>
          <div ref={heroCardRef} className='relative flex min-h-[500px] scroll-mt-20 flex-col items-start justify-center'>
            <div
              key={showCalendar ? 'cal-embed' : `hero-visual-${heroVisualResetKey}`}
              className={cn(
                'absolute top-[0px] z-0 h-[500px]',
                showCalendar
                  ? 'right-0 left-0 block overflow-hidden bg-transparent'
                  : 'pointer-events-none right-[5px] left-[5px] hidden overflow-hidden rounded-lg border border-white bg-white lg:block'
              )}
            >
              {showCalendar ? (
                <div className='relative h-full w-full overflow-hidden bg-white'>
                  {!isCalEmbedReady && (
                    <div className='absolute inset-0 z-10 bg-white' />
                  )}
                  <div
                    id='my-cal-inline-30min'
                    className={cn(
                      'h-full w-full overflow-hidden bg-white transition-opacity duration-1000 ease-out',
                      isCalEmbedReady ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </div>
              ) : (
                <div className='relative h-full w-full'>
                  <div className='absolute top-1/2 right-10 z-10 hidden translate-x-[50px] -translate-y-1/2 lg:block'>
                    <HeroFeatureVisualSlideshow />
                  </div>
                </div>
              )}
            </div>
            <div className={cn('relative z-10 ml-[20px] translate-y-[10px] max-w-2xl flex-col items-start gap-4 text-left', showCalendar ? 'hidden' : 'flex')}>
              <h1 className='-translate-x-[30px] font-[family-name:var(--font-montserrat)] text-lg font-semibold text-black sm:text-xl lg:text-3xl lg:leading-[1.15]'>
                Décrochez 100% des appels reçus
                <br />
                Jusqu&apos;à 3h par jour de secrétariat gagné
              </h1>

              <p className='max-w-2xl -translate-x-[30px] text-[15px] text-black sm:text-[17px]'>
                Notre agent numérique est spécialisé dans les centres de santé multi-praticiens.
                <br />
                Un agent codé de A à Z, pas une IA qui hallucine ou improvise ses réponses.
                <br />
                Pas de données envoyées à OpenAI.
                <br />
                Réponses aux questions des patients générées 5x plus vite que les agents IA,
                <br />
                pour une conversation plus fluide.
              </p>

              <div className='flex flex-wrap items-center justify-start gap-4'>
                <button
                  type='button'
                  onPointerDown={showCalendarCard}
                  className='group/button relative z-30 inline-flex h-10 -translate-x-[30px] translate-y-[50px] shrink-0 items-center justify-center gap-1.5 rounded-full border border-transparent bg-blue-600 bg-clip-padding px-6 font-[family-name:var(--font-montserrat)] text-base font-medium whitespace-nowrap text-white shadow-none transition-all outline-none select-none hover:bg-blue-500 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 max-[425px]:has-[>svg]:px-4 [&_svg]:pointer-events-none [&_svg]:shrink-0'
                >
                  Tester agent
                  <PhoneIcon className='size-4 -scale-x-100' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LogoCloud brandLogos={brandLogos} />

      <div className='px-4 pt-[50px] sm:px-6 lg:px-8'>
        <h2 className='mx-auto max-w-7xl text-center font-[family-name:var(--font-montserrat)] text-xl font-semibold md:text-2xl lg:text-3xl'>
          Optimisé pour la gestion des cabinets multi-praticiens
        </h2>
      </div>
      <FeaturesSection09 tabs={featureSection09TabsData} />

      <div className='px-4 pt-[100px] sm:px-6 lg:px-8'>
        <h2 className='mx-auto max-w-7xl text-center font-[family-name:var(--font-montserrat)] text-2xl font-semibold md:text-3xl lg:text-4xl'>
          Plus prévisible qu’un agent IA. Plus rapide aussi.
        </h2>
      </div>
      <Features sections={deterministicSectionsData} />
      <div className='px-4 pt-[100px] sm:px-6 lg:px-8'>
        <h2 className='mx-auto max-w-7xl text-center font-[family-name:var(--font-montserrat)] text-2xl font-semibold md:text-3xl lg:text-4xl'>
          L&apos;avantage d&apos;utiliser Alloclinic
        </h2>
      </div>
      <Features sections={alloclinicBenefitsSectionsData} />
      <div className='-mt-[50px] px-4 py-10 sm:px-6 lg:px-8'>
        <div className='mx-auto flex max-w-7xl justify-center'>
          <PrimaryOrionButton
            className='font-[family-name:var(--font-montserrat)] !bg-white !text-blue-600 rounded-full border border-blue-600 !shadow-none hover:!bg-blue-50 max-[425px]:has-[>svg]:px-4'
            type='button'
            onClick={showCalendarCard}
          >
            Tester agent
            <PhoneIcon className='size-4 -scale-x-100' />
          </PrimaryOrionButton>
        </div>
      </div>
      <div id='use-cases' ref={tabsSectionRef} className='scroll-mt-20'>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          onPointerDownCapture={pauseAutoFlow}
          onKeyDownCapture={pauseAutoFlow}
          data-horizontal
          className='mt-[280px] w-full gap-0'
        >
          <div className='-mt-[120px] px-4 pb-[100px] sm:px-6 lg:px-8'>
            <h2 className='mx-auto max-w-7xl text-center font-[family-name:var(--font-montserrat)] text-2xl font-semibold md:text-3xl lg:text-4xl'>
              Les fonctionnalités d&apos;Alloclinic
            </h2>
          </div>
          <div className='px-4 sm:px-6 lg:px-8'>
            <div className='mx-auto max-w-7xl border-b'>
              {/* Tabs List */}
              <ScrollArea className='-m-px *:overflow-hidden!'>
                <TabsList className='h-fit w-full -space-x-px rounded-none bg-transparent p-0 group-data-horizontal/tabs:h-fit'>
                  {tabs.map(({ icon, name, value }) => (
                    <TabsTrigger
                      key={value}
                      value={value}
                      className='border-blue-300 text-foreground focus-visible:outline-blue-500/20 data-active:border-blue-700! data-active:bg-blue-50! data-active:text-blue-700 h-15 flex-1 cursor-pointer rounded-none px-4 py-2.5 text-base group-data-horizontal/tabs:after:h-0 focus-visible:ring-0 focus-visible:outline-[3px] focus-visible:-outline-offset-4 data-active:z-1'
                    >
                      {icon}
                      {name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <ScrollBar orientation='horizontal' className='z-2' />
              </ScrollArea>
            </div>
          </div>

          <div className='px-4 sm:px-6 lg:px-8'>
            <div className='relative mx-auto h-151 max-w-7xl'>
              {/* Background Dots */}
              <div className='pointer-events-none absolute inset-0 -z-2 bg-[radial-gradient(color-mix(in_oklab,var(--primary)10%,transparent)_2px,transparent_2px)] bg-size-[20px_20px] bg-fixed' />

              {/* Background Gradient Overlay */}
              <div className='bg-background pointer-events-none absolute inset-0 -z-1 flex items-center justify-center mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]' />

              <ScrollArea className='h-full *:data-[slot=scroll-area-viewport]:h-full [&>[data-slot=scroll-area-viewport]>div]:h-full'>
                {tabs.map(tab => (
                  <TabsContent
                    key={tab.value}
                    value={tab.value}
                    className='flex h-full items-center justify-center p-4 sm:p-6 lg:p-8'
                  >
                    {tab.content}
                  </TabsContent>
                ))}

                <ScrollBar orientation='horizontal' />
              </ScrollArea>
            </div>
          </div>
        </Tabs>
      </div>
      <div id='installation' className='mt-[50px] scroll-mt-20'>
        <FeaturesSection26 data={tabsData} />
      </div>
    </section>
  )
}

export default HeroSection
