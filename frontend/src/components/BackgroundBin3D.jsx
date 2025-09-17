import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Dustbin() {
  return (
    <mesh rotation={[0, 0, 0]}>
      {/* A cylinder as the main dustbin body */}
      <cylinderGeometry args={[1, 1, 2, 32]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
}

function BackgroundBin3D() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <Dustbin />
        {/* Auto-rotating camera, no zoom */}
        <OrbitControls autoRotate enableZoom={false} />
      </Canvas>
    </div>
  );
}

export default BackgroundBin3D;
