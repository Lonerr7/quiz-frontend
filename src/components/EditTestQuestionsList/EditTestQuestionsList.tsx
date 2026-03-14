import {type FC, useRef, useState} from 'react';
import type {Question} from '@/redux/slices/testEditorSlice/schema/TestEditorSliceSchema.ts';
import {cn} from '@/helpers/utils/cn.ts';
import {Button} from '@/components/common';
import {SquarePen, Trash2} from 'lucide-react';
import {ConfirmDialog} from '@/components/ConfirmDialog/ConfirmDialog.tsx';
import {useAppDispatch} from '@/redux/hooks/reduxHooks.ts';
import {testEditorSliceActions} from '@/redux/slices/testEditorSlice/slice/testEditorSlice.ts';
import {EditQuestionDialog} from '@/components/EditQuestionDialog/EditQuestionDialog.tsx';

interface EditTestQuestionsListProps {
  questions: Question[];
}

export const EditTestQuestionsList: FC<EditTestQuestionsListProps> = ({questions}) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const questionToDelete = useRef<number | null>(null);
  const dispatch = useAppDispatch();
  const {deleteQuestion} = testEditorSliceActions;

  const handleOpenConfirmDialog = (questionIndex: number) => {
    setIsConfirmDialogOpen(true);
    questionToDelete.current = questionIndex;
  };

  const handleCloseConfirmDialog = () => {
    setIsConfirmDialogOpen(false);
    questionToDelete.current = null;
  };

  const handleDeleteQuestion = () => {
    if (typeof questionToDelete.current === 'number') {
      dispatch(deleteQuestion(questionToDelete.current));
    }
    handleCloseConfirmDialog();
  };

  return (
    <div>
      <div className="font-semibold">Вопросы</div>
      {questions.length ? (
        <ul className="flex flex-col gap-4">
          {questions.map((question, questionIndex) => {
            const questionDisplayNumber = questionIndex + 1;

            return (
              <li key={questionIndex} className="test-card border-border/50">
                <div className="flex items-center justify-between flex-col-reverse md:flex-row gap-4 mb-5">
                  <div className="question-title mb-0">
                    {questionDisplayNumber ? (
                      <span className="opacity-50 mr-2">{questionDisplayNumber}.</span>
                    ) : null}
                    <span>{question.text}</span>
                  </div>

                  <div className={cn('flex items-center gap-2.5')}>
                    <Button
                      className="px-3"
                      type="button"
                      variant="danger"
                      onClick={() => handleOpenConfirmDialog(questionIndex)}
                    >
                      <Trash2 size={18} />
                    </Button>
                    <Button
                      className="px-3"
                      variant="outline"
                      type="button"
                      onClick={() => setIsEditDialogOpen(true)}
                    >
                      <SquarePen size={18} />
                    </Button>
                    {isEditDialogOpen && (
                      <EditQuestionDialog
                        isOpen={isEditDialogOpen}
                        setIsOpen={setIsEditDialogOpen}
                        questionIndex={questionIndex}
                        initialQuestionText={question.text}
                        initialOptions={question.options}
                        initialCorrectAnswer={question.correctAnswer}
                      />
                    )}
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
      ) : (
        <div>Вопросы еще не добавлены</div>
      )}

      <ConfirmDialog
        description="Вы точно хотите удалить этот вопрос? Это действие нельзя отменить"
        open={isConfirmDialogOpen}
        confirmButtonVariant="danger"
        confirmButtonText="Удалить"
        onOpenChange={handleCloseConfirmDialog}
        onConfirm={handleDeleteQuestion}
      />
    </div>
  );
};
