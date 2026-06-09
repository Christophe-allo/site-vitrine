'use client'

import type { ReactNode } from 'react'

import Lottie from 'lottie-react'
import { MotionPreset } from '@/components/ui/motion-preset'
import { CircleCheckIcon, PhoneIcon, ShieldCheckIcon } from 'lucide-react'
import { motion } from 'motion/react'
import speedMeterAnimation from '@/assets/animations/speed-meter-293.json'

type FeatureItem = {
  title: ReactNode
  description: ReactNode
}

type FeatureSection = {
  badge: string
  title: ReactNode
  description: string
  features: FeatureItem[]
  contentClassName?: string
  hideImage?: boolean
  showSpeedometer?: boolean
  showPhoneWaves?: boolean
  image: {
    src: string
    darkSrc?: string
    alt: string
  }
}

type FeaturesProps = {
  sections: FeatureSection[]
}

const Features = ({ sections }: FeaturesProps) => {
  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='space-y-24'>
          {sections.map((section, sectionIndex) => {
            const isOdd = sectionIndex % 2 === 0 // 0-based index, so 0 is "first" (odd visual position)
            const contentOrder = isOdd ? 'order-1' : 'order-1 lg:order-2'
            const imageOrder = isOdd ? 'order-2' : 'order-2 lg:order-1'
            const imageDirection = isOdd ? 'right' : 'left'
            const imageJustify = isOdd ? 'lg:justify-end' : 'lg:justify-start'

            return (
              <div key={sectionIndex} className='grid items-center gap-12 lg:grid-cols-2 xl:gap-52'>
                {/* Content */}
                <div className={`space-y-6 ${contentOrder} ${section.contentClassName ?? ''}`}>
                  <div className='space-y-4'>
                    <MotionPreset
                      fade
                      slide
                      transition={{ duration: 0.5 }}
                      className='text-sm font-medium uppercase text-blue-600'
                    >
                      {section.badge}
                    </MotionPreset>

                    <MotionPreset
                      component='h2'
                      className='font-[family-name:var(--font-montserrat)] text-xl font-semibold md:text-2xl lg:text-3xl'
                      fade
                      slide
                      delay={0.3}
                      transition={{ duration: 0.5 }}
                    >
                      {section.title}
                    </MotionPreset>

                    <MotionPreset
                      component='p'
                      className='text-muted-foreground text-xl'
                      fade
                      slide
                      delay={0.6}
                      transition={{ duration: 0.5 }}
                    >
                      {section.description}
                    </MotionPreset>
                  </div>

                  <div className='space-y-3.5'>
                    {section.features.map((feature, featureIndex) => (
                      <MotionPreset
                        key={featureIndex}
                        className='flex items-start gap-3'
                        fade
                        slide
                        delay={0.9 + featureIndex * 0.2}
                        transition={{ duration: 0.5 }}
                      >
                        <CircleCheckIcon className='mt-0.5 size-6 shrink-0 text-blue-600' />
                        <p className='text-lg'>
                          <span className='font-medium'>{feature.title}</span>{' '}
                          <span className='text-muted-foreground'>{feature.description}</span>
                        </p>
                      </MotionPreset>
                    ))}
                  </div>
                </div>

                {/* Image */}
                <MotionPreset
                  fade
                  slide={{ direction: imageDirection, offset: 50 }}
                  delay={0.6}
                  transition={{ duration: 0.8 }}
                  className={`group relative flex justify-center rounded-md p-6 transition-all duration-400 hover:p-0 ${section.hideImage ? 'overflow-hidden bg-background' : 'bg-muted'} ${imageJustify} ${imageOrder}`}
                >
                  {section.showPhoneWaves ? (
                    <>
                      <div className='pointer-events-none absolute inset-0 overflow-hidden rounded-md bg-white' />
                      <div className='relative flex aspect-[1.65] w-full items-center justify-center rounded-md bg-white'>
                        <div className='relative flex size-72 items-center justify-center'>
                          <div className='absolute inset-0 flex items-center justify-center'>
                            <div className='z-1 flex size-64 items-center justify-center rounded-4xl border border-blue-400 bg-white'>
                              <ShieldCheckIcon className='size-28 text-blue-600' strokeWidth={1.25} />
                            </div>
                          </div>
                          <div className='absolute inset-0'>
                            <div className='absolute inset-24 animate-ping rounded-3xl border-2 border-blue-700' />
                            <div className='absolute inset-16 animate-ping rounded-3xl border-2 border-blue-700/65' />
                            <div className='absolute inset-12 animate-ping rounded-3xl border-2 border-blue-700/45' />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : section.hideImage ? (
                    <>
                      <div className='pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(color-mix(in_oklab,var(--primary)10%,transparent)_2px,transparent_2px)] bg-[size:20px_20px]' />
                      <div className='absolute left-6 top-[39px] z-10 h-[60px] w-[200px] rounded-md bg-white shadow-md'>
                        <div className='absolute -top-5 left-0 flex items-center gap-1.5 rounded-t-md bg-[color-mix(in_oklab,var(--color-sky-600)20%,var(--background))] px-2 py-1 text-sky-600'>
                          <PhoneIcon className='size-3.5' />
                          <span className='text-xs font-medium'>Message patient</span>
                        </div>
                        <div className='flex h-full items-center px-3'>
                          <p className='text-sm text-muted-foreground'>
                            Je veux{' '}
                            <motion.span
                              className='font-bold'
                              animate={{ color: ['var(--color-sky-500)', 'var(--color-blue-700)', 'var(--color-sky-500)'] }}
                              transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
                            >
                              prendre
                            </motion.span>
                            <br />
                            <motion.span
                              className='font-bold'
                              animate={{ color: ['var(--color-sky-500)', 'var(--color-blue-700)', 'var(--color-sky-500)'] }}
                              transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
                            >
                              rendez-vous
                            </motion.span>
                          </p>
                        </div>
                      </div>
                      <div className='absolute left-6 top-1/2 z-10 h-[60px] w-[200px] -translate-y-1/2 rounded-md bg-white shadow-md'>
                        <div className='absolute -top-5 left-0 flex items-center gap-1.5 rounded-t-md bg-[color-mix(in_oklab,var(--color-sky-600)20%,var(--background))] px-2 py-1 text-sky-600'>
                          <PhoneIcon className='size-3.5' />
                          <span className='text-xs font-medium'>Message patient</span>
                        </div>
                        <div className='flex h-full items-center px-3'>
                          <p className='text-sm text-muted-foreground'>
                            J&apos;ai{' '}
                            <motion.span
                              className='font-bold'
                              animate={{ color: ['var(--color-sky-500)', 'var(--color-blue-700)', 'var(--color-sky-500)'] }}
                              transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
                            >
                              besoin
                            </motion.span>{' '}
                            d&apos;un{' '}
                            <motion.span
                              className='font-bold'
                              animate={{ color: ['var(--color-sky-500)', 'var(--color-blue-700)', 'var(--color-sky-500)'] }}
                              transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
                            >
                              rendez-vous
                            </motion.span>
                          </p>
                        </div>
                      </div>
                      <div className='absolute bottom-6 left-6 z-10 h-[60px] w-[200px] rounded-md bg-white shadow-md'>
                        <div className='absolute -top-5 left-0 flex items-center gap-1.5 rounded-t-md bg-[color-mix(in_oklab,var(--color-sky-600)20%,var(--background))] px-2 py-1 text-sky-600'>
                          <PhoneIcon className='size-3.5' />
                          <span className='text-xs font-medium'>Message patient</span>
                        </div>
                        <div className='flex h-full items-center px-3'>
                          <p className='text-sm text-muted-foreground'>
                            Je{' '}
                            <motion.span
                              className='font-bold'
                              animate={{ color: ['var(--color-sky-500)', 'var(--color-blue-700)', 'var(--color-sky-500)'] }}
                              transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
                            >
                              veux voir
                            </motion.span>{' '}
                            le{' '}
                            <motion.span
                              className='font-bold'
                              animate={{ color: ['var(--color-sky-500)', 'var(--color-blue-700)', 'var(--color-sky-500)'] }}
                              transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
                            >
                              docteur
                            </motion.span>
                          </p>
                        </div>
                      </div>
                      <div className='absolute right-6 top-1/2 z-10 h-[60px] w-[200px] -translate-y-1/2 rounded-md bg-white shadow-md'>
                        <div className='absolute -top-5 left-0 flex items-center gap-1.5 rounded-t-md bg-[color-mix(in_oklab,var(--color-green-600)20%,var(--background))] px-2 py-1 text-green-600'>
                          <CircleCheckIcon className='size-3.5' />
                          <span className='text-xs font-medium'>Output</span>
                        </div>
                        <p className='flex h-full items-center px-3 text-sm text-muted-foreground'>
                          Bonjour Mr Dujean, quelles sont vos disponibilités ?
                        </p>
                      </div>
                      <motion.svg
                        viewBox='0 0 1000 700'
                        fill='none'
                        preserveAspectRatio='none'
                        className='pointer-events-none absolute inset-0 z-0 h-full w-full'
                        aria-hidden='true'
                      >
                        <motion.path
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, ease: 'easeInOut', delay: 0.4 }}
                          d='M224 97L236 109L224 121L212 109L224 97Z'
                          fill='var(--color-blue-600)'
                        />
                        <motion.path
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, ease: 'easeInOut', delay: 0.64 }}
                          d='M224 109H600Q620 109 620 129V250'
                          stroke='var(--color-blue-600)'
                          strokeWidth='1.5'
                          vectorEffect='non-scaling-stroke'
                        />
                        <motion.path
                          initial={{ pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            pathLength: { duration: 0.3, ease: 'easeInOut', delay: 1.04 },
                            opacity: { duration: 0.1, delay: 1.04 }
                          }}
                          d='M600 230L620 250L640 230'
                          stroke='var(--color-blue-600)'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          vectorEffect='non-scaling-stroke'
                        />
                      </motion.svg>
                      <motion.svg
                        viewBox='0 0 1000 700'
                        fill='none'
                        preserveAspectRatio='none'
                        className='pointer-events-none absolute inset-0 z-0 h-full w-full -scale-y-100'
                        aria-hidden='true'
                      >
                        <motion.path
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, ease: 'easeInOut', delay: 2.6 }}
                          d='M224 97L236 109L224 121L212 109L224 97Z'
                          fill='var(--color-blue-600)'
                        />
                        <motion.path
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, ease: 'easeInOut', delay: 2.84 }}
                          d='M224 109H600Q620 109 620 129V280'
                          stroke='var(--color-blue-600)'
                          strokeWidth='1.5'
                          vectorEffect='non-scaling-stroke'
                        />
                        <motion.path
                          initial={{ pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            pathLength: { duration: 0.3, ease: 'easeInOut', delay: 3.24 },
                            opacity: { duration: 0.1, delay: 3.24 }
                          }}
                          d='M600 260L620 280L640 260'
                          stroke='var(--color-blue-600)'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          vectorEffect='non-scaling-stroke'
                        />
                      </motion.svg>
                      <motion.svg
                        viewBox='0 0 1000 700'
                        fill='none'
                        preserveAspectRatio='none'
                        className='pointer-events-none absolute inset-0 z-0 h-full w-full'
                        aria-hidden='true'
                      >
                        <motion.path
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, ease: 'easeInOut', delay: 1.5 }}
                          d='M156 338L168 350L156 362L144 350L156 338Z'
                          fill='var(--color-blue-600)'
                        />
                        <motion.path
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, ease: 'easeInOut', delay: 1.74 }}
                          d='M156 350H552'
                          stroke='var(--color-blue-600)'
                          strokeWidth='1.5'
                          vectorEffect='non-scaling-stroke'
                        />
                        <motion.path
                          initial={{ pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            pathLength: { duration: 0.3, ease: 'easeInOut', delay: 2.14 },
                            opacity: { duration: 0.1, delay: 2.14 }
                          }}
                          d='M532 330L552 350L532 370'
                          stroke='var(--color-blue-600)'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          vectorEffect='non-scaling-stroke'
                        />
                      </motion.svg>
                      <img
                        src={section.image.src}
                        alt=''
                        aria-hidden='true'
                        className='invisible h-auto w-full rounded-md'
                      />
                    </>
                  ) : section.showSpeedometer ? (
                    <>
                      <div className='pointer-events-none absolute inset-0 overflow-hidden rounded-md bg-white'>
                        <Lottie
                          animationData={speedMeterAnimation}
                          autoplay
                          loop
                          className='h-full w-full'
                          aria-label='Compteur de temps de réponse culminant à 293 millisecondes'
                        />
                      </div>
                      <img
                        src={section.image.src}
                        alt=''
                        aria-hidden='true'
                        className='invisible h-auto w-full rounded-md'
                      />
                    </>
                  ) : (
                    section.image.darkSrc ? (
                      <>
                        <img
                          src={section.image.src}
                          alt={section.image.alt}
                          className='h-auto w-full rounded-md dark:hidden'
                        />
                        <img
                          src={section.image.darkSrc}
                          alt={section.image.alt}
                          className='hidden h-auto w-full rounded-md dark:block'
                        />
                      </>
                    ) : (
                      <img src={section.image.src} alt={section.image.alt} className='h-auto w-full rounded-md' />
                    )
                  )}
                </MotionPreset>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Features
