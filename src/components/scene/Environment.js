import React from 'react'
import { Environment as EnvironmentImpl } from '@react-three/drei'

const examplesURL = 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r123/examples/textures/cube/'

// See https://github.com/mrdoob/three.js/tree/master/examples/textures/cube
const presets = {
  pisa: {
    folder: 'pisa',
    files: ['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'],
  },
  bridge2: {
    folder: 'Bridge2',
    files: ['posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg'],
  },
  milkyway: {
    folder: 'MilkyWay',
    files: ['dark-s_px.jpg', 'dark-s_nx.jpg', 'dark-s_py.jpg', 'dark-s_ny.jpg', 'dark-s_pz.jpg', 'dark-s_nz.jpg'],
  },
  angus: {
    folder: 'angus',
    files: ['cube_m00_c00.jpg', 'cube_m00_c01.jpg', 'cube_m00_c02.jpg', 'cube_m00_c03.jpg', 'cube_m00_c04.jpg', 'cube_m00_c05.jpg'],
  },
}

export default function Environment({ preset, ...props }) {
  const { folder, files } = presets[preset]
  const path = examplesURL + folder + '/'
  return <EnvironmentImpl files={files} path={path} {...props} />
}