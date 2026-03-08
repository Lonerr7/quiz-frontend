import {type FC, type ReactNode, useState} from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/common/Dialog';
import {VisuallyHidden} from '@radix-ui/react-visually-hidden';
import {Button, Input, Label} from '@/components/common';
import {Check, Plus, Trash2} from 'lucide-react';
import {cn} from '@/helpers/utils/cn.ts';

interface AddQuestionDialogProps {
  children: ReactNode;
}

export const AddQuestionDialog: FC<AddQuestionDialogProps> = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);

  const handleAddOption = () => {
    setOptions((prevOptions) => [...prevOptions, '']);
  };

  const changeOptionText = (index: number, newText: string) => {
    setOptions((prevOptions) =>
      prevOptions.map((option, i) => {
        if (i === index) {
          return newText;
        }

        return option;
      }),
    );
  };

  const handleSetCorrectAnswer = (newCorrectAnswer: number) => {
    setCorrectAnswer(newCorrectAnswer);
  };

  const handleDeleteOption = (index: number) => {
    setOptions((prevOptions) => prevOptions.filter((_, i) => i !== index));

    if (correctAnswer === index) {
      setCorrectAnswer(null);
    }
  };

  const handleSaveQuestion = () => {

  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="w-[95%] md:max-w-[700px] p-8 gap-8"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <div className="flex flex-col gap-1 mb-8">
          <DialogTitle className="text-2xl font-bold text-text-main">Добавить вопрос</DialogTitle>
        </div>

        <VisuallyHidden>
          <DialogDescription />
        </VisuallyHidden>

        <form className="flex flex-col gap-8">
          {/* Основное поле вопроса */}
          <div className="form-control gap-2.5">
            <Label
              htmlFor="questionName"
              className="text-sm font-bold uppercase tracking-wider opacity-70"
            >
              Текст вопроса
            </Label>
            <Input name="questionName" id="questionName" className="text-lg py-6 px-4" />
          </div>

          {/* Секция вариантов */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold uppercase tracking-wider opacity-70">
                Варианты ответа
              </span>
              <span className="text-xs text-text-muted italic">
                {options.length > 0 ? `Всего: ${options.length}` : 'Добавьте хотя бы один вариант'}
              </span>
            </div>

            <ul className="flex flex-col gap-3">
              {options.map((option, i) => (
                <li
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-xl border transition-all duration-200',
                    i === correctAnswer
                      ? 'bg-primary/5 border-primary shadow-sm'
                      : 'bg-bg-main border-transparent',
                  )}
                  key={i}
                >
                  <span className="text-xs font-bold text-text-muted w-4">{i + 1}.</span>

                  <div className="flex gap-2 flex-1">
                    <Input
                      className="w-full bg-surface border-input-border focus:border-primary transition-colors"
                      id={`${i}`}
                      name={`${i}`}
                      value={option}
                      placeholder={`Вариант ${i + 1}`}
                      onChange={(e) => changeOptionText(i, e.target.value)}
                    />

                    <Button
                      type="button"
                      variant={i === correctAnswer ? 'default' : 'outline'}
                      className={cn(
                        'px-3 transition-all',
                        i === correctAnswer
                          ? 'bg-primary text-white'
                          : 'text-text-muted hover:text-primary',
                      )}
                      onClick={() => handleSetCorrectAnswer(i)}
                      title="Отметить как правильный"
                    >
                      <Check size={18} strokeWidth={3} />
                    </Button>

                    <Button
                      className="px-3 text-text-muted hover:text-error hover:bg-error/5 border-transparent"
                      type="button"
                      variant="ghost_primary"
                      onClick={() => handleDeleteOption(i)}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>

            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={handleAddOption}
              className="w-fit border-dashed border-2 hover:border-primary hover:text-primary py-5 px-8 rounded-xl"
            >
              <Plus size={18} className="mr-2" />
              Добавить вариант
            </Button>
          </div>
        </form>

        <div className="flex flex-col sm:flex-row items-center justify-end mt-8 gap-3 pt-4">
          <Button variant="outline" className="w-full sm:w-auto order-2 sm:order-1">
            Закрыть
          </Button>
          <Button
            className="w-full sm:w-auto order-1 sm:order-2 px-8"
            onClick={handleSaveQuestion}
          >
            Сохранить вопрос
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
