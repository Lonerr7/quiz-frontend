import {LogInForm} from "@/components";
import {Button} from "@/components/common/Button";
import {useNavigate} from "react-router";
import {useGetMeQuery} from "@/api/endpoints/authEndpoints.ts";
import {useEffect} from "react";

export const LoginPage = () => {
  const {data: me, isLoading} = useGetMeQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (me && !isLoading) {
      navigate('/');
    }
  }, [me, isLoading]);

  return (
    <div className="flex justify-center flex-col items-center h-screen">
      <div className="w-full sm:w-[600px] px-5">
        <LogInForm className="mb-4"/>
        <Button className="w-full" variant="outline" onClick={() => navigate('/')}>
          На главную страницу
        </Button>
      </div>
    </div>
  )
}