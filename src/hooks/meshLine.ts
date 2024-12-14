import { extend, Object3DNode } from "@react-three/fiber";
import { MeshLine, MeshLineMaterial } from "meshline";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLine: Object3DNode<MeshLine, typeof MeshLine>;
      meshLineMaterial: Object3DNode<MeshLineMaterial, typeof MeshLineMaterial>;
    }
  }
}

export function extendMeshLine() {
  extend({ MeshLine, MeshLineMaterial });
}

