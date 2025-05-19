export type Fandom = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  badgeName: string;
  badgeImageUrl: string;
  quizQuestion: {
    question: string;
    options: string[];
    correctAnswer: number;
  };
  rareNFTName: string;
  rareNFTDescription: string;
  rareNFTImageUrl: string;
};

export const fandoms: Fandom[] = [
  {
    id: 'dhoni',
    name: 'MS Dhoni',
    description: 'Join the fanverse of cricket legend MS Dhoni, Captain Cool who led India to multiple World Cup victories.',
    imageUrl: 'https://images.pexels.com/photos/3628912/pexels-photo-3628912.jpeg',
    badgeName: 'Dhoni Fan Badge',
    badgeImageUrl: 'https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg',
    quizQuestion: {
      question: 'In which year did MS Dhoni lead India to their first T20 World Cup victory?',
      options: ['2005', '2007', '2011', '2013'],
      correctAnswer: 1 // Index of correct answer (2007)
    },
    rareNFTName: 'Dhoni 2011 World Cup Moment',
    rareNFTDescription: 'The iconic six that won India the 2011 Cricket World Cup. A legendary moment frozen in time.',
    rareNFTImageUrl: 'https://images.pexels.com/photos/3657154/pexels-photo-3657154.jpeg'
  },
  {
    id: 'bts',
    name: 'BTS',
    description: 'Join the ARMY in celebrating the global K-pop phenomenon that has broken records worldwide.',
    imageUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
    badgeName: 'BTS ARMY Badge',
    badgeImageUrl: 'https://images.pexels.com/photos/1763279/pexels-photo-1763279.jpeg',
    quizQuestion: {
      question: 'What was BTS\'s first single to reach #1 on the Billboard Hot 100?',
      options: ['Boy With Luv', 'DNA', 'Dynamite', 'Butter'],
      correctAnswer: 2 // Index of correct answer (Dynamite)
    },
    rareNFTName: 'BTS Grammy Performance Moment',
    rareNFTDescription: 'The historic moment when BTS performed at the Grammy Awards, breaking barriers for K-pop worldwide.',
    rareNFTImageUrl: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg'
  },
  {
    id: 'messi',
    name: 'Lionel Messi',
    description: 'Celebrate the career of one of football\'s greatest players, with unmatched skills and achievements.',
    imageUrl: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg',
    badgeName: 'Messi Fan Badge',
    badgeImageUrl: 'https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg',
    quizQuestion: {
      question: 'In which year did Lionel Messi win his first FIFA World Cup with Argentina?',
      options: ['2014', '2018', '2022', 'He has not won a World Cup'],
      correctAnswer: 2 // Index of correct answer (2022)
    },
    rareNFTName: 'Messi World Cup Trophy Moment',
    rareNFTDescription: 'The historic moment when Messi finally lifted the World Cup trophy, completing his legendary career.',
    rareNFTImageUrl: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg'
  }
];

export const getFandomById = (id: string): Fandom | undefined => {
  return fandoms.find(fandom => fandom.id === id);
};