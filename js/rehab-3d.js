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
    tfl_release: 'Small knee bend moves the muscle over the ball',
    hip_flexor: 'Tuck pelvis, squeeze left glute, then shift forward',
    prone_ir: 'Left foot moves out while thigh and pelvis stay down',
    rear_90_90: 'Right leg front; left leg rear; pelvis sinks gently',
    windshield: 'Both knees travel side to side while feet stay planted'
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
      Object.values(pose).forEach(point => { point.x -= .12; });
      return pose;
    }
    if (kind === 'hip_flexor') return {
      pelvis:V(-.12,1.16,0), shoulder:V(-.12,2.02,0), head:V(-.12,2.48,0),
      shoulderL:V(-.30,2.02,.08), shoulderR:V(.06,2.02,-.08), elbowL:V(-.45,1.57,.12), elbowR:V(.24,1.57,-.12), wristL:V(-.38,1.12,.14), wristR:V(.31,1.12,-.14),
      hipL:V(-.26,1.13,.08), hipR:V(.02,1.13,-.08), kneeL:V(-.82,.25,.08), kneeR:V(.55,.67,-.08), ankleL:V(-.93,.08,.08), ankleR:V(.76,.08,-.08), toeL:V(-.56,.06,.08), toeR:V(1.05,.06,-.08)
    };
    if (kind === 'prone_ir') return {
      pelvis:V(.25,.31,0), shoulder:V(-.62,.39,0), head:V(-1.12,.45,0),
      shoulderL:V(-.64,.37,.18), shoulderR:V(-.64,.37,-.18), elbowL:V(-.92,.18,.45), elbowR:V(-.92,.18,-.45), wristL:V(-1.22,.10,.52), wristR:V(-1.22,.10,-.52),
      hipL:V(.25,.29,.18), hipR:V(.25,.29,-.18), kneeL:V(.87,.20,.18), kneeR:V(.94,.12,-.18), ankleL:V(.87,1.02,.18), ankleR:V(1.53,.09,-.18), toeL:V(.87,1.15,.18), toeR:V(1.78,.07,-.18)
    };
    if (kind === 'rear_90_90') return {
      pelvis:V(0,.48,0), shoulder:V(-.05,1.43,0), head:V(-.07,1.91,0),
      shoulderL:V(-.24,1.42,.10), shoulderR:V(.14,1.42,-.10), elbowL:V(-.55,.92,.28), elbowR:V(.45,.92,-.32), wristL:V(-.70,.10,.35), wristR:V(.62,.10,-.43),
      hipL:V(-.13,.42,.14), hipR:V(.13,.42,-.14), kneeL:V(.52,.10,-.55), kneeR:V(-.50,.10,.58), ankleL:V(1.02,.08,-.48), ankleR:V(-1.00,.08,.46), toeL:V(1.22,.07,-.40), toeR:V(-1.20,.07,.37)
    };
    if (kind === 'windshield') return {
      pelvis:V(0,.48,0), shoulder:V(-.12,1.38,-.12), head:V(-.17,1.85,-.16),
      shoulderL:V(-.31,1.37,-.04), shoulderR:V(.07,1.37,-.20), elbowL:V(-.60,.83,-.35), elbowR:V(.39,.83,-.48), wristL:V(-.72,.10,-.54), wristR:V(.52,.10,-.68),
      hipL:V(-.14,.43,.09), hipR:V(.14,.43,-.09), kneeL:V(-.54,.72,.45), kneeR:V(.54,.72,.36), ankleL:V(-.78,.08,.78), ankleR:V(.78,.08,.72), toeL:V(-.96,.06,.90), toeR:V(.96,.06,.84)
    };
    return standingPose(0);
  }

  function endPose(kind) {
    if (kind === 'tfl_release') {
      const pose = standingPose(1);
      Object.values(pose).forEach(point => { point.x += .05; });
      return pose;
    }
    const pose = copyPose(startPose(kind));
    if (kind === 'hip_flexor') {
      const shift = ['pelvis','shoulder','head','shoulderL','shoulderR','hipL','hipR'];
      shift.forEach(key => { pose[key].x += .20; });
      pose.shoulder.x += .08; pose.head.x += .14;
      pose.shoulderL.set(-.02,2.05,.08); pose.elbowL.set(.13,2.52,.10); pose.wristL.set(.30,2.91,.12);
      pose.shoulderR.x += .16; pose.elbowR.x += .16; pose.wristR.x += .16;
      return pose;
    }
    if (kind === 'prone_ir') {
      pose.ankleL.z = .83; pose.toeL.z = 1.00;
      pose.ankleL.x = .85; pose.toeL.x = .84;
      return pose;
    }
    if (kind === 'rear_90_90') {
      ['pelvis','shoulder','head','shoulderL','shoulderR','elbowL','elbowR'].forEach(key => { pose[key].y -= .14; pose[key].x += .06; pose[key].z -= .08; });
      pose.wristL.y = .08; pose.wristR.y = .08;
      return pose;
    }
    if (kind === 'windshield') {
      pose.kneeL.set(.05,.43,.56); pose.kneeR.set(.90,.43,.46);
      pose.hipL.z = .16; pose.hipR.z = -.02;
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
  const supportMaterial = new THREE.MeshStandardMaterial({color:0x5a5753,roughness:.86,metalness:0});
  const accentMaterial = new THREE.MeshStandardMaterial({color:0x9b7653,roughness:.72,metalness:.02});
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
    scene=new THREE.Scene();camera=new THREE.OrthographicCamera(-2,2,2,-2,.1,30);scene.add(new THREE.HemisphereLight(0xfaf7f1,0x292725,1.55));
    const keyLight=new THREE.DirectionalLight(0xffffff,1.35);keyLight.position.set(4,6,5);scene.add(keyLight);const rimLight=new THREE.DirectionalLight(0x8ec8ff,.65);rimLight.position.set(-4,3,-4);scene.add(rimLight);
    floor=new THREE.Mesh(new THREE.PlaneGeometry(7,7),new THREE.MeshStandardMaterial({color:0x242321,roughness:.95}));floor.rotation.x=-Math.PI/2;scene.add(floor);
    wall=addSupport(scene,new THREE.BoxGeometry(3.6,3.1,.08));ball=addSupport(scene,new THREE.SphereGeometry(.14,20,14),accentMaterial);mat=addSupport(scene,new THREE.BoxGeometry(3.8,.04,2.2),accentMaterial);kneePad=addSupport(scene,new THREE.CylinderGeometry(.28,.28,.05,24),accentMaterial);blockL=addSupport(scene,new THREE.BoxGeometry(.28,.30,.42),accentMaterial);blockR=addSupport(scene,new THREE.BoxGeometry(.28,.30,.42),accentMaterial);rig=createRig(scene);
  } catch(error) {
    targets.forEach(target=>{const note=document.createElement('p');note.className='warmup-3d-fallback';note.textContent='The 3D guide is unavailable in this browser. Follow the written setup and movement cues.';target.appendChild(note);});
    console.warn('Hip rehab 3D guides could not initialize.',error);return;
  }

  function configureSupports(kind){
    [wall,ball,mat,kneePad,blockL,blockR].forEach(item=>{item.visible=false;});
    if(kind==='tfl_release'){wall.visible=true;wall.position.set(0,1.45,-.62);ball.visible=true;ball.position.set(-.34,1.25,-.30);}
    if(['hip_flexor','prone_ir','rear_90_90','windshield'].includes(kind)){mat.visible=true;mat.position.set(0,.025,0);}
    if(kind==='hip_flexor'){kneePad.visible=true;kneePad.position.set(-.82,.05,.08);}
    if(kind==='rear_90_90'){blockL.visible=true;blockL.position.set(-.70,.16,.35);blockR.visible=true;blockR.position.set(.62,.16,-.43);}
  }

  function renderPose(kind,t,width,height){
    renderer.setSize(width,height,false);const aspect=width/height;let viewSize=1.68,target=V(0,1.25,0),position=V(.15,2.45,6.2);
    if(kind==='prone_ir'){viewSize=1.45;target=V(.15,.55,0);position=V(2.5,3.6,5.0);}
    if(['rear_90_90','windshield'].includes(kind)){viewSize=1.48;target=V(0,.82,0);position=V(3.2,2.8,5.1);}
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
  function drawInstance(instance,time){
    if(instance.playing){if(instance.lastTime!==null)instance.phase=(instance.phase+(time-instance.lastTime)/4400)%1;instance.lastTime=time;instance.dirty=true;}else instance.lastTime=null;
    if(!instance.dirty)return;const ctx=instance.ctx,w=720,h=460,progress=instance.phase<.5?instance.phase*2:(1-instance.phase)*2,smooth=progress*progress*(3-2*progress);ctx.clearRect(0,0,w,h);ctx.fillStyle='#1d1c1a';ctx.fillRect(0,0,w,h);
    roundedPanel(ctx,12,10,696,278);ctx.drawImage(renderPose(instance.kind,smooth,696,278),12,10,696,278);roundedPanel(ctx,12,302,340,146);ctx.drawImage(renderPose(instance.kind,0,340,146),12,302,340,146);roundedPanel(ctx,368,302,340,146);ctx.drawImage(renderPose(instance.kind,1,340,146),368,302,340,146);
    ctx.font='700 15px ui-monospace, monospace';ctx.fillStyle='#fff';ctx.fillText('START',26,326);ctx.fillText('END',382,326);ctx.font='600 15px system-ui, sans-serif';const cue=cues[instance.kind],cueWidth=Math.min(650,ctx.measureText(cue).width+38);roundedPanel(ctx,(720-cueWidth)/2,247,cueWidth,30,15,'rgba(17,17,17,.88)');ctx.fillStyle='#8ec8ff';ctx.fillText('↔',(720-cueWidth)/2+12,268);ctx.fillStyle='#fff';ctx.fillText(cue,(720-cueWidth)/2+33,268);instance.dirty=false;
  }

  if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{const instance=instances.find(item=>item.canvas===entry.target);if(instance){instance.visible=entry.isIntersecting;if(instance.visible)instance.dirty=true;}}),{rootMargin:'300px'});instances.forEach(instance=>observer.observe(instance.canvas));}
  reduced.addEventListener?.('change',event=>{instances.forEach(instance=>{if(event.matches)instance.playing=false;instance.lastTime=null;instance.dirty=true;instance.toggle.textContent=instance.playing?'Pause motion':'Play motion';});});
  let previousFrame=0;function frame(time){if(time-previousFrame>42){instances.forEach(instance=>{if(instance.visible||instance.dirty)drawInstance(instance,time);});previousFrame=time;}requestAnimationFrame(frame);}requestAnimationFrame(frame);
})();
