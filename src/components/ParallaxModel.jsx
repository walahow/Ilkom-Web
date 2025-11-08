import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function Model({
    url, 
    scale = 1, 
    initialRotation = [0, 0, 0], 
    position = [0, -100, 0], 
    animationIndex = 0, 
    loopMode = THREE.LoopRepeat, 
    timeScale = 1,
}) {
    const group = useRef();
    const gltf = useLoader(GLTFLoader, url);
    const mixer = useRef(null);

    useEffect(() => {
        if (!group.current) return;
        const [rx, ry, rz] = initialRotation;
        group.current.rotation.set(rx, ry, rz);
        const [px, py, pz] = position;
        group.current.position.set(px, py, pz);
    }, [initialRotation]);

    useEffect(() => {
        if (!gltf.scene) return;
        
        const screenMesh = gltf.scene.getObjectByName("ScreenFace");
        if (screenMesh) {
            const video = document.createElement("video");
            video.src = "/videos/screen.mp4";
            video.loop = true;
            video.muted = true;
            video.playsInline = true;
            video.autoplay = true;
            video.play();

            const texture = new THREE.VideoTexture(video);
            texture.encoding = THREE.sRGBEncoding;
            texture.needsUpdate = true;
            texture.flipY = false;

            screenMesh.material = new THREE.MeshStandardMaterial({
                map: texture,
                emissive: new THREE.Color(0x39ff14),
                emissiveIntensity: 0.02,
                toneMapped: false,
            });
        }
    }, [gltf]);

    useEffect(() => {
        if (gltf.animations && gltf.animations.length > 0) {
            mixer.current = new THREE.AnimationMixer(gltf.scene);
            const index = Math.min(Math.max(animationIndex, 0), gltf.animations.length - 1);
            const clip = gltf.animations[index];
            const action = mixer.current.clipAction(clip);
            action.reset();
            action.setLoop(loopMode, Infinity);
            action.play();
            mixer.current.timeScale = timeScale;
        }
        return () => {
            if (mixer.current) {
                mixer.current.stopAllAction();
                mixer.current = null;
            }
        };
    }, [gltf, animationIndex, loopMode, timeScale]);

    useFrame((_, delta) => {
        if (mixer.current) mixer.current.update(delta);
    });

    return <primitive ref={group} object={gltf.scene} scale={scale} />;
}



function ParallaxCamera({ mouseRef, baseZ = 100, maxOffset = 3}) {
    const { camera } = useThree();
    const base = useRef(new THREE.Vector3(0, 0, baseZ));
    useFrame(() => {
        const { x = 0, y = 0 }= mouseRef.current || {};
        const targetX = base.current.x + x * maxOffset;
        const targetY = base.current.y + y * maxOffset;
        camera.position.x += (targetX - camera.position.x) * 0.03;
        camera.position.y += (targetY - camera.position.y) * 0.03;
        camera.lookAt(0, 0, 0);
    });
    return null;
}

export default function ParallaxModel({
    url = "/models/mymodel.glb",
    scale = 1.2,
    initialRotation = [0, 0, 0],
    position = [0, -20, 0],
    cameraZ = 140,
    parallaxIntensity = 5,
    animationIndex = 3,
    loopMode = 'repeat',
    timeScale = 1,
}) {
    const mouseRef = useRef({ x: 0, y: 0});

    useEffect(() => {
        const handle = (e) => {
            const vw = window.innerWidth || 1;
            const vh = window.innerHeight || 1;
            mouseRef.current = {
                x: (e.clientX / vw) * 2 - 1,
                y: -(e.clientY / vh) * 2 + 1,
            };
        };
        window.addEventListener("mousemove", handle);
        return () => window.removeEventListener("mousemove", handle);
    }, []);

    return (
        <div className="hero-3d" aria-hidden>
            <Canvas gl={{antialias: true, alpha: true}} style={{ background: 'transparent'}} camera={{ position: [0, 0, cameraZ], fov: 60 }}>
                <ambientLight intensity={0.8} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <directionalLight position={[-5, -5, -5]} intensity={0.5} />

                <ParallaxCamera mouseRef={mouseRef} baseZ={cameraZ} maxOffset={parallaxIntensity} />
                <Suspense fallback={null}>
                    <Model url={url} scale={scale} initialRotation={initialRotation} position={position} animationIndex={animationIndex} loopMode={loopMode === 'once' ? THREE.LoopOnce : THREE.LoopRepeat} timeScale={timeScale} />
                </Suspense>
                <EffectComposer>
                    <Bloom intensity={5.5} luminanceThreshold={0.07} />
                </EffectComposer>
            </Canvas>
        </div>
    );
}