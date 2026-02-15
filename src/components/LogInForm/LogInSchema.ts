import {z} from 'zod';

export const LogInSchema = z.object({
  name: z.string('Введите имя').min(1, 'Имя обязательно'),
  password: z.string('Введите пароль').min(5, 'Пароль не может быть менее 5 символов').max(25, 'Пароль не может быть более 25 символов')
});

export type LogInSchemaType = z.infer<typeof LogInSchema>;

