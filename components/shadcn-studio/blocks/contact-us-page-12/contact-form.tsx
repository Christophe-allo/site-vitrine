'use client'

import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'

const ContactForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitState, setSubmitState] = useState<{
    type: 'idle' | 'success' | 'error'
    message: string
  }>({
    type: 'idle',
    message: ''
  })
  const [selectedServices, setSelectedServices] = useState({
    medical: false,
    dental: false,
    nursing: false,
    other: false
  })

  const areMainFieldsCompleted = useMemo(() => {
    return name.trim().length > 0 && email.trim().length > 0 && message.trim().length > 0
  }, [name, email, message])

  const hasSelectedService = useMemo(() => {
    return Object.values(selectedServices).some(Boolean)
  }, [selectedServices])

  const isFormReady = areMainFieldsCompleted && hasSelectedService

  const serviceCheckboxClassName =
    'data-[state=checked]:!bg-blue-500 data-[state=checked]:!border-blue-500'

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isFormReady || isSubmitting) {
      return
    }

    setIsSubmitting(true)
    setSubmitState({ type: 'idle', message: '' })

    try {
      const services = Object.entries(selectedServices)
        .filter(([, checked]) => checked)
        .map(([service]) => service)

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          message,
          services
        })
      })

      if (!response.ok) {
        throw new Error("Une erreur est survenue pendant l'envoi du message.")
      }

      setName('')
      setEmail('')
      setMessage('')
      setSelectedServices({
        medical: false,
        dental: false,
        nursing: false,
        other: false
      })
      setSubmitState({
        type: 'success',
        message: 'Votre message a bien été envoyé.'
      })
    } catch {
      setSubmitState({
        type: 'error',
        message: "L'envoi du message a échoué. Réessayez dans un instant."
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className='space-y-6' onSubmit={handleSubmit}>
      {/* Name Input */}
      <div className='space-y-2'>
        <Label htmlFor='name'>Nom *</Label>
        <Input
          type='text'
          id='name'
          placeholder='Paul Dupont'
          value={name}
          onChange={e => setName(e.target.value)}
          className='input-lg border-blue-200 focus-visible:border-blue-500 focus-visible:ring-blue-200'
        />
      </div>

      {/* Email Input */}
      <div className='space-y-2'>
        <Label htmlFor='email'>Email *</Label>
        <Input
          type='email'
          id='email'
          placeholder='contact@moncabinet.fr'
          value={email}
          onChange={e => setEmail(e.target.value)}
          className='input-lg border-blue-200 focus-visible:border-blue-500 focus-visible:ring-blue-200'
        />
      </div>

      {/* Message Input */}
      <div className='space-y-2'>
        <Label htmlFor='message'>Message *</Label>
        <Textarea
          id='message'
          placeholder='Combien de temps pour installer Alloclinic ?'
          value={message}
          onChange={e => setMessage(e.target.value)}
          className='min-h-24 border-blue-200 focus-visible:border-blue-500 focus-visible:ring-blue-200'
        />
      </div>

      {/* Services Section */}
      <div className='space-y-4'>
        <Label className='text-base font-medium'>Types de Cabinets *</Label>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='cabinet-medical'
              className={serviceCheckboxClassName}
              checked={selectedServices.medical}
              onCheckedChange={checked =>
                setSelectedServices(prev => ({ ...prev, medical: checked === true }))
              }
            />
            <Label htmlFor='cabinet-medical' className='text-sm'>
              Cabinet médical
            </Label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='cabinets-dentaire'
              className={serviceCheckboxClassName}
              checked={selectedServices.dental}
              onCheckedChange={checked =>
                setSelectedServices(prev => ({ ...prev, dental: checked === true }))
              }
            />
            <Label htmlFor='cabinets-dentaire' className='text-sm'>
              Cabinets dentaire
            </Label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='cabinet-infirmier'
              className={serviceCheckboxClassName}
              checked={selectedServices.nursing}
              onCheckedChange={checked =>
                setSelectedServices(prev => ({ ...prev, nursing: checked === true }))
              }
            />
            <Label htmlFor='cabinet-infirmier' className='text-sm'>
              Cabinet infirmier
            </Label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='autre-cabinet'
              className={serviceCheckboxClassName}
              checked={selectedServices.other}
              onCheckedChange={checked =>
                setSelectedServices(prev => ({ ...prev, other: checked === true }))
              }
            />
            <Label htmlFor='autre-cabinet' className='text-sm'>
              Autre cabinet
            </Label>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type='submit'
        size='lg'
        disabled={!isFormReady || isSubmitting}
        className='w-full !bg-slate-500 !text-white hover:!bg-blue-500 disabled:!bg-slate-300 disabled:!text-white disabled:opacity-100'
      >
        {isSubmitting ? 'Envoi...' : 'Send Message'}
      </Button>

      {submitState.type !== 'idle' ? (
        <p
          className={
            submitState.type === 'success'
              ? 'text-sm text-green-600'
              : 'text-sm text-red-600'
          }
        >
          {submitState.message}
        </p>
      ) : null}
    </form>
  )
}

export default ContactForm
