import React, { useState, useRef, useEffect, Suspense } from 'react'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

import { FaCamera, FaTint, FaCube, FaCubes, FaLock, FaPlus, FaArrowsAlt, FaSyncAlt, FaCompress, FaFillDrip, FaHandPaper } from 'react-icons/fa';

import './Scene.css';
import MockupScene from './MockupScene';


function Scene() {

  const [doDownload, setDoDownload] = useState(false)

  // VIEW SETTINGS
  const [groundShadows, setGroundShadows] = useState(false)
  const [objectShadows, setObjectShadows] = useState(true)

  const [fov, setFov] = useState(0)

  const [orbitEnabled, setOrbitEnabled] = useState(true)

  const [hasAlpha, setHasAlpha] = useState(false)
  const [color, setColor] = useState("")
  
  const colorInpRef = useRef()
  const widthInpRef = useRef()
  const heightInpRef = useRef()

  const canvasRef = useRef()
  const cameraRef = useRef()

  // TOOLS
  const tools = ["grab", "materials", "translate", "rotate", "scale"]
  const [toolIndex, setToolIndex] = useState(1)

  const shorcutPressed = (evt) => {
    const codes = {
      "Space": 0,
      "Digit1": 0,
      "KeyM": 1,
      "KeyF": 1,
      "Digit2": 1,
      "KeyQ": 2,
      "KeyG": 2,
      "Digit3": 2,
      "KeyW": 3,
      "KeyR": 3,
      "Digit4": 3,
      "KeyE": 4,
      "KeyS": 4,
      "Digit5": 4,
    }
    if (evt.code in codes) {
      setToolIndex(codes[evt.code])
    }
  }
  
  const setBackgroundColor = () => {
    document.getElementsByClassName("App")[0].style.backgroundColor = colorInpRef.current.value
    setColor(colorInpRef.current.value)
    setHasAlpha(false)
  }

  const setCameraSize = () => {
    const width = Math.max(1, widthInpRef.current.value)
    const height = Math.max(1, heightInpRef.current.value)

    const elem = document.getElementsByClassName("canvasContainer")[0]
    elem.style.width = `${width}px`
    elem.style.height = `${height}px`
    
    const xScale = window.innerWidth / width
    const yScale = window.innerHeight / height
    let scale = Math.min(xScale, yScale)
    scale = scale<1 ? scale-0.02 : 1

    canvasRef.current.style.transform = `scale(${scale})`
  }


  useEffect(() => {
    if (hasAlpha) {
      document.getElementsByClassName("App")[0].classList.add("alpha")
      canvasRef.current.classList.add("alpha")
    } else {
      document.getElementsByClassName("App")[0].classList.remove("alpha")
      canvasRef.current.classList.remove("alpha")
    }
  }, [hasAlpha])


  useEffect(() => {
    window.addEventListener("resize", setCameraSize)
    window.addEventListener("keypress", shorcutPressed)
    
    // set default camera size
    widthInpRef.current.value = window.innerWidth-20
    heightInpRef.current.value = window.innerHeight-20
    
    // set default fov
    setFov(20)
    
    // set default background color
    colorInpRef.current.value = "#8A4CE6"
    setBackgroundColor()
    
    // set alpha default
    setHasAlpha(true)
    
    setCameraSize()
    
    return () => {
      window.removeEventListener("resize", setCameraSize)
      window.removeEventListener("keypress", shorcutPressed)
    }
  }, [])


  return (
    <div className="sceneContainer">

      <div className="toolBtnsContainer">
        <button className={`iconToggle tool ${toolIndex===0&&"active"}`} onClick={() => setToolIndex(0)} bottom-tooltip="Drag (Space)"><FaHandPaper color="white" size={17} /></button>
        <div className="dividerSmall"></div>
        <button className={`iconToggle tool ${toolIndex===1&&"active"}`} onClick={() => setToolIndex(1)} bottom-tooltip="Materials (M,F)"><FaFillDrip color="white" size={17} /></button>
        <div className="dividerSmall"></div>
        {/* <button className={`iconToggle tool ${toolIndex===2&&"active"}`} onClick={() => setToolIndex(2)} bottom-tooltip="Move (Q,G)"><FaArrowsAlt color="white" size={17} /></button>
        <button className={`iconToggle tool ${toolIndex===3&&"active"}`} onClick={() => setToolIndex(3)} bottom-tooltip="Rotate (W,R)"><FaSyncAlt color="white" size={17} /></button>
        <button className={`iconToggle tool ${toolIndex===4&&"active"}`} onClick={() => setToolIndex(4)} bottom-tooltip="Scale (E,S)"><FaCompress color="white" size={17} /></button> */}
      </div>

      <div className="viewBtnsContainer">
        <button className={`iconToggle ${groundShadows&&"active"}`} onClick={() => setGroundShadows(!groundShadows)} bottom-tooltip="Ground Shadows"><FaCube color="white" size={17} /></button>
        <button className={`iconToggle ${objectShadows&&"active"}`} onClick={() => setObjectShadows(!objectShadows)} bottom-tooltip="Object Shadows"><FaCubes color="white" size={17} /></button>
        <div className="divider"></div>
        <button className={`iconToggle ${!hasAlpha&&"active"}`} onClick={() => setHasAlpha(!hasAlpha)} bottom-tooltip="Background"><FaTint color="white" size={17} /></button>
        <input type="color" onChange={setBackgroundColor} ref={colorInpRef} style={{backgroundColor: colorInpRef.current?.value}}></input> 
        <div className="divider"></div>
        <input type="number" onChange={setCameraSize} ref={widthInpRef} />
        <input type="number" onChange={setCameraSize} ref={heightInpRef} />
        <div className="divider"></div>
        <input type="range" value={fov} min="10" max="50" step={2} onChange={(evt) => setFov(evt.target.value)} className="fovInp" />
        <button className={`iconToggle ${!orbitEnabled&&"active"}`} onClick={() => setOrbitEnabled(!orbitEnabled)} bottom-tooltip="Lock Drag"><FaLock color="white" size={17} /></button>
      </div>

      {/* <button className="addBtn" onClick={() => {}}><FaPlus size={16} color="white"/></button> */}

      <button className="downloadBtn" onClick={() => setDoDownload(true)}><FaCamera size={16} color="white"/></button>

      <div className="canvasContainer">
        <Suspense fallback={null}>
          <Canvas colorManagement shadowMap shadows ref={canvasRef} gl={{ preserveDrawingBuffer: true, antialias: true }} >
            <OrbitControls makeDefault enabled={orbitEnabled} />

            <PerspectiveCamera makeDefault ref={cameraRef} fov={fov} near={0.0001} far={50} />

            <MockupScene
              groundShadows={groundShadows}
              objectShadows={objectShadows}
              doDownload={doDownload}
              setDoDownload={setDoDownload}
              width={widthInpRef.current ? widthInpRef.current.value : 0}
              height={heightInpRef.current ? heightInpRef.current.value : 0}
              tool={tools[toolIndex]}
            />

            {!hasAlpha && <color attach="background" args={[color]} />}

          </Canvas>
        </Suspense>
      </div>

    </div>
  );
}


export default Scene;