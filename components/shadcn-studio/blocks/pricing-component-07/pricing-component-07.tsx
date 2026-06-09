'use client'

import { useRef, useState } from 'react'
import { CheckIcon, ShieldCheckIcon } from 'lucide-react'
import { motion, useInView } from 'motion/react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'
import { cn } from '@/lib/utils'

type PlanType = 'free' | 'business' | 'enterprise' | 'trial' | 'custom'

export type Plan = {
  id: PlanType
  name: string
  subtitle: string
  price: string
  accounts: string
  features: string[]
  buttonText: string
}

const GuaranteeBadge = ({ animate }: { animate: boolean }) => (
  <motion.div
    aria-hidden='true'
    className='pointer-events-none absolute right-[10px] top-[10px] z-10'
    initial={{ opacity: 0, scale: 0.04, rotate: -180 }}
    animate={
      animate
        ? { opacity: [0, 1, 1], scale: [0.04, 0.22, 0.84], rotate: [-180, -60, 0] }
        : { opacity: 0, scale: 0.04, rotate: -180 }
    }
    transition={{ duration: 1.15, times: [0, 0.35, 1], ease: [0.22, 1, 0.36, 1] }}
    style={{ transformOrigin: 'center center' }}
  >
    <div className='relative flex size-36 items-center justify-center rounded-full border-4 border-blue-600 bg-white shadow-lg'>
      <motion.svg
        className='absolute inset-0 size-full'
        viewBox='0 0 144 144'
        initial={{ opacity: 0 }}
        animate={animate ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.25, delay: 0.45 }}
      >
        <defs>
          <path id='guarantee-top-arc' d='M 14 57 A 62 62 0 0 1 130 57' />
          <path id='guarantee-bottom-arc' d='M 16 98 A 58 58 0 0 0 128 98' />
        </defs>
        <path d='M 16 94 A 58 58 0 0 0 128 94' fill='none' stroke='currentColor' strokeLinecap='round' strokeWidth='24' className='text-blue-600' />
        <text
          fill='currentColor'
          className='fill-blue-600 font-[family-name:var(--font-montserrat)] text-[13px] font-black tracking-[0.01em]'
        >
          <textPath href='#guarantee-top-arc' startOffset='50%' textAnchor='middle'>
            REMBOURSEMENT
          </textPath>
        </text>
        <text
          fill='currentColor'
          className='fill-white font-[family-name:var(--font-montserrat)] text-[14px] font-black tracking-[0.14em]'
        >
          <textPath href='#guarantee-bottom-arc' startOffset='50%' textAnchor='middle'>
            100% GARANTI
          </textPath>
        </text>
      </motion.svg>
      <motion.div
        className='relative z-10 text-blue-600'
        initial={{ opacity: 0, scale: 0.6 }}
        animate={animate ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
        transition={{ duration: 0.3, delay: 0.65 }}
      >
        <ShieldCheckIcon className='size-14' strokeWidth={2.2} />
      </motion.div>
    </div>
  </motion.div>
)

const Pricing = ({ plans }: { plans: Plan[] }) => {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('free')
  const sectionRef = useRef<HTMLElement | null>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.35 })

  const selectedPlanData = plans.find(plan => plan.id === selectedPlan)!

  const handlePlanAction = () => {
    if (selectedPlanData.buttonText === 'Nous contacter') {
      window.dispatchEvent(new CustomEvent('hero-calendar:navigate'))
    }
  }

  return (
    <section ref={sectionRef} className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl space-y-12 px-4 sm:space-y-16 sm:px-6 lg:space-y-24 lg:px-8'>
        <div className='flex flex-col items-center gap-4 text-center'>
          <MotionPreset
            component='h2'
            className='font-[family-name:var(--font-montserrat)] text-2xl font-semibold sm:text-3xl lg:text-4xl'
            fade
            blur
            slide={{ direction: 'down', offset: 50 }}
            transition={{ duration: 0.5 }}
          >
            Choisissez le meilleur plan pour votre cabinet
          </MotionPreset>
          <MotionPreset
            component='p'
            className='font-[family-name:var(--font-montserrat)] text-sm font-medium leading-7 text-center text-black sm:text-base'
            fade
            blur
            slide={{ direction: 'down', offset: 40 }}
            delay={0.1}
            transition={{ duration: 0.5 }}
          >
            Appels illimités
            <br />
            Confirmation et rappels de rendez-vous via Whatsapp ou SMS
            <br />
            Rappel si non confirmation patient
            <br />
            <span className='font-bold text-blue-600'>2 mois d&apos;essai satisfait ou 100% remboursé</span>
          </MotionPreset>
        </div>
        <div className='flex flex-col gap-6 lg:flex-row'>
          <div className='flex flex-1 flex-col gap-5'>
            {plans.map((plan, index) => (
              <MotionPreset
                key={plan.id}
                fade
                blur
                slide={{ direction: 'up', offset: 50 }}
                delay={0.6 + index * 0.15}
                transition={{ duration: 0.7 }}
              >
                <Card
                  className={cn(
                    `cursor-pointer py-6 shadow-none transition-colors ${
                      selectedPlan === plan.id ? 'bg-blue-50 ring-blue-600' : 'ring-border'
                    }`
                  )}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  <CardContent className='flex items-center gap-4 px-6'>
                    <div
                      className={cn(
                        `border-input flex size-6 items-center justify-center rounded-full border ${
                          selectedPlan === plan.id ? 'border-blue-600 border-5' : ''
                        }`
                      )}
                    ></div>
                    <div className='flex flex-1 flex-col gap-0.5'>
                      <p
                        className={cn(
                          'font-[family-name:var(--font-montserrat)] text-base font-semibold',
                          plan.id === 'trial' ? 'text-blue-700' : ''
                        )}
                      >
                        {plan.id === 'free' || plan.id === 'business' ? 'Par praticien' : plan.name}
                      </p>
                      {plan.id === 'free' ? (
                        <p className='font-[family-name:var(--font-montserrat)] text-xs font-semibold text-gray-500'>
                          Confirmation via Whatsapp
                        </p>
                      ) : plan.id === 'business' ? (
                        <p className='font-[family-name:var(--font-montserrat)] text-xs font-semibold text-gray-500'>
                          Confirmation via SMS
                        </p>
                      ) : plan.subtitle ? (
                        <p className='font-[family-name:var(--font-montserrat)] text-xs font-semibold text-black'>
                          {plan.subtitle}
                        </p>
                      ) : null}
                      {plan.id === 'free' || plan.id === 'business' ? (
                        <p className='font-[family-name:var(--font-montserrat)] text-xs font-semibold text-blue-700'>
                          2 mois d&apos;essai satisfait ou remboursé
                        </p>
                      ) : null}
                      {plan.accounts ? <p className='text-base'>{plan.accounts}</p> : null}
                    </div>
                    <div className='flex items-end gap-0.5'>
                      {plan.price ? (
                        <>
                          <span className='text-3xl font-bold'>{plan.price}</span>
                          {plan.id !== 'custom' ? <span className='text-muted-foreground text-lg'>/mois</span> : null}
                        </>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              </MotionPreset>
            ))}
          </div>

          <MotionPreset
            key={selectedPlan}
            className='flex-1 rounded-xl bg-blue-500 p-6'
            fade
            blur
            zoom={{ initialScale: 0.95 }}
            delay={0.3}
            transition={{ duration: 0.6 }}
          >
            <div className='mb-6 flex flex-col gap-1'>
              <h3 className='font-[family-name:var(--font-montserrat)] text-3xl font-semibold text-white'>
                {selectedPlanData.id === 'free' || selectedPlanData.id === 'business'
                  ? 'Par praticien'
                  : selectedPlanData.name}
              </h3>
              {selectedPlanData.id === 'free' ? (
                <p className='text-base text-white'>Messages confirmation via Whatsapp</p>
              ) : selectedPlanData.id === 'business' ? (
                <p className='text-base text-white'>Mesages confirmation via SMS</p>
              ) : selectedPlanData.subtitle ? (
                <p className='text-base text-white'>{selectedPlanData.subtitle}</p>
              ) : null}
            </div>

            <Card className='relative overflow-visible py-6 shadow-none ring-0'>
              {selectedPlanData.id === 'free' || selectedPlanData.id === 'business' ? (
                <GuaranteeBadge animate={isInView} />
              ) : null}
              <CardContent className='flex flex-col gap-4 px-6'>
                <div className='flex items-end gap-0.5'>
                  {selectedPlanData.price ? (
                    <>
                      <span className='text-4xl font-semibold'>{selectedPlanData.price}</span>
                      {selectedPlanData.id !== 'custom' ? <span className='text-muted-foreground text-lg'>/mois</span> : null}
                    </>
                  ) : null}
                </div>
                {selectedPlanData.id === 'free' || selectedPlanData.id === 'business' ? (
                  <p className='font-[family-name:var(--font-montserrat)] text-sm font-semibold text-blue-700'>
                    2 mois d&apos;essai satisfait ou remboursé
                  </p>
                ) : null}
                <div className='flex flex-col gap-2'>
                  {selectedPlanData.features.map((feature, index) => (
                    <div key={index} className='flex items-center gap-2 py-1'>
                      <CheckIcon className='size-4.5 text-blue-600' />
                      <span className='text-base font-medium'>
                        {feature.endsWith('©') ? (
                          <>
                            {feature.slice(0, -1).trim()}{' '}
                            <span className='relative -left-[0.22em] -top-[0.18em] text-[0.7em]'>©</span>
                          </>
                        ) : (
                          feature
                        )}
                      </span>
                    </div>
                  ))}
                </div>
                <Button
                  className='bg-blue-500 font-[family-name:var(--font-montserrat)] font-bold text-white hover:bg-blue-600'
                  size='lg'
                  onClick={handlePlanAction}
                >
                  {selectedPlanData.buttonText}
                </Button>
              </CardContent>
            </Card>
          </MotionPreset>
        </div>
      </div>
    </section>
  )
}

export default Pricing
