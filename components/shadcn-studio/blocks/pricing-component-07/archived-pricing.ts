import type { Plan } from './pricing-component-07'

// Archived pricing section. Reinsert in app/page.tsx when public pricing should be visible again.
export const archivedPricingPlans: Plan[] = [
  {
    id: 'free',
    name: 'Mesages confirmation via Whatsapp',
    subtitle: '',
    price: '279 €',
    accounts: '',
    features: [
      'Audit des logiciels de télésecrétariat (offert)',
      'Installation Alloclinic (offerte)',
      'Paramétrages en fonction des spécificités de votre cabinet',
      'Appels illimités',
      'Confirmation de rendez-vous (en option)',
      'Tableau d\'appels: statistiques, transcriptions, audios, messages',
      'Deterministic Conversational Mapping ©',
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
