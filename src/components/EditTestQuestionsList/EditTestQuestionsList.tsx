import type {FC} from 'react';
import type {Question} from '@/redux/slices/testEditorSlice/schema/TestEditorSliceSchema.ts';
import {cn} from '@/helpers/utils/cn.ts';

interface EditTestQuestionsListProps {
  questions: Question[];
}

export const EditTestQuestionsList: FC<EditTestQuestionsListProps> = ({questions}) => {
  return (
    <ul className="flex flex-col gap-4">
      {questions.map((question, i) => {
        const questionNumber = i + 1;

        return (
          <li key={i} className="test-card border-border/50">
            <div className="flex items-center justify-between flex-col-reverse md:flex-row gap-4 mb-5">
              <div className="question-title mb-0">
                {questionNumber ? <span className="opacity-50 mr-2">{questionNumber}.</span> : null}
                <span>{question.text}</span>
              </div>

              <div
                className={cn(
                  'px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap',
                )}
              >
                Заглушка на будущее
              </div>
            </div>

            <ul className="flex flex-col gap-2">
              {question.options.map((option, optionIndex) => {
                const isCorrect = question.correctAnswer === optionIndex;

                return (
                  <li
                    key={optionIndex}
                    className={cn(
                      'flex items-center gap-3 p-3 rounded-xl border text-sm transition-all',
                      'bg-bg-main border-transparent',
                      {
                        'bg-success/5 border-success/30 text-success font-medium': isCorrect,
                      },
                    )}
                  >
                    <span className="flex-1 font-semibold">{option}</span>
                    {isCorrect && (
                      <span className="text-[10px] font-bold uppercase opacity-60 ml-2">
                        Верный ответ
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
};
