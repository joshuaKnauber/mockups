import React, { useRef } from "react"
import { PointLightHelper } from "three"
import { useHelper, softShadows } from "@react-three/drei"


softShadows()


export default function Lighting() {

  const point = useRef()
  
  useHelper(point, PointLightHelper, 0.1, "hotpink")

  return (
    <group>
      <ambientLight intensity={1} />
      <pointLight
        ref={point}
        position={[0.5, 0.5, 0.5]}
        intensity={1}
        distance={1}
        decay={2}
        castShadow
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024} />
      {/* <rectAreaLight
        width={.1}
        height={.1}
        color={"white"}
        intensity={5000}
        position={[0, 0.8, 0.5]}
        lookAt={[0, 0.025, 0]}
        penumbra={1}
        castShadow
      /> */}
    </group>
  )
}
  