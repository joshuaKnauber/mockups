import React, { useState, useRef, useEffect } from 'react'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

import './Scene.css';
import MockupScene from './MockupScene';


function Scene() {

  const [doDownload, setDoDownload] = useState(false)

  // VIEW SETTINGS
  const [groundShadows, setGroundShadows] = useState(true)
  const [objectShadows, setObjectShadows] = useState(true)

  const [orbitEnabled, setOrbitEnabled] = useState(true)

  const [hasAlpha, setHasAlpha] = useState(false)
  const [color, setColor] = useState("")
  
  const colorInpRef = useRef()
  const widthInpRef = useRef()
  const heightInpRef = useRef()

  const canvasRef = useRef()
  const cameraRef = useRef()
  
  const setBackgroundColor = () => {
    document.getElementsByClassName("App")[0].style.backgroundColor = colorInpRef.current.value
    setColor(colorInpRef.current.value)
    setHasAlpha(false)
  }

  const setCameraSize = () => {
    const width = Math.max(1, widthInpRef.current.value)
    const height = Math.max(1, heightInpRef.current.value)
    console.log(width, height)

    const elem = document.getElementsByClassName("canvasContainer")[0]
    elem.style.width = `${width}px`
    elem.style.height = `${height}px`
    
    const xScale = window.innerWidth / width
    const yScale = window.innerHeight / height
    let scale = Math.min(xScale, yScale)
    scale = scale<1 ? scale-0.02 : 1

    document.getElementsByTagName("canvas")[0].style.transform = `scale(${scale})`
  }


  useEffect(() => {
    if (hasAlpha) {
      document.getElementsByClassName("App")[0].style.backgroundColor = "unset"
    } else {
      document.getElementsByClassName("App")[0].style.backgroundColor = colorInpRef.current.value
    }
  }, [hasAlpha])


  useEffect(() => {
    window.addEventListener("resize", setCameraSize)

    // set default camera size
    widthInpRef.current.value = window.innerWidth
    heightInpRef.current.value = window.innerHeight
    setCameraSize()

    // set default background color
    colorInpRef.current.value = "#F19F41"
    setBackgroundColor()

    return () => {
      window.removeEventListener("resize", setCameraSize)
    }
  }, [])


  return (
    <div className="sceneContainer">

      <div className="viewBtnsContainer">
        <button className="iconToggle" onClick={() => setDoDownload(true)}>download</button>
        <button className="iconToggle" onClick={() => setGroundShadows(!groundShadows)}>ground shadows {String(groundShadows)}</button>
        <button className="iconToggle" onClick={() => setObjectShadows(!objectShadows)}>object shadows {String(objectShadows)}</button>
        <button className="iconToggle" onClick={() => setOrbitEnabled(!orbitEnabled)}>orbit {String(orbitEnabled)}</button>
        <button className="iconToggle" onClick={() => setHasAlpha(!hasAlpha)}>alpha {String(hasAlpha)}</button>
        <input type="color" onChange={setBackgroundColor} ref={colorInpRef}></input>
        <input type="number" onChange={setCameraSize} ref={widthInpRef}></input>
        <input type="number" onChange={setCameraSize} ref={heightInpRef}></input>
      </div>

      <div className="canvasContainer">
        <Canvas colorManagement shadowMap shadows ref={canvasRef} gl={{ preserveDrawingBuffer: true }}>
          <OrbitControls makeDefault enabled={orbitEnabled} />
          <PerspectiveCamera makeDefault ref={cameraRef} />

          <MockupScene
            groundShadows={groundShadows}
            objectShadows={objectShadows}
            doDownload={doDownload}
            setDoDownload={setDoDownload}
            width={widthInpRef.current ? widthInpRef.current.value : 0}
            height={heightInpRef.current ? heightInpRef.current.value : 0}
          />

          {!hasAlpha && <color attach="background" args={[color]} />}

        </Canvas>
      </div>

    </div>
  );
}


export default Scene;