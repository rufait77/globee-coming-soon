"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";
import { cities, arcs, latLngToVector3 } from "@/lib/globe-data";

const GLOBE_RADIUS = 2;
const NODE_COLOR = new THREE.Color("#06b6d4");
const ARC_COLOR = new THREE.Color("#8b5cf6");
const WIRE_COLOR = new THREE.Color("#06b6d4");

function GlobeWireframe() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((_, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.15;
        }
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[GLOBE_RADIUS, 36, 36]} />
            <meshBasicMaterial
                color={WIRE_COLOR}
                wireframe
                transparent
                opacity={0.08}
            />
        </mesh>
    );
}

function CityNodes() {
    const ref = useRef<THREE.Group>(null);
    const nodePositions = useMemo(
        () => cities.map((c) => latLngToVector3(c.lat, c.lng, GLOBE_RADIUS * 1.01)),
        []
    );

    useFrame((_, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.15;
        }
    });

    return (
        <group ref={ref}>
            {nodePositions.map((pos, i) => (
                <mesh key={i} position={pos}>
                    <sphereGeometry args={[0.03, 8, 8]} />
                    <meshBasicMaterial color={NODE_COLOR} />
                </mesh>
            ))}
            {/* Node glow halos */}
            {nodePositions.map((pos, i) => (
                <mesh key={`glow-${i}`} position={pos}>
                    <sphereGeometry args={[0.06, 8, 8]} />
                    <meshBasicMaterial color={NODE_COLOR} transparent opacity={0.2} />
                </mesh>
            ))}
        </group>
    );
}

function ArcLines() {
    const ref = useRef<THREE.Group>(null);

    const curves = useMemo(() => {
        return arcs.map((arc) => {
            const from = cities[arc.from];
            const to = cities[arc.to];
            const start = new THREE.Vector3(...latLngToVector3(from.lat, from.lng, GLOBE_RADIUS * 1.01));
            const end = new THREE.Vector3(...latLngToVector3(to.lat, to.lng, GLOBE_RADIUS * 1.01));

            // Calculate midpoint and lift it above the globe surface
            const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
            const midLen = mid.length();
            const liftFactor = 1 + (start.distanceTo(end) / (GLOBE_RADIUS * 2)) * 0.5;
            mid.normalize().multiplyScalar(midLen * liftFactor);

            const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
            return curve;
        });
    }, []);

    useFrame((_, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.15;
        }
    });

    return (
        <group ref={ref}>
            {curves.map((curve, i) => {
                const points = curve.getPoints(50);
                return (
                    <Line
                        key={i}
                        points={points.map((p) => [p.x, p.y, p.z] as [number, number, number])}
                        color="#8b5cf6"
                        transparent
                        opacity={0.35}
                        lineWidth={1}
                    />
                );
            })}
        </group>
    );
}

function AmbientGlow() {
    return (
        <mesh>
            <sphereGeometry args={[GLOBE_RADIUS * 1.15, 32, 32]} />
            <meshBasicMaterial
                color={NODE_COLOR}
                transparent
                opacity={0.03}
                side={THREE.BackSide}
            />
        </mesh>
    );
}

function ResponsiveCamera() {
    const { viewport } = useThree();
    const isMobile = viewport.width < 6;

    return (
        <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={!isMobile}
            autoRotate={isMobile}
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
        />
    );
}

// Memoized scene to prevent re-creates
const GlobeScene = () => {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={0.3} color="#06b6d4" />
            <GlobeWireframe />
            <CityNodes />
            <ArcLines />
            <AmbientGlow />
            <ResponsiveCamera />
        </>
    );
};

export default function Globe3D() {
    const handleCreated = useCallback((state: { gl: THREE.WebGLRenderer }) => {
        state.gl.setClearColor(new THREE.Color("#050a18"), 0);
    }, []);

    return (
        <div className="relative w-full aspect-square max-w-[500px] mx-auto">
            {/* Ambient glow behind globe */}
            <div className="absolute inset-0 globe-glow rounded-full" />
            <Canvas
                camera={{ position: [0, 0, 5.5], fov: 45 }}
                onCreated={handleCreated}
                style={{ background: "transparent" }}
                gl={{ alpha: true, antialias: true }}
            >
                <GlobeScene />
            </Canvas>
        </div>
    );
}
