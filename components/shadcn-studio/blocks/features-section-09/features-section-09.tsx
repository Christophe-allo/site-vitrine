import type { ReactElement } from 'react'
import { useState } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { MotionPreset } from '@/components/ui/motion-preset'
import { CircleCheckIcon, HouseIcon, PhoneIcon } from 'lucide-react'
import { motion } from 'motion/react'

type Content = {
  buttonIcon: ReactElement
  title: string
  description: string
  image: string
  visual?: 'calendar' | 'settings' | 'appointment' | 'simultaneousCalls'
  documentationLink: string
}

type tabsData = {
  name: string
  icon: ReactElement
  value: string
  content: Content
}[]

const weekDays = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di']
const monthFormatter = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' })

export const CalendarRangeSingleMonthDemo = ({ absenceBadgeLeft = 28 }: { absenceBadgeLeft?: number } = {}) => {
  const today = new Date()
  const rangeStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const rangeEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 13)
  const monthStart = new Date(rangeStart.getFullYear(), rangeStart.getMonth(), 1)
  const monthEnd = new Date(rangeStart.getFullYear(), rangeStart.getMonth() + 1, 0)
  const firstWeekday = (monthStart.getDay() + 6) % 7
  const calendarStart = new Date(monthStart.getFullYear(), monthStart.getMonth(), 1 - firstWeekday)
  const calendarDays = Array.from({ length: 42 }, (_, index) => {
    const date = new Date(calendarStart)
    date.setDate(calendarStart.getDate() + index)
    return date
  })

  const renderCalendarCard = (className?: string, showSelection = true) => (
    <div className={className ?? 'w-full max-w-[360px] rounded-lg border border-blue-200 bg-white p-4 shadow-sm'}>
      <div className='mb-4 flex items-center justify-between'>
        <button className='text-muted-foreground rounded-md px-2 py-1 text-sm' type='button' aria-label='Mois précédent'>
          ‹
        </button>
        <p className='text-sm font-medium capitalize'>{monthFormatter.format(rangeStart)}</p>
        <button className='text-muted-foreground rounded-md px-2 py-1 text-sm' type='button' aria-label='Mois suivant'>
          ›
        </button>
      </div>
      <div className='grid grid-cols-7 gap-y-1 text-center text-sm'>
        {weekDays.map(day => (
          <div key={day} className='text-muted-foreground py-1 text-xs font-medium'>
            {day}
          </div>
        ))}
        {calendarDays.map(date => {
          const isCurrentMonth = date >= monthStart && date <= monthEnd
          const isSelected = showSelection && date >= rangeStart && date <= rangeEnd
          const isRangeStart = showSelection && date.getTime() === rangeStart.getTime()
          const isRangeEnd = showSelection && date.getTime() === rangeEnd.getTime()

          return (
            <div key={date.toISOString()} className='relative flex h-9 items-center justify-center'>
              {isSelected && (
                <div
                  className={[
                    'absolute inset-y-1 bg-blue-100',
                    isRangeStart ? 'left-1/2 right-0 rounded-l-full' : '',
                    isRangeEnd ? 'left-0 right-1/2 rounded-r-full' : '',
                    !isRangeStart && !isRangeEnd ? 'inset-x-0' : ''
                  ].join(' ')}
                />
              )}
              <span
                className={[
                  'relative z-1 flex size-8 items-center justify-center rounded-full text-sm',
                  !isCurrentMonth ? 'text-muted-foreground/45' : '',
                  isRangeStart || isRangeEnd ? 'bg-blue-600 text-white' : '',
                  isSelected && !isRangeStart && !isRangeEnd ? 'text-blue-700' : ''
                ].join(' ')}
              >
                {date.getDate()}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className='relative w-full max-w-[390px] pl-6'>
      <div className='absolute -left-[120px] top-6 z-0 w-[360px] opacity-80'>
        <div className='absolute left-[8px] -top-3 z-10 flex w-[150px] items-center justify-center rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-medium text-blue-600 shadow-sm'>
          Docteur Dujean
        </div>
        {renderCalendarCard('w-[360px] rounded-lg border border-blue-200 bg-white p-4 shadow-sm', false)}
      </div>
      <div className='relative -left-[20px] -top-6 z-10 w-[360px]'>
        {renderCalendarCard('w-[360px] rounded-lg border border-blue-200 bg-white p-4 shadow-sm')}
      </div>
      <div
        className='absolute -top-9 z-20 rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-medium text-blue-600 shadow-sm'
        style={{ left: absenceBadgeLeft }}
      >
        Absence docteur Martin
      </div>
    </div>
  )
}

export const PractitionerSettingsDemo = ({ rootClassName }: { rootClassName?: string } = {}) => {
  const services = [
    { name: 'Consultation', duration: '30 min' },
    { name: 'Urgence', duration: '30 min' },
    { name: 'Suivi patient', duration: '45 min' }
  ]

  return (
    <div className={rootClassName ?? 'w-full max-w-[390px] rounded-lg border border-blue-200 bg-white p-4 shadow-sm'}>
      <div className='mb-4 flex items-start justify-between gap-4'>
        <div>
          <p className='text-sm font-semibold text-card-foreground'>Docteur Bernard</p>
          <p className='text-xs font-semibold text-blue-600'>Règles de prise de rendez-vous</p>
        </div>
        <span className='rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600'>
          Actif
        </span>
      </div>

      <div className='space-y-3'>
        {services.map(service => (
          <div key={service.name} className='flex items-center justify-between rounded-md border border-blue-100 bg-blue-50/40 px-3 py-2'>
            <div>
              <p className='text-sm font-medium text-card-foreground'>{service.name}</p>
              <p className='text-muted-foreground text-xs'>Durée dédiée</p>
            </div>
            <span className='rounded-full bg-white px-2.5 py-1 text-xs font-medium text-blue-600 shadow-sm'>
              {service.duration}
            </span>
          </div>
        ))}
      </div>

      <div className='mt-4 grid grid-cols-2 gap-3'>
        <div className='rounded-md border border-blue-100 p-3'>
          <p className='text-muted-foreground text-xs'>Nouveaux patients</p>
          <div className='mt-2 flex items-center justify-between'>
            <span className='text-sm font-medium text-card-foreground'>Acceptés</span>
            <span className='relative h-5 w-9 rounded-full bg-blue-600'>
              <span className='absolute right-0.5 top-0.5 size-4 rounded-full bg-white' />
            </span>
          </div>
        </div>
        <div className='rounded-md border border-blue-100 p-3'>
          <p className='text-muted-foreground text-xs'>Rendez-vous urgents</p>
          <div className='mt-2 flex items-center justify-between'>
            <span className='text-sm font-medium text-card-foreground'>Priorisés</span>
            <span className='relative h-5 w-9 rounded-full bg-blue-600'>
              <span className='absolute right-0.5 top-0.5 size-4 rounded-full bg-white' />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

const getNextAppointmentTime = () => {
  const now = new Date()
  const currentMinutes = now.getHours() * 60 + now.getMinutes()
  const openingMinutes = 9 * 60
  const closingMinutes = 18 * 60
  const roundedMinutes = Math.ceil(currentMinutes / 15) * 15
  const appointmentMinutes = Math.min(Math.max(roundedMinutes, openingMinutes), closingMinutes)
  const hour = Math.floor(appointmentMinutes / 60)
  const minute = appointmentMinutes % 60

  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
}

export const AppointmentBookingDemo = ({
  animateTitle = false,
  showContinueButton = true
}: {
  animateTitle?: boolean
  showContinueButton?: boolean
}) => {
  const today = new Date()
  const initialTime = getNextAppointmentTime()
  const [selectedDate, setSelectedDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), today.getDate()))
  const [selectedTime, setSelectedTime] = useState(initialTime)
  const monthStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
  const firstWeekday = (monthStart.getDay() + 6) % 7
  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate()
  const bookedDays = [selectedDate.getDate() - 3, selectedDate.getDate() - 2, selectedDate.getDate() - 1].filter(day => day > 0)
  const monthDays = Array.from({ length: daysInMonth }, (_, index) => index + 1)
  const timeSlots = Array.from({ length: 10 }, (_, index) => {
    const [selectedHour, selectedMinute] = selectedTime.split(':').map(Number)
    const totalMinutes = selectedHour * 60 + selectedMinute + index * 15
    const hour = Math.floor(totalMinutes / 60)
    const minute = totalMinutes % 60

    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
  })
  const selectedDateLabel = selectedDate.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  })

  return (
    <div className='w-full max-w-[470px] overflow-hidden rounded-lg border border-blue-200 bg-white shadow-sm'>
      <div className='border-b border-blue-100 px-4 py-3 text-center'>
        {animateTitle ? (
          <p className='inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-blue-600'>
            Prise de rendez-vous en cours...
            <span className='inline-flex text-blue-600'>
              <PhoneIcon className='size-3.5 -scale-x-100' />
            </span>
          </p>
        ) : (
          <p className='text-sm font-semibold text-card-foreground'>Prise de rendez-vous en cours...</p>
        )}
      </div>
      <div className='grid md:grid-cols-[1fr_150px]'>
        <div className='p-5'>
          <div className='mb-4 flex items-center justify-between'>
            <button className='text-muted-foreground rounded-md px-2 py-1 text-sm' type='button' aria-label='Mois précédent'>
              ‹
            </button>
            <p className='text-sm font-medium capitalize'>{monthFormatter.format(selectedDate)}</p>
            <button className='text-muted-foreground rounded-md px-2 py-1 text-sm' type='button' aria-label='Mois suivant'>
              ›
            </button>
          </div>
          <div className='grid grid-cols-7 gap-y-1 text-center text-sm'>
            {weekDays.map(day => (
              <div key={day} className='text-muted-foreground py-1 text-xs font-medium'>
                {day}
              </div>
            ))}
            {Array.from({ length: firstWeekday }, (_, index) => (
              <div key={`appointment-empty-${index}`} className='h-8' aria-hidden='true' />
            ))}
            {monthDays.map(day => {
              const isBooked = bookedDays.includes(day)
              const isSelected = day === selectedDate.getDate()

              return (
                <button
                  key={day}
                  className={[
                    'flex h-8 items-center justify-center rounded-full text-sm transition-colors',
                    isSelected ? 'bg-blue-600 text-white' : '',
                    isBooked ? 'text-muted-foreground line-through opacity-70' : '',
                    !isSelected && !isBooked ? 'hover:bg-blue-50 hover:text-blue-600' : ''
                  ].join(' ')}
                  type='button'
                  onClick={() => {
                    if (!isBooked) {
                      setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))
                    }
                  }}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>
        <div className='max-h-[286px] border-t border-blue-100 p-4 md:border-l md:border-t-0'>
          <div className='flex h-full flex-col gap-2 overflow-hidden'>
            {timeSlots.map(time => (
              <button
                key={time}
                className={[
                  'w-full rounded-md border px-3 py-2 text-sm font-medium shadow-none transition-colors',
                  selectedTime === time
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-blue-200 bg-white text-blue-600 hover:bg-blue-50'
                ].join(' ')}
                type='button'
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className='flex items-center justify-between gap-4 border-t border-blue-100 px-5 py-4'>
        <div className='flex items-center gap-2 text-sm'>
          <CircleCheckIcon className='size-10 stroke-green-600' />
          <span>
            Votre rendez-vous est confirmé le {selectedDateLabel} à {selectedTime} avec le docteur{' '}
            <motion.span
              className='font-medium'
              animate={{ color: ['var(--color-sky-500)', 'var(--color-blue-700)', 'var(--color-sky-500)'] }}
              transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
            >
              Chevalier
            </motion.span>{' '}
            pour votre{' '}
            <motion.span
              className='font-medium'
              animate={{ color: ['var(--color-sky-500)', 'var(--color-blue-700)', 'var(--color-sky-500)'] }}
              transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
            >
              implant dentaire
            </motion.span>
            .
          </span>
        </div>
        {showContinueButton ? (
          <button className='rounded-md border border-blue-200 px-3 py-2 text-sm font-medium text-blue-600' type='button'>
            Continuer
          </button>
        ) : null}
      </div>
    </div>
  )
}

export const SimultaneousCallsDemo = () => {
  return (
    <div className='relative h-103 w-[560px] overflow-hidden rounded-lg'>
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(color-mix(in_oklab,var(--primary)10%,transparent)_2px,transparent_2px)] bg-size-[20px_20px] bg-fixed' />
      <div
        className='absolute left-1/2 top-3 z-20 -translate-x-1/2 rounded-full border border-blue-200 bg-white px-4 py-1 text-xs font-medium text-blue-600 shadow-sm'
      >
        Appels simultanés
      </div>
      <motion.svg
        viewBox='0 0 560 412'
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
          d='M62 43L72 53L62 63L52 53L62 43Z'
          fill='var(--color-blue-600)'
        />
        <motion.path
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: 'easeInOut', delay: 0.64 }}
          d='M62 53H250Q280 53 280 83V170'
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
          d='M268 158L280 170L292 158'
          stroke='var(--color-blue-600)'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          vectorEffect='non-scaling-stroke'
        />
      </motion.svg>
      <motion.svg
        viewBox='0 0 560 412'
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
          d='M62 43L72 53L62 63L52 53L62 43Z'
          fill='var(--color-blue-600)'
        />
        <motion.path
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: 'easeInOut', delay: 2.84 }}
          d='M62 53H250Q280 53 280 83V170'
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
          d='M268 158L280 170L292 158'
          stroke='var(--color-blue-600)'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          vectorEffect='non-scaling-stroke'
        />
      </motion.svg>
      <motion.svg
        viewBox='0 0 560 412'
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
          d='M52 196L62 206L52 216L42 206L52 196Z'
          fill='var(--color-blue-600)'
        />
        <motion.path
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: 'easeInOut', delay: 1.74 }}
          d='M52 206H240'
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
          d='M228 194L240 206L228 218'
          stroke='var(--color-blue-600)'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          vectorEffect='non-scaling-stroke'
        />
      </motion.svg>
      <motion.svg
        viewBox='0 0 560 412'
        fill='none'
        preserveAspectRatio='none'
        className='pointer-events-none absolute inset-0 z-0 h-full w-full'
        aria-hidden='true'
      >
        <motion.path
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: 'easeInOut', delay: 2.6 }}
          d='M290 196L300 206L290 216L280 206L290 196Z'
          fill='var(--color-blue-600)'
        />
        <motion.path
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: 'easeInOut', delay: 2.84 }}
          d='M290 206H470'
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
          d='M458 194L470 206L458 218'
          stroke='var(--color-blue-600)'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          vectorEffect='non-scaling-stroke'
        />
      </motion.svg>
      <motion.svg
        viewBox='0 0 560 412'
        fill='none'
        preserveAspectRatio='none'
        className='pointer-events-none absolute inset-0 z-0 h-full w-full'
        aria-hidden='true'
      >
        <motion.path
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: 'easeInOut', delay: 3.7 }}
          d='M290 190L300 200L290 210L280 200L290 190Z'
          fill='var(--color-blue-600)'
        />
        <motion.path
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: 'easeInOut', delay: 3.94 }}
          d='M290 200V83Q290 53 320 53H468'
          stroke='var(--color-blue-600)'
          strokeWidth='1.5'
          vectorEffect='non-scaling-stroke'
        />
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            pathLength: { duration: 0.3, ease: 'easeInOut', delay: 4.34 },
            opacity: { duration: 0.1, delay: 4.34 }
          }}
          d='M456 41L468 53L456 65'
          stroke='var(--color-blue-600)'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          vectorEffect='non-scaling-stroke'
        />
      </motion.svg>
      <motion.svg
        viewBox='0 0 560 412'
        fill='none'
        preserveAspectRatio='none'
        className='pointer-events-none absolute inset-0 z-0 h-full w-full -scale-y-100'
        aria-hidden='true'
      >
        <motion.path
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: 'easeInOut', delay: 4.8 }}
          d='M290 190L300 200L290 210L280 200L290 190Z'
          fill='var(--color-blue-600)'
        />
        <motion.path
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: 'easeInOut', delay: 5.04 }}
          d='M290 200V83Q290 53 320 53H468'
          stroke='var(--color-blue-600)'
          strokeWidth='1.5'
          vectorEffect='non-scaling-stroke'
        />
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            pathLength: { duration: 0.3, ease: 'easeInOut', delay: 5.44 },
            opacity: { duration: 0.1, delay: 5.44 }
          }}
          d='M456 41L468 53L456 65'
          stroke='var(--color-blue-600)'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          vectorEffect='non-scaling-stroke'
        />
      </motion.svg>
      <div className='absolute left-[32px] top-[30px] flex size-10 items-center justify-center rounded-full bg-white shadow-sm'>
        <PhoneIcon className='size-5 -scale-x-100 text-green-600' strokeWidth={1.75} />
      </div>
      <div className='absolute left-[18px] top-[76px] w-[68px] text-center text-[11px] font-medium text-green-700'>
        M. Fournier
      </div>
      <div className='absolute left-[32px] top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-sm'>
        <PhoneIcon className='size-5 -scale-x-100 text-green-600' strokeWidth={1.75} />
      </div>
      <div className='absolute left-[12px] top-[232px] w-[80px] text-center text-[11px] font-medium text-green-700'>
        Mme Laurent
      </div>
      <div className='absolute left-1/2 top-1/2 flex size-[62px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-sm'>
        <HouseIcon className='size-[31px] text-blue-600' strokeWidth={1.75} />
      </div>
      <div className='absolute bottom-[34px] left-[32px] flex size-10 items-center justify-center rounded-full bg-white shadow-sm'>
        <PhoneIcon className='size-5 -scale-x-100 text-green-600' strokeWidth={1.75} />
      </div>
      <div className='absolute bottom-[10px] left-[16px] w-[72px] text-center text-[11px] font-medium text-green-700'>
        M. Petit
      </div>
      <div className='absolute right-[32px] top-[30px] flex size-10 items-center justify-center rounded-full bg-white shadow-sm'>
        <PhoneIcon className='size-5 -scale-x-100 text-blue-600' strokeWidth={1.75} />
      </div>
      <div className='absolute right-[10px] top-[76px] w-[84px] text-center text-[11px] font-medium text-blue-700'>
        Agent 1
      </div>
      <div className='absolute right-[32px] top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-sm'>
        <PhoneIcon className='size-5 -scale-x-100 text-blue-600' strokeWidth={1.75} />
      </div>
      <div className='absolute right-[10px] top-[232px] w-[84px] text-center text-[11px] font-medium text-blue-700'>
        Agent 2
      </div>
      <div className='absolute bottom-[34px] right-[32px] flex size-10 items-center justify-center rounded-full bg-white shadow-sm'>
        <PhoneIcon className='size-5 -scale-x-100 text-blue-600' strokeWidth={1.75} />
      </div>
      <div className='absolute bottom-[10px] right-[10px] w-[84px] text-center text-[11px] font-medium text-blue-700'>
        Agent 3
      </div>
    </div>
  )
}

const Features = ({ tabs }: { tabs: tabsData }) => {
  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-6 flex items-center justify-between gap-9 max-sm:flex-col'>
          <div className='max-w-3xl'>
            <MotionPreset
              component='h2'
              className='mb-4 font-[family-name:var(--font-montserrat)] text-lg font-semibold md:text-xl lg:text-2xl'
              fade
              slide={{ direction: 'left', offset: 50 }}
              blur
              transition={{ duration: 0.5 }}
            >
              Des appels mieux orientés, même en forte activité
            </MotionPreset>
            <MotionPreset
              component='p'
              className='text-muted-foreground text-xl'
              fade
              blur
              slide={{ direction: 'left', offset: 50 }}
              delay={0.2}
              transition={{ duration: 0.5 }}
            >
              Bénéficiez de notre expertise en prise de rendez-vous en cabinet multi-praticiens. Alloclinic s’adapte à
              vos agendas, à vos spécialités et à vos règles internes pour orienter chaque patient vers la bonne prise
              en charge, même en cas de forte activité téléphonique.
            </MotionPreset>
          </div>

          {/* Logo */}
          <MotionPreset
            fade
            blur
            zoom={{ initialScale: 0.75 }}
            delay={0.4}
            transition={{ duration: 0.5 }}
            className='mx-auto flex'
          >
            <div className='relative flex size-36 items-center justify-center'>
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='z-1 flex size-32 items-center justify-center rounded-4xl border border-blue-400 bg-white'>
                  <PhoneIcon className='size-14 -scale-x-100 text-blue-600' strokeWidth={1.25} />
                </div>
              </div>
              <div className='absolute inset-0'>
                <div className='absolute inset-12 animate-ping rounded-3xl border-2 border-blue-700'></div>
                <div className='absolute inset-8 animate-ping rounded-3xl border-2 border-blue-700/65'></div>
                <div className='absolute inset-6 animate-ping rounded-3xl border-2 border-blue-700/45'></div>
              </div>
            </div>
          </MotionPreset>
        </div>

        <Tabs defaultValue='upload-files' className='gap-8 sm:gap-16 xl:gap-24'>
          <MotionPreset fade blur slide={{ direction: 'left', offset: 50 }} delay={0.4} transition={{ duration: 0.5 }}>
            <TabsList className='group-data-horizontal/tabs:h-full max-sm:h-auto max-sm:w-full max-sm:flex-col max-sm:items-stretch max-sm:gap-2 max-sm:bg-transparent max-sm:p-0'>
              {tabs.map(({ icon, name, value }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className='text-muted-foreground data-[state=active]:text-blue-600 flex items-center gap-1 px-2.5 max-sm:mx-auto max-sm:w-[92%] max-sm:justify-start max-sm:rounded-md max-sm:px-3 max-sm:py-1.5 max-sm:data-[state=inactive]:bg-blue-50 max-sm:data-[state=active]:bg-background max-sm:data-[state=active]:shadow-sm sm:px-3'
                >
                  {icon}
                  {name}
                </TabsTrigger>
              ))}
            </TabsList>
          </MotionPreset>

          {tabs.map(tab => (
            <TabsContent key={tab.value} value={tab.value}>
              <div className='flex flex-col items-center justify-between gap-11 lg:flex-row'>
                <MotionPreset fade slide={{ direction: 'down', offset: 70 }} blur transition={{ duration: 0.7 }}>
                  <div className='flex flex-col gap-4 lg:w-xl xl:w-2xl'>
                    <Avatar className='after:border-primary'>
                      <AvatarFallback className='bg-transparent text-blue-600 [&>svg]:size-4'>
                        {tab.content.buttonIcon}
                      </AvatarFallback>
                    </Avatar>

                    <p className='text-base font-medium uppercase text-blue-600'>{tab.name}</p>

                    <h3 className='text-card-foreground text-2xl font-semibold'>{tab.content.title}</h3>

                    <p className='text-muted-foreground text-base'>{tab.content.description}</p>

                  </div>
                </MotionPreset>

                <MotionPreset fade blur zoom={{ initialScale: 0.75 }} transition={{ duration: 0.7 }}>
                  <div className='flex h-103 w-118 items-center justify-center max-sm:h-[330px] max-sm:w-full max-sm:overflow-visible'>
                    {tab.content.visual === 'calendar' ? (
                      <div className='translate-x-5 max-sm:translate-x-[46px] max-sm:scale-[0.67]'>
                        <CalendarRangeSingleMonthDemo />
                      </div>
                    ) : tab.content.visual === 'settings' ? (
                      <PractitionerSettingsDemo />
                    ) : tab.content.visual === 'appointment' ? (
                      <div className='max-sm:translate-y-[60px] max-sm:scale-[0.67]'>
                        <AppointmentBookingDemo animateTitle showContinueButton={false} />
                      </div>
                    ) : tab.content.visual === 'simultaneousCalls' ? (
                      <div className='max-sm:scale-[0.67]'>
                        <SimultaneousCallsDemo />
                      </div>
                    ) : (
                      <>
                        <img src={tab.content.image} alt={tab.name} className='h-full w-full object-contain dark:hidden' />
                        <img
                          src={`${tab.content.image.replace('.png', '-dark.png')}`}
                          alt={tab.name}
                          className='hidden h-full w-full object-contain dark:inline-block'
                        />
                      </>
                    )}
                  </div>
                </MotionPreset>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

export default Features
