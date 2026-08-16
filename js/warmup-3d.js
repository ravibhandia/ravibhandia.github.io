(() => {
  'use strict';

  const THREE = window.THREE;
  const targets = [...document.querySelectorAll('[data-warmup-kind]')];
  if (!targets.length) return;

  const titles = {
    roller: 'Wall-supported lower-back foam roll',
    bird_dog: 'Controlled bird dog',
    scap_ball: 'Massage ball around the scapula',
    serratus_reach: 'Single-arm cable serratus reach',
    towel_assist: 'Behind-the-back towel assistance',
    median_glide: 'Median nerve glide',
    ulnar_glide: 'Ulnar nerve glide',
    radial_glide: 'Radial nerve glide',
    external_rotation: 'Towel-supported band external rotation',
    wall_slide: 'Scapular wall slides',
    shoulder_extension: 'Tall-kneeling banded shoulder extensions',
    bar_shrug: 'Behind-the-back Olympic-bar shrugs'
  };

  const cues = {
    roller: 'Small knee bend moves the body past the roller',
    bird_dog: 'Opposite arm and leg reach long; trunk stays level',
    scap_ball: 'Use small body shifts around the scapular border',
    serratus_reach: 'Arm reaches forward as the shoulder blade wraps',
    towel_assist: 'The opposite hand guides—never yanks—the towel',
    median_glide: 'Elbow lengthens as the palm and wrist open',
    ulnar_glide: 'Elbow bends as the hand travels toward the face',
    radial_glide: 'Straight arm moves slightly behind and away',
    external_rotation: 'Elbow stays pinned while the hand rotates out',
    wall_slide: 'Forearms slide upward while ribs stay stacked',
    shoulder_extension: 'Straight arms travel behind the torso',
    bar_shrug: 'Shoulders lift up and slightly back; elbows stay straight'
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

  const D = (x, y) => ({ x, y });
  const mix = (a, b, t) => D(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);

  function baseStanding() {
    return { head:D(200,54), shoulder:D(200,91), hip:D(200,166), le:D(173,126), lh:D(165,178), re:D(227,126), rh:D(235,178), lk:D(178,222), lf:D(166,282), rk:D(222,222), rf:D(234,282) };
  }

  function stateAt(kind, t) {
    const P = D;
    if (kind === 'roller') return { head:mix(P(190,56),P(194,69),t), shoulder:mix(P(197,94),P(202,107),t), hip:mix(P(210,169),P(215,183),t), le:mix(P(175,131),P(180,144),t), lh:mix(P(170,184),P(175,198),t), re:mix(P(225,132),P(230,145),t), rh:mix(P(238,182),P(242,196),t), lk:mix(P(177,225),P(182,239),t), lf:P(158,282), rk:mix(P(226,224),P(232,238),t), rf:P(247,282) };
    if (kind === 'bird_dog') return { head:mix(P(126,123),P(93,116),t), shoulder:P(158,151), hip:P(232,166), le:mix(P(135,192),P(101,153),t), lh:mix(P(115,254),P(47,126),t), re:P(177,197), rh:P(151,258), lk:P(225,231), lf:P(205,280), rk:mix(P(267,230),P(297,183),t), rf:mix(P(276,280),P(357,164),t) };
    if (kind === 'scap_ball') return { ...baseStanding(), head:mix(P(196,54),P(196,67),t), shoulder:mix(P(198,91),P(198,104),t), hip:mix(P(205,166),P(205,179),t), le:mix(P(170,127),P(170,140),t), lh:mix(P(165,180),P(165,193),t), re:mix(P(225,125),P(225,138),t), rh:mix(P(236,177),P(236,190),t), lk:mix(P(180,222),P(183,235),t), lf:P(168,282), rk:mix(P(225,222),P(229,235),t), rf:P(241,282) };
    if (kind === 'serratus_reach') return { head:P(196,55), shoulder:P(196,92), hip:P(196,166), le:mix(P(164,128),P(237,112),t), lh:mix(P(111,159),P(329,103),t), re:P(220,129), rh:P(226,182), lk:P(165,224), lf:P(137,282), rk:P(229,224), rf:P(258,282) };
    if (kind === 'towel_assist') return { head:P(200,54), shoulder:P(200,92), hip:P(200,168), le:mix(P(165,87),P(161,75),t), lh:mix(P(184,119),P(184,103),t), re:mix(P(232,133),P(228,121),t), rh:mix(P(205,184),P(203,166),t), lk:P(179,224), lf:P(166,282), rk:P(221,224), rf:P(234,282) };
    if (kind === 'median_glide') return { ...baseStanding(), le:mix(P(173,126),P(118,97),t), lh:mix(P(185,145),P(47,91),t), re:P(227,126), rh:P(235,178) };
    if (kind === 'ulnar_glide') return { ...baseStanding(), le:mix(P(145,103),P(158,79),t), lh:mix(P(66,111),P(178,55),t), re:P(227,126), rh:P(235,178) };
    if (kind === 'radial_glide') return { ...baseStanding(), le:mix(P(171,128),P(156,155),t), lh:mix(P(164,181),P(105,205),t), re:P(227,126), rh:P(235,178) };
    if (kind === 'external_rotation') return { ...baseStanding(), le:P(166,133), lh:mix(P(204,143),P(115,137),t), re:P(229,129), rh:P(237,180) };
    if (kind === 'wall_slide') return { ...baseStanding(), le:mix(P(165,125),P(151,84),t), lh:mix(P(174,72),P(130,32),t), re:mix(P(235,125),P(249,84),t), rh:mix(P(226,72),P(270,32),t) };
    if (kind === 'shoulder_extension') return { head:P(200,64), shoulder:P(200,103), hip:P(200,178), le:mix(P(167,138),P(180,146),t), lh:mix(P(112,117),P(132,190),t), re:mix(P(233,138),P(220,146),t), rh:mix(P(288,117),P(268,190),t), lk:P(180,238), lf:P(172,282), rk:P(220,238), rf:P(228,282) };
    if (kind === 'bar_shrug') { const lift = t * 18; return { head:P(200,54), shoulder:P(200,95-lift), hip:P(200,168), le:P(174,128-lift*.55), lh:P(166,191), re:P(226,128-lift*.55), rh:P(234,191), lk:P(178,222), lf:P(166,282), rk:P(222,222), rf:P(234,282) }; }
    return baseStanding();
  }

  const convert = (p, z = 0) => new THREE.Vector3((p.x - 200) / 84, (286 - p.y) / 84, z);

  function poseAt(kind, t) {
    const s = stateAt(kind, t);
    const footDirection = (foot, side) => D(foot.x + (Math.abs(foot.x - 200) > 8 ? Math.sign(foot.x - 200) : side) * 20, foot.y - 1);
    return {
      pelvis:convert(s.hip), shoulder:convert(s.shoulder), head:convert(s.head),
      shoulderL:convert(D(s.shoulder.x-8,s.shoulder.y+2),.22), shoulderR:convert(D(s.shoulder.x+8,s.shoulder.y+2),-.22),
      elbowL:convert(s.le,.23), elbowR:convert(s.re,-.23), wristL:convert(s.lh,.20), wristR:convert(s.rh,-.20),
      hipL:convert(D(s.hip.x-5,s.hip.y),.17), hipR:convert(D(s.hip.x+5,s.hip.y),-.17),
      kneeL:convert(s.lk,.14), kneeR:convert(s.rk,-.14), ankleL:convert(s.lf,.12), ankleR:convert(s.rf,-.12),
      toeL:convert(footDirection(s.lf,-1),.12), toeR:convert(footDirection(s.rf,1),-.12)
    };
  }

  const bodyMaterial = new THREE.MeshStandardMaterial({ color:0xe8e5df, roughness:.58, metalness:.04 });
  const torsoMaterial = new THREE.MeshStandardMaterial({ color:0xc9a87c, roughness:.48, metalness:.08 });
  const jointMaterial = new THREE.MeshStandardMaterial({ color:0x77736e, roughness:.48, metalness:.14 });
  const supportMaterial = new THREE.MeshStandardMaterial({ color:0x5a5753, roughness:.86, metalness:0 });
  const accentMaterial = new THREE.MeshStandardMaterial({ color:0x9b7653, roughness:.72, metalness:.02 });
  const cylinderGeometry = new THREE.CylinderGeometry(1,1,1,18,1,false);
  const torsoGeometry = new THREE.CylinderGeometry(.78,1,1,24,1,false);
  const sphereGeometry = new THREE.SphereGeometry(1,22,14);
  const yAxis = new THREE.Vector3(0,1,0);

  const makeCylinder = (group, material=bodyMaterial, torso=false) => { const mesh = new THREE.Mesh(torso?torsoGeometry:cylinderGeometry,material); group.add(mesh); return mesh; };
  const makeSphere = (group, material=jointMaterial) => { const mesh = new THREE.Mesh(sphereGeometry,material); group.add(mesh); return mesh; };
  function placeSegment(mesh,a,b,rx,rz=rx){const d=new THREE.Vector3().subVectors(b,a),length=Math.max(d.length(),.001);mesh.position.copy(a).add(b).multiplyScalar(.5);mesh.quaternion.setFromUnitVectors(yAxis,d.normalize());mesh.scale.set(rx,length,rz);}
  function placeSphere(mesh,p,x,y=x,z=x){mesh.position.copy(p);mesh.quaternion.identity();mesh.scale.set(x,y,z);}

  function createRig(scene){
    const group=new THREE.Group();scene.add(group);
    const rig={group,torso:makeCylinder(group,torsoMaterial,true),neck:makeCylinder(group),upperArmL:makeCylinder(group),upperArmR:makeCylinder(group),forearmL:makeCylinder(group),forearmR:makeCylinder(group),thighL:makeCylinder(group),thighR:makeCylinder(group),shinL:makeCylinder(group),shinR:makeCylinder(group),footL:makeCylinder(group),footR:makeCylinder(group),head:makeSphere(group,bodyMaterial),pelvis:makeSphere(group,torsoMaterial),handL:makeSphere(group,bodyMaterial),handR:makeSphere(group,bodyMaterial),joints:{}};
    ['shoulderL','shoulderR','elbowL','elbowR','wristL','wristR','hipL','hipR','kneeL','kneeR','ankleL','ankleR'].forEach(key=>{rig.joints[key]=makeSphere(group)});return rig;
  }
  function updateRig(r,p){placeSegment(r.torso,p.pelvis,p.shoulder,.34,.25);const nb=p.shoulder.clone().lerp(p.head,.55),nt=p.shoulder.clone().lerp(p.head,.74);placeSegment(r.neck,nb,nt,.11);placeSegment(r.upperArmL,p.shoulderL,p.elbowL,.115);placeSegment(r.upperArmR,p.shoulderR,p.elbowR,.115);placeSegment(r.forearmL,p.elbowL,p.wristL,.095);placeSegment(r.forearmR,p.elbowR,p.wristR,.095);placeSegment(r.thighL,p.hipL,p.kneeL,.145);placeSegment(r.thighR,p.hipR,p.kneeR,.145);placeSegment(r.shinL,p.kneeL,p.ankleL,.115);placeSegment(r.shinR,p.kneeR,p.ankleR,.115);placeSegment(r.footL,p.ankleL,p.toeL,.10,.13);placeSegment(r.footR,p.ankleR,p.toeR,.10,.13);placeSphere(r.head,p.head,.24,.28,.23);placeSphere(r.pelvis,p.pelvis,.36,.24,.29);placeSphere(r.handL,p.wristL,.14,.08,.12);placeSphere(r.handR,p.wristR,.14,.08,.12);Object.entries(r.joints).forEach(([key,mesh])=>{const size=(key.startsWith('hip')||key.startsWith('shoulder'))?.14:.115;placeSphere(mesh,p[key],size);});}

  function addSupport(scene,geometry,material=supportMaterial){const mesh=new THREE.Mesh(geometry,material);mesh.visible=false;scene.add(mesh);return mesh;}
  let renderer,scene,camera,rig,floor,wall,roller,ball,mat,towelLine,bandLine,bar,anchor,towelBlock;
  try {
    const master=document.createElement('canvas');
    renderer=new THREE.WebGLRenderer({canvas:master,antialias:true,alpha:true,powerPreference:'high-performance'});renderer.setPixelRatio(1);renderer.outputEncoding=THREE.sRGBEncoding;
    scene=new THREE.Scene();camera=new THREE.OrthographicCamera(-2,2,2,-2,.1,30);scene.add(new THREE.HemisphereLight(0xfaf7f1,0x292725,1.55));
    const keyLight=new THREE.DirectionalLight(0xffffff,1.35);keyLight.position.set(4,6,5);scene.add(keyLight);const rimLight=new THREE.DirectionalLight(0xc9a87c,.75);rimLight.position.set(-4,3,-4);scene.add(rimLight);
    floor=new THREE.Mesh(new THREE.PlaneGeometry(7,7),new THREE.MeshStandardMaterial({color:0x242321,roughness:.95}));floor.rotation.x=-Math.PI/2;scene.add(floor);
    wall=addSupport(scene,new THREE.BoxGeometry(.08,2.9,1.25));roller=addSupport(scene,new THREE.CylinderGeometry(.16,.16,.92,20),accentMaterial);ball=addSupport(scene,new THREE.SphereGeometry(.13,20,14),accentMaterial);mat=addSupport(scene,new THREE.BoxGeometry(3.8,.04,1.2),accentMaterial);bar=addSupport(scene,cylinderGeometry,accentMaterial);anchor=addSupport(scene,new THREE.SphereGeometry(.09,16,12),accentMaterial);towelBlock=addSupport(scene,new THREE.BoxGeometry(.18,.35,.24),accentMaterial);towelLine=addSupport(scene,cylinderGeometry,accentMaterial);bandLine=addSupport(scene,cylinderGeometry,accentMaterial);rig=createRig(scene);
  } catch (error) {
    targets.forEach(target=>{const note=document.createElement('p');note.className='warmup-3d-fallback';note.textContent='The 3D guide is unavailable in this browser. Follow the written setup and movement cues.';target.appendChild(note)});
    console.warn('Warm-up 3D guides could not initialize.',error);
    return;
  }

  function hideSupports(){[wall,roller,ball,mat,bar,anchor,towelBlock,towelLine,bandLine].forEach(item=>{item.visible=false});}
  function configureSupports(kind,p){
    hideSupports();
    if(['roller','scap_ball'].includes(kind)){wall.visible=true;wall.position.set(.72,1.38,0)}
    if(kind==='wall_slide'){wall.visible=true;wall.position.set(1.72,1.38,0)}
    if(kind==='roller'){roller.visible=true;roller.position.set(.42,1.18,.30)}
    if(kind==='scap_ball'){ball.visible=true;ball.position.set(.35,2.05,.32)}
    if(kind==='bird_dog'){mat.visible=true;mat.position.set(0,.025,0)}
    if(kind==='serratus_reach'){anchor.visible=true;anchor.position.set(-1.75,1.55,.28);bandLine.visible=true;placeSegment(bandLine,anchor.position,p.wristL.clone().setZ(.28),.025)}
    if(kind==='towel_assist'){towelLine.visible=true;placeSegment(towelLine,p.wristL.clone().setZ(.31),p.wristR.clone().setZ(.31),.035)}
    if(kind==='external_rotation'){anchor.visible=true;anchor.position.set(-1.72,1.70,.28);bandLine.visible=true;placeSegment(bandLine,anchor.position,p.wristL.clone().setZ(.28),.025);towelBlock.visible=true;towelBlock.position.set(-.20,1.45,.30)}
    if(kind==='shoulder_extension'){anchor.visible=true;anchor.position.set(0,2.28,.28);bandLine.visible=true;placeSegment(bandLine,anchor.position,p.wristL.clone().setZ(.28),.025)}
    if(kind==='bar_shrug'){bar.visible=true;const barY=(p.wristL.y+p.wristR.y)/2;placeSegment(bar,new THREE.Vector3(-.82,barY,.34),new THREE.Vector3(.82,barY,.34),.055)}
  }

  function renderPose(kind,t,width,height){
    renderer.setSize(width,height,false);const aspect=width/height,viewSize=['bird_dog'].includes(kind)?1.65:1.88;camera.left=-viewSize*aspect;camera.right=viewSize*aspect;camera.top=viewSize;camera.bottom=-viewSize;camera.position.set(.15,2.35,6.2);camera.lookAt(new THREE.Vector3(0,kind==='bird_dog'?.95:1.3,0));camera.updateProjectionMatrix();const p=poseAt(kind,t);updateRig(rig,p);configureSupports(kind,p);renderer.render(scene,camera);return renderer.domElement;
  }

  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const instances=targets.map(target=>{
    const kind=target.dataset.warmupKind,title=titles[kind];
    const host=document.createElement('div');host.className='warmup-3d';host.setAttribute('aria-label',`${title} three-dimensional movement guide`);
    const kicker=document.createElement('p');kicker.className='warmup-3d-kicker';kicker.textContent='3D movement guide';
    const canvas=document.createElement('canvas');canvas.width=720;canvas.height=460;canvas.setAttribute('role','img');canvas.setAttribute('aria-label',`Animated 3D ${title} demonstration with visible start and end positions. ${cues[kind]}.`);
    const controls=document.createElement('div');controls.className='warmup-3d-controls';controls.setAttribute('role','group');controls.setAttribute('aria-label',`${title} animation controls`);
    const toggle=document.createElement('button');toggle.type='button';const restart=document.createElement('button');restart.type='button';restart.textContent='Restart';controls.append(toggle,restart);host.append(kicker,canvas,controls);target.appendChild(host);
    const instance={kind,title,canvas,ctx:canvas.getContext('2d'),toggle,restart,phase:0,playing:!reduced.matches,lastTime:null,visible:true,dirty:true};
    const labels=()=>{toggle.textContent=instance.playing?'Pause motion':'Play motion'};labels();
    toggle.addEventListener('click',()=>{instance.playing=!instance.playing;instance.lastTime=null;instance.dirty=true;labels()});restart.addEventListener('click',()=>{instance.phase=0;instance.lastTime=null;instance.dirty=true});return instance;
  });

  function roundedPanel(ctx,x,y,w,h,r=10,color='#2b2a28'){ctx.fillStyle=color;ctx.beginPath();if(typeof ctx.roundRect==='function')ctx.roundRect(x,y,w,h,r);else ctx.rect(x,y,w,h);ctx.fill();}
  function drawInstance(instance,time){
    if(instance.playing){if(instance.lastTime!==null)instance.phase=(instance.phase+(time-instance.lastTime)/4200)%1;instance.lastTime=time;instance.dirty=true}else instance.lastTime=null;
    if(!instance.dirty)return;const ctx=instance.ctx,w=720,h=460,t=instance.phase<.5?instance.phase*2:(1-instance.phase)*2,s=t*t*(3-2*t);ctx.clearRect(0,0,w,h);ctx.fillStyle='#1d1c1a';ctx.fillRect(0,0,w,h);
    roundedPanel(ctx,12,10,696,278);ctx.drawImage(renderPose(instance.kind,s,696,278),12,10,696,278);roundedPanel(ctx,12,302,340,146);ctx.drawImage(renderPose(instance.kind,0,340,146),12,302,340,146);roundedPanel(ctx,368,302,340,146);ctx.drawImage(renderPose(instance.kind,1,340,146),368,302,340,146);
    ctx.font='700 15px ui-monospace, monospace';ctx.fillStyle='#ffffff';ctx.fillText('START',26,326);ctx.fillText('END',382,326);ctx.font='600 15px system-ui, sans-serif';const cue=cues[instance.kind];const cueWidth=Math.min(620,ctx.measureText(cue).width+34);roundedPanel(ctx,(720-cueWidth)/2,247,cueWidth,30,15,'rgba(17,17,17,.88)');ctx.fillStyle='#8ec8ff';ctx.fillText('↔',((720-cueWidth)/2)+12,268);ctx.fillStyle='#ffffff';ctx.fillText(cue,((720-cueWidth)/2)+32,268);instance.dirty=false;
  }

  if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{const instance=instances.find(item=>item.canvas===entry.target);if(instance){instance.visible=entry.isIntersecting;if(instance.visible)instance.dirty=true}}),{rootMargin:'300px'});instances.forEach(instance=>observer.observe(instance.canvas))}
  reduced.addEventListener?.('change',event=>{instances.forEach(instance=>{if(event.matches)instance.playing=false;instance.lastTime=null;instance.dirty=true;instance.toggle.textContent=instance.playing?'Pause motion':'Play motion'})});
  let previousFrame=0;function frame(time){if(time-previousFrame>42){instances.forEach(instance=>{if(instance.visible||instance.dirty)drawInstance(instance,time)});previousFrame=time}requestAnimationFrame(frame)}requestAnimationFrame(frame);
})();
