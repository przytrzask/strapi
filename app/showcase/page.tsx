"use client"

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AccumulativeShadows, OrbitControls, Center, useGLTF, Environment, RandomizedLight, useTexture, Decal } from "@react-three/drei";

import { useSnapshot } from 'valtio'
import { store } from './store'


import Overlay from "./overlay";

import { easing } from "maath";
import * as THREE from 'three'

export default function Page() {

  console.log(document.getElementById('root'))


  const [eventSource, setEvent] = useState(() => document.getElementById('root'))



  useEffect(() => {
    console.log(eventSource)
    setEvent(document.getElementById('root'))

  }
    , [eventSource])



  return (
    <>
      <Canvas
        shadows
        eventSource={eventSource}
        camera={{
          position: [0, 0, 2.5],
          fov: 25
        }}
        eventPrefix="client">
        <ambientLight intensity={0.5} />
        <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />

        <CameraRig>
          <Backdrop />
          <Center>
            <Shirt />
          </Center>
        </CameraRig>
      </Canvas>

      <Overlay />
    </>
  );
}

const Shirt = (props: any) => {


  const snap = useSnapshot(store)
  const texture = useTexture(`/${snap.decal}.png`)

  console.log({
    texture
  }
  )


  const { nodes, materials } = useGLTF("/shirt_baked.glb") as any



  useFrame((_state, delta) => {
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)

  })

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        position={[0.419, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        dispose={null}
        material-roughness={1}


      >
        <Decal
          position={[-0.4, 0.15, -0.3]}
          rotation={[0, 0, 0]}
          scale={[0.2, 0.1, 0.1]}

          map={texture}
          debug

        // map-anisotropy={16}

        />


      </mesh>    </group>
  );
}

function Backdrop() {
  const shadows = useRef(null)


  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={10}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}>
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={0.55}
        ambient={0.25}
        position={[5, 5, -10]}
      />
      <RandomizedLight
        amount={4}
        radius={5}
        intensity={0.25}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  )
}

type CameraProps = {

  children: React.ReactNode
}

function CameraRig({ children }: CameraProps) {
  const group = useRef(null)
  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [0, 0, 2], 0.25, delta)
    easing.dampE(
      group.current?.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    )
  })
  return <group ref={group}>{children}</group>
}




useGLTF.preload("/shirt_baked.glb");