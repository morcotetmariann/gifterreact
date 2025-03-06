import { useState } from 'react';
import { useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';
import ScenePreview from './Purple3dicons_compressed60.jpg';
// import ScenePreviewJPEG from './Purple3dicons_compressed80.jpeg';
import ScenePreviewJPEG from './Purple3dicons_compressed80_compressed95.jpeg';
import LocalScene from './purple_3_d_icons_copy.spline';

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

function Home() {
  const size = useWindowSize();
  console.log('Size', size);
  useEffect(() => {
    console.log('useEffect', size);
  }, [size]);
  return (
    <div class="spline-container">
      <img
        src="https://amplify-amplifyf77a3d68a4004-staging-122152-deployment.s3.us-east-1.amazonaws.com/images/Purple3dicons_compressed80_compressed95.jpeg"
        // src={ScenePreviewJPEG}
        alt="Loading..."
        class="placeholder"
      ></img>
      <Spline
        class="preloadedBackground"
        // scene="https://amplify-amplifyf77a3d68a4004-staging-122152-deployment.s3.us-east-1.amazonaws.com/images/purple_3_d_icons_copy.spline"
        scene="https://prod.spline.design/AURdrtpb7BhwChk4/scene.splinecode"
        // scene={LocalScene}
        size={size}
      />
    </div>
  );
}

export default Home;
