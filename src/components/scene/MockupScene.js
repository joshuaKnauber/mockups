import React, { Suspense, useRef, useEffect, useState } from 'react'

import { useFrame, extend, useThree } from '@react-three/fiber'
import { Stage } from '@react-three/drei'

import Shoebox from '../models/Shoebox'


function MockupScene({ groundShadows, objectShadows, doDownload, setDoDownload, width, height }) {

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
        <Stage contactShadow={groundShadows} shadows={objectShadows} adjustCamera intensity={1} environment="sunset" preset="rembrandt" >

          <Shoebox/>

        </Stage>
    </scene>
  );
}


export default MockupScene;