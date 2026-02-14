import {Outlet} from "react-router";
import {Header} from "@/components";

export const Layout = () => {
  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  );
}