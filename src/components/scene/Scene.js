import React, { useState, useRef, useEffect } from 'react'

import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'

import uuid from 'react-uuid'
import { FaCamera, FaAdjust, FaLightbulb, FaClone, FaLock, FaPlus, FaArrowsAlt, FaSyncAlt, FaCompressArrowsAlt, FaFillDrip, FaHandPaper, FaTimes } from 'react-icons/fa';

import './Scene.scss';
import MockupScene from './MockupScene';
import Slider from './Slider';

import { brightnessByColor } from './colorUtils';


// ADD YOUR MODEL KEY AND DISPLAY NAME TO THIS LIST
const modelNames = {
  phone: "Smartphone",
  suzanne: "Suzanne"
}


function Scene() {

  // VIEW SETTINGS
  const [groundShadows, setGroundShadows] = useState(false)
  const [objectShadows, setObjectShadows] = useState(true)

  const [fov, setFov] = useState(20)

  const [orbitEnabled, setOrbitEnabled] = useState(true)

  const [hasAlpha, setHasAlpha] = useState(false)
  const [color, setColor] = useState("")
  
  const [mockups, setMockups] = useState([])

  const [showAddModels, setShowAddModels] = useState(false)
  
  // REFS
  const colorInpRef = useRef()
  const widthInpRef = useRef()
  const heightInpRef = useRef()

  const canvasRef = useRef()

  // TOOLS
  const [doDownload, setDoDownload] = useState(false)
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


  const setBtnDarkness = () => {
    const bright = brightnessByColor(colorInpRef.current.value)
    if (bright > 128) {
      document.body.classList.remove("dark")
    } else {
      document.body.classList.add("dark")
    }
  }
  

  const setBackgroundColor = () => {
    document.getElementsByClassName("App")[0].style.backgroundColor = colorInpRef.current.value
    setColor(colorInpRef.current.value)

    setHasAlpha(false)

    setBtnDarkness()
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


  const addMockup = (modelType) => {
    setMockups(current => [...current, {key: uuid(), type: modelType}])
    setShowAddModels(false)
  }


  const removeMockup = (uuid) => {
    setMockups(current => current.filter(item => item.key !== uuid))
  }


  useEffect(() => { // set alpha
    if (hasAlpha) {
      document.getElementsByClassName("App")[0].classList.add("alphaGrid")
      canvasRef.current.classList.add("alphaGrid")
      document.body.classList.remove("dark")
    } else {
      document.getElementsByClassName("App")[0].classList.remove("alphaGrid")
      canvasRef.current.classList.remove("alphaGrid")
      setBtnDarkness()
    }
  }, [hasAlpha])


  useEffect(() => {
    window.addEventListener("resize", setCameraSize)
    window.addEventListener("keypress", shorcutPressed)
    
    // set default camera size
    // const size = Math.min(window.innerWidth-20, window.innerHeight-20)
    widthInpRef.current.value = 1920
    heightInpRef.current.value = 1080
    
    // set default fov
    setFov(20)
    
    // set default background color
    colorInpRef.current.value = "#8A4CE6"
    setBackgroundColor()
    
    // set alpha default
    setHasAlpha(true)
    
    // scale camera to initial size
    setCameraSize()

    // add default objects
    addMockup("phone")

    return () => {
      window.removeEventListener("resize", setCameraSize)
      window.removeEventListener("keypress", shorcutPressed)
    }
  }, [])


  return (
    <div className="scene">

      <div className="toolbar">
        <button
          className={toolIndex === 0 ? "active" : ""}
          onClick={() => setToolIndex(0)}>
            <FaHandPaper size={16} />
        </button>
        <button
          className={toolIndex === 1 ? "active" : ""}
          onClick={() => setToolIndex(1)}>
            <FaFillDrip size={16} />
        </button>
        <button
          className={toolIndex === 2 ? "active" : ""}
          onClick={() => setToolIndex(2)}>
            <FaArrowsAlt size={16} />
        </button>
        <button
          className={toolIndex === 3 ? "active" : ""}
          onClick={() => setToolIndex(3)}>
            <FaSyncAlt size={16} />
        </button>
        <button
          className={toolIndex === 4 ? "active" : ""}
          onClick={() => setToolIndex(4)}>
            <FaCompressArrowsAlt size={16} />
        </button>
      </div>

      <div className="cameraSettings">
        <input type="number" onChange={setCameraSize} ref={widthInpRef} />
        <FaTimes size={16} />
        <input type="number" onChange={setCameraSize} ref={heightInpRef} />
        <Slider value={fov} setValue={setFov} min={10} max={50} />
      </div>

      <div className="viewportSettings">
        <button
          className={!hasAlpha ? "active" : ""}
          onClick={() => setHasAlpha(!hasAlpha)}
          tooltip="Background">
            <FaAdjust size={16} />
        </button>
        <input type="color" onChange={setBackgroundColor} ref={colorInpRef} style={{backgroundColor: colorInpRef.current?.value}}></input> 
        <div className="hSpacer"></div>
        <button
          className={objectShadows ? "active" : ""}
          onClick={() => setObjectShadows(!objectShadows)}
          tooltip="Shadows">
            <FaLightbulb size={16} />
        </button>
        <button
          className={groundShadows && objectShadows ? "active" : ""}
          onClick={() => setGroundShadows(!groundShadows)}
          tooltip="Ground Shadows">
            <FaClone size={16} />
        </button>
      </div>

      <button
        className={!orbitEnabled ? "lockViewBtn active" : "lockViewBtn"}
        onClick={() => setOrbitEnabled(!orbitEnabled)}>
          <FaLock size={16} />
      </button>

      <div className="addPopup" style={{transform: showAddModels ? 'scale(100%)' : 'scale(0%)' }}>
        {Object.keys(modelNames).map(key => {
          return <button key={key} className="addModelBtn" onClick={() => addMockup(key)}>
                  <FaPlus size={10} style={{marginRight:"8px"}}/>
                  {modelNames[key]}
                </button>
        })}
      </div>
      
      <button
        className="addBtn"
        onClick={() => setShowAddModels(current => !current)}>
          <FaPlus size={16}/>
      </button>

      <button
        className="downloadBtn"
        onClick={() => setDoDownload(true)}>
          <FaCamera size={16}/>
      </button>

      <div className="canvasContainer">
        <Canvas shadows ref={canvasRef} gl={{ preserveDrawingBuffer: true, antialias: true }} >

          <PerspectiveCamera makeDefault fov={fov} position={[0, 0, 10]} />

          <MockupScene
            groundShadows={groundShadows}
            objectShadows={objectShadows}
            orbitEnabled={orbitEnabled}
            doDownload={doDownload}
            setDoDownload={setDoDownload}
            width={widthInpRef.current ? widthInpRef.current.value : 0}
            height={heightInpRef.current ? heightInpRef.current.value : 0}
            tool={tools[toolIndex]}
            mockups={mockups}
            removeMockup={removeMockup}
          />

          {!hasAlpha && <color attach="background" args={[color]} />}

        </Canvas>
      </div>

    </div>
  );
}


export default Scene;