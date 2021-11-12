import React, { useState, useEffect, useRef, Suspense } from 'react'

import { useFrame } from '@react-three/fiber'
import { OrbitControls, TransformControls, ContactShadows, Sphere } from '@react-three/drei'
import { EffectComposer, SSAO, SMAA } from '@react-three/postprocessing'
import { EdgeDetectionMode } from 'postprocessing'
import * as THREE from "three";

import Environment from './Environment'
import Lighting from './Lighting'

import Phone from '../models/Phone'


function MockupScene({ groundShadows, objectShadows, orbitEnabled, doDownload, setDoDownload, width, height, tool }) {

  const orbit = useRef()

  const [activeModel, setActiveModel] = useState(null)

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

  const preset = "bridge2"

  return (
    <Suspense fallback={null}>
      <scene>
        <OrbitControls makeDefault enabled={orbitEnabled} ref={orbit} />

        <Environment preset={preset} />
        <Lighting />

        <group position={[0, 0, 0]} dispose={null} onPointerMissed={() => console.log("miss")}>
          <Phone tool={tool} orbit={orbit} setActiveModel={setActiveModel} activeModel={activeModel} />
          <Phone tool={tool} orbit={orbit} setActiveModel={setActiveModel} activeModel={activeModel} />
        </group>

        {/* <ContactShadows rotation={[Math.PI / 2, 0, 0]} position={[0, -7, 0]} opacity={0.75} width={40} height={40} blur={1} far={9} /> */}

        {/* <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow castShadow>
          <planeBufferGeometry attach="geometry" args={[10, 10]} />
          <shadowMaterial attach="material" />
        </mesh> */}

        {["translate", "rotate", "scale"].includes(tool) && <gridHelper position={[0, 0, 0]} args={[2, 20, "white", "#585858"]}/>}
      </scene>
    </Suspense>
  );
}


export default MockupScene;