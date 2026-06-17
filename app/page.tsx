import Header from "@/components/shadcn-studio/blocks/hero-section-40/header"
import HeroSection from "@/components/shadcn-studio/blocks/hero-section-40/hero-section-40"
import type { Navigation } from "@/components/shadcn-studio/blocks/hero-section-40/hero-navigation"
import ContactUs from "@/components/shadcn-studio/blocks/contact-us-page-12/contact-us-page-12"
import Pricing, { type Plan } from "@/components/shadcn-studio/blocks/pricing-component-07/pricing-component-07"
import {
  BellRingIcon,
  FileSpreadsheetIcon,
  HeadsetIcon,
  PhoneIcon,
  RefreshCcwIcon,
  SendIcon,
} from "lucide-react"

const navigationData: Navigation[] = [
  {
    title: "Cas d'usage",
    contentClassName: "!w-141 grid-cols-2",
    items: [
      {
        title: "Prise de rendez-vous",
        href: "#use-cases",
        targetTab: "lead-qualifier",
        description: "Intégration des rdv dans agenda",
        icon: <PhoneIcon className="size-4" />,
      },
      {
        title: "Déplacement et annulation",
        href: "#use-cases",
        targetTab: "meeting-prep",
        description: "Gestion des changements de rdv",
        icon: <RefreshCcwIcon className="size-4" />,
      },
      {
        title: "Rappel de rendez-vous",
        href: "#use-cases",
        targetTab: "follow-ups",
        description: "Envoi de SMS automatique",
        icon: <BellRingIcon className="size-4" />,
      },
      {
        title: "Transmission message",
        href: "#use-cases",
        targetTab: "data-sync",
        description: "Patient souhaite communiquer message",
        icon: <SendIcon className="size-4" />,
      },
      {
        title: "Demande d'information",
        href: "#use-cases",
        targetTab: "content-drafting",
        description: "Service client toujours assuré",
        icon: <HeadsetIcon className="size-4" />,
      },
      {
        title: "Tableau d'appel",
        href: "#use-cases",
        targetTab: "reporting",
        description: "Intégration des données dans dashboard",
        icon: <FileSpreadsheetIcon className="size-4" />,
      },
    ],
  },
  {
    title: "Installation",
    href: "#installation",
  },
  {
    title: "Tarifs",
    href: "#pricing",
  },
]

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Mesages confirmation via Whatsapp',
    subtitle: '',
    price: '249 €',
    accounts: '',
    features: [
      'Audit logiciels télésecrétariat (offert)',
      'Intégration de Alloclinic',
      '500 appels par mois',
      'Deterministic Conversational Mapping ©',
      'Message confirmation de rendez-vous',
      'Notification de rappel',
      'Conservation des appels audio durant 12 mois',
      'Connexion à Doctolib',
      'Formation assistants',
    ],
    buttonText: 'Voir démo'
  },
  {
    id: 'business',
    name: 'Messages confirmation via SMS',
    subtitle: '',
    price: '265€',
    accounts: '',
    features: [
      'Audit logiciels télésecrétariat (offert)',
      'Intégration de Alloclinic',
      '500 appels par mois',
      'Deterministic Conversational Mapping ©',
      'Message confirmation de rendez-vous',
      'Notification de rappel',
      'Conservation des appels audio durant 12 mois',
      'Connexion à Doctolib',
      'Formation assistants',
    ],
    buttonText: 'Voir démo'
  },
  {
    id: 'custom',
    name: 'Audit logiciels télésecrétariat',
    subtitle: '',
    price: '2399 €',
    accounts: '',
    features: [
      'Audit des logiciels de télésecrétariat en place',
      'Analyse des usages et des points de friction',
      'Vérification des flux entre agendas, téléphonie et secrétariat',
      'Recommandations d\'optimisation logicielle',
      'Plan d\'action priorisé avec compte rendu détaillé',
    ],
    buttonText: 'Nous contacter'
  },
  {
    id: 'trial',
    name: '2 mois d’essai satisfait ou remboursé',
    subtitle: '',
    price: '',
    accounts: '',
    features: [
      'Remboursement en intégralité des frais engagés par le cabinet',
      'Audit, installation et paramétrage inclus dans la période d’essai',
      'Validation du déploiement uniquement si le cabinet est satisfait',
      'Accompagnement opérationnel pendant toute la phase d’essai',
      'Compte-rendu des résultats sur vos appels pris par Alloclinic',
    ],
    buttonText: 'Nous contacter'
  }
]

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Header navigationData={navigationData} />
      <main className="flex flex-col">
        <HeroSection />
        <div id="pricing" className="scroll-mt-20">
          <Pricing plans={plans} />
        </div>
        <ContactUs />
      </main>
    </div>
  )
}
