import ContactForm from '@/components/shadcn-studio/blocks/contact-us-page-12/contact-form'

import { Card, CardContent } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'

const ContactUs = () => {
  return (
    <section id='contact-us' className='scroll-mt-20 py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header Section */}
        <div className='mb-12 space-y-4 text-center'>
          <MotionPreset
            component='h2'
            className='font-[family-name:var(--font-montserrat)] text-2xl font-semibold md:text-3xl lg:text-4xl'
            fade
            slide={{ direction: 'down', offset: 50 }}
            blur
            delay={0.1}
            transition={{ duration: 0.5 }}
          >
            Une question ? Contactez-nous.
          </MotionPreset>

          <MotionPreset
            component='p'
            className='text-muted-foreground text-xl'
            fade
            slide={{ direction: 'down', offset: 50 }}
            blur
            delay={0.2}
            transition={{ duration: 0.5 }}
          >
            Pour toute question, demande d&apos;assistance ou opportunité de collaboration, nous serions ravis d&apos;échanger avec vous.
          </MotionPreset>
        </div>

        {/* Main Content */}
        <div className='grid items-center gap-12 lg:grid-cols-2 lg:gap-4 xl:gap-24'>
          {/* Left Side - Form */}
          <MotionPreset fade slide={{ direction: 'left', offset: 100 }} blur delay={0.4} transition={{ duration: 0.6 }}>
            <Card className='border-blue-200'>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </MotionPreset>

          {/* Right Side - Image */}
          <MotionPreset
            fade
            slide={{ direction: 'right', offset: 100 }}
            blur
            delay={0.6}
            transition={{ duration: 0.6 }}
            className='relative'
          >
            <div className='relative'>
              <img
                src='https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/contact-us/image-13.png'
                alt='Modern office space'
                className='w-full rounded-2xl object-cover'
              />
            </div>
          </MotionPreset>
        </div>
      </div>
    </section>
  )
}

export default ContactUs
