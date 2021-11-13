import React, { useState, useRef, useEffect } from 'react'
import * as THREE from "three";
import { TransformControls } from '@react-three/drei'

import MockupMesh from './Mesh';


export default function BaseModel(props) {
  const { tool, orbit, activeModel, setActiveModel, mockupUuid } = props

  const groupRef = useRef()

  const transform = useRef()

  const [transformMode, setTransformMode] = useState("translate")

  const [selectedMeshUid, setSelectedMeshUid] = useState(null)

  useEffect(() => {
    if (!["translate", "rotate", "scale"].includes(tool)) {
      setActiveModel(null)
    } else {
      setTransformMode(tool)
    }
  }, [tool])

  const selectModel = (evt) => {
    if (["translate", "rotate", "scale"].includes(tool)) {
      setActiveModel(groupRef.current)
    }
    evt.stopPropagation()
  }
  
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

  let meshes = React.Children.toArray(props.children)
  return (
    <TransformControls ref={transform}
      enabled={transformEnabled}
      size={transformEnabled() ? 1 : 0} >
      {<group {...props} dispose={null} ref={groupRef} mockupUuid={mockupUuid}
        onPointerOver={setCursor}
        onPointerLeave={resetCursor}
        onClick={selectModel}
      >
        {meshes.map(meshData => {
          if (meshData.props.geometry === undefined) return

          const mat = meshData.props.material
          return <MockupMesh
                    key={meshData.props.geometry.uuid}
                    geometry={meshData.props.geometry}
                    color={mat.map ? new THREE.Color("rgb(127,127,127)") : mat.color}
                    metalness={mat.metalness}
                    roughness={mat.roughness}
                    img={mat.map}
                    selectable={mat.name.includes(".editable") && tool === "materials"}
                    selected={selectedMeshUid}
                    setSelected={setSelectedMeshUid}
                  />
        })}
      </group>}
    </TransformControls>
  )
}