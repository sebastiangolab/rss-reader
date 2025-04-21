import { ReactElement, ReactNode } from "react";
import "./layout.css";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps): ReactElement<LayoutProps> => {
  return <div className="layout">{children}</div>;
};

export default Layout;
