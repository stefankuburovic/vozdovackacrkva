import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props: any) {
    const { nodes, materials } = useGLTF('/assets/3dobject/scene.gltf')
    return (
        <group {...props} dispose={null}>
            <group position={[13.552, -444.154, 491.355]} rotation={[3.053, 0, -0.03]}>
                <group rotation={[Math.PI / 2, 0, 0]}>
                    {/*<mesh geometry={nodes.Object_4.geometry} material={materials.material_0} />*/}
                    {/*<mesh geometry={nodes.Object_5.geometry} material={materials.material_0} />*/}
                    {/*<mesh geometry={nodes.Object_6.geometry} material={materials.material_0} />*/}
                    {/*<mesh geometry={nodes.Object_7.geometry} material={materials.material_0} />*/}
                    {/*<mesh geometry={nodes.Object_8.geometry} material={materials.material_0} />*/}
                    {/*<mesh geometry={nodes.Object_9.geometry} material={materials.material_0} />*/}
                    {/*<mesh geometry={nodes.Object_10.geometry} material={materials.material_0} />*/}
                    {/*<mesh geometry={nodes.Object_11.geometry} material={materials.material_0} />*/}
                    {/*<mesh geometry={nodes.Object_12.geometry} material={materials.material_0} />*/}
                    {/*<mesh geometry={nodes.Object_13.geometry} material={materials.material_0} />*/}
                    {/*<mesh geometry={nodes.Object_14.geometry} material={materials.material_0} />*/}
                    {/*<mesh geometry={nodes.Object_15.geometry} material={materials.material_0} />*/}
                    {/*<mesh geometry={nodes.Object_16.geometry} material={materials.material_0} />*/}
                    {/*<mesh geometry={nodes.Object_17.geometry} material={materials.material_0} />*/}
                    {/*<mesh geometry={nodes.Object_18.geometry} material={materials.material_0} />*/}
                    {/*<mesh geometry={nodes.Object_19.geometry} material={materials.material_0} />*/}
                </group>
            </group>
        </group>
    )
}

useGLTF.preload('/scene.gltf')
