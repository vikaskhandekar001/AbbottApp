export interface Theme {
  backgroundColor: string;
  textColor: string;
  primaryColor: string;
  secondaryColor?: string;
  accentColor?: string;
}

const lightColors: Theme = {
  backgroundColor: '#fff',
  textColor: '#000',
  primaryColor: '#6200ee',
};

const darkColors: Theme = {
  backgroundColor: '#121212',
  textColor: '#fff',
  primaryColor: '#bb86fc',
};

export {lightColors, darkColors};
