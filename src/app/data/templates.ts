import { Template } from '../components/TemplateSelector';

export const socialMediaTemplates: Template[] = [
  {
    id: 'childrens-rights-day',
    name: 'Children\'s Rights Day',
    description: 'Awareness post for Universal Children\'s Day',
    focusArea: 'childrens-rights',
    tone: 'inspiring',
    prefilledTopic: 'Universal Children\'s Day - Every child matters'
  },
  {
    id: 'diversity-celebration',
    name: 'Diversity Celebration',
    description: 'Celebrate cultural diversity and inclusion',
    focusArea: 'diversity',
    tone: 'engaging',
    prefilledTopic: 'Celebrating diversity in our communities'
  },
  {
    id: 'integration-success',
    name: 'Integration Success Story',
    description: 'Share positive integration outcomes',
    focusArea: 'integration',
    tone: 'inspiring',
    prefilledTopic: 'Integration programs creating real change'
  },
  {
    id: 'workshop-announcement',
    name: 'Workshop Announcement',
    description: 'Promote upcoming equality workshops',
    focusArea: 'equality',
    tone: 'professional',
    prefilledTopic: 'Join our upcoming equality workshop for educators'
  }
];

export const blogTemplates: Template[] = [
  {
    id: 'crc-explainer',
    name: 'Convention on Rights of Child',
    description: 'Educational article about children\'s rights',
    focusArea: 'childrens-rights',
    tone: 'educational',
    prefilledTopic: 'Understanding the Convention on the Rights of the Child'
  },
  {
    id: 'intersectional-approach',
    name: 'Intersectional Perspective',
    description: 'Deep dive into intersectionality in advocacy',
    focusArea: 'equality',
    tone: 'professional',
    prefilledTopic: 'Why an intersectional approach matters in equality work'
  },
  {
    id: 'youth-voices',
    name: 'Youth Voices Matter',
    description: 'Amplifying young people\'s perspectives',
    focusArea: 'democracy',
    tone: 'inspiring',
    prefilledTopic: 'Listening to youth: Democracy starts with participation'
  },
  {
    id: 'anti-discrimination',
    name: 'Anti-Discrimination Guide',
    description: 'Practical guide for addressing discrimination',
    focusArea: 'human-rights',
    tone: 'educational',
    prefilledTopic: 'Recognizing and addressing discrimination in schools'
  }
];

export const websiteTemplates: Template[] = [
  {
    id: 'about-mission',
    name: 'About Our Mission',
    description: 'Organization mission and values',
    focusArea: 'equality',
    tone: 'professional',
    prefilledTopic: 'Our commitment to equality and human rights'
  },
  {
    id: 'program-overview',
    name: 'Program Overview',
    description: 'Description of key programs',
    focusArea: 'integration',
    tone: 'professional',
    prefilledTopic: 'Our integration and outreach programs'
  },
  {
    id: 'get-involved',
    name: 'Get Involved',
    description: 'Call to action for supporters',
    focusArea: 'democracy',
    tone: 'engaging',
    prefilledTopic: 'Join us in advancing equality for all'
  },
  {
    id: 'resources-parents',
    name: 'Resources for Parents',
    description: 'Parent education resources',
    focusArea: 'childrens-rights',
    tone: 'educational',
    prefilledTopic: 'Supporting your child\'s rights and development'
  }
];

export const contentLibrary = {
  equality: {
    keywords: ['equal opportunities', 'non-discrimination', 'fairness', 'equity', 'inclusive society'],
    statistics: [
      '73% of young people report experiencing discrimination based on background',
      'Schools with diversity programs show 45% improvement in inclusive behavior',
      '89% of parents want more education on equality and children\'s rights'
    ],
    quotes: [
      'Equality is not just a goal—it\'s a fundamental human right that benefits everyone.',
      'True equality means removing barriers so every child can reach their full potential.'
    ]
  },
  diversity: {
    keywords: ['cultural richness', 'multiple perspectives', 'representation', 'inclusion', 'belonging'],
    statistics: [
      'Diverse communities show 62% higher innovation in problem-solving',
      '91% of young people value learning about different cultures',
      'Multilingual education programs improve academic outcomes by 38%'
    ],
    quotes: [
      'Diversity is our strength, and inclusion is how we harness that strength.',
      'Every culture, every voice, every perspective enriches our shared future.'
    ]
  },
  integration: {
    keywords: ['community building', 'mutual understanding', 'social cohesion', 'participation', 'belonging'],
    statistics: [
      'Integration programs increase community participation by 67%',
      '84% of participants report stronger sense of belonging after integration activities',
      'Communities with active integration programs show 53% lower social isolation'
    ],
    quotes: [
      'Integration is a two-way street built on respect and mutual learning.',
      'Strong communities are built when everyone has a place and a voice.'
    ]
  },
  democracy: {
    keywords: ['participation', 'youth voice', 'decision-making', 'civic engagement', 'empowerment'],
    statistics: [
      'Youth councils increase civic participation by 71% among young people',
      '76% of young people want more say in decisions affecting their lives',
      'Democratic participation programs improve community trust by 58%'
    ],
    quotes: [
      'Democracy thrives when every voice, especially young voices, is heard and valued.',
      'Teaching democracy means practicing it—giving young people real power to shape their world.'
    ]
  },
  'childrens-rights': {
    keywords: ['Convention on Rights of Child', 'protection', 'development', 'participation', 'best interests'],
    statistics: [
      'Only 42% of children know about their rights under the CRC',
      'Schools teaching children\'s rights see 69% reduction in bullying',
      '95% of educators want more training on implementing children\'s rights'
    ],
    quotes: [
      'Every child has the right to be heard, protected, and given opportunities to thrive.',
      'Children\'s rights aren\'t privileges—they\'re fundamental human rights that we must uphold.'
    ]
  },
  'human-rights': {
    keywords: ['dignity', 'universal rights', 'protection', 'equality before law', 'non-discrimination'],
    statistics: [
      '68% of discrimination cases go unreported due to lack of awareness',
      'Human rights education programs increase reporting by 81%',
      '93% of people support human rights but only 34% know their specific rights'
    ],
    quotes: [
      'Human rights are not negotiable—they belong to everyone, everywhere, always.',
      'Protecting human rights means standing up against all forms of discrimination.'
    ]
  }
};
