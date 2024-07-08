import * as React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

export default function ModelCrkve() {
    const { scene } = useGLTF('assets/3dm/vzdcrkva.glb');

    // Function to adjust the position and scale of the model
    React.useEffect(() => {
        scene.position.set(-0.5, -2, 0); // Adjust the position
        scene.scale.set(0.65, 0.65, 0.65); // Adjust the scale
        scene.rotation.set(-90, 0, 40);
    }, [scene]);

    return (
        <Canvas
            frameloop="demand"
            camera={{ position: [-4, 3, 6], fov: 90, near: 1, far: 200 }}
        >
            <primitive object={scene} />
            <OrbitControls autoRotate enableZoom enablePan={false} />
            <ambientLight intensity={1.5} />
            <directionalLight position={[5, 10, 7.5]} intensity={1} />
        </Canvas>
    );
}