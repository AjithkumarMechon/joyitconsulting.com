import React from "react";

export default function EmptyData() {
  const data = [];

  return (
    <div>
      {data.length === 0 ? <div>Search Data not Found ............</div> : null}
    </div>
  );
}
