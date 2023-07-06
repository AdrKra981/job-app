import React from "react";
import Divider from "./Divider";

function PageTitle({ title }: { title: string }) {
  return (
    <div>
      <h1 className="text-2xl my-2">
        <b>{title}</b>
      </h1>
      <Divider />
    </div>
  );
}

export default PageTitle;
