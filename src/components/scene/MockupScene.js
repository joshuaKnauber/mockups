import React, { Suspense, useRef, useEffect, useState } from 'react'

import { useFrame, extend, useThree } from '@react-three/fiber'
import { Stage } from '@react-three/drei'

import Shoebox from '../models/Shoebox'


function MockupScene({ groundShadows, objectShadows, doDownload, setDoDownload, width, height }) {

  const meshRef = useRef()

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

  return (
    <scene>
      <Suspense fallback={null}>
        <Stage contactShadow={groundShadows} shadows={objectShadows} adjustCamera intensity={1} environment="sunset" preset="soft" >

          <mesh receiveShadow castShadow position={[0, 0, 0]} ref={meshRef}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={'orange'} roughness={1} metalness={0} />
          </mesh>

          {/* <Shoebox/> */}
        </Stage>
      </Suspense>
    </scene>
  );
}


export default MockupScene;