import React, { useState, useEffect } from 'react'

import { useFrame, useThree } from '@react-three/fiber'
import { Stage } from '@react-three/drei'

import Phone from '../models/Phone'


function MockupScene({ groundShadows, objectShadows, doDownload, setDoDownload, width, height, tool }) {

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

  return (
    <scene>
        <Stage contactShadow={groundShadows} shadows={objectShadows} adjustCamera intensity={1} environment="city" preset="soft" >

          <Phone tool={tool} />

        </Stage>
    </scene>
  );
}


export default MockupScene;