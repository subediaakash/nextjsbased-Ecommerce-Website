import React, { ReactNode } from "react";

type PageHeaderProps = {
  children: ReactNode;
};

const PageHeader: React.FC<PageHeaderProps> = ({ children }) => {
  return (
    <header>
      <h1>{children}</h1>
    </header>
  );
};

export default PageHeader;
