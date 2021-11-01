import React from 'react'
import { useGLTF } from '@react-three/drei'
import BaseModel from './BaseModel'

import PhoneModel from './phone.gltf'
import TestImg from './Home Screen.png'

export default function Phone(props) {

  const { nodes, materials } = useGLTF(PhoneModel)

  return (
    <BaseModel {...props} >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane001.geometry}
        material={nodes.Plane001.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane002.geometry}
        material={nodes.Plane002.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane014.geometry}
        material={nodes.Plane014.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane014_1.geometry}
        material={nodes.Plane014_1.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle001_1.geometry}
        material={nodes.Circle001_1.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle001_2.geometry}
        material={nodes.Circle001_2.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle001.geometry}
        material={nodes.Circle001.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle003.geometry}
        material={materials['Luz Led']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle002.geometry}
        material={nodes.Circle002.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane004.geometry}
        material={nodes.Plane004.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle008.geometry}
        material={materials['Metal Ceramico']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle008_1.geometry}
        material={materials.Cobre}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane005.geometry}
        material={nodes.Plane005.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane006.geometry}
        material={nodes.Plane006.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane007.geometry}
        material={nodes.Plane007.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane011.geometry}
        material={nodes.Plane011.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane011_1.geometry}
        material={nodes.Plane011_1.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane011_2.geometry}
        material={materials.Pantalla}
        img={TestImg}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane011_3.geometry}
        material={nodes.Plane011_3.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane011_4.geometry}
        material={materials['Bandas magneticas']}
      />
    </BaseModel>
  )
}

useGLTF.preload(PhoneModel)