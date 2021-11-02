import React, { useRef, useState, useEffect } from 'react'
import { TextureLoader } from 'three'
import { Html } from '@react-three/drei'
import * as THREE from "three";
import { FaCheck } from 'react-icons/fa';

import { hexToRgb, rgbToHex } from './BaseModel';

import "./Popup.css";


export default function MockupMesh ({ color="white", metalness=0, roughness=0.2, img=null, geometry=null, selectable=true, selected, setSelected }) {

  const matRef = useRef()
  const imgInpRef = useRef()
  const colorInpRef = useRef()
  const metalnessInpRef = useRef()
  const roughnessInpRef = useRef()

  const [imgUrl, setImgUrl] = useState(img)
  const [hovering, setHovering] = useState(false)


  const setMeshColor = () => { matRef.current.color.set( hexToRgb(colorInpRef.current.value) ) }
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
      let { r, g, b } = matRef.current.color
      colorInpRef.current.value = rgbToHex(Math.round(r*255), Math.round(g*255), Math.round(b*255))
      metalnessInpRef.current.checked = Boolean(matRef.current.metalness)
      roughnessInpRef.current.value = matRef.current.roughness
    }
  }, [selected])


  useEffect(() => {
    if (imgUrl) {
      if (typeof(imgUrl) === typeof("")) {
          const textureLoader = new TextureLoader()
          textureLoader.load(imgUrl, (tex) => {
            tex.flipY = false
            tex.encoding = THREE.sRGBEncoding
            matRef.current.map = tex
            matRef.current.needsUpdate = true
          })
      }
      else {
        matRef.current.map = imgUrl
      }
    }
  }, [imgUrl])

  return (
    <>
    <group>
      <mesh
        onPointerOver={(evt)=>{
          selectable && setHovering(true)
          evt.stopPropagation()
        }}
        onPointerOut={(evt)=>{
          selectable && setHovering(false)
          evt.stopPropagation()
        }}
        onClick={(evt)=>{
          selectable && setSelected(geometry.uuid)
          evt.stopPropagation()
        }}
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
        />
      </mesh>

      {selected === geometry.uuid && <Html position={geometry.boundingBox.max}>
        <div className="materialPopup">
          <p>Color</p>
          <input type="color" ref={colorInpRef} onChange={setMeshColor} />
          {img && <>
            <p>Image</p>
            <input type="file" ref={imgInpRef} onChange={updateImageUrl} />
          </>}
          <p>Metal</p>
          <input type="checkbox" ref={metalnessInpRef} onChange={setMeshMetalness} />
          <p>Roughness</p>
          <input type="range" ref={roughnessInpRef} min="0" max="1" step={0.01} onChange={setMeshRoughness} />
          <button className="popupConfirm" onClick={()=>setSelected(null)}><FaCheck size={16} color="limegreen"/></button>
        </div>
      </Html>}

    </group>
    </>
  )
}