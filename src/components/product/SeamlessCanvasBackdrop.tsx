"use client";

import { useLayoutEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import type { WebGLRenderer } from "three";

function paintDomTransparent(gl: WebGLRenderer) {
  const transparent = {
    background: "transparent",
    backgroundColor: "transparent",
    boxShadow: "none",
    border: "none",
    outline: "none",
  } as const;
  const apply = (el: HTMLElement | null | undefined) => {
    if (!el) return;
    Object.assign(el.style, transparent);
  };
  const canvas = gl.domElement as HTMLCanvasElement;
  apply(canvas);
  apply(canvas.parentElement);
  apply(canvas.parentElement?.parentElement);
}

/**
 * Fully transparent WebGL clear, no scene.background, and DOM chain
 * (canvas + R3F wrappers) forced transparent so no “panel” behind the mesh.
 */
export function SeamlessCanvasBackdrop() {
  const getThree = useThree((s) => s.get);

  useLayoutEffect(() => {
    const { gl, scene } = getThree();
    gl.setClearColor(0x000000, 0);
    scene.background = null;
    scene.backgroundBlurriness = 0;
    scene.fog = null;
    paintDomTransparent(gl);
  }, [getThree]);

  useFrame((state) => {
    if (state.scene.background !== null) {
      state.scene.background = null;
    }
  });

  return null;
}
