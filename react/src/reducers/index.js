import ThemeOptions from './ThemeOptions';
import AuthReducer from './AuthDuck';
import WordsReducer from './WordsDuck';
import NewsReducer from './NewsDuck';

export default {
  ThemeOptions,
  auth: AuthReducer,
  words: WordsReducer,
  news: NewsReducer
};
