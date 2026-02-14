import {LogInForm} from "@/components/LogInForm/LogInForm";
import {Button} from "@/components/common/Button";
import {useNavigate} from "react-router";

export const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center flex-col items-center h-screen">
      <div className="w-full sm:w-[600px] px-5">
        <LogInForm className="mb-4"/>
        <Button className="w-full" variant="outline" onClick={() => navigate(-1)}>
          Назад
        </Button>
      </div>
    </div>
  )
}