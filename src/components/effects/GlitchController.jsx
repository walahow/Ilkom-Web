import React, { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * GlitchController
 * Applies a "hacked" wireframe glitch effect to a list of target meshes.
 * 
 * @param {THREE.Mesh[]} targets - The meshes to apply the effect to.
 * @param {boolean} active - Whether the glitch effect is currently active.
 * @param {number} duration - Duration of the glitch in milliseconds.
 */
const GlitchController = ({ targets, active, duration = 400 }) => {
    const originalMaterialsRef = useRef(new Map());
    const glitchMaterialRef = useRef(null);
    const timeoutRef = useRef(null);
    const frameCountRef = useRef(0);
    const isActiveRef = useRef(false);

    // Initialize materials
    useEffect(() => {
        if (!targets || targets.length === 0) return;

        // Store original materials
        targets.forEach(mesh => {
            if (mesh.material && !originalMaterialsRef.current.has(mesh.uuid)) {
                originalMaterialsRef.current.set(mesh.uuid, mesh.material);
            }
        });

        // Create glitch material (Neon Green Wireframe)
        glitchMaterialRef.current = new THREE.MeshBasicMaterial({
            color: new THREE.Color('#39ff14'), // Neon Green
            wireframe: true,
            transparent: true,
            opacity: 1.0,
            side: THREE.DoubleSide,
            skinning: targets[0].isSkinnedMesh,
        });

        return () => {
            // Cleanup: Restore original materials
            targets.forEach(mesh => {
                if (originalMaterialsRef.current.has(mesh.uuid)) {
                    mesh.material = originalMaterialsRef.current.get(mesh.uuid);
                }
            });
        };
    }, [targets]);

    // Handle activation
    useEffect(() => {
        if (active && targets && targets.length > 0) {
            isActiveRef.current = true;
            frameCountRef.current = 0;

            // Apply glitch material immediately
            targets.forEach(mesh => {
                if (glitchMaterialRef.current) {
                    mesh.material = glitchMaterialRef.current;
                }
            });

            if (timeoutRef.current) clearTimeout(timeoutRef.current);

            timeoutRef.current = setTimeout(() => {
                isActiveRef.current = false;
                // Restore original materials
                targets.forEach(mesh => {
                    if (originalMaterialsRef.current.has(mesh.uuid)) {
                        mesh.material = originalMaterialsRef.current.get(mesh.uuid);
                    }
                });
            }, duration);
        }
    }, [active, duration, targets]);

    // Animation Loop
    useFrame(() => {
        if (!isActiveRef.current || !glitchMaterialRef.current) return;

        frameCountRef.current++;

        // Flicker logic: Modify the glitch material itself
        // Randomly toggle opacity to simulate "bad connection" / flickering
        if (Math.random() > 0.5) {
            glitchMaterialRef.current.opacity = 1.0;
            glitchMaterialRef.current.color.set('#39ff14'); // Green
        } else {
            glitchMaterialRef.current.opacity = 0.3; // Dim
            // Occasionally glitch to Cyan
            if (Math.random() > 0.7) {
                glitchMaterialRef.current.color.set('#00ffff'); // Cyan
            }
        }

        // Optional: Randomly toggle visibility of some meshes for extra chaos?
        // targets.forEach(mesh => mesh.visible = Math.random() > 0.1);
    });

    return null;
};

export default GlitchController;
