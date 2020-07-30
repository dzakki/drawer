import React, { useEffect } from 'react';
import { init, initDrawer } from "./libs/drawer";
function App() {

  useEffect(  () => {
    async function mountDrawer() {
      await init() 
      initDrawer()
    }
    mountDrawer()
  }, [])
  return (
    <div className="App">
      <div id="canvas-editor" style={{
        position: "absolute",
        top: "200px",
        left: "100px"
      }}></div>
    </div>
  );
}

export default App;
