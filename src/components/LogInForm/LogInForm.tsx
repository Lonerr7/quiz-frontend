import {Button, Input, ErrorMessage, Label} from '@/components/common';
import {useLogInMutation} from "@/api/endpoints/authEndpoints";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router";
import type {FC} from "react";
import {cn} from "@/helpers/utils/cn";
import {toast} from "sonner";
import {LogInSchema, type LogInSchemaType} from './LogInSchema';
import {zodResolver} from "@hookform/resolvers/zod";

interface LogInFormProps {
  className?: string;
}

export const LogInForm: FC<LogInFormProps> = ({className}) => {
  const [logIn, {isLoading}] = useLogInMutation();
  const {register, formState: {errors}, handleSubmit} = useForm<LogInSchemaType>({resolver: zodResolver(LogInSchema)});
  const navigate = useNavigate();

  const onSubmit = async (fieldValues: LogInSchemaType) => {
    const {name, password} = fieldValues;

    try {
      await logIn({name, password}).unwrap();
      navigate('/');
      toast.dismiss();
      toast.success('Successfully logged in!');
    } catch (err: any) {
      if (err.data.message) {
        toast.error(err.data.message, {duration: 7000});
      }
    }
  }

  return (
    <form
      className={cn("flex flex-col gap-4", className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="form-control">
        <Label htmlFor="name">Имя</Label>
        <Input
          className="border"
          {...register('name')}
          type="text"
          id="name"
        />
        {errors.name && <ErrorMessage className="mt-1">{errors.name.message}</ErrorMessage>}
      </div>
      <div className="form-control">
        <Label htmlFor="password">Пароль</Label>
        <Input
          className="border"
          {...register('password')}
          type="password"
          id="password"
        />
        {errors.password && <ErrorMessage className="mt-1">{errors.password.message}</ErrorMessage>}
      </div>
      <Button
        className="w-full"
        type="submit"
        disabled={isLoading}
      >
        {!isLoading ? 'Войти' : 'Входим...'}
      </Button>
    </form>
  )
}