import React, { useState, useRef, useEffect, Suspense } from 'react'
import * as THREE from "three";
import { TransformControls, Sphere } from '@react-three/drei'

import MockupMesh from './Mesh';


export const hexToRgb = (hex) => {
  // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

export function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


export default function BaseModel(props) {
  const { tool, orbit, activeModel, setActiveModel } = props

  const groupRef = useRef()

  const transform = useRef()

  const [transformMode, setTransformMode] = useState("translate")

  useEffect(() => {
    if (!["translate", "rotate", "scale"].includes(tool)) {
      // setActiveModel(null)
    } else {
      setTransformMode(tool)
    }
  }, [tool])

  const setCursor = () => {
    if (["translate", "rotate", "scale"].includes(tool)) {
      document.body.classList.add("pointing")
    }
  }
  const resetCursor = () => {
    if (["translate", "rotate", "scale"].includes(tool)) {
      document.body.classList.remove("pointing")
    }
  }

  const selectModel = (evt) => {
    if (["translate", "rotate", "scale"].includes(tool)) {
      setActiveModel(groupRef.current)
    }
    evt.stopPropagation()
  }


  const [selectedUid, setSelectedUid] = useState(null)

  useEffect(() => {
    if (transform.current && orbit.current) {
      const controls = transform.current
      controls.setMode(transformMode)
      const callback = event => (orbit.current.enabled = !event.value)
      controls.addEventListener("dragging-changed", callback)
      return () => controls.removeEventListener("dragging-changed", callback)
    }
  })

  const transformEnabled = () => {
    return ["translate", "rotate", "scale"].includes(tool) && activeModel === groupRef.current
  }

  return (
    <TransformControls ref={transform}
      enabled={transformEnabled}
      size={transformEnabled() ? 1 : 0} >
      {<group {...props} dispose={null} ref={groupRef}
        // onPointerOver={()=>setCursor()}
        // onPointerLeave={()=>resetCursor()}
        onClick={selectModel}
      >
        {props.children.map(meshData => {
          if (meshData.props.geometry === undefined) return

          const mat = meshData.props.material
          return <MockupMesh
                    key={meshData.props.geometry.uuid}
                    geometry={meshData.props.geometry}
                    color={mat.map ? new THREE.Color("rgb(127,127,127)") : mat.color}
                    metalness={mat.metalness}
                    roughness={mat.roughness}
                    img={mat.map}
                    selectable={false}//mat.name.includes(".editable") && tool==="materials"}
                    selected={selectedUid}
                    setSelected={setSelectedUid}
                  />
        })}
      </group>}
    </TransformControls>
  )
}