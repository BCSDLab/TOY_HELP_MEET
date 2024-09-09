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

export const QUESTION_LIST={
  family: [
    '가장 기억에 남는 가족 여행의 여행지는 어디였나요 ?',
    '가족 중 누구와 가장 닮았다고 생각하시나요?',
    '가족 중 누구와 가장 많은 시간을 보내시나요?',
    '우리가족 만의 특별한 활동이 있나요?',
    '추억이 있는 가족사진이 있나요?',
    '가족과 함께 하고 싶은 버킷리스트가 있나요?',
    '가족들의 MBTI가 어떻게 되나요?',
    '부모님께서 어릴 때는 어떤 성격이었나요?',
    '주말에 가족끼리 무얼 했었나요?',
    '가족 중에서 누가 가장 요리를 잘 하나요?'],
  friend: [
    '본가가 어디야?',
    'MBTI가 뭐야?',
    '좋아하는 게임 있어?',
    '매운 음식 잘 먹어?',
    '근처 맛집 잘 알아?',
    '여행가는거 좋아해?',
    '영화보는거 좋아해?',
    '동생이나 언니/오빠 있어?',
    '취미가 뭐야?',
    '사는 지역이 어디야?',
  ],
  job: [
    '이번 연휴에 따로 세워둔 계획이 있으세요?',
    '점심 뭐 드실래요?',
    '취미는 어떻게 되세요?',
    '좋아하는 운동 있으세요?',
    '주변에 절대 가지말아야하는 식당이 있을까요?',
    '일 하는데 어려운건 없으세요?',
    '목표하시는 연봉이 있을까요?',
    '회사 워라벨은 어떤 것 같으세요?',
    '새로 사놨으면 하는 간식있으신가요?',
    '이 주변 맛집이 뭐가 있나요?',
  ],
  couple: [
    '그 사람과 처음 만났던 장소 기억나?',
    '그 사람과 본인이 가장 닮았다고 생각하는게 뭐야?',
    '그 사람과 가장 잘 어울리는 색깔이 뭐야?',
    '그 사람이 가장 아끼는 물건은 뭐야?',
    '그 사람의 정신연령은 몇살 같아?',
    '그 사람이 싫어하는 음식은 뭐야?',
    '그 사람 첫 인상은 어땟어?',
    '그 사람을 한 단어로 표현해 볼까?',
    '그 사람을 생각하면 떠오르는 노래가 있어?',
    '만약 권태기가 온다면 어떻게 극복할 것 같아?',
  ]
}
