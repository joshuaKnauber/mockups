import React from 'react'
import { useGLTF } from '@react-three/drei'
import BaseModel from '../BaseModel'

import PhoneModel from './phone.gltf'

export default function Phone(props) {

  const { nodes, materials } = useGLTF(PhoneModel)

  return (
    <BaseModel {...props} >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Buttons.geometry}
        material={materials['Buttons.editable']}
      />
      <mesh castShadow receiveShadow geometry={nodes.Flash.geometry} material={materials.Flash} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bezel.geometry}
        material={materials['Bezel.editable']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Body.geometry}
        material={materials['Body.editable']}
      />
      <mesh castShadow receiveShadow geometry={nodes.Lenses.geometry} material={materials.Lenses} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Screen.geometry}
        material={materials['Screen.editable']}
      />
    </BaseModel>
  )
}

useGLTF.preload(PhoneModel)