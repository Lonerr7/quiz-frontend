import {z} from 'zod';

export const QuestionValidationSchema = z.object({
  questionText: z.string().min(1, 'Название вопроса обязательно'),
  options: z.array(z.string().min(1, 'Текст варианта ответа обязателен'))
});