import {useEffect} from "react";
import {authApi} from '@api/auth/authApi';

function App() {
  useEffect(() => {
    (async() => {
      const response = await authApi.logIn({
        name: "Mengling",
         password: "pass12345"
      });

      console.log(response);
    })()
  }, []);

  return (
    <>
      App
    </>
  )
}

export default App
