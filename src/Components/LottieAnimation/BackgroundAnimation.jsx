import { lazy, Suspense, memo } from "react";
import backgroundAnimation from "../../images/backLottie.json"
import "./BackgroundAnimation.css";
const LottieAnimation = lazy(() => import("./LottieAnimation"));

function BackgroundAnimation() {
  return (
    <div className="background-image-container-full-page">
      <Suspense fallback={<></>}>
        <LottieAnimation
          lotti={backgroundAnimation}
          height="100vh"
          width="100vw"
        />
      </Suspense>
    </div>
  );
}

export default memo(BackgroundAnimation);
