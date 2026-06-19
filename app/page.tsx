import Header from "@/components/shadcn-studio/blocks/hero-section-40/header"
import HeroSection from "@/components/shadcn-studio/blocks/hero-section-40/hero-section-40"
import type { Navigation } from "@/components/shadcn-studio/blocks/hero-section-40/hero-navigation"
import ContactUs from "@/components/shadcn-studio/blocks/contact-us-page-12/contact-us-page-12"
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
]

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Header navigationData={navigationData} />
      <main className="flex flex-col">
        <HeroSection />
        <ContactUs />
      </main>
    </div>
  )
}
