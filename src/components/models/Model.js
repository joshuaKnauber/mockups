import React, { useRef, useState, useEffect } from 'react'
import { TextureLoader } from 'three'
import { Html, useGLTF, useTexture } from '@react-three/drei'
import * as THREE from "three";
import { FaCheck } from 'react-icons/fa';

import "./Popup.css";

import ModelGltf from './phone.gltf';
import Tex from './Home Screen.png';


function MockupMesh ({ color, metalness, roughness, img, node, selected, setSelected }) {

  const matRef = useRef()
  const imgInpRef = useRef()
  const colorInpRef = useRef()
  const metalnessInpRef = useRef()
  const roughnessInpRef = useRef()

  const [imgUrl, setImgUrl] = useState(img)
  const [hovering, setHovering] = useState(false)

  const hexToRgb = (hex) => {
    // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
  
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
  }
  function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }


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
    if (selected === node.geometry.uuid) {
      let { r, g, b } = matRef.current.color
      colorInpRef.current.value = rgbToHex(Math.round(r*255), Math.round(g*255), Math.round(b*255))
      metalnessInpRef.current.checked = Boolean(matRef.current.metalness)
      roughnessInpRef.current.value = matRef.current.roughness
    }
  }, [selected])


  useEffect(() => {
    if (imgUrl) {
      const textureLoader = new TextureLoader()
      textureLoader.load(imgUrl, (tex) => {
        tex.flipY = false
        tex.encoding = THREE.sRGBEncoding
        matRef.current.map = tex
        matRef.current.needsUpdate = true
      })
    }
  }, [imgUrl])

  return (
    <>
    <group>
      <mesh
        onPointerOver={()=>setHovering(true)}
        onPointerOut={()=>setHovering(false)}
        onClick={()=>setSelected(node.geometry.uuid)}
        castShadow
        receiveShadow
        geometry={node.geometry}
      >
        <meshStandardMaterial
          ref={matRef}
          color={color}
          metalness={metalness}
          roughness={roughness}
          emissive={hovering ? "orange" : "white"}
          emissiveIntensity={hovering ? 5 : 0}
        />
      </mesh>

      {selected === node.geometry.uuid && <Html position={node.geometry.boundingBox.max}>
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


export default function Model(props) {

  const group = useRef()
  const { nodes, materials } = useGLTF(ModelGltf)

  const [selectedUid, setSelectedUid] = useState(null)

  return (
    <group ref={group} {...props} dispose={null} >
      <MockupMesh node={nodes.Plane001} color="white" selected={selectedUid} setSelected={setSelectedUid} />
      <MockupMesh node={nodes.Plane011} color="white" selected={selectedUid} setSelected={setSelectedUid} />
      <MockupMesh node={nodes.Plane011_1} color="white" selected={selectedUid} setSelected={setSelectedUid} />
      <MockupMesh node={nodes.Plane011_2} color="white" img={Tex} selected={selectedUid} setSelected={setSelectedUid} />
      <MockupMesh node={nodes.Plane011_3} color="white" selected={selectedUid} setSelected={setSelectedUid} />
      <MockupMesh node={nodes.Plane011_4} color="white" selected={selectedUid} setSelected={setSelectedUid} />
      <MockupMesh node={nodes.Plane002} color="white" selected={selectedUid} setSelected={setSelectedUid} />
      <MockupMesh node={nodes.Plane014} color="white" selected={selectedUid} setSelected={setSelectedUid} />
      <MockupMesh node={nodes.Plane014_1} color="white" selected={selectedUid} setSelected={setSelectedUid} />
      <MockupMesh node={nodes.Circle001_1} color="white" selected={selectedUid} setSelected={setSelectedUid} />
      <MockupMesh node={nodes.Circle001_2} color="white" selected={selectedUid} setSelected={setSelectedUid} />
      <MockupMesh node={nodes.Circle001} color="white" selected={selectedUid} setSelected={setSelectedUid} />
      <MockupMesh node={nodes.Circle003} color="white" selected={selectedUid} setSelected={setSelectedUid} />
      <MockupMesh node={nodes.Circle002} color="white" selected={selectedUid} setSelected={setSelectedUid} />
      <MockupMesh node={nodes.Plane004} color="white" selected={selectedUid} setSelected={setSelectedUid} />
      <MockupMesh node={nodes.Circle008} color="white" selected={selectedUid} setSelected={setSelectedUid} />
      <MockupMesh node={nodes.Circle008_1} color="white" selected={selectedUid} setSelected={setSelectedUid} />
      <MockupMesh node={nodes.Plane005} color="white" selected={selectedUid} setSelected={setSelectedUid} />
      <MockupMesh node={nodes.Plane006} color="white" selected={selectedUid} setSelected={setSelectedUid} />
      <MockupMesh node={nodes.Plane007} color="white" selected={selectedUid} setSelected={setSelectedUid} />
    </group>
  )
}

useGLTF.preload(Model)