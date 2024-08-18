/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { TextGeometry } from 'three-stdlib/geometries/TextGeometry';
import { FontLoader } from 'three-stdlib/loaders/FontLoader';

interface OptionProps {
  id: number;
  value: string;
}

interface RouletteProps {
  participants: OptionProps[];
  isPlaying: boolean;
  onStop: (winner: OptionProps) => void;
}

function Roulette({ participants = [], isPlaying, onStop }: RouletteProps) {
  const wheelRef = useRef<any>();
  const fontRef = useRef<any>();
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    const loader = new FontLoader();
    loader.load('/fonts/NanumMyeongjo_Regular.json', (font) => {
      fontRef.current = font;

      if (wheelRef.current) {
        wheelRef.current.clear()
        const newWheel = createWheel();
        wheelRef.current.add(newWheel);
      }
    }, undefined, (error) => {
      console.error('An error happened:', error);
    });
  }, [participants]);

  useFrame(() => {
    if (isPlaying && wheelRef.current) {
      wheelRef.current.rotation.z += 0.1;
      setIsSpinning(true);
    } else if (isSpinning) {
      setIsSpinning(false);
      determineWinner();
    }
  });

  const createWheel = () => {
    const segments = participants.length;
    const wheel = new THREE.Group();
    const radius = 5;

    for (let i = 0; i < segments; i++) {
      const shape = new THREE.Shape();
      const angleStart = (i / segments) * Math.PI * 2;
      const angleEnd = ((i + 1) / segments) * Math.PI * 2;

      shape.moveTo(0, 0);
      shape.arc(0, 0, radius, angleStart, angleEnd, false);
      shape.lineTo(0, 0);

      const extrudeSettings = {
        depth: 0.5,
        bevelEnabled: false
      };

      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      const material = new THREE.MeshBasicMaterial({ color: new THREE.Color(`hsl(${(i / segments) * 360}, 100%, 50%)`) });
      const segment = new THREE.Mesh(geometry, material);
      segment.position.set(0, 0, 0.25);

      if (fontRef.current) {
        const textGeometry = new TextGeometry(participants[i].value, {
          font: fontRef.current,
          size: 0.5,
          height: 0.1
        }) as unknown as THREE.BufferGeometry;
  
        const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        const textAngle = (angleStart + angleEnd) / 2;
        textMesh.position.set(Math.cos(textAngle) * (radius - 1), Math.sin(textAngle) * (radius - 1), 0.5);
        textMesh.rotation.z = textAngle + Math.PI / 2;
        segment.add(textMesh);
      }

      wheel.add(segment);
    }

    return wheel;
  };

  const createPointer = () => {
    const pointerShape = new THREE.Shape();
    pointerShape.moveTo(0, -2);       
    pointerShape.lineTo(-0.5, 0);
    pointerShape.lineTo(0.5, 0);
    pointerShape.closePath();

    const geometry = new THREE.ShapeGeometry(pointerShape);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const pointer = new THREE.Mesh(geometry, material);
    pointer.position.set(0, 6, 1);

    return pointer;
  };

  const determineWinner = () => {
    if (wheelRef.current) {
      const rotation = wheelRef.current.rotation.z % (2 * Math.PI);
      const segments = participants.length;
      const segmentAngle = (2 * Math.PI) / segments;
      const index = Math.floor(((2 * Math.PI) - rotation + segmentAngle / 2) / segmentAngle) % segments;
      const winner = participants[index];
      onStop(winner);
    }
  };

  return (
    <>
      <group ref={wheelRef}>
        {fontRef.current && <primitive object={createWheel()}/>}
      </group>
      <primitive object={createPointer()} />
    </>
  );
}

export default Roulette;
