import React, { useRef } from "react"
import { PointLightHelper, HemisphereLightHelper, DirectionalLightHelper } from "three"
import { useHelper, softShadows } from "@react-three/drei"

// softShadows()

export default function Lighting({ shadows }) {

  const light1 = useRef()
  const light2 = useRef()
  const light3 = useRef()
  const light4 = useRef()
  
  // useHelper(light1, DirectionalLightHelper, 1, "orange")
  // useHelper(light2, DirectionalLightHelper, 1, "blue")
  // useHelper(light3, DirectionalLightHelper, 1, "white")
  // useHelper(light4, DirectionalLightHelper, 1, "white")

  return (
    <group>
      {/* <ambientLight intensity={1} /> */}
      <directionalLight
        ref={light1}
        position={[2, 3, 3]}
        intensity={3}
        color={"orange"}
        castShadow={shadows}
      />
      <directionalLight
        ref={light2}
        position={[-2, 3, 3]}
        intensity={3}
        color={"lightblue"}
      />
      <directionalLight
        ref={light3}
        position={[2, 1, -3]}
        intensity={4}
        color={"white"}
      />
      <directionalLight
        ref={light4}
        position={[-2, 1, -3]}
        intensity={4}
        color={"white"}
      />
    </group>
  )
}
  