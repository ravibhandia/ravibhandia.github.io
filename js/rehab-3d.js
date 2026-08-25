(() => {
  'use strict';

  const THREE = window.THREE;
  const targets = [...document.querySelectorAll('[data-rehab-kind]')];
  if (!targets.length) return;

  const titles = {
    tfl_release: 'Wall-supported TFL and upper-quad ball release',
    hip_flexor: 'Half-kneeling hip-flexor stretch with TFL bias',
    prone_ir: 'Prone left-hip internal-rotation drops',
    rear_90_90: '90/90 left-leg-rear sink',
    windshield: 'Seated internal-rotation windshield wipers'
  };

  const cues = {
    tfl_release: 'Bend and straighten the knees; keep the ball on muscle',
    hip_flexor: 'Left knee stays down as the tucked pelvis shifts forward',
    prone_ir: 'Left foot arcs outward; left thigh and pelvis stay down',
    rear_90_90: 'Right leg is forward; left rear hip lowers toward the mat',
    windshield: 'Both knees tip left and right while both feet stay planted'
  };

  const orientationTags = {
    tfl_release: ['BALL: OUTER-FRONT HIP', 'KNEES BEND'],
    hip_flexor: ['BLUE: LEFT KNEE DOWN', 'RIGHT FOOT FORWARD'],
    prone_ir: ['LEFT THIGH STAYS DOWN', 'LEFT FOOT ARCS OUT'],
    rear_90_90: ['RIGHT LEG: FRONT', 'BLUE LEFT LEG: REAR'],
    windshield: ['FEET STAY PLANTED', 'KNEES TIP TOGETHER']
  };

  if (!THREE) {
    targets.forEach(target => {
      const note = document.createElement('p');
      note.className = 'warmup-3d-fallback';
      note.textContent = 'The 3D guide is unavailable in this browser. Follow the written setup and movement cues.';
      target.appendChild(note);
    });
    return;
  }

  const V = (x, y, z = 0) => new THREE.Vector3(x, y, z);
  const copyPose = pose => Object.fromEntries(Object.entries(pose).map(([key, point]) => [key, point.clone()]));

  function standingPose(bend = 0) {
    return {
      pelvis: V(0, 1.18 - bend * .18), shoulder: V(0, 2.02 - bend * .15), head: V(0, 2.48 - bend * .14),
      shoulderL: V(-.18, 2.02 - bend * .15, .08), shoulderR: V(.18, 2.02 - bend * .15, -.08),
      elbowL: V(-.35, 1.55 - bend * .13, .10), elbowR: V(.35, 1.55 - bend * .13, -.10),
      wristL: V(-.30, 1.08 - bend * .10, .12), wristR: V(.30, 1.08 - bend * .10, -.12),
      hipL: V(-.14, 1.16 - bend * .18, .08), hipR: V(.14, 1.16 - bend * .18, -.08),
      kneeL: V(-.24, .62 - bend * .14, .08), kneeR: V(.24, .62 - bend * .14, -.08),
      ankleL: V(-.31, .08, .08), ankleR: V(.31, .08, -.08),
      toeL: V(-.53, .06, .08), toeR: V(.53, .06, -.08)
    };
  }

  function startPose(kind) {
    if (kind === 'tfl_release') {
      const pose = standingPose(0);
      Object.values(pose).forEach(point => { point.x += .06; });
      return pose;
    }
    if (kind === 'hip_flexor') return {
      pelvis:V(-.08,1.12,0), shoulder:V(-.08,1.98,0), head:V(-.08,2.44,0),
      shoulderL:V(-.26,1.98,.08), shoulderR:V(.10,1.98,-.08), elbowL:V(-.39,1.53,.12), elbowR:V(.27,1.53,-.12), wristL:V(-.31,1.08,.14), wristR:V(.33,1.08,-.14),
      hipL:V(-.21,1.09,.08), hipR:V(.05,1.09,-.08), kneeL:V(-.29,.11,.08), kneeR:V(.62,.66,-.08), ankleL:V(-.87,.08,.08), ankleR:V(.65,.08,-.08), toeL:V(-1.13,.06,.08), toeR:V(1.00,.06,-.08)
    };
    if (kind === 'prone_ir') return {
      pelvis:V(.18,.29,0), shoulder:V(-.65,.35,0), head:V(-1.14,.39,0),
      shoulderL:V(-.66,.33,.20), shoulderR:V(-.66,.33,-.20), elbowL:V(-.94,.15,.45), elbowR:V(-.94,.15,-.45), wristL:V(-1.25,.08,.50), wristR:V(-1.25,.08,-.50),
      hipL:V(.18,.27,.20), hipR:V(.18,.27,-.20), kneeL:V(.82,.13,.20), kneeR:V(.91,.10,-.20), ankleL:V(.82,.80,.20), ankleR:V(1.53,.08,-.20), toeL:V(.57,.80,.20), toeR:V(1.78,.06,-.20)
    };
    if (kind === 'rear_90_90') return {
      pelvis:V(0,.64,0), shoulder:V(-.03,1.56,0), head:V(-.04,2.02,0),
      shoulderL:V(-.22,1.55,.10), shoulderR:V(.16,1.55,-.10), elbowL:V(-.51,1.02,.28), elbowR:V(.47,1.02,-.32), wristL:V(-.66,.16,.35), wristR:V(.62,.16,-.43),
      hipL:V(-.13,.56,.14), hipR:V(.13,.56,-.14), kneeL:V(.54,.10,-.57), kneeR:V(-.53,.10,.60), ankleL:V(1.06,.08,-.50), ankleR:V(-1.04,.08,.47), toeL:V(1.26,.07,-.41), toeR:V(-1.24,.07,.38)
    };
    if (kind === 'windshield') return {
      pelvis:V(0,.50,-.05), shoulder:V(0,1.39,-.34), head:V(0,1.86,-.48),
      shoulderL:V(-.20,1.38,-.25), shoulderR:V(.20,1.38,-.43), elbowL:V(-.47,.82,-.60), elbowR:V(.47,.82,-.68), wristL:V(-.58,.09,-.78), wristR:V(.58,.09,-.86),
      hipL:V(-.14,.44,.05), hipR:V(.14,.44,-.05), kneeL:V(-.46,.77,.47), kneeR:V(.46,.77,.47), ankleL:V(-.86,.08,.78), ankleR:V(.86,.08,.78), toeL:V(-1.06,.06,.91), toeR:V(1.06,.06,.91)
    };
    return standingPose(0);
  }

  function endPose(kind) {
    if (kind === 'tfl_release') {
      const pose = standingPose(1);
      Object.values(pose).forEach(point => { point.x -= .10; });
      return pose;
    }
    const pose = copyPose(startPose(kind));
    if (kind === 'hip_flexor') {
      ['pelvis','shoulder','head','shoulderL','shoulderR','hipL','hipR'].forEach(key => { pose[key].x += .17; });
      pose.shoulder.x += .04; pose.head.x += .08;
      pose.shoulderL.set(.02,2.02,.08); pose.elbowL.set(.17,2.46,.10); pose.wristL.set(.33,2.84,.12);
      pose.shoulderR.x += .11; pose.elbowR.x += .11; pose.wristR.x += .11;
      return pose;
    }
    if (kind === 'prone_ir') {
      pose.ankleL.set(.82,.60,.80); pose.toeL.set(.59,.60,1.00);
      return pose;
    }
    if (kind === 'rear_90_90') {
      ['pelvis','shoulder','head','shoulderL','shoulderR','elbowL','elbowR','hipL','hipR'].forEach(key => { pose[key].y -= .22; pose[key].x += .04; pose[key].z -= .08; });
      pose.wristL.y = .09; pose.wristR.y = .09;
      return pose;
    }
    if (kind === 'windshield') {
      pose.kneeL.set(-.88,.29,.57); pose.kneeR.set(-.05,.34,.57);
      pose.hipL.z = .12; pose.hipR.z = .02;
      return pose;
    }
    return pose;
  }

  function poseAt(kind, t) {
    const start = startPose(kind), end = endPose(kind);
    return Object.fromEntries(Object.keys(start).map(key => [key, start[key].clone().lerp(end[key], t)]));
  }

  const bodyMaterial = new THREE.MeshStandardMaterial({color:0xe8e5df,roughness:.58,metalness:.04});
  const torsoMaterial = new THREE.MeshStandardMaterial({color:0xc9a87c,roughness:.48,metalness:.08});
  const jointMaterial = new THREE.MeshStandardMaterial({color:0x77736e,roughness:.48,metalness:.14});
  const leftMaterial = new THREE.MeshStandardMaterial({color:0x8ec8ff,roughness:.55,metalness:.05});
  const supportMaterial = new THREE.MeshStandardMaterial({color:0x3d3b38,roughness:.9,metalness:0});
  const accentMaterial = new THREE.MeshStandardMaterial({color:0x8b6f50,roughness:.78,metalness:.02});
  const ballMaterial = new THREE.MeshStandardMaterial({color:0xf0a65a,roughness:.6,metalness:.02,emissive:0x2d1405,emissiveIntensity:.35});
  const cylinderGeometry = new THREE.CylinderGeometry(1,1,1,18,1,false);
  const torsoGeometry = new THREE.CylinderGeometry(.78,1,1,24,1,false);
  const sphereGeometry = new THREE.SphereGeometry(1,22,14);
  const yAxis = new THREE.Vector3(0,1,0);

  const makeCylinder = (group, material=bodyMaterial, torso=false) => { const mesh=new THREE.Mesh(torso?torsoGeometry:cylinderGeometry,material);group.add(mesh);return mesh; };
  const makeSphere = (group, material=jointMaterial) => { const mesh=new THREE.Mesh(sphereGeometry,material);group.add(mesh);return mesh; };
  function placeSegment(mesh,a,b,rx,rz=rx){const direction=new THREE.Vector3().subVectors(b,a),length=Math.max(direction.length(),.001);mesh.position.copy(a).add(b).multiplyScalar(.5);mesh.quaternion.setFromUnitVectors(yAxis,direction.normalize());mesh.scale.set(rx,length,rz);}
  function placeSphere(mesh,point,x,y=x,z=x){mesh.position.copy(point);mesh.quaternion.identity();mesh.scale.set(x,y,z);}

  function createRig(scene){
    const group=new THREE.Group();scene.add(group);
    const rig={group,torso:makeCylinder(group,torsoMaterial,true),neck:makeCylinder(group),upperArmL:makeCylinder(group),upperArmR:makeCylinder(group),forearmL:makeCylinder(group),forearmR:makeCylinder(group),thighL:makeCylinder(group,leftMaterial),thighR:makeCylinder(group),shinL:makeCylinder(group,leftMaterial),shinR:makeCylinder(group),footL:makeCylinder(group,leftMaterial),footR:makeCylinder(group),head:makeSphere(group,bodyMaterial),pelvis:makeSphere(group,torsoMaterial),handL:makeSphere(group,bodyMaterial),handR:makeSphere(group,bodyMaterial),joints:{}};
    ['shoulderL','shoulderR','elbowL','elbowR','wristL','wristR','hipL','hipR','kneeL','kneeR','ankleL','ankleR'].forEach(key=>{rig.joints[key]=makeSphere(group,key.startsWith('hipL')||key.startsWith('kneeL')||key.startsWith('ankleL')?leftMaterial:jointMaterial);});
    return rig;
  }

  function updateRig(rig,pose){
    placeSegment(rig.torso,pose.pelvis,pose.shoulder,.34,.25);const neckBase=pose.shoulder.clone().lerp(pose.head,.55),neckTop=pose.shoulder.clone().lerp(pose.head,.74);placeSegment(rig.neck,neckBase,neckTop,.11);
    placeSegment(rig.upperArmL,pose.shoulderL,pose.elbowL,.115);placeSegment(rig.upperArmR,pose.shoulderR,pose.elbowR,.115);placeSegment(rig.forearmL,pose.elbowL,pose.wristL,.095);placeSegment(rig.forearmR,pose.elbowR,pose.wristR,.095);
    placeSegment(rig.thighL,pose.hipL,pose.kneeL,.145);placeSegment(rig.thighR,pose.hipR,pose.kneeR,.145);placeSegment(rig.shinL,pose.kneeL,pose.ankleL,.115);placeSegment(rig.shinR,pose.kneeR,pose.ankleR,.115);placeSegment(rig.footL,pose.ankleL,pose.toeL,.10,.13);placeSegment(rig.footR,pose.ankleR,pose.toeR,.10,.13);
    placeSphere(rig.head,pose.head,.24,.28,.23);placeSphere(rig.pelvis,pose.pelvis,.36,.24,.29);placeSphere(rig.handL,pose.wristL,.14,.08,.12);placeSphere(rig.handR,pose.wristR,.14,.08,.12);
    Object.entries(rig.joints).forEach(([key,mesh])=>{const size=(key.startsWith('hip')||key.startsWith('shoulder')) ? .14 : .115;placeSphere(mesh,pose[key],size);});
  }

  function addSupport(scene,geometry,material=supportMaterial){const mesh=new THREE.Mesh(geometry,material);mesh.visible=false;scene.add(mesh);return mesh;}
  let renderer,scene,camera,rig,floor,wall,ball,mat,kneePad,blockL,blockR;
  try {
    const master=document.createElement('canvas');renderer=new THREE.WebGLRenderer({canvas:master,antialias:true,alpha:true,powerPreference:'high-performance'});renderer.setPixelRatio(1);renderer.outputEncoding=THREE.sRGBEncoding;
    scene=new THREE.Scene();camera=new THREE.OrthographicCamera(-2,2,2,-2,.1,30);scene.add(new THREE.HemisphereLight(0xfaf7f1,0x292725,.95));
    const keyLight=new THREE.DirectionalLight(0xffffff,.85);keyLight.position.set(4,6,5);scene.add(keyLight);const rimLight=new THREE.DirectionalLight(0x8ec8ff,.38);rimLight.position.set(-4,3,-4);scene.add(rimLight);
    floor=new THREE.Mesh(new THREE.PlaneGeometry(7,7),new THREE.MeshStandardMaterial({color:0x242321,roughness:.95}));floor.rotation.x=-Math.PI/2;scene.add(floor);
    wall=addSupport(scene,new THREE.BoxGeometry(.10,3.1,1.8));ball=addSupport(scene,new THREE.SphereGeometry(.16,24,16),ballMaterial);mat=addSupport(scene,new THREE.BoxGeometry(3.8,.04,2.2),accentMaterial);kneePad=addSupport(scene,new THREE.CylinderGeometry(.30,.30,.055,24),accentMaterial);blockL=addSupport(scene,new THREE.BoxGeometry(.30,.32,.44),accentMaterial);blockR=addSupport(scene,new THREE.BoxGeometry(.30,.32,.44),accentMaterial);rig=createRig(scene);
  } catch(error) {
    targets.forEach(target=>{const note=document.createElement('p');note.className='warmup-3d-fallback';note.textContent='The 3D guide is unavailable in this browser. Follow the written setup and movement cues.';target.appendChild(note);});
    console.warn('Hip rehab 3D guides could not initialize.',error);return;
  }

  function configureSupports(kind){
    [wall,ball,mat,kneePad,blockL,blockR].forEach(item=>{item.visible=false;});
    if(kind==='tfl_release'){wall.visible=true;wall.position.set(-.82,1.45,0);ball.visible=true;ball.position.set(-.47,1.20,.16);}
    if(['hip_flexor','prone_ir','rear_90_90','windshield'].includes(kind)){mat.visible=true;mat.position.set(0,.025,0);}
    if(kind==='hip_flexor'){kneePad.visible=true;kneePad.position.set(-.29,.045,.08);}
    if(kind==='rear_90_90'){blockL.visible=true;blockL.position.set(-.66,.16,.35);blockR.visible=true;blockR.position.set(.62,.16,-.43);}
  }

  function renderPose(kind,t,width,height){
    renderer.setSize(width,height,false);const aspect=width/height;let viewSize=1.62,target=V(0,1.30,0),position=V(.10,2.35,6.4);
    if(kind==='tfl_release'){viewSize=1.58;target=V(-.12,1.28,0);position=V(2.25,2.30,5.6);}
    if(kind==='hip_flexor'){viewSize=1.88;target=V(0,1.23,0);position=V(.15,2.18,6.4);}
    if(kind==='prone_ir'){viewSize=1.38;target=V(.15,.52,.10);position=V(2.9,4.35,5.5);}
    if(kind==='rear_90_90'){viewSize=1.42;target=V(0,.90,0);position=V(3.3,3.35,5.25);}
    if(kind==='windshield'){viewSize=1.40;target=V(0,.86,.10);position=V(1.9,4.25,5.4);}
    camera.left=-viewSize*aspect;camera.right=viewSize*aspect;camera.top=viewSize;camera.bottom=-viewSize;camera.position.copy(position);camera.lookAt(target);camera.updateProjectionMatrix();
    const pose=poseAt(kind,t);updateRig(rig,pose);configureSupports(kind);renderer.render(scene,camera);return renderer.domElement;
  }

  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const instances=targets.map(target=>{
    const kind=target.dataset.rehabKind,title=titles[kind];
    const host=document.createElement('div');host.className='warmup-3d';host.setAttribute('aria-label',`${title} three-dimensional movement guide`);
    const kicker=document.createElement('p');kicker.className='warmup-3d-kicker';kicker.textContent='3D movement guide · blue leg is the left leg';
    const canvas=document.createElement('canvas');canvas.width=720;canvas.height=460;canvas.setAttribute('role','img');canvas.setAttribute('aria-label',`Animated 3D ${title} demonstration with visible start and end positions. ${cues[kind]}.`);
    const controls=document.createElement('div');controls.className='warmup-3d-controls';controls.setAttribute('role','group');controls.setAttribute('aria-label',`${title} animation controls`);
    const toggle=document.createElement('button');toggle.type='button';const restart=document.createElement('button');restart.type='button';restart.textContent='Restart';controls.append(toggle,restart);host.append(kicker,canvas,controls);target.appendChild(host);
    const instance={kind,canvas,ctx:canvas.getContext('2d'),toggle,restart,phase:0,playing:!reduced.matches,lastTime:null,visible:true,dirty:true};
    const updateLabel=()=>{toggle.textContent=instance.playing?'Pause motion':'Play motion';};updateLabel();
    toggle.addEventListener('click',()=>{instance.playing=!instance.playing;instance.lastTime=null;instance.dirty=true;updateLabel();});restart.addEventListener('click',()=>{instance.phase=0;instance.lastTime=null;instance.dirty=true;});return instance;
  });

  function roundedPanel(ctx,x,y,w,h,r=10,color='#2b2a28'){ctx.fillStyle=color;ctx.beginPath();if(typeof ctx.roundRect==='function')ctx.roundRect(x,y,w,h,r);else ctx.rect(x,y,w,h);ctx.fill();}
  function drawOrientationTags(ctx,kind){
    const [leftTag,rightTag]=orientationTags[kind];ctx.font='700 11px ui-monospace, monospace';
    const leftWidth=ctx.measureText(leftTag).width+18,rightWidth=ctx.measureText(rightTag).width+18;
    roundedPanel(ctx,26,24,leftWidth,24,12,'rgba(17,17,17,.84)');roundedPanel(ctx,694-rightWidth,24,rightWidth,24,12,'rgba(17,17,17,.84)');
    ctx.fillStyle='#8ec8ff';ctx.fillText(leftTag,35,40);ctx.fillStyle='#f0d6b3';ctx.fillText(rightTag,703-rightWidth,40);
  }
  function drawInstance(instance,time){
    if(instance.playing){if(instance.lastTime!==null)instance.phase=(instance.phase+(time-instance.lastTime)/4400)%1;instance.lastTime=time;instance.dirty=true;}else instance.lastTime=null;
    if(!instance.dirty)return;const ctx=instance.ctx,w=720,h=460,progress=instance.phase<.5?instance.phase*2:(1-instance.phase)*2,smooth=progress*progress*(3-2*progress);ctx.clearRect(0,0,w,h);ctx.fillStyle='#1d1c1a';ctx.fillRect(0,0,w,h);
    roundedPanel(ctx,12,10,696,252);ctx.drawImage(renderPose(instance.kind,smooth,696,252),12,10,696,252);drawOrientationTags(ctx,instance.kind);roundedPanel(ctx,12,302,340,146);ctx.drawImage(renderPose(instance.kind,0,340,146),12,302,340,146);roundedPanel(ctx,368,302,340,146);ctx.drawImage(renderPose(instance.kind,1,340,146),368,302,340,146);
    ctx.font='700 15px ui-monospace, monospace';ctx.fillStyle='#fff';ctx.fillText('START',26,326);ctx.fillText('END',382,326);ctx.font='600 15px system-ui, sans-serif';const cue=cues[instance.kind],cueWidth=Math.min(650,ctx.measureText(cue).width+38);roundedPanel(ctx,(720-cueWidth)/2,266,cueWidth,30,15,'rgba(17,17,17,.92)');ctx.fillStyle='#8ec8ff';ctx.fillText('↔',(720-cueWidth)/2+12,287);ctx.fillStyle='#fff';ctx.fillText(cue,(720-cueWidth)/2+33,287);instance.dirty=false;
  }

  if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{const instance=instances.find(item=>item.canvas===entry.target);if(instance){instance.visible=entry.isIntersecting;if(instance.visible)instance.dirty=true;}}),{rootMargin:'300px'});instances.forEach(instance=>observer.observe(instance.canvas));}
  reduced.addEventListener?.('change',event=>{instances.forEach(instance=>{if(event.matches)instance.playing=false;instance.lastTime=null;instance.dirty=true;instance.toggle.textContent=instance.playing?'Pause motion':'Play motion';});});
  let previousFrame=0;function frame(time){if(time-previousFrame>42){instances.forEach(instance=>{if(instance.visible||instance.dirty)drawInstance(instance,time);});previousFrame=time;}requestAnimationFrame(frame);}requestAnimationFrame(frame);
})();
