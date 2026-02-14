import {NavLink, useNavigate} from "react-router";
import {useGetMeQuery, useLogOutMutation} from "@/api/endpoints/authEndpoints";

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
        <header>
          <ul className="flex items-center gap-2.5">
            <li>
              <NavLink to="/" className={({isActive}) => isActive ? "font-bold" : ""}>
                Тесты
              </NavLink>
            </li>
            <li>
              <NavLink to="/add-test" className={({isActive}) => isActive ? "font-bold" : ""}>
                Добавить тест
              </NavLink>
            </li>
          </ul>
          <button onClick={handleLogout}>{!isLoading ? 'Выйти' : 'Выходим...'}</button>
        </header>
      ) : null}
    </>
  )
}