import { forwardRef, memo, useEffect, useImperativeHandle, useRef } from "react";
import "./Loader.css";

const Loader = ({style},ref) => {

  const loaderRef = useRef(null)

  useEffect(() => {
    const allLoaderComps = document.querySelectorAll(".loader_comp");

    allLoaderComps.forEach((element) => {
      setTimeout(() => {
        element.style.animation = "animate 2s linear infinite";
      }, element.id * 200);
    });
  }, []);

  useImperativeHandle(ref , () => ({
    hideLoader : () => {
      if(loaderRef && loaderRef.current) loaderRef.current.style.opacity = 0;
    },
    showLoader : () => {
      if(loaderRef && loaderRef.current) loaderRef.current.style.opacity = 1;
    }
  }))

  return (
    <div style = {style && style} ref = {loaderRef} className="loader__div">
      <div className="loader">
        <div
          style={{ backgroundColor: "#9833FE" }}
          className="loader_comp"
          id="1"
        />
        <div
          style={{ backgroundColor: "#01FE99" }}
          className="loader_comp"
          id="2"
        />
        <div
          style={{ backgroundColor: "#FF6767" }}
          className="loader_comp"
          id="3"
        />
        <div
          style={{ backgroundColor: "#FFF35B" }}
          className="loader_comp"
          id="4"
        />
        <div
          style={{ backgroundColor: "#9833FE" }}
          className="loader_comp"
          id="5"
        />
        <div
          style={{ backgroundColor: "#01FE99" }}
          className="loader_comp"
          id="6"
        />
      </div>
    </div>
  );
}

export default memo(forwardRef(Loader))