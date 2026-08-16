(() => {
  'use strict';

  const THREE = window.THREE;
  const host = document.getElementById('pose-3d');
  const fallback = { available: false, show() {}, hide() {}, setPhase() {} };

  if (!THREE || !host) {
    window.Mobility3D = fallback;
    return;
  }

  const point = (x, y, z) => [x, y, z];
  const poses = {
    rock: {
      start: {
        pelvis: point(0, 1.18, -0.05), shoulder: point(0, 1.27, 0.83), head: point(0, 1.48, 1.20),
        shoulderL: point(0.30, 1.25, 0.84), shoulderR: point(-0.30, 1.25, 0.84),
        elbowL: point(0.34, 0.63, 1.12), elbowR: point(-0.34, 0.63, 1.12),
        wristL: point(0.38, 0.12, 1.32), wristR: point(-0.38, 0.12, 1.32),
        hipL: point(0.24, 1.13, -0.05), hipR: point(-0.24, 1.13, -0.05),
        kneeL: point(1.06, 0.14, -0.05), kneeR: point(-0.24, 0.12, -0.12),
        ankleL: point(1.70, 0.10, -0.05), ankleR: point(-0.24, 0.09, -0.67),
        toeL: point(1.94, 0.09, 0.06), toeR: point(-0.24, 0.08, -0.91)
      },
      end: {
        pelvis: point(0, 0.97, -0.59), shoulder: point(0, 1.10, 0.46), head: point(0, 1.30, 0.84),
        shoulderL: point(0.30, 1.08, 0.47), shoulderR: point(-0.30, 1.08, 0.47),
        elbowL: point(0.34, 0.53, 0.91), elbowR: point(-0.34, 0.53, 0.91),
        wristL: point(0.38, 0.12, 1.32), wristR: point(-0.38, 0.12, 1.32),
        hipL: point(0.24, 0.92, -0.59), hipR: point(-0.24, 0.92, -0.59),
        kneeL: point(1.06, 0.14, -0.05), kneeR: point(-0.24, 0.12, -0.12),
        ankleL: point(1.70, 0.10, -0.05), ankleR: point(-0.24, 0.09, -0.67),
        toeL: point(1.94, 0.09, 0.06), toeR: point(-0.24, 0.08, -0.91)
      }
    },
    hamstring: {
      start: {
        pelvis: point(0, 1.12, 0), shoulder: point(0, 2.00, 0), head: point(0, 2.48, 0),
        shoulderL: point(0, 1.98, 0.28), shoulderR: point(0, 1.98, -0.28),
        elbowL: point(0.38, 1.58, 0.29), elbowR: point(0.38, 1.58, -0.29),
        wristL: point(0.72, 1.23, 0.24), wristR: point(0.72, 1.23, -0.24),
        hipL: point(0, 1.09, 0.18), hipR: point(0, 1.09, -0.18),
        kneeL: point(0.74, 0.59, 0.16), kneeR: point(-0.61, 0.12, -0.14),
        ankleL: point(1.49, 0.12, 0.16), ankleR: point(-1.15, 0.10, -0.14),
        toeL: point(1.79, 0.29, 0.16), toeR: point(-1.43, 0.08, -0.14)
      },
      end: {
        pelvis: point(0, 1.12, 0), shoulder: point(0.67, 1.82, 0), head: point(1.02, 2.10, 0),
        shoulderL: point(0.67, 1.80, 0.28), shoulderR: point(0.67, 1.80, -0.28),
        elbowL: point(0.88, 1.30, 0.26), elbowR: point(0.88, 1.30, -0.26),
        wristL: point(1.17, 0.86, 0.21), wristR: point(1.17, 0.86, -0.21),
        hipL: point(0, 1.09, 0.18), hipR: point(0, 1.09, -0.18),
        kneeL: point(0.74, 0.59, 0.16), kneeR: point(-0.61, 0.12, -0.14),
        ankleL: point(1.49, 0.12, 0.16), ankleR: point(-1.15, 0.10, -0.14),
        toeL: point(1.79, 0.29, 0.16), toeR: point(-1.43, 0.08, -0.14)
      }
    }
  };

  const keys = Object.keys(poses.rock.start);
  const toVector = value => new THREE.Vector3(value[0], value[1], value[2]);
  const interpolatePose = (kind, amount) => {
    const result = {};
    keys.forEach(key => {
      const a = poses[kind].start[key], b = poses[kind].end[key];
      result[key] = new THREE.Vector3(
        THREE.MathUtils.lerp(a[0], b[0], amount),
        THREE.MathUtils.lerp(a[1], b[1], amount),
        THREE.MathUtils.lerp(a[2], b[2], amount)
      );
    });
    return result;
  };

  const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xe8e5df, roughness: 0.58, metalness: 0.04 });
  const torsoMaterial = new THREE.MeshStandardMaterial({ color: 0xc9a87c, roughness: 0.48, metalness: 0.08 });
  const jointMaterial = new THREE.MeshStandardMaterial({ color: 0x77736e, roughness: 0.48, metalness: 0.14 });
  const supportMaterial = new THREE.MeshStandardMaterial({ color: 0x5a5753, roughness: 0.86, metalness: 0 });

  const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 1, 18, 1, false);
  const torsoGeometry = new THREE.CylinderGeometry(0.78, 1, 1, 24, 1, false);
  const sphereGeometry = new THREE.SphereGeometry(1, 24, 16);
  const yAxis = new THREE.Vector3(0, 1, 0);

  const makeCylinder = (group, material = bodyMaterial, torso = false) => {
    const mesh = new THREE.Mesh(torso ? torsoGeometry : cylinderGeometry, material);
    group.add(mesh);
    return mesh;
  };

  const makeSphere = (group, material = jointMaterial) => {
    const mesh = new THREE.Mesh(sphereGeometry, material);
    group.add(mesh);
    return mesh;
  };

  const placeSegment = (mesh, a, b, radiusX, radiusZ = radiusX) => {
    const direction = new THREE.Vector3().subVectors(b, a);
    const length = Math.max(direction.length(), 0.001);
    mesh.position.copy(a).add(b).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(yAxis, direction.normalize());
    mesh.scale.set(radiusX, length, radiusZ);
  };

  const placeSphere = (mesh, position, x, y = x, z = x) => {
    mesh.position.copy(position);
    mesh.quaternion.identity();
    mesh.scale.set(x, y, z);
  };

  function createRig(scene) {
    const group = new THREE.Group();
    scene.add(group);
    const rig = {
      group,
      torso: makeCylinder(group, torsoMaterial, true),
      neck: makeCylinder(group, bodyMaterial),
      upperArmL: makeCylinder(group), upperArmR: makeCylinder(group),
      forearmL: makeCylinder(group), forearmR: makeCylinder(group),
      thighL: makeCylinder(group), thighR: makeCylinder(group),
      shinL: makeCylinder(group), shinR: makeCylinder(group),
      footL: makeCylinder(group), footR: makeCylinder(group),
      head: makeSphere(group, bodyMaterial), pelvis: makeSphere(group, torsoMaterial),
      handL: makeSphere(group, bodyMaterial), handR: makeSphere(group, bodyMaterial),
      joints: {}
    };
    ['shoulderL','shoulderR','elbowL','elbowR','wristL','wristR','hipL','hipR','kneeL','kneeR','ankleL','ankleR'].forEach(key => {
      rig.joints[key] = makeSphere(group);
    });
    return rig;
  }

  function updateRig(rig, p) {
    placeSegment(rig.torso, p.pelvis, p.shoulder, 0.34, 0.25);
    const neckBase = p.shoulder.clone().lerp(p.head, 0.55);
    const neckTop = p.shoulder.clone().lerp(p.head, 0.74);
    placeSegment(rig.neck, neckBase, neckTop, 0.11);
    placeSegment(rig.upperArmL, p.shoulderL, p.elbowL, 0.115);
    placeSegment(rig.upperArmR, p.shoulderR, p.elbowR, 0.115);
    placeSegment(rig.forearmL, p.elbowL, p.wristL, 0.095);
    placeSegment(rig.forearmR, p.elbowR, p.wristR, 0.095);
    placeSegment(rig.thighL, p.hipL, p.kneeL, 0.145);
    placeSegment(rig.thighR, p.hipR, p.kneeR, 0.145);
    placeSegment(rig.shinL, p.kneeL, p.ankleL, 0.115);
    placeSegment(rig.shinR, p.kneeR, p.ankleR, 0.115);
    placeSegment(rig.footL, p.ankleL, p.toeL, 0.10, 0.13);
    placeSegment(rig.footR, p.ankleR, p.toeR, 0.10, 0.13);
    placeSphere(rig.head, p.head, 0.24, 0.28, 0.23);
    placeSphere(rig.pelvis, p.pelvis, 0.36, 0.24, 0.29);
    placeSphere(rig.handL, p.wristL, 0.14, 0.08, 0.12);
    placeSphere(rig.handR, p.wristR, 0.14, 0.08, 0.12);
    Object.entries(rig.joints).forEach(([key, mesh]) => {
      const size = key.startsWith('hip') || key.startsWith('shoulder') ? 0.14 : 0.115;
      placeSphere(mesh, p[key], size);
    });
  }

  function createView(canvas) {
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-2, 2, 2, -2, 0.1, 30);
    scene.add(new THREE.HemisphereLight(0xfaf7f1, 0x292725, 1.55));
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.35);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0xc9a87c, 0.75);
    rimLight.position.set(-4, 3, -4);
    scene.add(rimLight);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(7, 7), new THREE.MeshStandardMaterial({ color: 0x242321, roughness: 0.95, metalness: 0 }));
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    scene.add(floor);
    const pad = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.07, 0.62), new THREE.MeshStandardMaterial({ color: 0x7f6750, roughness: 0.92 }));
    scene.add(pad);
    const arrow = new THREE.ArrowHelper(new THREE.Vector3(0, 0, -1), new THREE.Vector3(), 0.9, 0xc9a87c, 0.20, 0.12);
    scene.add(arrow);
    return { canvas, renderer, scene, camera, floor, pad, arrow, rig: createRig(scene), kind: '', amount: 0, viewSize: 2.3, target: new THREE.Vector3() };
  }

  function configureView(view, kind) {
    if (view.kind === kind) return;
    view.kind = kind;
    if (kind === 'rock') {
      view.camera.position.set(3.9, 2.75, 5.1);
      view.target.set(0, 0.88, 0.18);
      view.viewSize = 2.25;
      view.pad.visible = false;
      view.arrow.position.set(0, 1.62, 0.12);
      view.arrow.setDirection(new THREE.Vector3(0, -0.16, -1).normalize());
      view.arrow.setLength(0.92, 0.20, 0.12);
    } else {
      view.camera.position.set(0.15, 2.45, 6.1);
      view.target.set(0.20, 1.22, 0);
      view.viewSize = 1.95;
      view.pad.visible = true;
      view.pad.position.set(-0.61, 0.035, -0.14);
      view.arrow.position.set(0.02, 2.34, 0.26);
      view.arrow.setDirection(new THREE.Vector3(0.84, -0.54, 0).normalize());
      view.arrow.setLength(0.85, 0.18, 0.11);
    }
    view.camera.lookAt(view.target);
  }

  function resizeView(view) {
    const rect = view.canvas.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width));
    const height = Math.max(1, Math.round(rect.height));
    const targetWidth = Math.round(width * Math.min(window.devicePixelRatio || 1, 2));
    const targetHeight = Math.round(height * Math.min(window.devicePixelRatio || 1, 2));
    if (view.canvas.width !== targetWidth || view.canvas.height !== targetHeight) view.renderer.setSize(width, height, false);
    const aspect = width / height;
    view.camera.left = -view.viewSize * aspect;
    view.camera.right = view.viewSize * aspect;
    view.camera.top = view.viewSize;
    view.camera.bottom = -view.viewSize;
    view.camera.updateProjectionMatrix();
  }

  function renderView(view, kind, amount) {
    configureView(view, kind);
    view.amount = amount;
    updateRig(view.rig, interpolatePose(kind, amount));
    resizeView(view);
    view.renderer.render(view.scene, view.camera);
  }

  try {
    const main = createView(document.getElementById('m3d-main'));
    const start = createView(document.getElementById('m3d-start'));
    const end = createView(document.getElementById('m3d-end'));
    const cue = document.getElementById('m3d-motion-cue');
    let activeKind = 'rock';
    let activeAmount = 0;

    const renderAll = () => {
      if (host.hidden) return;
      renderView(main, activeKind, activeAmount);
      renderView(start, activeKind, 0);
      renderView(end, activeKind, 1);
    };

    window.Mobility3D = {
      available: true,
      show(kind) {
        if (!poses[kind]) return false;
        activeKind = kind;
        activeAmount = 0;
        host.hidden = false;
        cue.textContent = kind === 'rock' ? 'Hips travel backward' : 'Torso hinges from the hip';
        main.canvas.setAttribute('aria-label', kind === 'rock' ? 'Animated 3D adductor rock-back demonstration' : 'Animated 3D half-kneeling hamstring hinge demonstration');
        start.canvas.setAttribute('aria-label', `${kind === 'rock' ? 'Adductor rock-back' : 'Half-kneeling hamstring hinge'} start position`);
        end.canvas.setAttribute('aria-label', `${kind === 'rock' ? 'Adductor rock-back' : 'Half-kneeling hamstring hinge'} end position`);
        requestAnimationFrame(renderAll);
        return true;
      },
      hide() {
        host.hidden = true;
      },
      setPhase(kind, amount) {
        if (!poses[kind]) return;
        activeKind = kind;
        activeAmount = amount;
        if (!host.hidden) renderView(main, activeKind, activeAmount);
      }
    };

    if ('ResizeObserver' in window) new ResizeObserver(() => requestAnimationFrame(renderAll)).observe(host);
    window.addEventListener('resize', () => requestAnimationFrame(renderAll), { passive: true });
  } catch (error) {
    console.warn('3D mobility pilot could not initialize; using the SVG fallback.', error);
    window.Mobility3D = fallback;
  }
})();
