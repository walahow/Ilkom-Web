import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

function AnimatedModel({ url, scrollY }) {
  const group = useRef();
  const gltf = useLoader(GLTFLoader, url);
  const mixer = useRef();

  useEffect(() => {
    if (gltf.animations.length) {
      mixer.current = new THREE.AnimationMixer(gltf.scene);
      const action = mixer.current.clipAction(gltf.animations[0]);
      action.play();
      action.setLoop(THREE.LoopOnce);
    }
  }, [gltf]);

  // Update tiap frame
  useFrame((state, delta) => {
    // Update Blender animation
    if (mixer.current) mixer.current.update(delta);

    // Rotasi berdasarkan scroll
    if (group.current) {
      // scrollY: 0 → 1
      group.current.rotation.y = scrollY.current * Math.PI * 2; // 360 deg
      group.current.position.y = scrollY.current * 1; // misal dari bawah ke tengah
    }
  });

  return <primitive ref={group} object={gltf.scene} scale={1} />;
}
