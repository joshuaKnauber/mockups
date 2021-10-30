import React, { Suspense, useRef } from 'react'

import { useFrame } from '@react-three/fiber'
import { Stage } from '@react-three/drei'


function Box(props) {
  return (
    <mesh receiveShadow castShadow
      {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'white'} roughness={0} metalness={1} />
    </mesh>
  )
}


function MockupScene({ groundShadows, objectShadows, doDownload, setDoDownload, width, height }) {

  const sceneRef = useRef()

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
    <scene ref={sceneRef}>
      <Suspense fallback={null}>
        <Stage contactShadow={groundShadows} shadows={objectShadows} adjustCamera intensity={1} environment="sunset" preset="rembrandt">
        <Box position={[-1.2, 0, 0]} />
        <Box position={[-0.3, 0.3, 0.5]} />
        </Stage>
      </Suspense>
    </scene>
  );
}


export default MockupScene;