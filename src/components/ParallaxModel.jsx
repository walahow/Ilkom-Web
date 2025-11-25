
// ==================== ParallaxModel.jsx ====================
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Environment, ContactShadows, BakeShadows } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// --- KONFIGURASI ---
const CLICKABLE_OBJECTS = ["ScreenFace", "Mug", "BookMeme", "Poster"];
const USE_BBOX_FOR = ["Mug"];
const DEBUG_SHOW_CLICKABLE_AREAS = false; // Set true jika ingin debug hitbox

function findClickableObjects(scene, targetNames) {
  const clickableGroups = new Map();

  scene.traverse((child) => {
    let current = child;
    let matchedName = null;

    while (current) {
      if (targetNames.includes(current.name)) {
        matchedName = current.name;
        break;
      }
      current = current.parent;
    }

    if (matchedName && child.isMesh) {
      if (!clickableGroups.has(matchedName)) {
        clickableGroups.set(matchedName, []);
      }
      clickableGroups.get(matchedName).push(child);
    }
  });

  return clickableGroups;
}

function ModelWithGLBCamera({ url, onObjectClick, onLoadComplete, onLoadError }) {
  const gltf = useLoader(GLTFLoader, url);
  const mixer = useRef(null);
  const { camera, set, size } = useThree();

  const clickableGroupsRef = useRef(new Map());
  const hitboxesRef = useRef([]);

  // ============================================================
  // 1. SETUP VISUAL (LIGHTING, SHADOW, & MATERIAL) DARI GLB
  // ============================================================
  useEffect(() => {
    gltf.scene.traverse((child) => {
      // A. Handle Mesh (Benda Padat)
      if (child.isMesh) {
        child.castShadow = true;    // Mesh membuang bayangan
        child.receiveShadow = true; // Mesh menerima bayangan

        // Pastikan material merespon environment map (refleksi)
        if (child.material) {
          child.material.envMapIntensity = 1;
          child.material.needsUpdate = true;
        }
      }

      // B. Handle Lights (Lampu bawaan dari Blender)
      if (child.isLight) {
        child.castShadow = true; // Paksa lampu menghasilkan bayangan

        // Tingkatkan kualitas bayangan
        if (child.shadow) {
          child.shadow.mapSize.width = 2048; // Resolusi bayangan tinggi
          child.shadow.mapSize.height = 2048;
          child.shadow.radius = 15;
          child.shadow.bias = -0.001; // Mengurangi error visual pada bayangan
        }
      }
    });
  }, [gltf]);

  // --- SETUP KAMERA ---
  useEffect(() => {
    try {
      const cam = gltf.cameras?.[0];
      if (cam) {
        cam.fov = 19;
        cam.aspect = size.width / size.height;
        cam.updateProjectionMatrix();
        set({ camera: cam });
      }
      onLoadComplete?.();
    } catch (error) {
      console.error("Camera setup error:", error);
      onLoadError?.();
    }
  }, [gltf, set, size, onLoadComplete, onLoadError]);

  // --- HANDLE RESIZE ---
  useEffect(() => {
    const handleResize = () => {
      if (camera) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [camera]);

  // --- ANIMASI MODEL ---
  useEffect(() => {
    if (gltf.animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(gltf.scene);
      gltf.animations.forEach((clip) => {
        const action = mixer.current.clipAction(clip);
        action.setLoop(THREE.LoopOnce);
        action.clampWhenFinished = true;
        action.reset();
        action.play();
      });
    }
  }, [gltf]);

  useFrame((_, delta) => {
    mixer.current?.update(delta);
    if (camera) {
      camera.updateMatrixWorld(true);
      camera.updateProjectionMatrix();
    }
  });

  // --- SETUP VIDEO TEXTURE (LAYAR) ---
  useEffect(() => {
    const screen = gltf.scene.getObjectByName("ScreenFace");
    if (screen) {
      const video = document.createElement("video");
      video.src = "/videos/screen.mp4";
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.autoplay = true;
      video.play().catch(err => console.log("Video autoplay blocked:", err));

      const texture = new THREE.VideoTexture(video);
      texture.flipY = false;

      screen.material = new THREE.MeshStandardMaterial({
        map: texture,
        // PENTING: Emissive tinggi agar layar "Glowing" saat kena efek Bloom
        emissive: new THREE.Color(0x39ff14),
        emissiveIntensity: 0.15,
        toneMapped: true,
      });
    }
  }, [gltf]);

  // ============================================================
  // 2. LOGIKA HITBOX (TETAP SAMA SEPERTI KODE ASLI ANDA)
  // ============================================================
  useEffect(() => {
    clickableGroupsRef.current = findClickableObjects(gltf.scene, CLICKABLE_OBJECTS);

    // Mark meshes as clickable
    clickableGroupsRef.current.forEach((meshes) => {
      meshes.forEach(mesh => {
        mesh.userData.isClickable = true;
      });
    });

    hitboxesRef.current.forEach(hitbox => {
      if (hitbox.parent) hitbox.parent.remove(hitbox);
      if (hitbox.geometry) hitbox.geometry.dispose();
      if (hitbox.material) hitbox.material.dispose();
    });
    hitboxesRef.current = [];

    clickableGroupsRef.current.forEach((meshes, name) => {
      if (meshes.length === 0) return;

      if (USE_BBOX_FOR.includes(name)) {
        const targetMesh = meshes[0];
        if (!targetMesh.geometry) return;

        targetMesh.geometry.computeBoundingBox();
        const localBox = targetMesh.geometry.boundingBox;
        if (!localBox) return;

        const width = localBox.max.x - localBox.min.x;
        const height = localBox.max.y - localBox.min.y;
        const depth = localBox.max.z - localBox.min.z;
        const centerX = (localBox.max.x + localBox.min.x) / 2;
        const centerY = (localBox.max.y + localBox.min.y) / 2;
        const centerZ = (localBox.max.z + localBox.min.z) / 2;

        const geometry = new THREE.BoxGeometry(width, height, depth);
        const material = new THREE.MeshBasicMaterial({
          color: 0xff00ff,
          wireframe: true,
          transparent: true,
          opacity: DEBUG_SHOW_CLICKABLE_AREAS ? 0.5 : 0.0,
          depthWrite: false,
          side: THREE.DoubleSide
        });

        const hitbox = new THREE.Mesh(geometry, material);
        hitbox.position.set(centerX, centerY, centerZ);
        hitbox.rotation.set(0, 0, 0);
        hitbox.userData.clickableObjectName = name;
        hitbox.userData.isHitbox = true;
        hitbox.userData.isClickable = true;

        targetMesh.add(hitbox);
        hitboxesRef.current.push(hitbox);
      }
      else if (DEBUG_SHOW_CLICKABLE_AREAS) {
        meshes.forEach(mesh => {
          if (!mesh.userData.isDebugHelper && mesh.geometry) {
            const wireframe = new THREE.LineSegments(
              new THREE.EdgesGeometry(mesh.geometry),
              new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 1 })
            );
            wireframe.userData.isDebugHelper = true;
            mesh.add(wireframe);
          }
        });
      }
    });
  }, [gltf]);

  const handleClick = (event) => {
    event.stopPropagation();

    const x = event.pointer.x;
    const y = event.pointer.y;

    camera.updateMatrixWorld(true);
    camera.updateProjectionMatrix();

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
    raycaster.params.Mesh.threshold = 0.1;
    raycaster.firstHitOnly = true;

    if (hitboxesRef.current.length > 0) {
      const hitboxIntersects = raycaster.intersectObjects(hitboxesRef.current, false);
      if (hitboxIntersects.length > 0) {
        const clickedHitbox = hitboxIntersects[0].object;
        onObjectClick?.(clickedHitbox.userData.clickableObjectName);
        return;
      }
    }

    const directMeshes = [];
    clickableGroupsRef.current.forEach((meshes, name) => {
      if (!USE_BBOX_FOR.includes(name)) {
        const validMeshes = meshes.filter(m => !m.userData.isDebugHelper);
        directMeshes.push(...validMeshes);
      }
    });

    if (directMeshes.length > 0) {
      const meshIntersects = raycaster.intersectObjects(directMeshes, false);
      if (meshIntersects.length > 0) {
        const clickedMesh = meshIntersects[0].object;
        let objectName = null;
        clickableGroupsRef.current.forEach((meshes, name) => {
          if (meshes.includes(clickedMesh)) objectName = name;
        });
        if (objectName) onObjectClick?.(objectName);
      }
    }
  };

  const handlePointerMove = (e) => {
    e.stopPropagation();
    const firstHit = e.intersections.length > 0 ? e.intersections[0].object : null;
    if (firstHit && firstHit.userData.isClickable) {
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'auto';
    }
  };

  const handlePointerOut = () => {
    document.body.style.cursor = 'auto';
  };

  return (
    <group
      onClick={handleClick}
      onPointerMove={handlePointerMove}
      onPointerOut={handlePointerOut}
    >
      <primitive object={gltf.scene} />
    </group>
  );
}

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-text">Loading 3D Model...</div>
      <div className="loading-bar"><div className="loading-progress" /></div>
    </div>
  );
}

function ErrorScreen({ onRetry }) {
  return (
    <div className="error-screen">
      <div className="error-icon">⚠️</div>
      <div className="error-title">Failed to Load Model</div>
      <button onClick={onRetry} className="error-button">Retry</button>
    </div>
  );
}

export default function ParallaxModel({ url, onObjectClick }) {
  const [loadError, setLoadError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  const handleRetry = () => {
    setLoadError(false);
    setIsLoaded(false);
    setRetryKey(prev => prev + 1);
  };

  return (
    <div className="hero-3d-wrapper">
      {!isLoaded && !loadError && <LoadingScreen />}
      {loadError && <ErrorScreen onRetry={handleRetry} />}

      <Canvas
        key={retryKey}
        shadows // WAJIB: Mengaktifkan sistem bayangan
        gl={{
          antialias: true,
          alpha: true,
          // Menggunakan Tone Mapping standar industri (mirip Blender Filmic)
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.1,
          outputColorSpace: THREE.SRGBColorSpace
        }}
        className="hero-canvas"
        style={{ display: loadError ? "none" : "block" }}
      >
        {/* 3. ENVIRONMENT
          Memberikan pantulan realistis pada material metal/plastik.
          Preset "city" biasanya paling seimbang untuk scene indoor.
        */}
        <Environment preset="warehouse" environmentIntensity={0.1} />
        <ambientLight intensity={13.5} color="#A5B1FF" />



        {/* 5. CONTACT SHADOWS
          Memberikan bayangan halus di lantai agar objek terlihat 'napak'
        */}
        <ContactShadows
          resolution={2048}
          scale={10}
          blur={15}
          opacity={0.5}
          far={10}
          color="#000000"
        />

        <Suspense fallback={null}>
          <ModelWithGLBCamera
            url={url}
            onObjectClick={onObjectClick}
            onLoadComplete={() => setIsLoaded(true)}
            onLoadError={() => setLoadError(true)}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
