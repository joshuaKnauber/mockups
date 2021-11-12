import React, { useRef } from "react"
import { PointLightHelper, HemisphereLightHelper, DirectionalLightHelper } from "three"
import { useHelper, softShadows } from "@react-three/drei"


export default function Lighting() {

  const point = useRef()
  
  // useHelper(point, PointLightHelper, 1, "hotpink")

  return (
    <group>
      <ambientLight intensity={1} />
      {/* <pointLight
        position={[1, 2, 0]}
        intensity={1}
        castShadow
      /> */}
    </group>
  )
}
  