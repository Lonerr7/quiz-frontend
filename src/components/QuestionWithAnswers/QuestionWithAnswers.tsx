import {Label, RadioGroup, RadioGroupItem} from "@/components/common";
import type {DetailedHTMLProps, FC, HTMLAttributes} from "react";

interface QuestionWithAnswersProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  questionId: string;
  questionText: string;
  options: string[];
  onAnswerClick: (qId: string, answerAsString: string) => void;
}

export const QuestionWithAnswers: FC<QuestionWithAnswersProps> = (props) => {
  const {questionId, questionText, options, onAnswerClick, ...restProps} = props;

  return (
    <div {...restProps}>
      <div className="mb-3">{questionText}</div>
      <RadioGroup>
        {options.map((option, i) => {
          const answerAsString = String(i);
          const elementId = `${questionId}_${i}`;

          return (
            <div key={elementId} className="flex items-center gap-2.5">
              <RadioGroupItem
                value={answerAsString}
                id={elementId}
                onClick={() => onAnswerClick(questionId, answerAsString)}
              />
              <Label htmlFor={elementId}>
                {option}
              </Label>
            </div>
          )
        })}
      </RadioGroup>
    </div>
  )
}