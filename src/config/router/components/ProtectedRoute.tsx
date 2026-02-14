import {type FC, type ReactNode} from "react";
import {useGetMeQuery, type UserRoles} from "@/api/endpoints/authEndpoints";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: UserRoles[];
}

export const ProtectedRoute: FC<ProtectedRouteProps> = (props) => {
  const {children, allowedRoles} = props;
  const {data: me, isLoading} = useGetMeQuery();
  const isAllowed = !isLoading && (me && allowedRoles.includes(me.role));

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  return isAllowed ? children : <div>Вы не можете посещать эту страницу</div>;
};