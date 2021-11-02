import React, { useState, useEffect } from 'react'

import { useFrame } from '@react-three/fiber'
import { OrbitControls, TransformControls, ContactShadows, softShadows } from '@react-three/drei'

import Environment from './Environment'
import Lighting from './Lighting'

import Phone from '../models/Phone'


function MockupScene({ groundShadows, objectShadows, orbitEnabled, doDownload, setDoDownload, width, height, tool }) {

  const [activeModel, setActiveModel] = useState(null)
  const [transformMode, setTransformMode] = useState("translate")

  const [isCamSet, setIsCamSet] = useState(false)

  const downloadImage = (state) => {
    if (!doDownload) return
    
    const img = state.gl.domElement.toDataURL()

    const link = document.createElement("a");
    link.href = img;
    link.download = `mockup_${width}x${height}.png`;
    link.click();

    setDoDownload(false)
  }

  useFrame((state) => downloadImage(state))

  useFrame(({camera}) => {
    if (isCamSet) return
    camera.position.set(-0.25, 0.25, 0.7)
    setIsCamSet(true)
  })

  useEffect(() => {
    if (!["translate", "rotate", "scale"].includes(tool)) {
      setActiveModel(null)
    } else {
      setTransformMode(tool)
    }
  }, [tool])

  const preset = "pisa"

  return (
    <scene>
      <group>
        <Phone tool={tool} setActive={setActiveModel} />
      </group>

      <Environment preset={preset} />
      <Lighting />

      {/* <ContactShadows opacity={1} width={1} height={1} blur={1} far={10} resolution={256} /> */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeBufferGeometry attach="geometry" args={[10, 10]} />
        {/* <meshStandardMaterial attach="material" color="red" /> */}
        <shadowMaterial attach="material" transparent opacity={0.4} />
      </mesh>

      {activeModel && <TransformControls object={activeModel} mode={transformMode}  />}
      <OrbitControls makeDefault enabled={orbitEnabled} />

      {["translate", "rotate", "scale"].includes(tool) && <gridHelper args={[2, 20, "white", "#585858"]}/>}
    </scene>
  );
}


export default MockupScene;