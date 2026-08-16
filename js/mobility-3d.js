(() => {
  'use strict';

  const THREE = window.THREE;
  const host = document.getElementById('pose-3d');
  const fallback = { available: false, supports() { return false; }, show() {}, hide() {}, setPhase() {} };

  if (!THREE || !host) {
    window.Mobility3D = fallback;
    return;
  }

  const point = (x, y, z) => [x, y, z];
  const supportedKinds = [
    'rock', 'hamstring', 'tilt', 'hinge', 'lifts', 'bridge',
    'ankle_glide', 'calf_stretch', 'squat_hold', 'heel_squat',
    'cossack_move', 'calf_tib', 'supine_rotation', 'external_iso',
    'internal_iso', 'side_abduction', 'band_bridge',
    'supported_cossack', 'butterfly_lower'
  ];

  const titles = {
    rock: 'Adductor rock-back',
    hamstring: 'Half-kneeling hamstring hinge',
    tilt: 'Wide-straddle pelvic tilts',
    hinge: 'Supported pancake hinge',
    lifts: 'Straddle leg lifts',
    bridge: 'Glute bridge and side-plank preparation',
    ankle_glide: 'Knee-to-wall ankle glide',
    calf_stretch: 'Calf and soleus stretch',
    squat_hold: 'Supported squat hold',
    heel_squat: 'Slow heel-elevated squat',
    cossack_move: 'Assisted Cossack squat',
    calf_tib: 'Tibialis and calf raises',
    supine_rotation: 'Gentle supine hip rotations',
    external_iso: 'External-rotation isometric',
    internal_iso: 'Internal-rotation isometric',
    side_abduction: 'Side-lying abduction',
    band_bridge: 'Band bridge',
    supported_cossack: 'Supported Cossack',
    butterfly_lower: 'Unweighted butterfly'
  };

  const cues = {
    rock: 'Hips travel backward',
    hamstring: 'Torso hinges from the hip',
    tilt: 'Pelvis rocks—not the whole body',
    hinge: 'Chest travels forward from the hips',
    lifts: 'Alternate one straight leg at a time',
    bridge: 'Hips lift while ribs stay quiet',
    ankle_glide: 'Knee glides forward; heel stays down',
    calf_stretch: 'Back knee softens; heel stays planted',
    squat_hold: 'Hips lower between the feet',
    heel_squat: 'Controlled descent over the heel wedge',
    cossack_move: 'Pelvis shifts toward the bending knee',
    calf_tib: 'Toe raise, then calf raise',
    supine_rotation: 'Bent knees move together side to side',
    external_iso: 'Outward tension only—no joint movement',
    internal_iso: 'Gentle foot pressure—no joint movement',
    side_abduction: 'Top leg lifts slightly behind the body',
    band_bridge: 'Hips lift with light outward band tension',
    supported_cossack: 'Use a deliberately shallow side shift',
    butterfly_lower: 'Knees lower gently under their own weight'
  };

  const manualPoses = {
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

  const diagramPoint = (x, y) => ({ x, y });
  const mixPoint = (a, b, t) => diagramPoint(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);

  function straddleState(kind, t, raw) {
    const leftLift = kind === 'lifts' ? Math.max(0, Math.sin(raw * Math.PI * 2)) : 0;
    const rightLift = kind === 'lifts' ? Math.max(0, -Math.sin(raw * Math.PI * 2)) : 0;
    const base = { hip: diagramPoint(200, 188), lk: diagramPoint(142, 232), lf: diagramPoint(67, 270 - leftLift * 30), rk: diagramPoint(258, 232), rf: diagramPoint(333, 270 - rightLift * 30) };
    if (kind === 'tilt') return { ...base, shoulder: mixPoint(diagramPoint(184, 126), diagramPoint(216, 116), t), head: mixPoint(diagramPoint(171, 91), diagramPoint(225, 80), t), le: mixPoint(diagramPoint(170, 164), diagramPoint(160, 174), t), re: mixPoint(diagramPoint(205, 162), diagramPoint(239, 174), t), lh: diagramPoint(151, 224), rh: diagramPoint(249, 224) };
    if (kind === 'hinge') return { ...base, shoulder: mixPoint(diagramPoint(200, 108), diagramPoint(258, 157), t), head: mixPoint(diagramPoint(200, 73), diagramPoint(288, 144), t), le: mixPoint(diagramPoint(185, 151), diagramPoint(246, 184), t), re: mixPoint(diagramPoint(216, 151), diagramPoint(270, 185), t), lh: diagramPoint(244, 229), rh: diagramPoint(295, 229) };
    return { ...base, shoulder: diagramPoint(185, 119), head: diagramPoint(174, 84), le: diagramPoint(160, 171), re: diagramPoint(210, 171), lh: diagramPoint(151, 244), rh: diagramPoint(235, 244) };
  }

  function customState(kind, t, raw) {
    const P = diagramPoint;
    const q = (a, b) => mixPoint(a, b, t);
    if (kind === 'ankle_glide') return { head:P(160,70), shoulder:P(174,102), hip:P(198,166), le:P(245,125), lh:P(324,132), re:P(247,143), rh:P(324,151), lk:q(P(246,222),P(292,220)), lf:P(292,270), rk:P(135,225), rf:P(91,270) };
    if (kind === 'calf_stretch') return { head:P(202,67), shoulder:P(212,102), hip:P(214,165), le:P(260,118), lh:P(325,132), re:P(265,139), rh:P(325,151), lk:q(P(145,220),P(164,235)), lf:P(91,270), rk:P(267,220), rf:P(302,270) };
    if (kind === 'squat_hold' || kind === 'heel_squat') { const depth = kind === 'squat_hold' ? .88 : 1; const y = t * 48 * depth; return { head:P(200,68+y), shoulder:P(200,103+y), hip:P(200,168+y), le:kind==='squat_hold'?P(151,139+y*.45):P(156,139+y), lh:kind==='squat_hold'?P(92,151):P(125,157+y), re:kind==='squat_hold'?P(249,139+y*.45):P(244,139+y), rh:kind==='squat_hold'?P(92,172):P(275,157+y), lk:q(P(155,222),P(127,231)), lf:P(94,270), rk:q(P(245,222),P(273,231)), rf:P(306,270) }; }
    if (kind === 'cossack_move' || kind === 'supported_cossack') { const range = kind === 'supported_cossack' ? .64 : 1; const u = t * range; const m = (a,b) => mixPoint(a,b,u); return { head:m(P(205,69),P(146,107)), shoulder:m(P(205,104),P(153,137)), hip:m(P(205,171),P(137,207)), le:m(P(174,141),P(113,161)), lh:P(73,157), re:m(P(235,140),P(181,167)), rh:P(79,180), lk:m(P(134,224),P(105,232)), lf:P(54,270), rk:m(P(278,226),P(272,247)), rf:P(346,270) }; }
    if (kind === 'calf_tib') { const toeRise = raw < .5 ? Math.sin(raw*Math.PI*2) : 0; const heelRise = raw >= .5 ? Math.sin((raw-.5)*Math.PI*2) : 0; const lift = heelRise*15; return { head:P(194,61-lift), shoulder:P(195,96-lift), hip:P(196,163-lift), le:P(170,132-lift), lh:P(145,171-lift), re:P(224,132-lift), rh:P(255,169-lift), lk:P(181,220-lift), lf:P(181,268-lift), rk:P(214,220-lift), rf:P(222,268-lift), toeRise, heelRise }; }
    if (kind === 'supine_rotation') { const side = Math.sin((raw-.25)*Math.PI*2)*48; return { head:P(200,67), shoulder:P(200,105), hip:P(200,174), le:P(145,125), lh:P(93,132), re:P(255,125), rh:P(307,132), lk:P(175+side,220), lf:P(165+side,265), rk:P(198+side,220), rf:P(190+side,265) }; }
    if (kind === 'external_iso') return { head:P(200,68), shoulder:P(200,104), hip:P(200,171), le:P(164,141), lh:P(146,203), re:P(236,141), rh:P(254,203), lk:P(137,218), lf:P(174,270), rk:P(263,218), rf:P(226,270) };
    if (kind === 'internal_iso') return { head:P(200,68), shoulder:P(200,104), hip:P(200,171), le:P(168,142), lh:P(151,200), re:P(232,142), rh:P(249,200), lk:P(132,215), lf:P(174,269), rk:P(268,215), rf:P(226,269) };
    if (kind === 'side_abduction') return { head:P(80,206), shoulder:P(112,211), hip:P(196,220), le:P(132,242), lh:P(104,267), re:P(142,228), rh:P(122,264), lk:P(267,232), lf:P(343,250), rk:q(P(263,217),P(262,182)), rf:q(P(342,215),P(338,143)) };
    if (kind === 'bridge' || kind === 'band_bridge') return { head:P(75,224), shoulder:P(111,225), hip:q(P(190,232),P(197,174)), le:P(122,249), lh:P(92,269), re:P(148,246), rh:P(130,270), lk:P(267,217), lf:P(310,270), rk:P(247,224), rf:P(280,270) };
    return { head:P(200,68), shoulder:P(200,104), hip:P(200,178), le:P(167,142), lh:P(145,224), re:P(233,142), rh:P(255,224), lk:q(P(151,214),P(135,244)), lf:P(194,270), rk:q(P(249,214),P(265,244)), rf:P(206,270) };
  }

  const keys = Object.keys(manualPoses.rock.start);
  const convert = (p, z = 0) => new THREE.Vector3((p.x - 200) / 82, (276 - p.y) / 82, z);

  function diagramPose(state, kind) {
    const footDirection = (foot, side) => {
      const sign = Math.abs(foot.x - 200) > 8 ? Math.sign(foot.x - 200) : side;
      return diagramPoint(foot.x + sign * 22, foot.y - 1);
    };
    const toeL = convert(footDirection(state.lf, -1), .12);
    const toeR = convert(footDirection(state.rf, 1), -.12);
    if (kind === 'calf_tib') {
      const toeHeight = .08 + (state.toeRise || 0) * .24;
      toeL.y = state.heelRise ? .08 : toeHeight;
      toeR.y = state.heelRise ? .08 : toeHeight;
    }
    return {
      pelvis: convert(state.hip), shoulder: convert(state.shoulder), head: convert(state.head),
      shoulderL: convert(diagramPoint(state.shoulder.x - 8, state.shoulder.y + 2), .22),
      shoulderR: convert(diagramPoint(state.shoulder.x + 8, state.shoulder.y + 2), -.22),
      elbowL: convert(state.le, .23), elbowR: convert(state.re, -.23),
      wristL: convert(state.lh, .20), wristR: convert(state.rh, -.20),
      hipL: convert(diagramPoint(state.hip.x - 5, state.hip.y), .17),
      hipR: convert(diagramPoint(state.hip.x + 5, state.hip.y), -.17),
      kneeL: convert(state.lk, .14), kneeR: convert(state.rk, -.14),
      ankleL: convert(state.lf, .12), ankleR: convert(state.rf, -.12),
      toeL, toeR
    };
  }

  function supineRotationPose(raw) {
    const side = Math.sin((raw - .25) * Math.PI * 2) * .58;
    return {
      pelvis:new THREE.Vector3(0,.24,0), shoulder:new THREE.Vector3(-1.02,.25,0), head:new THREE.Vector3(-1.48,.28,0),
      shoulderL:new THREE.Vector3(-1.02,.25,.25), shoulderR:new THREE.Vector3(-1.02,.25,-.25),
      elbowL:new THREE.Vector3(-.92,.20,.78), elbowR:new THREE.Vector3(-.92,.20,-.78),
      wristL:new THREE.Vector3(-.82,.16,1.28), wristR:new THREE.Vector3(-.82,.16,-1.28),
      hipL:new THREE.Vector3(0,.24,.18), hipR:new THREE.Vector3(0,.24,-.18),
      kneeL:new THREE.Vector3(.54,.58,.20+side), kneeR:new THREE.Vector3(.54,.58,-.20+side),
      ankleL:new THREE.Vector3(.94,.16,.18+side*.92), ankleR:new THREE.Vector3(.94,.16,-.18+side*.92),
      toeL:new THREE.Vector3(1.17,.12,.18+side*.92), toeR:new THREE.Vector3(1.17,.12,-.18+side*.92)
    };
  }

  function interpolateManual(kind, amount) {
    const result = {};
    keys.forEach(key => {
      const a = manualPoses[kind].start[key];
      const b = manualPoses[kind].end[key];
      result[key] = new THREE.Vector3(
        THREE.MathUtils.lerp(a[0], b[0], amount),
        THREE.MathUtils.lerp(a[1], b[1], amount),
        THREE.MathUtils.lerp(a[2], b[2], amount)
      );
    });
    return result;
  }

  function poseAt(kind, amount, raw = amount) {
    if (manualPoses[kind]) return interpolateManual(kind, amount);
    if (kind === 'supine_rotation') return supineRotationPose(raw);
    const state = ['tilt','hinge','lifts'].includes(kind) ? straddleState(kind, amount, raw) : customState(kind, amount, raw);
    return diagramPose(state, kind);
  }

  const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xe8e5df, roughness: 0.58, metalness: 0.04 });
  const torsoMaterial = new THREE.MeshStandardMaterial({ color: 0xc9a87c, roughness: 0.48, metalness: 0.08 });
  const jointMaterial = new THREE.MeshStandardMaterial({ color: 0x77736e, roughness: 0.48, metalness: 0.14 });
  const supportMaterial = new THREE.MeshStandardMaterial({ color: 0x5a5753, roughness: 0.86, metalness: 0 });
  const accentMaterial = new THREE.MeshStandardMaterial({ color: 0x9b7653, roughness: 0.72, metalness: 0.02 });

  const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 1, 18, 1, false);
  const torsoGeometry = new THREE.CylinderGeometry(0.78, 1, 1, 24, 1, false);
  const sphereGeometry = new THREE.SphereGeometry(1, 24, 16);
  const yAxis = new THREE.Vector3(0, 1, 0);

  const makeCylinder = (group, material = bodyMaterial, torso = false) => { const mesh = new THREE.Mesh(torso ? torsoGeometry : cylinderGeometry, material); group.add(mesh); return mesh; };
  const makeSphere = (group, material = jointMaterial) => { const mesh = new THREE.Mesh(sphereGeometry, material); group.add(mesh); return mesh; };

  function placeSegment(mesh, a, b, radiusX, radiusZ = radiusX) {
    const direction = new THREE.Vector3().subVectors(b, a);
    const length = Math.max(direction.length(), 0.001);
    mesh.position.copy(a).add(b).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(yAxis, direction.normalize());
    mesh.scale.set(radiusX, length, radiusZ);
  }

  function placeSphere(mesh, position, x, y = x, z = x) {
    mesh.position.copy(position);
    mesh.quaternion.identity();
    mesh.scale.set(x, y, z);
  }

  function createRig(scene) {
    const group = new THREE.Group();
    scene.add(group);
    const rig = {
      group, torso: makeCylinder(group, torsoMaterial, true), neck: makeCylinder(group),
      upperArmL: makeCylinder(group), upperArmR: makeCylinder(group), forearmL: makeCylinder(group), forearmR: makeCylinder(group),
      thighL: makeCylinder(group), thighR: makeCylinder(group), shinL: makeCylinder(group), shinR: makeCylinder(group),
      footL: makeCylinder(group), footR: makeCylinder(group), head: makeSphere(group, bodyMaterial), pelvis: makeSphere(group, torsoMaterial),
      handL: makeSphere(group, bodyMaterial), handR: makeSphere(group, bodyMaterial), joints: {}
    };
    ['shoulderL','shoulderR','elbowL','elbowR','wristL','wristR','hipL','hipR','kneeL','kneeR','ankleL','ankleR'].forEach(key => { rig.joints[key] = makeSphere(group); });
    return rig;
  }

  function updateRig(rig, p) {
    placeSegment(rig.torso, p.pelvis, p.shoulder, 0.34, 0.25);
    const neckBase = p.shoulder.clone().lerp(p.head, 0.55);
    const neckTop = p.shoulder.clone().lerp(p.head, 0.74);
    placeSegment(rig.neck, neckBase, neckTop, 0.11);
    placeSegment(rig.upperArmL, p.shoulderL, p.elbowL, 0.115); placeSegment(rig.upperArmR, p.shoulderR, p.elbowR, 0.115);
    placeSegment(rig.forearmL, p.elbowL, p.wristL, 0.095); placeSegment(rig.forearmR, p.elbowR, p.wristR, 0.095);
    placeSegment(rig.thighL, p.hipL, p.kneeL, 0.145); placeSegment(rig.thighR, p.hipR, p.kneeR, 0.145);
    placeSegment(rig.shinL, p.kneeL, p.ankleL, 0.115); placeSegment(rig.shinR, p.kneeR, p.ankleR, 0.115);
    placeSegment(rig.footL, p.ankleL, p.toeL, 0.10, 0.13); placeSegment(rig.footR, p.ankleR, p.toeR, 0.10, 0.13);
    placeSphere(rig.head, p.head, 0.24, 0.28, 0.23); placeSphere(rig.pelvis, p.pelvis, 0.36, 0.24, 0.29);
    placeSphere(rig.handL, p.wristL, 0.14, 0.08, 0.12); placeSphere(rig.handR, p.wristR, 0.14, 0.08, 0.12);
    Object.entries(rig.joints).forEach(([key, mesh]) => { const size = key.startsWith('hip') || key.startsWith('shoulder') ? 0.14 : 0.115; placeSphere(mesh, p[key], size); });
  }

  function supportMesh(scene, geometry, material = supportMaterial) { const mesh = new THREE.Mesh(geometry, material); scene.add(mesh); mesh.visible = false; return mesh; }

  function createView(canvas) {
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-2, 2, 2, -2, 0.1, 30);
    scene.add(new THREE.HemisphereLight(0xfaf7f1, 0x292725, 1.55));
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.35); keyLight.position.set(4, 6, 5); scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0xc9a87c, 0.75); rimLight.position.set(-4, 3, -4); scene.add(rimLight);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(7, 7), new THREE.MeshStandardMaterial({ color: 0x242321, roughness: 0.95, metalness: 0 })); floor.rotation.x = -Math.PI / 2; scene.add(floor);
    const pad = supportMesh(scene, new THREE.BoxGeometry(0.76, 0.07, 0.62), accentMaterial);
    const wall = supportMesh(scene, new THREE.BoxGeometry(0.08, 2.7, 1.2));
    const post = supportMesh(scene, new THREE.BoxGeometry(0.10, 2.5, 0.10), accentMaterial);
    const seat = supportMesh(scene, new THREE.BoxGeometry(0.90, 0.22, 0.68), accentMaterial);
    const blockL = supportMesh(scene, new THREE.BoxGeometry(0.42, 0.34, 0.42), accentMaterial);
    const blockR = supportMesh(scene, new THREE.BoxGeometry(0.42, 0.34, 0.42), accentMaterial);
    const wedgeL = supportMesh(scene, new THREE.BoxGeometry(0.62, 0.12, 0.48), accentMaterial);
    const wedgeR = supportMesh(scene, new THREE.BoxGeometry(0.62, 0.12, 0.48), accentMaterial);
    const band = supportMesh(scene, new THREE.TorusGeometry(0.58, 0.035, 8, 40), accentMaterial);
    const arrow = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(), 0.9, 0xc9a87c, 0.20, 0.12); scene.add(arrow);
    return { canvas, renderer, scene, camera, floor, pad, wall, post, seat, blockL, blockR, wedgeL, wedgeR, band, arrow, rig: createRig(scene), kind: '', viewSize: 2.1, target: new THREE.Vector3() };
  }

  function hideSupports(view) { ['pad','wall','post','seat','blockL','blockR','wedgeL','wedgeR','band'].forEach(key => { view[key].visible = false; }); }

  function configureView(view, kind) {
    if (view.kind === kind) return;
    view.kind = kind;
    hideSupports(view);
    view.arrow.visible = true;
    view.camera.position.set(0.2, 2.35, 6.2);
    view.target.set(0, 1.18, 0);
    view.viewSize = 1.95;
    view.arrow.position.set(0, 1.55, 0.35);
    view.arrow.setDirection(new THREE.Vector3(0.8, -0.55, 0).normalize());
    view.arrow.setLength(0.78, 0.18, 0.10);

    if (kind === 'rock') {
      view.camera.position.set(3.9, 2.75, 5.1); view.target.set(0, 0.88, 0.18); view.viewSize = 2.25;
      view.arrow.position.set(0, 1.62, 0.12); view.arrow.setDirection(new THREE.Vector3(0, -0.16, -1).normalize()); view.arrow.setLength(0.92, 0.20, 0.12);
    } else if (kind === 'hamstring') {
      view.pad.visible = true; view.pad.position.set(-0.61, 0.035, -0.14); view.target.set(0.20, 1.22, 0); view.viewSize = 1.95;
    } else if (['tilt','hinge','lifts','external_iso','internal_iso','butterfly_lower'].includes(kind)) {
      view.seat.visible = true; view.seat.position.set(0, .70, 0); view.target.set(0, 1.28, 0); view.viewSize = 1.85;
      if (kind === 'hinge') { view.blockL.visible = view.blockR.visible = true; view.blockL.position.set(.62,.17,.28); view.blockR.position.set(1.05,.17,-.28); }
      if (kind === 'external_iso') { view.band.visible = true; view.band.position.set(0,.70,.05); view.arrow.position.set(0,.75,.35); view.arrow.setDirection(new THREE.Vector3(1,0,0)); }
      if (kind === 'internal_iso') { view.blockL.visible = view.blockR.visible = true; view.blockL.position.set(-.42,.17,.18); view.blockR.position.set(.42,.17,-.18); view.arrow.position.set(0,.20,.35); view.arrow.setDirection(new THREE.Vector3(1,0,0)); }
      if (kind === 'butterfly_lower') { view.arrow.position.set(.88,.84,.3); view.arrow.setDirection(new THREE.Vector3(0,-1,0)); }
    } else if (['ankle_glide','calf_stretch'].includes(kind)) {
      view.wall.visible = true; view.wall.position.set(1.72,1.35,0); view.target.set(0,1.22,0); view.viewSize = 1.85;
      view.arrow.position.set(.65,.72,.3); view.arrow.setDirection(new THREE.Vector3(1,0,0));
    } else if (['squat_hold','cossack_move','supported_cossack','calf_tib'].includes(kind)) {
      view.post.visible = true; view.post.position.set(-1.55,1.20,0); view.target.set(0,1.2,0); view.viewSize = 1.9;
      if (kind.includes('cossack')) { view.arrow.position.set(0,1.0,.3); view.arrow.setDirection(new THREE.Vector3(-1,0,0)); }
      if (kind === 'squat_hold') { view.arrow.position.set(.35,1.35,.3); view.arrow.setDirection(new THREE.Vector3(0,-1,0)); }
      if (kind === 'calf_tib') { view.arrow.position.set(.45,.45,.3); view.arrow.setDirection(new THREE.Vector3(0,1,0)); }
    } else if (kind === 'heel_squat') {
      view.wedgeL.visible = view.wedgeR.visible = true; view.wedgeL.position.set(-1.18,.08,.14); view.wedgeR.position.set(1.18,.08,-.14); view.arrow.position.set(.35,1.35,.3); view.arrow.setDirection(new THREE.Vector3(0,-1,0));
    } else if (kind === 'side_abduction') {
      view.target.set(0,.70,0); view.viewSize = 1.65; view.arrow.position.set(1.05,.85,.3); view.arrow.setDirection(new THREE.Vector3(0,1,0));
    } else if (kind === 'bridge' || kind === 'band_bridge') {
      view.target.set(0,.67,0); view.viewSize = 1.55; view.arrow.position.set(0,.58,.3); view.arrow.setDirection(new THREE.Vector3(0,1,0));
      if (kind === 'band_bridge') { view.band.visible = true; view.band.position.set(.72,.66,.02); view.band.scale.set(.62,.58,.62); }
    } else if (kind === 'supine_rotation') {
      view.camera.position.set(2.8,4.7,4.2); view.target.set(-.05,.22,0); view.viewSize = 1.68; view.arrow.position.set(.48,.82,0); view.arrow.setDirection(new THREE.Vector3(0,0,1));
    }
    view.camera.lookAt(view.target);
  }

  function resizeView(view) {
    const rect = view.canvas.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width)); const height = Math.max(1, Math.round(rect.height));
    const ratio = Math.min(window.devicePixelRatio || 1, 2); const targetWidth = Math.round(width * ratio); const targetHeight = Math.round(height * ratio);
    if (view.canvas.width !== targetWidth || view.canvas.height !== targetHeight) view.renderer.setSize(width, height, false);
    const aspect = width / height;
    view.camera.left = -view.viewSize * aspect; view.camera.right = view.viewSize * aspect; view.camera.top = view.viewSize; view.camera.bottom = -view.viewSize; view.camera.updateProjectionMatrix();
  }

  function renderView(view, kind, amount, raw) {
    configureView(view, kind);
    updateRig(view.rig, poseAt(kind, amount, raw));
    if (kind.endsWith('_iso')) {
      const pulse = .48 + .14 * (1 + Math.sin(raw * Math.PI * 4)) / 2;
      view.arrow.setLength(pulse, .14, .08);
    }
    resizeView(view);
    view.renderer.render(view.scene, view.camera);
  }

  const samples = {
    lifts: { start: [0,0], end: [0,.25] },
    calf_tib: { start: [0,.25], end: [0,.75] },
    supine_rotation: { start: [0,0], end: [0,.5] },
    external_iso: { start: [0,0], end: [0,.125] },
    internal_iso: { start: [0,0], end: [0,.125] }
  };

  try {
    const main = createView(document.getElementById('m3d-main'));
    const start = createView(document.getElementById('m3d-start'));
    const end = createView(document.getElementById('m3d-end'));
    const cue = document.getElementById('m3d-motion-cue');
    let activeKind = 'rock'; let activeAmount = 0; let activeRaw = 0;

    const renderAll = () => {
      if (host.hidden) return;
      const sample = samples[activeKind] || { start:[0,0], end:[1,.5] };
      renderView(main, activeKind, activeAmount, activeRaw);
      renderView(start, activeKind, sample.start[0], sample.start[1]);
      renderView(end, activeKind, sample.end[0], sample.end[1]);
    };

    window.Mobility3D = {
      available: true,
      supports(kind) { return supportedKinds.includes(kind); },
      show(kind) {
        if (!supportedKinds.includes(kind)) return false;
        activeKind = kind; activeAmount = 0; activeRaw = 0; host.hidden = false;
        cue.textContent = cues[kind];
        main.canvas.setAttribute('aria-label', `Animated 3D ${titles[kind]} demonstration`);
        start.canvas.setAttribute('aria-label', `${titles[kind]} start position`);
        end.canvas.setAttribute('aria-label', `${titles[kind]} end position`);
        requestAnimationFrame(renderAll);
        return true;
      },
      hide() { host.hidden = true; },
      setPhase(kind, amount, raw = amount) {
        if (!supportedKinds.includes(kind)) return;
        activeKind = kind; activeAmount = amount; activeRaw = raw;
        if (!host.hidden) renderView(main, activeKind, activeAmount, activeRaw);
      }
    };

    if ('ResizeObserver' in window) new ResizeObserver(() => requestAnimationFrame(renderAll)).observe(host);
    window.addEventListener('resize', () => requestAnimationFrame(renderAll), { passive: true });
  } catch (error) {
    console.warn('3D mobility guide could not initialize; using the SVG fallback.', error);
    window.Mobility3D = fallback;
  }
})();
