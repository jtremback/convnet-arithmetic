import React, { Component } from 'react'
import {render} from 'react-dom'

const UNIT_WIDTH = 30

function Square (props) {
  console.log(props)
  return (
    <div style={{
      width: UNIT_WIDTH,
      height: UNIT_WIDTH,
      backgroundColor: '#000',
      opacity: props.value / 10,
      display: 'inline-block'
    }}></div>
  )
}

function Grid (props) {
  return (
    <div>{props.featureMap.map(
      row => <div>{row.map(
        feature => <Square value={feature}/>
      )}</div>
    )}</div>
  )
}

const input = [
  [0, 1, 2, 3],
  [0, 3, 1, 0],
  [2, 0, 2, 0],
  [0, 3, 1, 0],
]

const kernel = [
  [1, 2],
  [2, 1],
]

function convolve (input, kernel) {
  let output = []
  
  row: for (let i = 0; i <= input.length; i++) {
    const row = input[i]

    feat: for (let j = 0; j <= output.length; j++) {
      console.log(i, j)
      if (j + kernel[i].length > row.length) { 
        break feat
      }
      
      if (!output[j]) { output[j] = [] }
      const step = calcStep(input, kernel, j, i)
      console.log(step)
      output[j][i] = step
    }
  }
  
  console.log(output)
}

function calcStep (input, kernel, xOffset, yOffset) {
  const inter = kernel.map(
    (row, rIndex) => row.map(
      (feat, fIndex) => feat * input[xOffset + rIndex][yOffset + fIndex]
    )
  )
  
  console.log(inter)
  
  return inter.reduce((acc, item) => {
    return acc + item.reduce((acc, num) => {
      return acc + num 
    }, 0)
  }, 0)
} 

convolve(input, kernel)

render(<Grid featureMap={featureMap}/>, document.getElementById('root'))