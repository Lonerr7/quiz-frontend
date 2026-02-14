import {RouterProvider} from "react-router";
import {Provider} from "react-redux";
import {Toaster} from "sonner";
import {store} from "@/redux/store";
import {router} from "@/config/router/router";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router}/>
      <Toaster/>
    </Provider>
  );
}

export default App
