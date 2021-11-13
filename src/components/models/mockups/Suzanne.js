import React from 'react'
import { useGLTF } from '@react-three/drei'
import BaseModel from '../BaseModel'

import SuzanneModel from './suzanne.gltf'

export default function Suzanne(props) {

  const { nodes, materials } = useGLTF(SuzanneModel)

  return (
    <BaseModel {...props} >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Suzanne.geometry}
        material={materials['Material.001.editable']}
      />
    </BaseModel>
  )
}

useGLTF.preload(SuzanneModel)