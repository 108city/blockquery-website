import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

const GlobeVisualization = () => {
  const groupRef = useRef<THREE.Group>(null);

  // Generate latitude lines (horizontal circles)
  const latitudeLines = [];
  for (let lat = -75; lat <= 75; lat += 25) {
    const points: [number, number, number][] = [];
    const radius = 2;
    const latRad = (lat * Math.PI) / 180;
    const currentRadius = radius * Math.cos(latRad);
    const y = radius * Math.sin(latRad);
    
    for (let lon = 0; lon <= 360; lon += 5) {
      const lonRad = (lon * Math.PI) / 180;
      const x = currentRadius * Math.cos(lonRad);
      const z = currentRadius * Math.sin(lonRad);
      points.push([x, y, z]);
    }
    latitudeLines.push(points);
  }

  // Generate longitude lines (vertical circles going through poles)
  const longitudeLines = [];
  for (let lon = 0; lon < 360; lon += 30) {
    const points: [number, number, number][] = [];
    const radius = 2;
    const lonRad = (lon * Math.PI) / 180;
    
    for (let lat = -90; lat <= 90; lat += 5) {
      const latRad = (lat * Math.PI) / 180;
      const currentRadius = radius * Math.cos(latRad);
      const y = radius * Math.sin(latRad);
      const x = currentRadius * Math.cos(lonRad);
      const z = currentRadius * Math.sin(lonRad);
      points.push([x, y, z]);
    }
    longitudeLines.push(points);
  }

  // Generate network nodes at intersections
  const networkNodes: [number, number, number][] = [];
  const radius = 2;
  const nodePositions = [
    { lat: 40, lon: -74 }, // New York
    { lat: 51, lon: 0 },   // London
    { lat: 35, lon: 139 }, // Tokyo
    { lat: 1, lon: 103 },  // Singapore
    { lat: -33, lon: 151 }, // Sydney
    { lat: 37, lon: -122 }, // San Francisco
    { lat: 52, lon: 13 },  // Berlin
    { lat: 19, lon: 72 },  // Mumbai
    { lat: -23, lon: -46 }, // São Paulo
    { lat: 25, lon: 55 },  // Dubai
  ];

  nodePositions.forEach(({ lat, lon }) => {
    const latRad = (lat * Math.PI) / 180;
    const lonRad = (lon * Math.PI) / 180;
    const currentRadius = radius * Math.cos(latRad);
    const y = radius * Math.sin(latRad);
    const x = currentRadius * Math.cos(lonRad);
    const z = currentRadius * Math.sin(lonRad);
    networkNodes.push([x, y, z]);
  });

  useFrame((state) => {
    if (groupRef.current) {
      // Slow continuous rotation
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Latitude lines */}
      {latitudeLines.map((points, i) => (
        <Line
          key={`lat-${i}`}
          points={points}
          color="#19C3D6"
          lineWidth={1.5}
          transparent
          opacity={0.4}
        />
      ))}

      {/* Longitude lines */}
      {longitudeLines.map((points, i) => (
        <Line
          key={`lon-${i}`}
          points={points}
          color="#19C3D6"
          lineWidth={1.5}
          transparent
          opacity={0.4}
        />
      ))}

      {/* Network nodes */}
      {networkNodes.map((position, i) => (
        <group key={`node-${i}`} position={position}>
          <mesh>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color="#19C3D6"
              emissive="#19C3D6"
              emissiveIntensity={0.6}
              transparent
              opacity={0.9}
            />
          </mesh>
          {/* Glow effect */}
          <mesh scale={1.8}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial
              color="#19C3D6"
              transparent
              opacity={0.3}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};

const NetworkGlobe3D = () => {
  return (
    <div className="w-full h-[350px] sm:h-[450px] md:h-[600px]">
      <Canvas camera={{ position: [0, 0, 7], fov: 55 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        <GlobeVisualization />
      </Canvas>
    </div>
  );
};

export default NetworkGlobe3D;
