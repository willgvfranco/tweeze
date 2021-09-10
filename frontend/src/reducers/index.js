import ThemeOptions from './ThemeOptions';
import AuthReducer from './AuthDuck';
import WordsReducer from './WordsDuck';
import NewsReducer from './NewsDuck';
import PaymentReducer from './PaymentDuck';

export default {
  ThemeOptions,
  auth: AuthReducer,
  words: WordsReducer,
  news: NewsReducer,
  payment: PaymentReducer
};
