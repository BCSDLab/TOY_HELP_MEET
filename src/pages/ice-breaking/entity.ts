export interface QuestionValue {
  title: string;
  color: string;
  shadow: string;
  path: string;
}

export interface Question {
  couple: QuestionValue;
  friend: QuestionValue;
  job: QuestionValue;
  family: QuestionValue;
}

export const QUESTION_TYPE: Question = {
  couple: {
    title: '연인',
    color: '#DC5B5B',
    shadow: '#FFDFDF',
    path: '/ice-breaking/select/couple',
  },
  friend: {
    title: '친구',
    color: '#638CCB',
    shadow: '#b8d2f9',
    path: '/ice-breaking/select/friend',
  },
  job: {
    title: '직장',
    color: '#85B68D',
    shadow: '#d1ffd9',
    path: '/ice-breaking/select/job',
  },
  family: {
    title: '가족',
    color: '#CA9648',
    shadow: '#ffe5bf',
    path: '/ice-breaking/select/family',
  },
};
