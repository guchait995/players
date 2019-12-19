import React from "react";
import LoadingIcon from "../style/ripple.svg";

export default function Loading() {
  return (
    <>
      <div className="image container is-64x64">
        <img alt="loading icon" src={LoadingIcon} />
      </div>
      <div className="is-size-5 is-fullwidth">Please Wait</div>
    </>
  );
}
