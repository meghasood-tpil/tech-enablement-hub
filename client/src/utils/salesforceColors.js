// Salesforce Brand Colors 2026
export const salesforceColors = {
  // Electric Blue
  electricBlue15: '#001E5B',
  electricBlue30: '#022AC0',
  electricBlue50: '#066AFE',
  electricBlue80: '#A8CBFF',
  electricBlue95: '#EDF4FF',

  // Cloud Blue
  cloudBlue20: '#023248',
  cloudBlue40: '#05628A',
  cloudBlue60: '#00B3FF',
  cloudBlue80: '#90D0FE',
  cloudBlue95: '#EAF5FE',

  // Teal
  teal20: '#023434',
  teal40: '#056764',
  teal60: '#06A59A',
  teal80: '#04E1CB',
  teal95: '#DEF9F3',

  // Yellow
  yellow20: '#4F2100',
  yellow50: '#A86403',
  yellow70: '#E4A201',
  yellow80: '#FCC003',
  yellow95: '#FBF3E0',

  // Pink
  pink20: '#61022A',
  pink40: '#B60554',
  pink60: '#FF538A',
  pink70: '#FE8AA7',
  pink95: '#FEF0F3',

  // Violet
  violet20: '#481A54',
  violet30: '#730394',
  violet50: '#BA01FF',
  violet65: '#D17DFE',
  violet95: '#F9F0FF',

  // Orange
  orange30: '#5F3E02',
  orange50: '#A96404',
  orange65: '#F38303',
  orange80: '#FFBA90',
  orange95: '#FFF1EA',

  // Green
  green20: '#1C3326',
  green50: '#2E844A',
  green70: '#45C65A',
  green80: '#91DB8B',
  green95: '#EBF7E6',

  // Purple
  purple20: '#401075',
  purple40: '#7526E3',
  purple60: '#AD7BEE',
  purple70: '#C29EF1',
  purple95: '#F6F2FB',

  // Indigo
  indigo20: '#321D71',
  indigo30: '#2F2CB7',
  indigo50: '#5867E8',
  indigo70: '#9EA9F1',
  indigo95: '#F1F3FB',

  // Hot Orange
  hotOrange30: '#7E2600',
  hotOrange60: '#FF5D2D',
  hotOrange70: '#FF906E',
  hotOrange95: '#FEF1ED',
};

// Program type color mappings
export const programColors = {
  'Calendar Training': {
    primary: salesforceColors.electricBlue50,
    secondary: salesforceColors.cloudBlue80,
    background: salesforceColors.cloudBlue95,
    accent: salesforceColors.electricBlue30
  },
  'Tech Talks': {
    primary: salesforceColors.violet50,
    secondary: salesforceColors.violet65,
    background: salesforceColors.violet95,
    accent: salesforceColors.violet30
  },
  'Cohort Programs': {
    primary: salesforceColors.teal60,
    secondary: salesforceColors.teal80,
    background: salesforceColors.teal95,
    accent: salesforceColors.teal40
  },
  'Onboarding Program': {
    primary: salesforceColors.green50,
    secondary: salesforceColors.green80,
    background: salesforceColors.green95,
    accent: salesforceColors.green70
  },
  'Partnership Programs': {
    primary: salesforceColors.orange65,
    secondary: salesforceColors.orange80,
    background: salesforceColors.orange95,
    accent: salesforceColors.orange50
  }
};

export const getGradient = (type) => {
  const colors = programColors[type];
  if (!colors) return 'linear-gradient(135deg, #066AFE 0%, #90D0FE 100%)';
  return `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`;
};
