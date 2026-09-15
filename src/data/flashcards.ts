import { DeckCategory, FlashcardQuestion } from '../types/flashcard';

export const DECK_CATEGORIES: DeckCategory[] = [
  {
    id: 'all',
    name: 'All Subjects Mixed Deck',
    description: 'A comprehensive mix of science, geography, tech, and general knowledge questions.',
    icon: '🌟',
    questionCount: 12,
  },
  {
    id: 'science',
    name: 'Science & Nature',
    description: 'Explore biology, physics, chemistry, and space phenomena.',
    icon: '🧪',
    questionCount: 4,
  },
  {
    id: 'geography',
    name: 'World Geography',
    description: 'Test your knowledge of capitals, landmarks, oceans, and continents.',
    icon: '🌍',
    questionCount: 4,
  },
  {
    id: 'tech',
    name: 'Tech & Computing',
    description: 'Master concepts in web development, computer science, and algorithms.',
    icon: '💻',
    questionCount: 4,
  },
];

export const FLASHCARD_QUESTIONS: FlashcardQuestion[] = [
  // Science & Nature
  {
    id: 'sci-1',
    category: 'science',
    question: 'Which chemical element has the symbol "Au" on the periodic table?',
    options: ['Silver', 'Gold', 'Copper', 'Aluminum'],
    correctAnswerIndex: 1,
    explanation: 'Au comes from the Latin word "Aurum", which translates to shining dawn or gold.',
  },
  {
    id: 'sci-2',
    category: 'science',
    question: 'What process do green plants use to synthesize food from carbon dioxide and water?',
    options: ['Respiration', 'Osmosis', 'Photosynthesis', 'Fermentation'],
    correctAnswerIndex: 2,
    explanation: 'Photosynthesis uses light energy from the sun to convert water and carbon dioxide into glucose and oxygen.',
  },
  {
    id: 'sci-3',
    category: 'science',
    question: 'Which organ in the human body produces insulin to regulate blood sugar levels?',
    options: ['Liver', 'Pancreas', 'Kidney', 'Gallbladder'],
    correctAnswerIndex: 1,
    explanation: 'The pancreas contains beta cells in the Islets of Langerhans that secrete insulin.',
  },
  {
    id: 'sci-4',
    category: 'science',
    question: 'What is the speed of light in a vacuum approximately equal to?',
    options: ['300,000 km/s', '150,000 km/s', '1,000,000 km/s', '30,000 km/s'],
    correctAnswerIndex: 0,
    explanation: 'The speed of light in a vacuum is defined as exactly 299,792,458 meters per second (~300,000 km/s).',
  },

  // World Geography
  {
    id: 'geo-1',
    category: 'geography',
    question: 'What is the capital city of Australia?',
    options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
    correctAnswerIndex: 2,
    explanation: 'Canberra was chosen as the capital in 1908 as a compromise between Sydney and Melbourne.',
  },
  {
    id: 'geo-2',
    category: 'geography',
    question: 'Which ocean is the largest and deepest on Planet Earth?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
    correctAnswerIndex: 3,
    explanation: 'The Pacific Ocean covers over 30% of the Earth’s surface area and houses the Mariana Trench.',
  },
  {
    id: 'geo-3',
    category: 'geography',
    question: 'Which river is widely recognized as the longest river in the world?',
    options: ['Amazon River', 'Nile River', 'Mississippi River', 'Yangtze River'],
    correctAnswerIndex: 1,
    explanation: 'The Nile River in Africa spans approximately 6,650 kilometers (4,132 miles).',
  },
  {
    id: 'geo-4',
    category: 'geography',
    question: 'On which continent would you find the Atacama Desert, the driest non-polar desert in the world?',
    options: ['Africa', 'Asia', 'South America', 'Australia'],
    correctAnswerIndex: 2,
    explanation: 'The Atacama Desert is located in northern Chile, South America.',
  },

  // Tech & Computing
  {
    id: 'tech-1',
    category: 'tech',
    question: 'What does CSS stand for in modern web design and front-end development?',
    options: ['Creative Style Sheets', 'Cascading Style Sheets', 'Computer System Styles', 'Colorful Style Structure'],
    correctAnswerIndex: 1,
    explanation: 'Cascading Style Sheets describes how HTML elements are to be displayed on screen.',
  },
  {
    id: 'tech-2',
    category: 'tech',
    question: 'In JavaScript & Web APIs, which HTTP method is typically used to create a new resource on a server?',
    options: ['GET', 'PUT', 'POST', 'DELETE'],
    correctAnswerIndex: 2,
    explanation: 'The POST method submits data to be processed to a specified resource, often creating a new entry.',
  },
  {
    id: 'tech-3',
    category: 'tech',
    question: 'Which data structure follows the Last-In, First-Out (LIFO) order of operation?',
    options: ['Queue', 'Stack', 'Linked List', 'Array'],
    correctAnswerIndex: 1,
    explanation: 'A Stack operates on LIFO principles where the last element pushed is the first element popped.',
  },
  {
    id: 'tech-4',
    category: 'tech',
    question: 'What is the primary function of Next.js App Router in React applications?',
    options: [
      'Database management',
      'Server-side rendering and file-system based routing',
      'CSS animation processing',
      'Browser extension compilation',
    ],
    correctAnswerIndex: 1,
    explanation: 'Next.js App Router leverages React Server Components for file-system routing and optimized rendering.',
  },
];
