import {z} from 'zod';

export const QuestionValidationSchema = z.object({
  questionText: z.string().min(1, 'Название вопроса обязательно'),
  options: z.array(
    z.object({
      value: z.string().min(1, 'Текст варианта ответа обязателен')
    })
  ).min(2, 'Должно быть минимум 2 варианта ответа')
});

export type QuestionValidationSchemaType = z.infer<typeof QuestionValidationSchema>;