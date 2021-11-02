import React, { useState } from 'react'

import MockupMesh from './Mesh';


export const hexToRgb = (hex) => {
  // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

export function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


export default function BaseModel(props) {
    
  const [selectedUid, setSelectedUid] = useState(null)

  return (
    <group {...props} dispose={null} >
      {props.children.map(meshData => {
        if (meshData.props.geometry === undefined) return

        const mat = meshData.props.material
        return <MockupMesh
                  key={meshData.props.geometry.uuid}
                  geometry={meshData.props.geometry}
                  color={rgbToHex(Math.round(mat.color.r*255), Math.round(mat.color.g*255), Math.round(mat.color.b*255))}
                  metalness={mat.metalness}
                  roughness={mat.roughness}
                  img={mat.map}
                  selectable={mat.name.includes(".editable")}
                  selected={selectedUid}
                  setSelected={setSelectedUid}
                />
      })}
    </group>
  )
}