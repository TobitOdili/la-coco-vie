import * as THREE from 'three'
import { gsap } from 'gsap'

const toRad = (deg) => (deg * Math.PI) / 180

// Chapter data
export const CHAPTERS = [
  {
    slug: 'eat-marry-love',
    title: 'Eat, Merry, Love',
    accent: '#B32C05',
    accentLight: '#F3EBE4',
    accentLighter: '#f0d7bf',
    audio: '/audio/eat-merry-love.mp3',
    video: '/video/eat-intro.mp4',
    poster: '/images/poster-1.jpg',
    txt: '/images/txt-1.png',
    svg: '/images/p1.svg',
    index: 0,
  },
  {
    slug: 'la-storia',
    title: "La Storia Dell'eleganza",
    accent: '#304443',
    accentLight: '#D7DDDD',
    accentLighter: '#a0aeae',
    audio: '/audio/la-storia.mp3',
    video: '/video/la-intro.mp4',
    poster: '/images/poster-2.jpg',
    txt: '/images/txt-2.png',
    svg: '/images/p2.svg',
    index: 1,
  },
  {
    slug: 'wine-o-clock',
    title: "Wine O'Clock",
    accent: '#353454',
    accentLight: '#D6D5E8',
    accentLighter: '#b3b0db',
    audio: '/audio/wine-time.mp3',
    video: '/video/wine-intro.mp4',
    poster: '/images/poster-3.jpg',
    txt: '/images/txt-3.png',
    svg: '/images/p3.svg',
    index: 2,
  },
  {
    slug: 'amour-getaway',
    title: 'Amour Getaway',
    accent: '#7E3C48',
    accentLight: '#FFE7F7',
    accentLighter: '#f0c3e1',
    audio: '/audio/amour-getway.mp3',
    video: '/video/amour-intro.mp4',
    poster: '/images/poster-4.jpg',
    txt: '/images/txt-4.png',
    svg: '/images/p4.svg',
    index: 3,
  },
]

// Vertex shader
const vertexShader = `
varying vec2 vUv;
uniform vec3 axisPosition;
uniform float aspectRatio;
uniform float uAngle;
uniform float blendFactor;
uniform float progress;

vec3 rotateZ(vec3 v, float angle) {
    float cosTheta = cos(angle);
    float sinTheta = sin(angle);
    return vec3(cosTheta * v.x - sinTheta * v.y, sinTheta * v.x + cosTheta * v.y, v.z);
}

void main() {
    vUv = uv;
    float initialZRotation = radians(uAngle);
    vec3 rotatedPosition = rotateZ(position, initialZRotation);
    float lengthOfArc = rotatedPosition.x - axisPosition.x;
    float angleOfArc = lengthOfArc / axisPosition.z;
    rotatedPosition.x = 0.0;
    rotatedPosition.z = -axisPosition.z;
    float cosTheta = cos(-angleOfArc);
    float sinTheta = sin(-angleOfArc);
    vec3 bentPosition = vec3(
        cosTheta * rotatedPosition.x - sinTheta * rotatedPosition.z,
        rotatedPosition.y,
        sinTheta * rotatedPosition.x + cosTheta * rotatedPosition.z
    ) + axisPosition;
    vec3 p = position;
    p.x *= -1.0;
    vec3 finalPosition = mix(bentPosition, p, blendFactor);
    if (aspectRatio < 0.75) {
        float f = finalPosition.x * 1.0/aspectRatio;
        f = finalPosition.x;
        finalPosition.x = mix(finalPosition.x, f, progress);
    }
    gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPosition, 1.0);
}
`

// Fragment shader
const fragmentShader = `
varying vec2 vUv;
uniform sampler2D posterTexture;
uniform sampler2D photoTexture;
uniform sampler2D logoTexture;
uniform float progress;
uniform bool showBorder;
uniform vec3 borderColor;
uniform float windowWidth;
uniform float aspectRatio;
uniform float blendFactor;

vec4 fromLinear(vec4 linearRGB) {
    bvec4 cutoff = lessThan(linearRGB, vec4(0.0031308));
    vec4 higher = vec4(1.055)*pow(linearRGB, vec4(1.0/2.4)) - vec4(0.055);
    vec4 lower = linearRGB * vec4(12.92);
    return mix(higher, lower, cutoff);
}

void main() {
    vec2 uv = vUv;
    float posterAspectRatio = 1.333;
    float md = 1024.0;
    float sm = 768.0;
    bool condition = aspectRatio < 0.75 || (windowWidth < sm && aspectRatio < 1.);
    float windowHeight = windowWidth / aspectRatio;
    float posterWidth = windowWidth;
    float textureScaleFactor = 1.0;
    if (condition) {
        posterWidth = windowHeight * 0.75;
        textureScaleFactor = aspectRatio;
    }
    vec2 logoUv = uv;
    float xCenter = 0.5;
    float offsetYinPixel = mix(0.0, -32.0, progress);
    float pY = offsetYinPixel / (posterWidth*posterAspectRatio);
    float yCenter = 1.0 - pY;
    float logoWidth = posterWidth > md ? 200.0 : 137.0;
    logoWidth = mix(posterWidth/120., logoWidth, progress);
    vec2 logoSize = vec2(logoWidth / posterWidth, (logoWidth / posterWidth/posterAspectRatio) / 1.05);
    logoSize.x = mix(.1, logoSize.x, progress);
    logoSize.y = mix(.1/posterAspectRatio, logoSize.y, progress);
    logoUv.x = (logoUv.x - xCenter) / logoSize.x + xCenter;
    logoUv.y = (logoUv.y - yCenter) / logoSize.y + yCenter;
    vec4 logo = texture2D(logoTexture, logoUv);
    vec2 ppUv = uv;
    if (condition) {
        ppUv.x = (ppUv.x - 0.5) / textureScaleFactor*.75 + 0.5;
        float pY2 = 1.;
        ppUv.y = (ppUv.y - pY2) / textureScaleFactor*.75 + pY2;
        ppUv.y += 40./ (windowWidth*posterAspectRatio);
    } else {
        float posterSize = posterWidth > md ? 1000. : 500.;
        ppUv.x = (ppUv.x - xCenter) / (posterSize / posterWidth) + xCenter;
        ppUv.y = (ppUv.y - 1.) / (posterSize / posterWidth) + 1.;
        ppUv.y += 0.02;
    }
    ppUv.x = mix(uv.x, ppUv.x, progress);
    ppUv.y = mix(uv.y, ppUv.y, progress);
    vec4 poster = texture2D(posterTexture, ppUv);
    poster = mix(poster, fromLinear(vec4(borderColor.r, borderColor.g, borderColor.b, 1.0)), logo.a);
    vec2 pUv = uv;
    pUv.y *= 1.333;
    float edge = .05;
    edge -= progress*edge;
    pUv /= 1.0 - edge*2.;
    pUv.x -= edge;
    pUv.y -= edge - (progress*.05*1.5);
    if (condition) {
        float pUvY = (ppUv.y - 1.) * aspectRatio * 1.75 + 1.;
        pUvY += aspectRatio / 2.;
        pUvY += 40./ (posterWidth*posterAspectRatio);
        pUv.y = mix(pUv.y, pUvY, progress);
        pUv.y /= 1.333;
    } else {
        float _pUvY = pUv.y;
        _pUvY += .25;
        _pUvY /= 1.333;
        _pUvY -= .25;
        _pUvY += (posterWidth > md ? 350. : 175.) / (posterWidth);
        pUv.y = mix(pUv.y/1.333, _pUvY - .1, progress);
    }
    pUv.x -= 0.5;
    pUv.x += 0.5;
    pUv.y += mix(0.2, 0.0, progress);
    vec4 photo = texture2D(photoTexture, pUv);
    float a = 0.0;
    float ofY = condition ? 0.0 : .1;
    if (pUv.x > edge && pUv.x < 1.-edge && pUv.y > (edge*1.4 + mix(.18, 0., progress)) && pUv.y < (1.-edge - mix(.025, ofY, progress))) {
        a = 1.0;
    }
    poster = mix(poster, photo, a);
    vec4 fin = vec4(poster.r, poster.g, poster.b, poster.a);
    if (gl_FrontFacing) {
        gl_FragColor = fin;
    } else {
        gl_FragColor = mix(vec4(vec3(.95), poster.a), fin, 0.01);
    }
}
`

function hexToVec3(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  return new THREE.Vector3(r, g, b)
}

export function useChapterScene() {
  let renderer, scene, camera, groupG, carousel
  let animFrame
  let posters = []
  let videoElements = []
  let videoTextures = []
  let canvasEl
  let width, height, aspectRatio
  // Original starts mouse at screen (-10,-10)px → normalized ≈ (-1,-1)
  // Camera parallax formula: pos.x += mouse.x * 0.7 - (pos.x - base.x) / 18
  // So mouse.x = -1 pushes camera hard left → cards appear left-biased
  let mouse = new THREE.Vector2(-1.0, -1.0)
  let prevMouse = new THREE.Vector2(-1.0, -1.0)
  let raycaster = new THREE.Raycaster()
  let hoveredIndex = -1
  let selectedIndex = -1
  let isIntro = true
  let introComplete = false
  let isMobile = false

  const N = 8
  const baseDistance = 42  // slight pull-back to reduce Wine O'Clock dominance
  const introDistance = 75
  const SELECTED_Y = -70

  let scrollRotationY = 0
  let carouselTargetRot = 0

  let onSelectCallback = null
  let onHoverCallback = null

  const textureLoader = new THREE.TextureLoader()

  function loadTexture(url) {
    return new Promise((resolve) => {
      // For SVG files, use canvas-based approach for reliability
      if (url.endsWith('.svg')) {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          canvas.width = 512
          canvas.height = 512
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, 512, 512)
          const tex = new THREE.CanvasTexture(canvas)
          tex.colorSpace = THREE.SRGBColorSpace
          resolve(tex)
        }
        img.onerror = () => {
          // fallback
          const canvas = document.createElement('canvas')
          canvas.width = 2; canvas.height = 2
          const ctx = canvas.getContext('2d')
          ctx.fillStyle = '#888'
          ctx.fillRect(0, 0, 2, 2)
          resolve(new THREE.CanvasTexture(canvas))
        }
        // Use blob URL approach for cross-origin SVG
        fetch(url)
          .then(r => r.blob())
          .then(blob => { img.src = URL.createObjectURL(blob) })
          .catch(() => { img.src = url })
        return
      }
      textureLoader.load(
        url,
        (tex) => resolve(tex),
        undefined,
        () => {
          // Create blank fallback
          const canvas = document.createElement('canvas')
          canvas.width = 2; canvas.height = 2
          const ctx = canvas.getContext('2d')
          ctx.fillStyle = '#888'
          ctx.fillRect(0, 0, 2, 2)
          resolve(new THREE.CanvasTexture(canvas))
        }
      )
    })
  }

  async function init(canvas) {
    canvasEl = canvas
    width = window.innerWidth
    height = window.innerHeight
    aspectRatio = width / height
    isMobile = aspectRatio < 1

    // Renderer
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.NoToneMapping

    // Scene
    scene = new THREE.Scene()

    // Camera
    camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 1000)
    if (isMobile) {
      camera.position.set(0, 0, 110)
    } else {
      camera.position.set(0, -15, 100)
    }
    camera.basePosition = camera.position.clone()
    scene.add(camera)

    // Groups — use YXZ order to match original GSAP-driven Euler decomposition
    groupG = new THREE.Group()
    groupG.rotation.order = 'YXZ'
    if (isMobile) {
      groupG.rotation.set(toRad(22), 0, 0)
    } else {
      groupG.rotation.set(toRad(25), toRad(-70), toRad(15))
    }
    scene.add(groupG)

    carousel = new THREE.Group()
    // 45° offset rotates Wine O'Clock (i=3, intRot=135°) to effective 180° = dominant front position
    carousel.animatedRotationY = THREE.MathUtils.degToRad(90)
    groupG.add(carousel)

    // Load logo texture
    const logoTexture = await loadTexture('/images/logo.png')

    // Add floating title texture plane (txt-1.png by default)
    const txtTex = await loadTexture('/images/txt-1.png')
    txtTex.wrapS = THREE.ClampToEdgeWrapping
    txtTex.wrapT = THREE.ClampToEdgeWrapping
    const txtGeo = new THREE.PlaneGeometry(60, 60)
    const txtMat = new THREE.MeshBasicMaterial({ map: txtTex, transparent: true, opacity: 1.0, depthWrite: false })
    const txtMesh = new THREE.Mesh(txtGeo, txtMat)
    txtMesh.position.set(0, 0, 0)
    groupG.add(txtMesh)
    groupG.userData.txtMesh = txtMesh
    groupG.userData.txtMat = txtMat
    logoTexture.wrapS = THREE.ClampToEdgeWrapping
    logoTexture.wrapT = THREE.ClampToEdgeWrapping

    // Create video elements
    for (let i = 0; i < 4; i++) {
      const vid = document.createElement('video')
      vid.src = CHAPTERS[i].video
      vid.loop = true
      vid.muted = true
      vid.playsInline = true
      vid.crossOrigin = 'anonymous'
      vid.preload = 'none'
      document.body.appendChild(vid) // must be in DOM for some browsers
      vid.style.position = 'absolute'
      vid.style.opacity = '0'
      vid.style.width = '1px'
      vid.style.height = '1px'
      vid.style.pointerEvents = 'none'
      videoElements.push(vid)

      const vt = new THREE.VideoTexture(vid)
      vt.minFilter = THREE.LinearFilter
      vt.magFilter = THREE.LinearFilter
      vt.colorSpace = THREE.SRGBColorSpace
      videoTextures.push(vt)
    }

    // Create poster meshes (8 total, 4 chapters × 2)
    const posterLoadTasks = []
    for (let i = 1; i <= N; i++) {
      const chapterIdx = i > 4 ? i - 4 : i  // 5→1, 6→2, etc.
      posterLoadTasks.push(createPoster(i, chapterIdx - 1, logoTexture))
    }
    posters = await Promise.all(posterLoadTasks)

    // Start render loop
    animate()

    // Intro animation
    runIntro()

    return { renderer, scene, camera }
  }

  async function createPoster(i, chapterIdx, logoTexture) {
    const chapter = CHAPTERS[chapterIdx]
    const intRotationY = i * 45  // degrees around ring
    const angleRad = toRad(intRotationY)

    // Placement: around ring at baseDistance
    const px = baseDistance * Math.cos(toRad(intRotationY))
    const pz = baseDistance * Math.sin(toRad(intRotationY))

    // Load poster SVG texture (the illustrated poster graphic) via canvas
    const posterTex = await loadTexture(chapter.svg)
    posterTex.wrapS = THREE.ClampToEdgeWrapping
    posterTex.wrapT = THREE.ClampToEdgeWrapping

    // Photo texture: video (will update on hover)
    const photoTex = videoTextures[chapterIdx]

    // Create geometry: 24x32 plane, 40x40 segments
    const geometry = new THREE.PlaneGeometry(24, 32, 40, 40)

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        posterTexture: { value: posterTex },
        photoTexture: { value: photoTex },
        logoTexture: { value: logoTexture },
        axisPosition: { value: new THREE.Vector3(0, 0, introDistance) },
        aspectRatio: { value: aspectRatio },
        uAngle: { value: 0.0 }, // each poster uses 0 angle; original also passes angle from constructor which defaults to 0 when unset
        blendFactor: { value: 0.0 },
        progress: { value: 0.0 },
        showBorder: { value: false },
        borderColor: { value: hexToVec3(chapter.accent) },
        windowWidth: { value: width },
      },
      side: THREE.DoubleSide,
      transparent: true,
    })

    // Start at introDistance for intro animation
    const ipx = introDistance * Math.cos(toRad(intRotationY))
    const ipz = introDistance * Math.sin(toRad(intRotationY))

    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(ipx, 0, ipz)
    // Match original: rotation.y = toRad(-90 - intRotationY)
    mesh.rotation.y = toRad(-90 - intRotationY)
    mesh.userData = { chapterIdx, i, posterIndex: i }
    carousel.add(mesh)

    // Invisible hitbox for raycasting — child of mesh so it follows mesh transforms
    const hitGeo = new THREE.BoxGeometry(24, 32, 1)
    const hitMat = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
      depthWrite: false,
    })
    const hitbox = new THREE.Mesh(hitGeo, hitMat)
    hitbox.userData = { chapterIdx, i, isPosterHitbox: true }
    mesh.add(hitbox)

    return {
      mesh,
      hitbox,
      material,
      chapterIdx,
      i,
      intRotationY,
      baseX: px,
      baseZ: pz,
      introX: ipx,
      introZ: ipz,
      baseY: 0,
    }
  }

  function runIntro() {
    isIntro = true
    introComplete = false

    // Animate carousel spin: 720° over 6s, with small offset so Wine O'Clock faces front
    const startRot = THREE.MathUtils.degToRad(90) // 45° offset: Wine O'Clock (i=3, intRot=135°) → effective 180° = dominant front
    carousel.animatedRotationY = startRot
    const rotProxy = { val: startRot }
    gsap.to(rotProxy, {
      val: Math.PI * 4 + startRot,
      duration: 6,
      ease: 'power3.inOut',
      onUpdate: () => {
        carousel.animatedRotationY = rotProxy.val
      },
    })

    // Camera mouse-based lean animation  
    // Original: mouse starts at screen (-10,-10)px → normalized ≈ (-1,-1), animates to center (0,0 in our 0-1 system = 0.5,0.5 → net 0 parallax)
    const camMouseProxy = { x: -1.0, y: -1.0 }
    gsap.to(camMouseProxy, {
      x: 0.0,
      y: 0.0,
      duration: 6,
      ease: 'power3.inOut',
      onUpdate: () => {
        mouse.set(camMouseProxy.x, camMouseProxy.y)
        prevMouse.set(camMouseProxy.x, camMouseProxy.y)
      },
    })

    // Posters intro: animate from far (introDistance) to baseDistance
    // by moving mesh positions and updating axisPosition uniform
    posters.forEach((p, idx) => {
      const delay = 0.2 * idx + 3
      const distProxy = { d: introDistance }
      gsap.to(distProxy, {
        d: baseDistance,
        duration: 1.5,
        delay,
        ease: 'power3.inOut',
        onUpdate: () => {
          const angle = toRad(p.intRotationY)
          p.mesh.position.x = distProxy.d * Math.cos(angle)
          p.mesh.position.z = distProxy.d * Math.sin(angle)
          if (p.material.uniforms.axisPosition) {
            p.material.uniforms.axisPosition.value.z = distProxy.d
          }
        },
        onComplete: () => {
          p.mesh.position.x = p.baseX
          p.mesh.position.z = p.baseZ
          if (p.material.uniforms.axisPosition) {
            p.material.uniforms.axisPosition.value.z = baseDistance
          }
        },
      })
    })

    // Mark intro complete
    gsap.delayedCall(7, () => {
      isIntro = false
      introComplete = true
    })
  }

  function animate() {
    animFrame = requestAnimationFrame(animate)

    // Lerp mouse
    prevMouse.x += (mouse.x - prevMouse.x) * 0.05
    prevMouse.y += (mouse.y - prevMouse.y) * 0.05

    // Camera parallax from mouse — original formula: pos += mouse*ne - (pos-base)/oe
    // This is a stable spring: net force = mouse*ne - displacement/oe
    if (selectedIndex === -1) {
      const mx = isMobile ? 0 : prevMouse.x
      const my = isMobile ? 0 : prevMouse.y
      const ne = 0.7, oe = 18
      // Clamp position to prevent runaway accumulation
      const dx = camera.position.x - camera.basePosition.x
      const dy = camera.position.y - camera.basePosition.y
      camera.position.x = camera.basePosition.x + Math.max(-5, Math.min(5, dx + mx * ne - dx / oe))
      camera.position.y = camera.basePosition.y + Math.max(-5, Math.min(5, dy + (-my) * ne - dy / oe))
      camera.position.z = camera.basePosition.z
      camera.lookAt(new THREE.Vector3(0, camera.basePosition.y, 0))
    }

    // Update video textures for active videos
    videoTextures.forEach((vt, i) => {
      const vid = videoElements[i]
      if (vid && vid.readyState >= 2 && !vid.paused) {
        vt.needsUpdate = true
      }
    })

    // Update carousel rotation
    const totalRot = carousel.animatedRotationY + scrollRotationY
    carousel.rotation.y = totalRot

    // Update uniforms
    posters.forEach((p) => {
      if (p.material.uniforms) {
        p.material.uniforms.aspectRatio.value = aspectRatio
        p.material.uniforms.windowWidth.value = width
      }
    })

    renderer.render(scene, camera)
  }

  function getHoveredPoster(clientX, clientY) {
    const ndcX = (clientX / width) * 2 - 1
    const ndcY = -(clientY / height) * 2 + 1
    raycaster.setFromCamera(new THREE.Vector2(ndcX, ndcY), camera)
    // hitboxes are now children of meshes, use recursive intersect
    const meshes = posters.map((p) => p.mesh)
    const intersects = raycaster.intersectObjects(meshes, true)
    if (intersects.length > 0) {
      // find userData from the hit object or its parent
      const obj = intersects[0].object
      const data = obj.userData.isPosterHitbox ? obj.userData : (obj.parent && obj.parent.userData)
      if (data && data.chapterIdx !== undefined) return data.chapterIdx
    }
    return -1
  }

  function onMouseMove(e) {
    mouse.x = e.clientX / width
    mouse.y = e.clientY / height

    if (!introComplete || selectedIndex !== -1) return

    const chIdx = getHoveredPoster(e.clientX, e.clientY)

    if (chIdx !== hoveredIndex) {
      if (hoveredIndex !== -1) {
        // Unhover previous
        unhoverChapter(hoveredIndex)
        if (onHoverCallback) onHoverCallback(hoveredIndex, false)
      }
      hoveredIndex = chIdx
      if (chIdx !== -1) {
        hoverChapter(chIdx)
        if (onHoverCallback) onHoverCallback(chIdx, true)
      }
    }
  }

  function hoverChapter(chIdx) {
    const targets = posters.filter((p) => p.chapterIdx === chIdx)
    targets.forEach((p) => {
      gsap.to(p.material.uniforms.blendFactor, {
        value: 2.0,
        duration: 1.0,
        ease: 'power2.inOut',
        overwrite: true,
      })
      gsap.to(p.mesh.position, {
        y: p.baseY + 7,
        duration: 1.0,
        ease: 'power2.inOut',
        overwrite: true,
      })
    })
    // Play video
    const vid = videoElements[chIdx]
    if (vid) {
      vid.play().catch(() => {})
    }
  }

  function unhoverChapter(chIdx) {
    const targets = posters.filter((p) => p.chapterIdx === chIdx)
    targets.forEach((p) => {
      gsap.to(p.material.uniforms.blendFactor, {
        value: 0.0,
        duration: 1.0,
        ease: 'power2.inOut',
        overwrite: true,
      })
      gsap.to(p.mesh.position, {
        y: p.baseY,
        duration: 1.0,
        ease: 'power2.inOut',
        overwrite: true,
      })
    })
    const vid = videoElements[chIdx]
    if (vid) {
      vid.pause()
    }
  }

  function onClick(e) {
    if (!introComplete || selectedIndex !== -1) return

    const chIdx = getHoveredPoster(e.clientX, e.clientY)
    if (chIdx !== -1) {
      selectChapter(chIdx)
    }
  }

  function selectChapter(chIdx) {
    selectedIndex = chIdx
    if (onSelectCallback) onSelectCallback(chIdx)

    const tl = gsap.timeline()

    // Fade out txt mesh
    if (groupG.userData.txtMat) {
      tl.to(groupG.userData.txtMat, { opacity: 0, duration: 1, ease: 'power2.inOut' }, 0)
    }

    // Find the right poster to bring front — chapter copy facing camera
    const targetPoster = posters.find((p) => p.chapterIdx === chIdx)
    if (targetPoster) {
      const targetRot = -(targetPoster.intRotationY * Math.PI / 180)
      const proxy = { val: carousel.animatedRotationY }
      tl.to(proxy, {
        val: targetRot,
        duration: 3,
        ease: 'power3.inOut',
        onUpdate: () => { carousel.animatedRotationY = proxy.val },
      }, 0)
    }

    // Move carousel down
    tl.to(carousel.position, { y: SELECTED_Y, duration: 3, ease: 'power3.inOut' }, 0)

    // Flatten groupG
    tl.to(groupG.rotation, { x: 0, y: 0, z: 0, duration: 3, ease: 'power3.inOut' }, 0)

    // Animate selected poster to fill screen
    posters.filter((p) => p.chapterIdx === chIdx).forEach((p) => {
      tl.to(p.material.uniforms.blendFactor, { value: 1.0, duration: 2, ease: 'power3.inOut' }, 0)
      tl.to(p.material.uniforms.progress, { value: 1.0, duration: 2, ease: 'power3.inOut' }, 0)
      const s = aspectRatio * 2.07
      tl.to(p.mesh.scale, { x: s, y: s, z: 1, duration: 2, ease: 'power3.inOut' }, 0)
    })

    // Hide other posters
    posters.filter((p) => p.chapterIdx !== chIdx).forEach((p, idx) => {
      tl.to(p.mesh.position, { y: -30 - idx * 8, duration: 2, ease: 'power3.inOut' }, 0)
    })
  }

  function deselectChapter() {
    if (selectedIndex === -1) return
    const tl = gsap.timeline({
      onComplete: () => { selectedIndex = -1 }
    })

    // Restore txt mesh
    if (groupG.userData.txtMat) {
      tl.to(groupG.userData.txtMat, { opacity: 1, duration: 1, ease: 'power2.inOut' }, 0)
    }

    // Restore groupG
    if (isMobile) {
      tl.to(groupG.rotation, { x: toRad(22), y: 0, z: 0, duration: 2.5, ease: 'power3.inOut' }, 0)
    } else {
      tl.to(groupG.rotation, { x: toRad(25), y: toRad(-70), z: toRad(15), duration: 2.5, ease: 'power3.inOut' }, 0)
    }

    // Restore carousel
    tl.to(carousel.position, { y: 0, duration: 2.5, ease: 'power3.inOut' }, 0)

    // Reset all posters
    posters.forEach((p) => {
      tl.to(p.material.uniforms.blendFactor, { value: 0, duration: 1.5, ease: 'power3.inOut' }, 0)
      tl.to(p.material.uniforms.progress, { value: 0, duration: 1.5, ease: 'power3.inOut' }, 0)
      tl.to(p.mesh.scale, { x: 1, y: 1, z: 1, duration: 1.5, ease: 'power3.inOut' }, 0)
      tl.to(p.mesh.position, { y: p.baseY, duration: 1.5, ease: 'power3.inOut' }, 0)
    })

    hoveredIndex = -1
  }

  function onScroll(delta) {
    if (!introComplete || selectedIndex !== -1) return
    scrollRotationY -= delta * 0.0008
  }

  function onResize(w, h) {
    width = w
    height = h
    aspectRatio = w / h
    isMobile = aspectRatio < 1
    camera.aspect = aspectRatio
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)

    if (isMobile && selectedIndex === -1) {
      groupG.rotation.set(toRad(22), 0, 0)
    } else if (!isMobile && selectedIndex === -1) {
      groupG.rotation.set(toRad(25), toRad(-70), toRad(15))
    }
  }

  function destroy() {
    if (animFrame) cancelAnimationFrame(animFrame)
    videoElements.forEach((v) => {
      v.pause()
      v.src = ''
      if (v.parentNode) v.parentNode.removeChild(v)
    })
    renderer?.dispose()
  }

  function onSelect(cb) { onSelectCallback = cb }
  function onHover(cb) { onHoverCallback = cb }

  return {
    init,
    onMouseMove,
    onClick,
    onScroll,
    onResize,
    destroy,
    onSelect,
    onHover,
    deselectChapter,
    getState: () => ({ selectedIndex, hoveredIndex, introComplete }),
  }
}
