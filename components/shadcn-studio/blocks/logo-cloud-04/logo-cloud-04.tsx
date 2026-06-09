import { Marquee } from '@/components/ui/marquee'
import { MotionPreset } from '@/components/ui/motion-preset'

type BrandLogo = {
  image: string
  name: string
  className?: string
}

const LogoCloud = ({ brandLogos }: { brandLogos: BrandLogo[] }) => {
  return (
    <section className='-mt-[100px] bg-white py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-12 space-y-4 text-center sm:mb-16 lg:mb-24'>
          <MotionPreset
            component='p'
            className='-mt-5 font-[family-name:var(--font-montserrat)] text-xl font-bold text-zinc-800'
            fade
            blur
            slide={{ direction: 'down', offset: 50 }}
            transition={{ duration: 0.5 }}
            delay={0.6}
          >
            Compatible avec vos logiciels médicaux
          </MotionPreset>
        </div>

        <div className='relative -mx-[100px] -mt-[90px]'>
          <div className='pointer-events-none absolute inset-y-0 left-0 z-1 w-35 bg-linear-to-r from-white/70 to-transparent' />
          <div className='pointer-events-none absolute inset-y-0 right-0 z-1 w-35 bg-linear-to-l from-white/70 to-transparent' />
          <div className='w-full overflow-hidden'>
            <Marquee pauseOnHover duration={35} gap={1.5}>
              {brandLogos.map((logo, index) => (
                <div key={index} className='flex h-20 items-center justify-center rounded-lg bg-card px-9 shadow-md'>
                  <img src={logo.image} alt={logo.name} className={logo.className ?? 'h-6'} />
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LogoCloud
