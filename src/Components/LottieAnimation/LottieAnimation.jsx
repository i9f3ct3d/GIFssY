import {memo,forwardRef, useEffect, useState} from "react";
import Lottie from "react-lottie";

const LottieAnimation = ({ lotti, width, height , isStopped , isloop , speed, className, id, wrapperStyle, maxWidth} , ref) => {

  const [modSpeed , setModSpeed] = useState(1);
    
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lotti,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      clearCanvas : true,
    },
    
  };

  useEffect(()=>{

    speed && setModSpeed(speed)

  },[speed])

  return (

    <div style = {wrapperStyle && wrapperStyle} className = {className && className} id = {id && id}>
      <Lottie style = {{maxWidth : maxWidth ? maxWidth : '100%'}}  speed={modSpeed} isClickToPauseDisabled = {true} isStopped = {isStopped ? isStopped : false} ref={ref} options={defaultOptions} height={height} width={width} />
    </div>
    
  );
};

export default memo(forwardRef(LottieAnimation));