import type {FC} from 'react';
import {cn} from '@/helpers/utils/cn.ts';
import {Check, X} from 'lucide-react';

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
    <li className={cn(
      "test-card border-l-4 transition-all",
      isCorrect ? "border-l-success/70" : "border-l-error/70"
    )}>
      <div className="flex items-start justify-between flex-col-reverse md:flex-row gap-4 mb-5">
        <div className="question-title mb-0">
          {questionNumber ? <span className="opacity-50 mr-2">{questionNumber}.</span> : null}
          <span>{questionText}</span>
        </div>

        {/* Бейдж статуса */}
        <div className={cn(
          "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap",
          isCorrect ? "bg-success/10 text-success" : "bg-error/10 text-error"
        )}>
          {isCorrect ? 'Верно' : 'Неверно'}
        </div>
      </div>

      <ul className="flex flex-col gap-2">
        {options.map((option, i) => {
          const isUserAnswer = userAnswer === i;
          const isCorrectAnswer = correctAnswer === i;
          const isWrongSelection = isUserAnswer && !isCorrect;

          return (
            <li
              key={i}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl border text-sm transition-all",
                "bg-bg-main border-transparent",
                {
                  "bg-success/5 border-success/30 text-success font-medium": isCorrectAnswer,
                  "bg-error/5 border-error/30 text-error font-medium": isWrongSelection,
                  "opacity-60": !isUserAnswer && !isCorrectAnswer
                }
              )}
            >
              {/* Иконка-индикатор слева */}
              <div className={cn(
                "size-5 rounded-full flex items-center justify-center shrink-0 border",
                {
                  "bg-success text-white border-success": isCorrectAnswer,
                  "bg-error text-white border-error": isWrongSelection,
                  "border-border opacity-20": !isCorrectAnswer && !isWrongSelection
                }
              )}>
                {isCorrectAnswer && <Check size={12} strokeWidth={3} />}
                {isWrongSelection && <X size={12} strokeWidth={3} />}
              </div>
              <span className="flex-1">{option}</span>
              {isUserAnswer && (
                <span className="text-[10px] font-bold uppercase opacity-60 ml-2">
                  Ваш ответ
                </span>
              )}
            </li>
          )
        })}
      </ul>
    </li>
  );
};
