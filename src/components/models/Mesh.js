import React, { useRef, useState, useEffect } from 'react'
import { TextureLoader } from 'three'
import { Html } from '@react-three/drei'
import * as THREE from "three";

import { hexToRgb, rgbToHex } from '../scene/colorUtils';

import "./Popup.scss";


export default function MockupMesh ({ color="FFFFFF", metalness=0, roughness=0.2, img=null, geometry=null, selectable=true, selected, setSelected }) {

  const matRef = useRef()
  const imgInpRef = useRef()
  const colorInpRef = useRef()
  const [borderColor, setBorderColor] = useState("white")
  const metalnessInpRef = useRef()
  const roughnessInpRef = useRef()

  const [imgUrl, setImgUrl] = useState(img)
  const [hovering, setHovering] = useState(false)


  const setMeshColor = () => {
    colorInpRef.current && matRef.current.color.set( hexToRgb(colorInpRef.current.value) );
    colorInpRef.current && setBorderColor(colorInpRef.current.value)
  }
  const setMeshMetalness = () => { matRef.current.metalness = metalnessInpRef.current.checked ? 1 : 0 }
  const setMeshRoughness = () => { matRef.current.roughness = roughnessInpRef.current.value }


  const updateImageUrl = async (evt) => {
    const file = evt.target.files[0]
    const { type } = file
    const buffer = await file.arrayBuffer()
    const blob = new Blob([buffer], { type })
    const urlCreator = window.URL || window.webkitURL
    const imageUrl = urlCreator.createObjectURL(blob)
    setImgUrl(imageUrl)
  }


  useEffect(() => {
    if (hovering) { document.body.classList.add("pointing") }
    else { document.body.classList.remove("pointing") }
  }, [hovering])


  useEffect(() => {
    if (selected === geometry.uuid) {
      if (colorInpRef.current) {
        const {r,g,b} = matRef.current.color
        let color = rgbToHex(Math.floor(r*255),Math.floor(g*255),Math.floor(b*255))
        colorInpRef.current.value = color
        setBorderColor(color)
      } 
      metalnessInpRef.current.checked = Boolean(matRef.current.metalness)
      roughnessInpRef.current.value = matRef.current.roughness
    }
  }, [selected])


  useEffect(() => {
    if (selected === geometry.uuid && !selectable) {
      setSelected(null)
    }
  }, [selectable])


  useEffect(() => {
    if (typeof(imgUrl) === typeof("")) {
      const textureLoader = new TextureLoader()
      textureLoader.load(imgUrl, (tex) => {
        tex.flipY = false
        tex.encoding = THREE.sRGBEncoding
        matRef.current.map = tex
        matRef.current.needsUpdate = true
      })
    }
  }, [imgUrl])

  
  const startHover = (evt) => {
    if (selectable) {
      setHovering(true)
      evt.stopPropagation()
    }
  }


  const finishHover = (evt) => {
    if (hovering) {
      setHovering(false)
      evt.stopPropagation()
    }
  }


  const selectMesh = (evt) => {
    if (hovering && selectable) {
      setSelected(geometry.uuid)
      evt.stopPropagation()
    }
  }


  const deselectMesh = (evt) => {
    if (selected === geometry.uuid) {
      setSelected(null)
      evt.stopPropagation()
    }
  }


  return (
    <group castShadow receiveShadow>
      <mesh
        onPointerEnter={startHover}
        onPointerLeave={finishHover}
        onClick={selectMesh}
        onPointerMissed={deselectMesh}
        castShadow
        receiveShadow
        geometry={geometry}
      >
        <meshStandardMaterial
          ref={matRef}
          color={color}
          side={THREE.DoubleSide}
          metalness={metalness}
          roughness={roughness}
          emissive={hovering ? "orange" : "white"}
          emissiveIntensity={hovering ? 5 : 0}
          map={img}
        />
      </mesh>

      {selected === geometry.uuid && <Html position={geometry.boundingBox.max}>
        <div className="materialPopup">
          {!img && <>
            <p>Color</p>
            <input type="color" ref={colorInpRef} onChange={setMeshColor} style={{backgroundColor:borderColor}} />
          </>}
          {img && <>
            <p>Image</p>
            <input type="file" ref={imgInpRef} onChange={updateImageUrl} />
          </>}
          <p>Metal</p>
          <input type="checkbox" ref={metalnessInpRef} onChange={setMeshMetalness} />
          <p>Roughness</p>
          <input type="range" ref={roughnessInpRef} min="0" max="1" step={0.01} onChange={setMeshRoughness} />
        </div>
      </Html>}

    </group>
  )
}