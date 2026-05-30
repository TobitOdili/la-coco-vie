import * as THREE from 'three'
import { gsap } from 'gsap'

const toRad = (deg) => (deg * Math.PI) / 180

// Base URL — Vite injects this at build time (e.g. /la-coco-vie/ on GitHub Pages, / on Vercel)
const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
const asset = (path) => `${base}${path}`

// Chapter data
export const CHAPTERS = [
  {
    slug: 'eat-marry-love',
    title: 'Eat, Merry, Love',
    accent: '#B32C05',
    accentLight: '#F3EBE4',
    accentLighter: '#f0d7bf',
    audio: asset('/audio/eat-merry-love.mp3'),
    video: asset('/video/eat-intro.mp4'),
    poster: asset('/images/poster-1.jpg'),
    txt: asset('/images/txt-1.png'),
    svg: asset('/images/p1.svg'),
    index: 0,
  },
  {
    slug: 'la-storia',
    title: "La Storia Dell'eleganza",
    accent: '#304443',
    accentLight: '#D7DDDD',
    accentLighter: '#a0aeae',
    audio: asset('/audio/la-storia.mp3'),
    video: asset('/video/la-intro.mp4'),
    poster: asset('/images/poster-2.jpg'),
    txt: asset('/images/txt-2.png'),
    svg: asset('/images/p2.svg'),
    index: 1,
  },
  {
    slug: 'wine-o-clock',
    title: "Wine O'Clock",
    accent: '#353454',
    accentLight: '#D6D5E8',
    accentLighter: '#b3b0db',
    audio: asset('/audio/wine-time.mp3'),
    video: asset('/video/wine-intro.mp4'),
    poster: asset('/images/poster-3.jpg'),
    txt: asset('/images/txt-3.png'),
    svg: asset('/images/p3.svg'),
    index: 2,
  },
  {
    slug: 'amour-getaway',
    title: 'Amour Getaway',
    accent: '#7E3C48',
    accentLight: '#FFE7F7',
    accentLighter: '#f0c3e1',
    audio: asset('/audio/amour-getway.mp3'),
    video: asset('/video/amour-intro.mp4'),
    poster: asset('/images/poster-4.jpg'),
    txt: asset('/images/txt-4.png'),
    svg: asset('/images/p4.svg'),
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
uniform float uOpacity;

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
    vec4 outColor;
    if (gl_FrontFacing) {
        outColor = fin;
    } else {
        // Original: back face renders as near-white (blends with white background)
        outColor = mix(vec4(vec3(.95), poster.a), fin, 0.01);
    }
    // Depth-based opacity falloff — far-side ring cards fade out (Issue #6)
    outColor.a *= uOpacity;
    gl_FragColor = outColor;
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
  let txtTextures = []
  let currentTxtChapter = 0              // chapter shown on the center txtMesh (#9/#14)
  const _frontVec = new THREE.Vector3()  // scratch vec for front-card detection (#14)
  let canvasEl
  let width, height, aspectRatio
  // Original source:
  // x = {x: -10, y: -10} initially (way off-screen left, creates strong left-bias during intro)
  // be = {x: 0, y: -0.5} (used for hover raycasting, separate from camera parallax)
  // Camera uses x.x, x.y directly; parallax = f(x.x, 0, w.value)*ne - dx/oe
  // During carousel (w.value=0): full mouse parallax
  // f is lerp: f(a,b,t) = a*(1-t) + b*t
  let mouse = new THREE.Vector2(-10.0, -10.0)  // matches original x start
  let prevMouse = new THREE.Vector2(-10.0, -10.0)
  let raycaster = new THREE.Raycaster()
  let hoveredIndex = -1
  let selectedIndex = -1
  let isIntro = true
  let introComplete = false
  let isMobile = false

  const N = 8
  const baseDistance = 40  // original source: ve=40
  const introDistance = 75
  // Selected card resting Y. The shader's progress=1 layout frames the content into
  // a sub-region of the plane, so scale/position are hand-tuned (not camera-derived):
  // scale = aspectRatio*2.07, this Y top-anchors the content band as the hero.
  // (Step A of the card-becomes-the-page rework — see docs/PHASE-2-INNER-PAGES.md.)
  const SELECTED_Y = -43
  // Scroll-coupling (P1, "card-becomes-the-page"): while a chapter is open, the
  // hero card is moved UP at the same on-screen rate as the inner-page DOM content
  // scrolls in (1:1 screen-pixel coupling) so the card "scrolls away" with no seam
  // — the page scroll (Lenis) is the single clock, fed in via setScroll().
  const HERO_SCROLL_FACTOR = 1.0   // 1.0 = exact lockstep; tune if the seam drifts
  // Depth-based opacity falloff (Issue #6): cards nearer than NEAR are fully
  // opaque, beyond FAR fade to DEPTH_FADE_FLOOR — fades the far side of the ring
  // toward faint ghosts (the original keeps back cards barely visible, not gone).
  const DEPTH_FADE_NEAR = 95
  const DEPTH_FADE_FAR = 125
  const DEPTH_FADE_FLOOR = 0.2

  let scrollRotationY = 0
  let selectedHero = null   // the single poster scaled up as the full-screen hero (P1)
  let scrollOffsetPx = 0    // inner-page scroll position in px (from Lenis) — drives the hero up/away
  let preSelectRot = 0  // carousel.animatedRotationY before a select — restored on deselect (reverse spin)
  let carouselTargetRot = 0
  let carouselLerpTarget = 0  // smooth lerp target like original f(current, target, .06)
  // Scroll-driven chapter exit (Issue #7): accumulate back-scroll while a chapter
  // is open; past the threshold run the reverse animation. The flags gate against
  // re-triggering during the select-in / deselect-out animations.
  let scrollExitAccum = 0
  let isSelecting = false
  let isDeselecting = false
  const SCROLL_EXIT_THRESHOLD = 500

  let onSelectCallback = null
  let onHoverCallback = null
  let onDeselectCallback = null
  let onReadyCallback = null  // fired once when the intro finishes (for deep-link selection)

  // Loading progress (Issue #12) — gate the loader on real asset loads.
  // 13 textures load during init(): 1 logo + 4 txt + 8 poster SVGs.
  // Videos use preload='none' so they don't block and aren't counted.
  let onProgressCallback = null
  let assetsLoaded = 0
  const totalAssets = 1 + CHAPTERS.length + N
  function reportProgress() {
    assetsLoaded += 1
    const pct = Math.min(100, Math.round((assetsLoaded / totalAssets) * 100))
    if (onProgressCallback) onProgressCallback(pct)
  }

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

  function getViewportSize() {
    // Use canvas-container's bounding rect — matches original exactly.
    // This avoids window.innerHeight including mobile browser chrome.
    const container = document.getElementById('canvas-container')
    if (container) {
      const rect = container.getBoundingClientRect()
      return { w: Math.round(rect.width), h: Math.round(rect.height) }
    }
    // Fallback before DOM is ready
    return { w: window.innerWidth, h: window.innerHeight }
  }

  async function init(canvas) {
    canvasEl = canvas
    const vp = getViewportSize()
    width = vp.w
    height = vp.h
    aspectRatio = width / height
    isMobile = aspectRatio < 1

    // Renderer
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    // Don't update canvas style (CSS controls it via 100dvh)
    renderer.setSize(width, height, false)
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

    // Groups — original source uses default XYZ order (never sets rotation.order)
    groupG = new THREE.Group()
    // Do NOT set rotation.order — use THREE.js default 'XYZ' to match original
    if (isMobile) {
      groupG.rotation.set(toRad(22), 0, 0)
    } else {
      // Original source confirmed: W = (degToRad(25), degToRad(70), degToRad(15)) — +70°
      groupG.rotation.set(toRad(25), toRad(70), toRad(15))
    }
    scene.add(groupG)

    carousel = new THREE.Group()
    // Original: B.animatedRotationY = 0, animates to degToRad(360*2) = 720°
    carousel.animatedRotationY = 0
    carousel.rotation.y = 0
    groupG.add(carousel)

    // Load logo texture
    const logoTexture = await loadTexture(asset('/images/logo.png'))
    reportProgress()

    // Add floating title texture plane — preload all 4 chapter txt textures so
    // hover can swap them in (Issue #9). Default to chapter 0 (txt-1.png) on init.
    // IMPORTANT: added to scene root (not groupG) so it doesn't inherit groupG's
    // 25°/70°/15° tilt. lookAt(camera) called every frame keeps it facing the viewer.
    // This matches original: D.add(F) where D=scene, F=txt mesh, F.lookAt(O.position) per frame.
    txtTextures = await Promise.all(
      CHAPTERS.map((ch) => loadTexture(ch.txt).then((t) => { reportProgress(); return t }))
    )
    txtTextures.forEach((t) => {
      t.wrapS = THREE.ClampToEdgeWrapping
      t.wrapT = THREE.ClampToEdgeWrapping
    })
    const txtGeo = new THREE.PlaneGeometry(60, 60)
    const txtMat = new THREE.MeshBasicMaterial({ map: txtTextures[0], transparent: true, opacity: 1.0, depthWrite: false, alphaTest: 0.5 })
    txtMat.toneMapped = false
    const txtMesh = new THREE.Mesh(txtGeo, txtMat)
    // y=-8 pushes the text lower on screen so it clears the top logo/subtitle
    // (Issue #11 — at y=0 it projected too high given the camera tilt). z=20
    // matches original (le.position.z = 20).
    txtMesh.position.set(0, -8, 20)
    scene.add(txtMesh)
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

    // Start render loop — use lerped rotation like the original
    animate()

    // Intro animation
    runIntro()

    // TEMP debug (Phase 2 hero geometry): expose per-poster world orientation so we
    // can identify the front art-facing copy + tilt source via Browserless. Remove
    // once the hero is dialed in.
    if (typeof window !== 'undefined') {
      window.__heroDebug = () => {
        const camPos = camera.position.clone()
        const v = new THREE.Vector3()
        const n = new THREE.Vector3()
        return posters.map((p) => {
          p.mesh.updateWorldMatrix(true, false)
          p.mesh.getWorldPosition(v)
          n.set(0, 0, 1).transformDirection(p.mesh.matrixWorld)
          const toCam = camPos.clone().sub(v).normalize()
          return {
            i: p.i, chapterIdx: p.chapterIdx,
            x: +v.x.toFixed(1), y: +v.y.toFixed(1), z: +v.z.toFixed(1),
            dist: +v.distanceTo(camPos).toFixed(1),
            normalDotCam: +n.dot(toCam).toFixed(2),
            scaleX: +p.mesh.scale.x.toFixed(2),
            blend: +p.material.uniforms.blendFactor.value.toFixed(2),
            progress: +p.material.uniforms.progress.value.toFixed(2),
          }
        })
      }
      window.__camDebug = () => ({
        x: +camera.position.x.toFixed(1), y: +camera.position.y.toFixed(1), z: +camera.position.z.toFixed(1),
        groupRot: { x: +groupG.rotation.x.toFixed(3), y: +groupG.rotation.y.toFixed(3), z: +groupG.rotation.z.toFixed(3) },
        carouselRotY: +carousel.rotation.y.toFixed(3), carouselPosY: +carousel.position.y.toFixed(1),
      })
      // What does a click at screen (x,y) resolve to, vs the front-facing card?
      window.__probe = (x, y) => {
        const slot = getHoveredPoster(x, y)
        const slugs = CHAPTERS.map((c) => c.slug)
        const fc = frontChapterIdx()
        const hc = chapterIdxForSlot(slot)
        return {
          frontChapter: fc, frontSlug: slugs[fc],
          hoverSlot: slot, hoverChapter: hc, hoverSlug: slugs[hc],
          selectedIndex, carouselRotY: +carousel.rotation.y.toFixed(3),
        }
      }
    }

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
    reportProgress()
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
        uOpacity: { value: 1.0 },
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

    // Original: B.animatedRotationY starts at 0, animates to degToRad(360*2) = 720°
    carousel.animatedRotationY = 0
    carousel.rotation.y = 0
    carouselLerpTarget = 0
    const rotProxy = { val: 0 }
    gsap.to(rotProxy, {
      val: Math.PI * 4,  // 720° = degToRad(360*2)
      duration: 6,
      ease: 'power3.inOut',
      onUpdate: () => {
        carousel.animatedRotationY = rotProxy.val
      },
    })

    // Original: x starts at {x:-10, y:-10} then lerps to {x:.5, y:.5} over 6s
    // Camera parallax = x.x * 0.7 - dx/18
    // Starting at x=-10 → strong leftward bias → cards pushed RIGHT in screen space
    mouse.set(-10.0, -10.0)
    prevMouse.set(-10.0, -10.0)
    const camMouseProxy = { x: -10.0, y: -10.0 }
    gsap.to(camMouseProxy, {
      x: 0.5,
      y: 0.5,
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
      // Sync the center text to whichever card the intro left at front (Issue #14)
      setTxtChapter(frontChapterIdx(), true)
      // Let the app apply any deep-linked chapter now that selection is allowed (Phase 2)
      if (onReadyCallback) onReadyCallback()
    })
  }

  function animate() {
    animFrame = requestAnimationFrame(animate)

    // Original: E.x = f(E.x, x.x, 0.1), E.y = f(E.y, x.y, 0.001)
    // f(a,b,t) = a*(1-t)+b*t = lerp
    prevMouse.x = prevMouse.x * (1 - 0.1) + mouse.x * 0.1
    prevMouse.y = prevMouse.y * (1 - 0.001) + mouse.y * 0.001

    // Camera parallax from mouse — original formula: pos += mouse*ne - (pos-base)/oe
    // This is a stable spring: net force = mouse*ne - displacement/oe
    if (selectedIndex === -1) {
      // Original: camera.x += f(de, 0, w=0)*ne - dx/oe = de*ne - dx/oe
      // de = x.x (direct, no smoothing) for camera in original
      // No clamping in original!
      const mx = isMobile ? 0 : mouse.x   // x.x in original
      const my = isMobile ? 0 : mouse.y   // x.y in original
      const ne = 0.7, oe = 18
      const dx = camera.position.x - camera.basePosition.x
      const dy = camera.position.y - camera.basePosition.y
      camera.position.x += mx * ne - dx / oe
      camera.position.y += my * (-ne) - dy / oe
      camera.position.z = camera.basePosition.z
      camera.lookAt(new THREE.Vector3(0, camera.basePosition.y, 0))
    } else {
      // Selected: ease the camera back to its base (on-axis) position so the hero is
      // viewed front-on. Without this, parallax leaves the camera off-axis (frozen
      // wherever the mouse was) → the hero card looks skewed/off-center (Phase 2).
      camera.position.x += (camera.basePosition.x - camera.position.x) * 0.08
      camera.position.y += (camera.basePosition.y - camera.position.y) * 0.08
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

    // Update carousel rotation — original uses lerp: f(current, target, 0.06)
    // B.rotation.y = f(B.rotation.y, (B.scrollRotationY??0) + parseFloat(B.animatedRotationY), .06)
    const targetRot = (scrollRotationY || 0) + (carousel.animatedRotationY || 0)
    carousel.rotation.y += (targetRot - carousel.rotation.y) * 0.06

    // Update uniforms — original: angle = xe*10 - (-scrollDelta/10 - 10)
    // xe = x.x (NOT E.x) in original - uses direct mouse/intro value, no smooth lerp
    // angle = x.x*10 - (-0 - 10) = x.x*10 + 10
    // At rest after intro (x.x=0.5): angle = 5 + 10 = 15°
    // During intro (x.x=-10): angle = -100 + 10 = -90°
    const currentUAngle = mouse.x * 10 + 10  // using mouse.x = x.x equivalent
    posters.forEach((p) => {
      if (p.material.uniforms) {
        p.material.uniforms.aspectRatio.value = aspectRatio
        p.material.uniforms.windowWidth.value = width
        p.material.uniforms.uAngle.value = currentUAngle

        // Depth-based opacity falloff (Issue #6) — fade the far side of the ring.
        // Only in carousel mode; selected/intro cards stay fully opaque. Lerped
        // so there's no pop when intro completes or as cards rotate through.
        let target = 1.0
        if (introComplete && selectedIndex === -1) {
          p.mesh.getWorldPosition(_frontVec)
          const dist = _frontVec.distanceTo(camera.position)
          const t = (dist - DEPTH_FADE_NEAR) / (DEPTH_FADE_FAR - DEPTH_FADE_NEAR)
          const op = 1.0 - Math.min(1, Math.max(0, t))
          const ss = op * op * (3 - 2 * op)  // smoothstep
          target = DEPTH_FADE_FLOOR + (1 - DEPTH_FADE_FLOOR) * ss
        }
        const cur = p.material.uniforms.uOpacity.value
        p.material.uniforms.uOpacity.value = cur + (target - cur) * 0.1
      }
    })

    // txt mesh always faces camera — matches original: F.lookAt(O.position) per frame
    if (groupG.userData.txtMesh) {
      groupG.userData.txtMesh.lookAt(camera.position)
    }

    // Keep center text synced to the front-facing card when idle (Issue #14).
    // Hover (#9) overrides; skip during intro and while a chapter is selected.
    if (introComplete && selectedIndex === -1 && hoveredIndex === -1) {
      setTxtChapter(frontChapterIdx())
    }

    // Scroll-couple the hero card to the inner page (P1). Move the card up by the
    // SAME number of on-screen pixels the page has scrolled, so it rises in lockstep
    // with the DOM content and scrolls cleanly away (no "purple overlay" seam).
    // worldPerPx = on-screen px → world-units at the card's depth (so Δworld·camera
    // projection == scroll px). Gated to the settled selected state; GSAP owns the
    // hero's Y during the select-in / deselect-out animations.
    if (selectedIndex !== -1 && selectedHero && !isSelecting && !isDeselecting) {
      selectedHero.mesh.getWorldPosition(_frontVec)
      const dz = Math.max(1, camera.position.z - _frontVec.z)
      const worldPerPx = (2 * dz * Math.tan(toRad(camera.fov / 2))) / height
      const eff = Math.min(scrollOffsetPx, height * 1.3)  // clamp once it's fully gone
      selectedHero.mesh.position.y = selectedHero.baseY + eff * worldPerPx * HERO_SCROLL_FACTOR
    }

    renderer.render(scene, camera)
  }

  // Returns the SLOT index (i, 1–8) of the specific poster hit — NOT chapterIdx.
  // Each chapter has two copies on the ring (front + mirrored back) sharing a
  // chapterIdx; hovering must affect only the one slot the cursor is over
  // (Issue #13). Use chapterIdxForSlot() to resolve the chapter when needed.
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
      if (data && data.i !== undefined) return data.i
    }
    return -1
  }

  // Resolve the chapter index (0–3) for a given slot index (i). Used for
  // chapter-keyed behaviour: video playback, txt swap, audio, selection.
  function chapterIdxForSlot(slotI) {
    const p = posters.find((p) => p.i === slotI)
    return p ? p.chapterIdx : -1
  }

  function onMouseMove(e) {
    // Original: x.x = de.x/width*2-1 (NDC), x.y = de.y/height*2-1 (NDC)
    // Camera parallax uses x.x and x.y directly (not be)
    mouse.x = (e.clientX / width) * 2 - 1
    mouse.y = (e.clientY / height) * 2 - 1

    if (!introComplete || selectedIndex !== -1) return

    // hoveredIndex now tracks the SLOT index (i) so only the single hovered
    // poster reacts — not its mirrored copy (Issue #13). chapterIdx is resolved
    // for the audio/cursor callback so app.vue still receives 0–3.
    const slotI = getHoveredPoster(e.clientX, e.clientY)

    if (slotI !== hoveredIndex) {
      if (hoveredIndex !== -1) {
        // Unhover previous slot
        const prevChIdx = chapterIdxForSlot(hoveredIndex)
        unhoverChapter(hoveredIndex)
        if (onHoverCallback) onHoverCallback(prevChIdx, false)
      }
      hoveredIndex = slotI
      if (slotI !== -1) {
        hoverChapter(slotI)
        if (onHoverCallback) onHoverCallback(chapterIdxForSlot(slotI), true)
      }
    }
  }

  // Crossfade the center txtMesh to a chapter's txt (Issues #9 + #14).
  // No-ops if that chapter is already showing.
  function setTxtChapter(chIdx, instant = false) {
    if (chIdx < 0 || chIdx === currentTxtChapter) return
    const txtMat = groupG.userData.txtMat
    const newTex = txtTextures[chIdx]
    if (!txtMat || !newTex) return
    currentTxtChapter = chIdx
    gsap.killTweensOf(txtMat)
    if (instant) {
      txtMat.map = newTex
      txtMat.needsUpdate = true
      txtMat.opacity = 1.0
      return
    }
    gsap.to(txtMat, {
      opacity: 0,
      duration: 0.15,
      ease: 'power1.out',
      onComplete: () => {
        txtMat.map = newTex
        txtMat.needsUpdate = true
        gsap.to(txtMat, { opacity: 1.0, duration: 0.25, ease: 'power1.in' })
      },
    })
  }

  // Chapter index of the poster currently nearest the camera (front-facing).
  // Robust to the group tilt + carousel rotation since it reads world positions.
  function frontChapterIdx() {
    let best = -1, bestDist = Infinity
    for (const p of posters) {
      p.mesh.getWorldPosition(_frontVec)
      const d = _frontVec.distanceToSquared(camera.position)
      if (d < bestDist) { bestDist = d; best = p.chapterIdx }
    }
    return best
  }

  function hoverChapter(slotI) {
    // Only the single hovered poster lifts (Issue #13) — not both ring copies.
    const p = posters.find((p) => p.i === slotI)
    if (!p) return
    const chIdx = p.chapterIdx

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

    // Play video (chapter-keyed)
    const vid = videoElements[chIdx]
    if (vid) {
      vid.play().catch(() => {})
    }

    // Swap center text to the hovered chapter (Issue #9). On unhover the animate
    // loop reverts it to the front-facing card's text (Issue #14).
    setTxtChapter(chIdx)
  }

  function unhoverChapter(slotI) {
    // Mirror of hoverChapter — only the single slot poster settles back down.
    const p = posters.find((p) => p.i === slotI)
    if (!p) return
    const chIdx = p.chapterIdx

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
    const vid = videoElements[chIdx]
    if (vid) {
      vid.pause()
    }
  }

  function onClick(e) {
    if (!introComplete || selectedIndex !== -1) return

    // Select the FRONT-facing card (the active one the center text reflects). The
    // raycast hitboxes are flat boxes at each card's un-bent origin, but the vertex
    // shader bends the cards — so a click on the visible front card frequently misses
    // or hits an offset neighbor ("a different card comes up"). frontChapterIdx() is
    // visual-accurate (nearest camera). Use a direct raycast hit only if it agrees with
    // the front card; otherwise default to the front card.
    const front = frontChapterIdx()
    const slotI = getHoveredPoster(e.clientX, e.clientY)
    const hit = slotI !== -1 ? chapterIdxForSlot(slotI) : -1
    const chIdx = hit === front ? hit : front
    if (chIdx !== -1) selectChapter(chIdx)
  }

  function selectChapter(chIdx) {
    if (chIdx === selectedIndex) return  // idempotent — safe to call from the route watcher
    selectedIndex = chIdx
    isSelecting = true
    scrollOffsetPx = 0   // start the hero at the top of the inner page (P1)
    if (onSelectCallback) onSelectCallback(chIdx)

    // overwrite:true on every tween so a re-select cleanly kills any still-settling
    // deselect tweens on the same objects (otherwise they stack → "floats weirdly").
    gsap.killTweensOf(carousel)
    const tl = gsap.timeline({ onComplete: () => { isSelecting = false } })

    // Fade out txt mesh
    if (groupG.userData.txtMat) {
      tl.to(groupG.userData.txtMat, { opacity: 0, duration: 1, ease: 'power2.inOut', overwrite: true }, 0)
    }

    // Pick ONE copy as the hero and rotate the carousel so THAT copy faces the camera.
    // A copy placed at ring angle φ (=intRotationY) sits at the front (local +Z, nearest
    // camera) when the carousel rotates to (φ − 90)°. The old `-(φ)` only coincidentally
    // worked for wine — for other chapters it parked the card at the SIDE (z≈0). Deriving
    // from the chosen copy fixes selection for every chapter.
    const heroPoster = posters.find((p) => p.chapterIdx === chIdx)
    selectedHero = heroPoster   // the card the inner-page scroll couples to (P1)
    preSelectRot = carousel.animatedRotationY
    const targetRot = (heroPoster.intRotationY - 90) * Math.PI / 180
    tl.to(carousel, { animatedRotationY: targetRot, duration: 3, ease: 'power3.inOut', overwrite: true }, 0)

    // Move carousel down
    tl.to(carousel.position, { y: SELECTED_Y, duration: 3, ease: 'power3.inOut', overwrite: true }, 0)

    // Flatten groupG
    tl.to(groupG.rotation, { x: 0, y: 0, z: 0, duration: 3, ease: 'power3.inOut', overwrite: true }, 0)

    // Scale tuned to the shader's progress=1 content framing (the wordmark/logo sit
    // at a fixed UV; over-scaling pushes them out of the hero). aspectRatio*2.07 is
    // the reference-tuned value.
    const s = aspectRatio * 2.07

    tl.to(heroPoster.material.uniforms.blendFactor, { value: 1.0, duration: 2, ease: 'power3.inOut', overwrite: true }, 0)
    tl.to(heroPoster.material.uniforms.progress, { value: 1.0, duration: 2, ease: 'power3.inOut', overwrite: true }, 0)
    tl.to(heroPoster.mesh.scale, { x: s, y: s, z: 1, duration: 2, ease: 'power3.inOut', overwrite: true }, 0)

    // Hide every other poster (including the same chapter's back copy)
    posters.filter((p) => p !== heroPoster).forEach((p, idx) => {
      tl.to(p.mesh.position, { y: -30 - idx * 8, duration: 2, ease: 'power3.inOut', overwrite: true }, 0)
    })
  }

  function deselectChapter() {
    if (selectedIndex === -1 || isDeselecting) return
    isDeselecting = true
    scrollOffsetPx = 0   // stop coupling; GSAP restores the hero's Y below (P1)
    gsap.killTweensOf(carousel)
    const tl = gsap.timeline({
      onComplete: () => { selectedIndex = -1; isDeselecting = false; selectedHero = null }
    })

    // Restore txt mesh
    if (groupG.userData.txtMat) {
      tl.to(groupG.userData.txtMat, { opacity: 1, duration: 1, ease: 'power2.inOut', overwrite: true }, 0)
    }

    // Reverse-spin the carousel back to where it was before the select (matches the
    // reference) — and resets animatedRotationY so the NEXT select spins again.
    tl.to(carousel, { animatedRotationY: preSelectRot, duration: 2.5, ease: 'power3.inOut', overwrite: true }, 0)

    // Restore groupG
    if (isMobile) {
      tl.to(groupG.rotation, { x: toRad(22), y: 0, z: 0, duration: 2.5, ease: 'power3.inOut', overwrite: true }, 0)
    } else {
      tl.to(groupG.rotation, { x: toRad(25), y: toRad(70), z: toRad(15), duration: 2.5, ease: 'power3.inOut', overwrite: true }, 0)
    }

    // Restore carousel
    tl.to(carousel.position, { y: 0, duration: 2.5, ease: 'power3.inOut', overwrite: true }, 0)

    // Reset all posters
    posters.forEach((p) => {
      tl.to(p.material.uniforms.blendFactor, { value: 0, duration: 1.5, ease: 'power3.inOut', overwrite: true }, 0)
      tl.to(p.material.uniforms.progress, { value: 0, duration: 1.5, ease: 'power3.inOut', overwrite: true }, 0)
      tl.to(p.mesh.scale, { x: 1, y: 1, z: 1, duration: 1.5, ease: 'power3.inOut', overwrite: true }, 0)
      tl.to(p.mesh.position, { y: p.baseY, duration: 1.5, ease: 'power3.inOut', overwrite: true }, 0)
    })

    hoveredIndex = -1
  }

  function onScroll(delta) {
    if (!introComplete) return

    // Scroll back (up) to exit a selected chapter (Issue #7). Accumulate upward
    // scroll so a deliberate gesture is needed; ignore while animating in/out.
    if (selectedIndex !== -1) {
      if (isSelecting || isDeselecting) return
      if (delta < 0) {
        scrollExitAccum += -delta
        if (scrollExitAccum >= SCROLL_EXIT_THRESHOLD) {
          scrollExitAccum = 0
          deselectChapter()
          if (onDeselectCallback) onDeselectCallback()
        }
      } else {
        scrollExitAccum = 0  // scrolling the other way cancels the gesture
      }
      return
    }

    scrollRotationY -= delta * 0.0008
  }

  // Inner-page scroll position (px), pushed in from the page's Lenis instance.
  // Read by animate() to scroll-couple the hero card (P1). No-op on the homepage
  // (the coupling block is gated by selectedIndex).
  function setScroll(px) {
    scrollOffsetPx = Math.max(0, px || 0)
  }

  function onResize(w, h) {
    const vp = getViewportSize()
    w = vp.w
    h = vp.h
    width = w
    height = h
    aspectRatio = w / h
    isMobile = aspectRatio < 1
    camera.aspect = aspectRatio
    camera.updateProjectionMatrix()
    renderer.setSize(w, h, false)

    if (isMobile && selectedIndex === -1) {
      groupG.rotation.set(toRad(22), 0, 0)
    } else if (!isMobile && selectedIndex === -1) {
      groupG.rotation.set(toRad(25), toRad(70), toRad(15))
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
  function onProgress(cb) { onProgressCallback = cb }
  function onDeselect(cb) { onDeselectCallback = cb }
  function onReady(cb) { onReadyCallback = cb }

  return {
    init,
    onMouseMove,
    onClick,
    onScroll,
    onResize,
    destroy,
    onSelect,
    onHover,
    onProgress,
    onDeselect,
    onReady,
    selectChapter,    // exposed so the route watcher can drive selection (Phase 2)
    deselectChapter,
    setScroll,        // inner-page scroll → hero card coupling (P1)
    getState: () => ({ selectedIndex, hoveredIndex, introComplete, isSelecting, isDeselecting }),
  }
}
