import {Input} from "@/components/common/Input";
import {useLogInMutation} from "@/api/endpoints/authEndpoints";
import {type FieldValues, useForm} from "react-hook-form";
import {useNavigate} from "react-router";
import {Button} from "@/components/common/Button";
import type {FC} from "react";
import {cn} from "@/helpers/utils/cn";
import {Label} from "@/components/common/Label";
import {toast} from "sonner";

interface LogInFormProps {
  className?: string;
}

export const LogInForm: FC<LogInFormProps> = ({className}) => {
  const [logIn, {isLoading}] = useLogInMutation();
  const {register, formState: {errors, isSubmitting}, handleSubmit} = useForm();
  const navigate = useNavigate();

  const onSubmit = async (fieldValues: FieldValues) => {
    console.log(fieldValues);
    const {name, password} = fieldValues;

    try {
      await logIn({name, password}).unwrap();
      navigate('/');
      toast.dismiss();
      toast.success('Successfully logged in!');
    } catch (err: any) {
      console.error(err);
      if (err.data.message) {
        toast.error(err.data.message, {duration: 7000});
      }
    }
  }

  console.log(errors);

  return (
    <form
      className={cn("flex flex-col gap-4", className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="form-control">
        <Label htmlFor="name">Имя</Label>
        <Input
          className="border"
          {...register('name', {
            required: {
              value: true,
              message: 'Имя обязательно'
            },
          })}
          type="text"
          id="name"
        />
      </div>
      <div className="form-control">
        <Label htmlFor="password">Пароль</Label>
        <Input
          className="border"
          {...register('password')}
          type="password"
          id="password"
        />
      </div>
      <Button className="w-full" type="submit">{!isLoading ? 'Войти' : 'Входим...'}</Button>
    </form>
  )
}