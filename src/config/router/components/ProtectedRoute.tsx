import {type FC, type ReactNode} from "react";
import {useGetMeQuery, type UserRoles} from "@/api/endpoints/authEndpoints";
import {Button} from "@/components/common";
import {Link} from "react-router";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: UserRoles[];
}

export const ProtectedRoute: FC<ProtectedRouteProps> = (props) => {
  const {children, allowedRoles} = props;
  const {data: me, isLoading, isError} = useGetMeQuery();
  const isAllowed = !isLoading && !isError && (me && allowedRoles.includes(me.role));

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  return !isAllowed ? (
    <div className="absolute top-1/2 left-1/2 -translate-1/2">
      <p className="mb-2.5">Вы не можете посещать эту страницу</p>
      <Button asChild size="full">
        <Link to="/">На главную</Link>
      </Button>
    </div>
  ) : children;
};