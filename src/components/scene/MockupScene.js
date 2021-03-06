import React, { useState, useRef, Suspense, useEffect } from 'react'

import { useFrame } from '@react-three/fiber'
import { OrbitControls, ContactShadows } from '@react-three/drei'

import Environment from './Environment'
import Lighting from './Lighting'


// IMPORT YOUR MODEL HERE
import Phone from '../models/mockups/Phone'
import Suzanne from '../models/mockups/Suzanne'


function MockupScene({ groundShadows, objectShadows, orbitEnabled, doDownload, setDoDownload, width, height, tool, mockups, removeMockup }) {

  const orbit = useRef()

  const [activeModel, setActiveModel] = useState(null)

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

  const shortcutPressed = (evt) => {
    if (["Backspace", "Delete"].includes(evt.code)) {
      if (["translate", "rotate", "scale"].includes(tool) && activeModel) {
        removeMockup(activeModel.mockupUuid)
      }
    }
  }

  useEffect(() => {
    window.addEventListener("keyup", shortcutPressed)

    return () => {
      window.removeEventListener("keyup", shortcutPressed)
    }
  }, [activeModel])

  const preset = "bridge2"

  return (
    <Suspense fallback={null}>
      <scene>
        <OrbitControls makeDefault enabled={orbitEnabled} ref={orbit} target={[0, 0.7, 0]} />

        <Environment preset={preset} />
        <Lighting shadows={objectShadows} />

        <group position={[0, 0, 0]} dispose={null} >
          {mockups.map(mockup => {
            const mockupProps = { key: mockup.key, tool: tool, orbit: orbit, activeModel: activeModel, setActiveModel: setActiveModel, mockupUuid: mockup.key }

            // ADD A CASE HERE WHEN ADDING A NEW MODEL. MAKE SURE TO PASS THE mockupProps AND USE THE SAME KEY AS IN modelNames
            switch (mockup.type) {
              case "phone":
                return <Phone {...mockupProps} />
              case "suzanne":
                return <Suzanne {...mockupProps} />
            }

          })}
        </group>

        <ContactShadows rotation={[Math.PI / 2, 0, 0]} position={[0, -7, 0]} opacity={0.75} width={40} height={40} blur={1} far={9} />

        {groundShadows && <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow castShadow>
          <planeBufferGeometry attach="geometry" args={[15, 15]} />
          <shadowMaterial attach="material" opacity={.4} />
        </mesh>}

        {["translate", "rotate", "scale"].includes(tool) && <gridHelper position={[0, 0, 0]} args={[15, 20, "white", "#585858"]}/>}
      </scene>
    </Suspense>
  );
}


export default MockupScene;