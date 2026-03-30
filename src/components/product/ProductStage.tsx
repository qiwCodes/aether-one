"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import type { MotionValue } from "framer-motion";
import { Suspense } from "react";
import type { ProductFinishId } from "./productFinish";
import { HeadphoneModel } from "./HeadphoneModel";
import { SeamlessCanvasBackdrop } from "./SeamlessCanvasBackdrop";

function StageLights() {
  return (
    <>
      <ambientLight intensity={0.22} />
      <directionalLight position={[6, 10, 8]} intensity={0.85} color="#f4f4f5" />
      <directionalLight position={[-8, 4, -4]} intensity={0.35} color="#a1a1aa" />
      <spotLight
        position={[0, 6, 2]}
        angle={0.5}
        penumbra={0.9}
        intensity={0.45}
        color="#fafafa"
      />
    </>
  );
}

type ProductStageProps = {
  className?: string;
  /** Tighter = model fills more of the frame (drei Bounds padding). */
  fitMargin?: number;
  /** Initial camera position; Bounds keeps this *direction* when fitting distance. */
  cameraX?: number;
  cameraZ?: number;
  cameraY?: number;
  fov?: number;
  shiftX?: number;
  shiftY?: number;
  /** Extra shift on X from scroll (read each frame). */
  scrollShiftXExtra?: MotionValue<number>;
  baseRotation?: [number, number, number];
  motionDamping?: number;
  idleYawSpeed?: number;
  pointerInfluence?: number;
  scrollYawExtra?: MotionValue<number>;
  idleYawScale?: MotionValue<number>;
  clipCamera?: boolean;
  finish?: ProductFinishId;
  /** Override renderer DPR for performance tuning (e.g. mobile). */
  dpr?: number | [number, number];
  /** Override antialiasing (mobile perf). */
  antialias?: boolean;
  /** Hint to browser/GPU for power preference. */
  powerPreference?: WebGLPowerPreference;
};

export function ProductStage({
  className,
  finish = "obsidian",
  fitMargin = 0.68,
  cameraX = 0,
  cameraZ = 2.55,
  cameraY = 0.06,
  fov = 42,
  shiftX = 0,
  shiftY = 0,
  scrollShiftXExtra,
  baseRotation = [0, 0, 0],
  motionDamping = 1,
  idleYawSpeed,
  pointerInfluence = 1,
  scrollYawExtra,
  idleYawScale,
  clipCamera = true,
  dpr = [1, 2] as [number, number],
  antialias = true,
  powerPreference = "high-performance",
}: ProductStageProps) {
  return (
    <div
      className={`product-stage-root h-full w-full min-h-0 min-w-0 max-w-none overflow-visible bg-transparent ${className ?? ""}`}
    >
      <Canvas
        camera={{
          position: [cameraX, cameraY, cameraZ],
          fov,
          near: 0.01,
          far: 200,
        }}
        linear
        dpr={dpr}
        gl={{
          alpha: true,
          antialias,
          powerPreference,
          premultipliedAlpha: false,
        }}
        onCreated={({ gl, scene }) => {
          scene.background = null;
          gl.setClearColor(0x000000, 0);
        }}
        className="block !h-full !w-full min-h-0 touch-none [&>div]:min-h-0 [&>div]:w-full [&>div]:overflow-visible [&>div]:bg-transparent [&_canvas]:block [&_canvas]:!h-full [&_canvas]:!w-full [&_canvas]:bg-transparent [&_canvas]:[box-shadow:none]"
        style={{
          overflow: "visible",
          width: "100%",
          height: "100%",
          background: "transparent",
          boxShadow: "none",
          border: "none",
          outline: "none",
        }}
      >
        <SeamlessCanvasBackdrop />
        <Suspense fallback={null}>
          <StageLights />
          <HeadphoneModel
            finish={finish}
            fitMargin={fitMargin}
            shiftX={shiftX}
            shiftY={shiftY}
            scrollShiftXExtra={scrollShiftXExtra}
            baseRotation={baseRotation}
            motionDamping={motionDamping}
            idleYawSpeed={idleYawSpeed}
            pointerInfluence={pointerInfluence}
            scrollYawExtra={scrollYawExtra}
            idleYawScale={idleYawScale}
            clipCamera={clipCamera}
          />
          <Environment
            preset="studio"
            background={false}
            environmentIntensity={0.45}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
