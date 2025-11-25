// ==================== useParticleHover.js ====================
// Custom hook untuk mendeteksi hover pada clickable objects

import { useState, useCallback } from 'react';
import * as THREE from 'three';

export default function useParticleHover() {
    const [hoverStates, setHoverStates] = useState({});
    const [hoverPoints, setHoverPoints] = useState({});

    // Handle pointer move untuk hover detection
    const handlePointerMove = useCallback((event, camera, clickableObjects) => {
        if (!camera || !clickableObjects || clickableObjects.size === 0) return;

        const x = event.pointer.x;
        const y = event.pointer.y;

        camera.updateMatrixWorld(true);

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

        // Get all meshes from clickable objects
        const allMeshes = [];
        const meshToName = new Map();

        clickableObjects.forEach((meshes, name) => {
            meshes.forEach(mesh => {
                if (!mesh.userData.isDebugHelper && !mesh.userData.isHitbox) {
                    allMeshes.push(mesh);
                    meshToName.set(mesh, name);
                }
            });
        });

        // Check intersections
        const intersects = raycaster.intersectObjects(allMeshes, true);

        const newHoverStates = {};
        const newHoverPoints = {};

        if (intersects.length > 0) {
            const intersectedMesh = intersects[0].object;
            const objectName = meshToName.get(intersectedMesh);

            if (objectName) {
                newHoverStates[objectName] = true;
                newHoverPoints[objectName] = intersects[0].point; // Vector3
            }
        }

        setHoverStates(newHoverStates);
        setHoverPoints(newHoverPoints);
    }, []);

    return {
        hoverStates,      // { ScreenFace: true, Mug: false, ... }
        hoverPoints,      // { ScreenFace: Vector3, ... }
        handlePointerMove
    };
}