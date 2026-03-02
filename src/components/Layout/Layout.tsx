import {Outlet} from "react-router";
import {Header} from "@/components";
import {ScrollRestoration} from 'react-router';

export const Layout = () => {
  return (
    <div>
      <Header/>
      <ScrollRestoration/>
      <Outlet/>
    </div>
  );
}