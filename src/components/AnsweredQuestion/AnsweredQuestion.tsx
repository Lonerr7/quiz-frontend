import type {FC} from 'react';
import {cn} from '@/helpers/utils/cn.ts';

interface AnsweredQuestionProps {
  questionNumber?: number;
  questionText: string;
  options: string[];
  isCorrect: boolean;
  userAnswer: number | null;
  correctAnswer: number;
}

export const AnsweredQuestion: FC<AnsweredQuestionProps> = (props) => {
  const {questionNumber, questionText, options, isCorrect, userAnswer, correctAnswer} = props;

  return (
    <li className="test-card">
      <div className="question-title">
        {questionNumber ? <span className="mr-2">{questionNumber}.</span> : null}
        <span>{questionText}</span>
      </div>

      <ul>
        {options.map((option, i) => (
          <li
            className={cn({
              'text-success': correctAnswer === i,
              'text-error': userAnswer === i && !isCorrect,
            })}
            key={i}
          >
            {option}
          </li>
        ))}
      </ul>
    </li>
  );
};
