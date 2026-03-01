import {pluralRules} from '../classes/pluralRules';

interface Options {
  zero: string;
  one: string;
  two: string;
  few: string;
  many: string;
}

export const formatWordByCount = (count: number, options: Options) => {
  const {zero, one, two, few, many} = options;
  const form = pluralRules.select(count);

  switch (form) {
    case 'zero':
      return zero;
    case 'one':
      return one;
    case 'two':
      return two;
    case 'few':
      return few;
    case "many":
      return many;
    default:
      return one;
  }
}