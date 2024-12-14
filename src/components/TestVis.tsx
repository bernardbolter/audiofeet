import React from "react";
import { useFrame } from "@react-three/fiber";
import { Color } from "three";
// import { MeshLine } from "meshline";
import { AudioAnalyzer } from "@/hooks/audioAnylizer"
import { extendMeshLine } from "@/hooks/meshLine"
import { normalizeBetween, radians } from "@/hooks/math"
// import { AudioAnalyzer } from "@/hooks/audioAnylizer"
// import { extendMeshLine } from "@/hooks/meshLine"
// import { normalizeBetween, radians } from "@/hooks/math"

extendMeshLine();

type Props = {
  analyzer: AudioAnalyzer;
  lineWidth?: number;
  segments?: number;
  radius?: number;
  height?: number;
};

export default function Visualizer({
  analyzer,
  lineWidth = 0.02,
  segments = 100,
  radius = 2,
  height = 1,
}: Props) {
  const lineRef = React.useRef(null);

  useFrame(() => {
    if (!analyzer) return;
    console.log(analyzer)
    // const fft = analyzer.getFFT();
    // // console.log(analyzer)
    // const points: number[] = [];
    // for (let i = 0; i <= segments; i++) {
    //   const val = normalizeBetween(fft[i < segments ? i : 0], 0, 255) * height;
    //   const angle = i * (360 / segments);
    //   const theta = radians(angle);
    //   const x = (radius + val) * Math.cos(theta);
    //   const y = -(radius + val) * Math.sin(theta);
    //   points.push(x, y, 0);
    // }
    // lineRef.current?.setPoints(points);
  });

  return (
    <mesh></mesh>
    // <mesh>
    //   <meshLine ref={lineRef} attach="geometry" />
    //   <meshLineMaterial
    //     attach="material"
    //     lineWidth={lineWidth}
    //     color={new Color("#C36DFF")}
    //   />
    // </mesh>
  );
}
