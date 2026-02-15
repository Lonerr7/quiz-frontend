import {NavLink, useNavigate} from "react-router";
import {useGetMeQuery, useLogOutMutation} from "@/api/endpoints/authEndpoints";
import {cn} from "@/helpers/utils/cn";
import {Button} from "@/components/common";

export const Header = () => {
  const {data: me, isError} = useGetMeQuery();
  const [logOut, {isLoading}] = useLogOutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut().unwrap();
      navigate('/');
    } catch (err: unknown) {
      console.error(err);
    }
  }

  return (
    <>
      {!isError && me ? (
        <header
          className="bg-primary text-primary-foreground shadow-md py-3 mb-10">

          <div className="app-container">
            <div className="flex justify-between items-center gap-2.5">
              <ul className="flex items-center gap-6">
                <li>
                  <NavLink
                    to="/"
                    className={({isActive}) => cn(
                      "text-sm uppercase tracking-wide transition-opacity hover:opacity-80",
                      isActive ? "font-bold border-b-2 border-white pb-1" : "opacity-90"
                    )}
                  >
                    Тесты
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/add-test"
                    className={({isActive}) => cn(
                      "text-sm uppercase tracking-wide transition-opacity hover:opacity-80",
                      isActive ? "font-bold border-b-2 border-white pb-1" : "opacity-90"
                    )}
                  >
                    Добавить тест
                  </NavLink>
                </li>
              </ul>
              <Button
                variant="ghost_primary"
                size="sm"
                onClick={handleLogout}
                disabled={isLoading}
              >
                {!isLoading ? 'Выйти' : 'Выходим...'}
              </Button>
            </div>
          </div>
        </header>
      ) : null}
    </>
  )
}