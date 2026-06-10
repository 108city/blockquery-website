import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

interface NetworkNode {
  position: [number, number, number];
  size: number;
}

const NetworkVisualization = ({ mousePosition }: { mousePosition: React.MutableRefObject<{ x: number; y: number }> }) => {
  const groupRef = useRef<THREE.Group>(null);

  // Generate network nodes in 3D space - terrain-like wave effect, emphasized on the right
  const nodes: NetworkNode[] = useMemo(() => {
    const nodeArray: NetworkNode[] = [];
    const gridCols = 16; // Increased columns for broader spread
    const gridRows = 12; // Increased rows for more depth
    const spacingX = 3.5; // Increased horizontal spacing
    const spacingZ = 3.2; // Increased depth spacing
    const rightShift = 5; // More shift to the right

    for (let col = 0; col < gridCols; col++) {
      for (let row = 0; row < gridRows; row++) {
        // Grid position
        const x = (col - gridCols / 2) * spacingX + rightShift;
        const z = (row - gridRows / 2) * spacingZ;
        
        // Wave height using multiple sine/cosine functions for organic terrain
        const wave1 = Math.sin(col * 0.4) * Math.cos(row * 0.35);
        const wave2 = Math.cos(col * 0.25) * Math.sin(row * 0.5);
        const wave3 = Math.sin((col + row) * 0.2);
        
        // Combine waves with larger amplitudes for dramatic terrain effect
        const y = (wave1 * 3.5 + wave2 * 2.8 + wave3 * 2.0);
        
        // Add slight randomness for organic feel
        const randomOffset = (Math.random() - 0.5) * 0.6;

        nodeArray.push({
          position: [x, y + randomOffset, z],
          size: 0.12 + Math.random() * 0.07,
        });
      }
    }

    return nodeArray;
  }, []);

  // Calculate connections between nearby nodes
  const connections = useMemo(() => {
    const conns: Array<{ start: [number, number, number], end: [number, number, number] }> = [];
    nodes.forEach((node, i) => {
      nodes.slice(i + 1).forEach(other => {
        const dist = Math.sqrt(
          Math.pow(node.position[0] - other.position[0], 2) +
          Math.pow(node.position[1] - other.position[1], 2) +
          Math.pow(node.position[2] - other.position[2], 2)
        );
        if (dist < 6.5) {
          conns.push({ start: node.position, end: other.position });
        }
      });
    });
    return conns;
  }, [nodes]);

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle mouse following tilt (reduced for terrain effect)
      const targetRotationY = mousePosition.current.x * 0.2;
      const targetRotationX = mousePosition.current.y * 0.15;
      
      groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.03;
      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.03;
      
      // Gentle flowing motion
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.08) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Network lines */}
      {connections.map((conn, i) => (
        <Line
          key={`line-${i}`}
          points={[conn.start, conn.end]}
          color="#19C3D6"
          lineWidth={1.5}
          transparent
          opacity={0.4}
        />
      ))}

      {/* Network nodes */}
      {nodes.map((node, i) => (
        <mesh key={`node-${i}`} position={node.position}>
          <sphereGeometry args={[node.size, 16, 16]} />
          <meshStandardMaterial
            color="#19C3D6"
            emissive="#19C3D6"
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
          {/* Glow effect */}
          <mesh scale={1.5}>
            <sphereGeometry args={[node.size, 16, 16]} />
            <meshBasicMaterial
              color="#19C3D6"
              transparent
              opacity={0.2}
            />
          </mesh>
        </mesh>
      ))}
    </group>
  );
};

interface BlockchainNetwork3DProps {
  onMouseMove: (x: number, y: number) => void;
}

const BlockchainNetwork3D = ({ onMouseMove }: BlockchainNetwork3DProps) => {
  const mousePositionRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    mousePositionRef.current = { x, y };
    onMouseMove(x, y);
  };

  return (
    <div 
      className="absolute inset-0 w-full h-full opacity-70 pointer-events-auto"
      onMouseMove={handleMouseMove}
      style={{ width: '100%', height: '100%' }}
    >
      <Canvas 
        camera={{ position: [6, 8, 28], fov: 70 }}
        style={{ width: '100%', height: '100%', display: 'block' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <NetworkVisualization mousePosition={mousePositionRef} />
      </Canvas>
    </div>
  );
};

export default BlockchainNetwork3D;
