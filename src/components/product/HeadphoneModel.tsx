"use client";

import { useFrame } from "@react-three/fiber";
import { Bounds, Center, useBounds, useGLTF } from "@react-three/drei";
import type { MotionValue } from "framer-motion";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { Group } from "three";
import type { ProductFinishId } from "./productFinish";

useGLTF.preload("/models/wireless_headphone.glb");

/** Cylinder.007 / .008 Material.004 → gold (after global white pass). glTF dots stripped by loader. */
const GOLD_ACCENT_MESH_ID_GROUPS = [
  ["Cylinder007_Material004_0", "Cylinder.007_Material.004_0"],
  ["Cylinder008_Material004_0", "Cylinder.008_Material.004_0"],
] as const;

const GOLD_COLOR = new THREE.Color("#c9a227");

function findMeshByAnyName(
  root: THREE.Object3D,
  names: readonly string[],
): THREE.Mesh | null {
  for (const id of names) {
    const o = root.getObjectByName(id);
    if (o instanceof THREE.Mesh && o.material) return o;
  }
  return null;
}

function cloneMaterialsWhite(m: THREE.Material) {
  const c = m.clone();
  if (c instanceof THREE.MeshStandardMaterial) {
    c.color.set("#ffffff");
    c.metalness = 0.04;
    c.roughness = 0.82;
  }
  return c;
}

/** Every mesh → white (clone materials so shared glTF slots stay independent). */
function applyWhiteAllMeshes(root: THREE.Object3D) {
  root.traverse((child) => {
    if (!(child instanceof THREE.Mesh) || !child.material) return;
    if (Array.isArray(child.material)) {
      child.material = child.material.map(cloneMaterialsWhite);
    } else {
      child.material = cloneMaterialsWhite(child.material);
    }
  });
}

function applyGoldAccents(root: THREE.Object3D) {
  const goldify = (m: THREE.Material) => {
    const c = m.clone();
    if (c instanceof THREE.MeshStandardMaterial) {
      c.color.copy(GOLD_COLOR);
      c.metalness = 0.9;
      c.roughness = 0.34;
    }
    return c;
  };
  for (const ids of GOLD_ACCENT_MESH_ID_GROUPS) {
    const obj = findMeshByAnyName(root, ids);
    if (!obj) continue;
    if (Array.isArray(obj.material)) {
      obj.material = obj.material.map(goldify);
    } else {
      obj.material = goldify(obj.material);
    }
  }
}

function ModelInner({
  finish,
  baseRotation = [0, 0, 0],
  motionDamping = 1,
  idleYawSpeed,
  pointerInfluence = 1,
  scrollYawExtra,
  idleYawScale,
}: {
  finish: ProductFinishId;
  baseRotation?: [number, number, number];
  /** < 1 reduces idle + pointer rotation so the mesh stays inside Bounds after fitting. */
  motionDamping?: number;
  /** Rad/s turntable on Y; when set, replaces the default `t * 0.04` idle term. */
  idleYawSpeed?: number;
  /** 0 = no pointer tilt; 1 = full legacy pointer response. */
  pointerInfluence?: number;
  /** Extra radians on Y from scroll (read each frame). */
  scrollYawExtra?: MotionValue<number>;
  /** Multiplier for idle Y spin (0 = still). */
  idleYawScale?: MotionValue<number>;
}) {
  const { scene } = useGLTF("/models/wireless_headphone.glb");
  const model = useMemo(() => {
    const root = scene.clone(true);
    if (finish === "ivory_gilt") {
      applyWhiteAllMeshes(root);
      applyGoldAccents(root);
    }
    return root;
  }, [scene, finish]);
  const group = useRef<Group>(null);
  const [bx, by, bz] = baseRotation;
  const m = THREE.MathUtils.clamp(motionDamping, 0, 1);
  const pInf = THREE.MathUtils.clamp(pointerInfluence, 0, 1);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const scrollY = scrollYawExtra?.get() ?? 0;
    const idleK = idleYawScale?.get() ?? 1;
    group.current.rotation.y =
      idleYawSpeed !== undefined
        ? by +
          scrollY +
          t * idleYawSpeed * idleK +
          state.pointer.x * 0.055 * m * pInf
        : by +
          scrollY +
          (t * 0.04 * idleK + state.pointer.x * 0.055 * pInf) * m;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      bx - state.pointer.y * 0.022 * m * pInf,
      0.06,
    );
    group.current.rotation.z = bz;
  });

  return (
    <group ref={group}>
      <primitive object={model} key={finish} />
    </group>
  );
}

function RefitBoundsOnYaw({
  scrollYawExtra,
  endYaw = Math.PI * 1.35,
  epsilon = 0.06,
}: {
  scrollYawExtra?: MotionValue<number>;
  /** Target yaw (rad) where product "lands". */
  endYaw?: number;
  /** How close (rad) counts as "arrived". */
  epsilon?: number;
}) {
  const bounds = useBounds();
  const fittedEnd = useRef(false);
  const fittedStart = useRef(false);
  const lastYaw = useRef<number | null>(null);
  const lastFitAt = useRef(0);

  useFrame(() => {
    const yaw = scrollYawExtra?.get();
    if (yaw === undefined) return;

    // Between start and end poses, keep the framing centered while the silhouette changes.
    // Do it sparingly (throttled) to avoid jitter.
    const inTransit = yaw > epsilon && yaw < endYaw - epsilon;
    if (inTransit) {
      const prev = lastYaw.current;
      lastYaw.current = yaw;
      const dy = prev === null ? Infinity : Math.abs(yaw - prev);
      const now = performance.now();
      if (dy >= 0.012 && now - lastFitAt.current >= 80) {
        bounds.refresh().fit();
        lastFitAt.current = now;
      }
      return;
    }

    // Fit once near the end pose (overview), and once near the start pose (hero).
    if (!fittedEnd.current && yaw >= endYaw - epsilon) {
      bounds.refresh().fit();
      fittedEnd.current = true;
      fittedStart.current = false;
      lastYaw.current = yaw;
      return;
    }
    if (!fittedStart.current && yaw <= epsilon) {
      bounds.refresh().fit();
      fittedStart.current = true;
      fittedEnd.current = false;
      lastYaw.current = yaw;
    }
  });

  return null;
}

export function HeadphoneModel({
  finish = "obsidian",
  fitMargin = 0.68,
  /** Nudge mesh in scene units for art direction (e.g. balance against page copy). */
  shiftX = 0,
  /** Nudge mesh vertically (negative = lower in frame). Helps top-heavy GLB pivots. */
  shiftY = 0,
  /** Extra shift on X from scroll (read each frame). */
  scrollShiftXExtra,
  /** Static rotation (rad) applied before subtle motion — campaign-style silhouette. */
  baseRotation = [0, 0, 0],
  motionDamping = 1,
  idleYawSpeed,
  pointerInfluence = 1,
  scrollYawExtra,
  idleYawScale,
  /** When false, avoids tightening near/far to fit distance (can clip during rotation). */
  clipCamera = true,
}: {
  finish?: ProductFinishId;
  fitMargin?: number;
  shiftX?: number;
  shiftY?: number;
  scrollShiftXExtra?: MotionValue<number>;
  baseRotation?: [number, number, number];
  motionDamping?: number;
  idleYawSpeed?: number;
  pointerInfluence?: number;
  scrollYawExtra?: MotionValue<number>;
  idleYawScale?: MotionValue<number>;
  clipCamera?: boolean;
}) {
  const shiftGroup = useRef<Group>(null);

  useFrame(() => {
    const g = shiftGroup.current;
    if (!g) return;
    const extraX = scrollShiftXExtra?.get() ?? 0;
    g.position.x = shiftX + extraX;
    g.position.y = shiftY;
    g.position.z = 0;
  });

  return (
    <Bounds fit clip={clipCamera} margin={fitMargin}>
      <RefitBoundsOnYaw scrollYawExtra={scrollYawExtra} />
      <Center>
        <group ref={shiftGroup} position={[shiftX, shiftY, 0]}>
          <ModelInner
            finish={finish}
            baseRotation={baseRotation}
            motionDamping={motionDamping}
            idleYawSpeed={idleYawSpeed}
            pointerInfluence={pointerInfluence}
            scrollYawExtra={scrollYawExtra}
            idleYawScale={idleYawScale}
          />
        </group>
      </Center>
    </Bounds>
  );
}
