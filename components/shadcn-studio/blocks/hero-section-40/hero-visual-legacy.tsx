'use client'

import Image from 'next/image'
import { PhoneOffIcon } from 'lucide-react'

const HeroVisualLegacy = () => {
  return (
    <>
      <Image
        src='/images/hero-background-alloclinic-v2.png'
        alt='Professionnelle de sante'
        fill
        className='object-cover'
        sizes='100vw'
        priority
      />
      <div className='absolute top-12 right-[353px] z-10 text-center text-black'>
        <div className='animate-call-fade relative left-[10px] text-xs sm:text-sm'>Appel ...</div>
        <div className='relative left-[10px] text-xl opacity-40 sm:text-2xl'>Cabinet Médical</div>
        <div className='relative left-[20px] text-[10px] opacity-40 sm:text-xs'>Mobile 06 12 34 56 78</div>
        {/*
        <div className='mx-auto mt-3 flex size-18 items-center justify-center rounded-full bg-green-300/60 font-[family-name:var(--font-montserrat)] text-5xl font-semibold'>
          <span className='-translate-y-[10px] text-white'>C</span>
        </div>
        */}
        <div className='absolute top-[305px] left-[calc(50%-55px)] grid -translate-x-1/2 grid-cols-3 gap-1 opacity-40'>
          {Array.from({ length: 9 }).map((_, index) => (
            <span key={index} className='size-1 rounded-full bg-black/70' />
          ))}
          <span className='col-start-2 size-1 rounded-full bg-black/70' />
        </div>
        <div className='absolute top-[341px] left-[calc(50%-55px)] -translate-x-1/2 text-[10px] text-black/70 opacity-40'>
          Clavier
        </div>
        <div className='absolute top-[370px] left-[calc(50%+15px)] flex size-14 -translate-x-1/2 items-center justify-center rounded-full bg-red-600 opacity-40'>
          <PhoneOffIcon className='size-7 text-white' />
        </div>
      </div>
      <Image
        src='/images/hero-person-alloclinic.png'
        alt='Professionnelle de santé'
        width={1097}
        height={1006}
        className='absolute right-0 bottom-0 z-20 h-auto w-[1097px]'
        priority
      />
    </>
  )
}

export default HeroVisualLegacy
