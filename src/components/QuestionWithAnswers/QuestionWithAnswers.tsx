import {Label, RadioGroup, RadioGroupItem} from "@/components/common";
import type {DetailedHTMLProps, FC, HTMLAttributes} from "react";
import {cn} from "@/helpers/utils/cn.ts";

interface QuestionWithAnswersProps extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  questionId: string;
  questionText: string;
  questionNumber?: number;
  options: string[];
  onAnswerClick: (qId: string, answerAsString: string) => void;
}

export const QuestionWithAnswers: FC<QuestionWithAnswersProps> = (props) => {
  const {questionId, questionNumber, questionText, options, onAnswerClick, className, ...restProps} = props;

  return (
    <li className={cn("flex flex-col bg-surface p-6 rounded-2xl border border-border shadow-sm", className)} {...restProps}>
      <div className="text-lg font-semibold text-text-main mb-5 leading-snug">
        {questionNumber ? <span className="mr-2">{questionNumber}.</span> : null}
        <span>{questionText}</span>
      </div>

      <RadioGroup className="gap-2">
        {options.map((option, i) => {
          const answerAsString = String(i);
          const elementId = `${questionId}_${i}`;

          return (
            <div
              key={elementId}
              className={cn(
                "flex items-center rounded-xl border border-transparent transition-all relative",
                "hover:bg-bg-main hover:border-border group"
              )}
            >
              <RadioGroupItem
                className="absolute top-1/2 left-3 -translate-y-1/2"
                value={answerAsString}
                id={elementId}
                onClick={() => onAnswerClick(questionId, answerAsString)}
              />
              <Label
                className="mb-0 font-medium cursor-pointer flex-1 py-1 pl-10 py-3"
                htmlFor={elementId}
              >
                {option}
              </Label>
            </div>
          )
        })}
      </RadioGroup>
    </li>
  )
}