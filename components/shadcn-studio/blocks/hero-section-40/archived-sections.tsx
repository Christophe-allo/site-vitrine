'use client'

import { motion } from 'motion/react'

// Archived latency section. Reinsert in deterministicSectionsData when the speed claim is needed again.
export const archivedLatencySection = {
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
