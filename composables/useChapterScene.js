import * as THREE from 'three'
import { gsap } from 'gsap'

const toRad = (deg) => (deg * Math.PI) / 180
const TWO_PI = Math.PI * 2

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
  let isDestroyed = false   // set in destroy() — gates the rAF restart + the intro ready callback
  let introAnims = []       // intro tweens + the ready delayedCall — tracked so destroy() can kill them
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
  let exitStart = null      // captured transforms at the start of a forward scroll-exit (step E)
  // NEGATIVE = the same direction a homepage down-scroll turns the ring (onScroll does scrollRotationY -=
  // delta*0.0008), so the exit flows into the homepage idle with NO spin reversal.
  const EXIT_SPIN = toRad(-300)
  const DROP_START = 0.45    // de at which the page is fully out → the unfurl + the second wine's drop begin
  const exitBg = new THREE.Color('#ffffff')  // scene background during the exit (set to the chapter accent)
  let exitBgAlpha = 0        // 0 = transparent (homepage) … 1 = opaque accent (selected/exit)
  // Bottom-exit timing (de = exit progress 0→1, driven by the page's OUTRO-section scroll). Phase A gathers
  // the deck into a tight low cluster behind the still-scrolling-out article; phase B unfurls it into the
  // homepage ring while the SECOND wine copy drops in from the top.
  //  • HERO_FIT_END — the second wine copy un-frames + shrinks to ring size by this de (EARLY, while still
  //    off-top + hidden) so its phase-B descent reads as a clean ring card, not a full-bleed morph.
  const HERO_FIT_END = 0.25
  // Exit "bowl": during phase A the ring gathers LOW + steeply tilted + at a small radius so you look down
  // INTO a tight cluster (the reference view); phase B rises + un-tilts + unfurls it to the homepage fan.
  const BOWL_Y = -58                                           // carousel.y at the bowl (below selected -43)
  const BOWL_TILT = { x: toRad(58), y: toRad(36), z: toRad(4) } // steep look-down (vs homepage 25/70/15)
  // Cluster radius: in phase A the whole deck gathers inward to this small radius (cards bunched/overlapping
  // = the reference's "tightly squeezed together" look), then unfurls back out to baseDistance over phase B.
  const CLUSTER_R = 18
  // The exit keeps ALL cards present + visible (the reference never hides the deck): one wine copy (the
  // mirror) rides in the cluster from the start; only the SECOND wine copy (the hero) waits off-top and
  // drops into its slot during the unfurl. endExit restores both to full opacity for the homepage ring.
  let preSelectRot = 0  // carousel.animatedRotationY before a select — restored on deselect (reverse spin)
  let deselectTl = null // live deselect timeline — killed if a new select starts mid-deselect
  let selectTl = null   // live select timeline — killed by deselect/re-select so its stale
                        // onComplete can't clear isSelecting early or start the video
  let carouselTargetRot = 0
  let carouselLerpTarget = 0  // smooth lerp target like original f(current, target, .06)
  // Animation gates: prevent re-triggering select/deselect/exit while one is mid-flight.
  // (The old scroll-driven #7 exit was removed — the inner page now owns scrolling and
  // triggers exits at its top/bottom edges; the scene ignores wheel while a chapter is open.)
  let isSelecting = false
  let isDeselecting = false

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
    // Pause the render loop while the tab is hidden (skips the per-frame WebGL render + the
    // depth/world-position work). GSAP keeps its own ticker so in-flight tweens still complete —
    // we just stop drawing while nobody's looking, and resume on return.
    document.addEventListener('visibilitychange', handleVisibility)

    // Intro animation
    runIntro()

    // Debug tooling — gated behind ?debug (e.g. /wine-o-clock?debug). Exposes scene
    // probes (__heroDebug/__camDebug/__probe), deterministic exit scrubbing
    // (__exitBegin/__exitScrub/__exitEnd — mirrors the reference's setPageProgress),
    // and the GSDevTools timeline scrubber UI. No-cost in normal sessions.
    const DEBUG = typeof window !== 'undefined' && /[?&]debug/.test(window.location.search)
    if (DEBUG) {
      // Scrub the forward exit by hand: __setScroll(px) to simulate inner-page scroll
      // (so the hero rises off the top like at the page bottom), then __exitBegin() →
      // __exitScrub(0..1) → __exitEnd() to verify the deck-rises/no-snap return.
      window.__setScroll = (px) => setScroll(px)
      window.__exitBegin = () => beginExit()
      window.__exitScrub = (de) => setExitProgress(de)
      window.__exitEnd = () => endExit()
      // GSAP DevTools — on-page scrubber for every tween/timeline (free since 3.13).
      // OPT-IN via console (`__gsdev()`), NOT auto-created: creating it hijacks the
      // global timeline (records, then pauses/loops at the recorded end), which froze
      // selects/exits/delayedCalls on every ?debug page and broke automated runs.
      window.__gsdev = () =>
        import('gsap/GSDevTools').then((m) => {
          const GSDevTools = m.GSDevTools || m.default
          gsap.registerPlugin(GSDevTools)
          return GSDevTools.create()
        })
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
            opacity: p.material.uniforms.uOpacity ? +p.material.uniforms.uOpacity.value.toFixed(2) : 1,
          }
        })
      }
      window.__camDebug = () => ({
        x: +camera.position.x.toFixed(1), y: +camera.position.y.toFixed(1), z: +camera.position.z.toFixed(1),
        groupRot: { x: +groupG.rotation.x.toFixed(3), y: +groupG.rotation.y.toFixed(3), z: +groupG.rotation.z.toFixed(3) },
        carouselRotY: +carousel.rotation.y.toFixed(3), carouselPosY: +carousel.position.y.toFixed(1),
        scrollRotY: +scrollRotationY.toFixed(4), animRotY: +(carousel.animatedRotationY || 0).toFixed(4),
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
    introAnims = []   // track the intro's tweens so destroy() can kill them (no fire into a torn-down scene)
    const rotProxy = { val: 0 }
    introAnims.push(gsap.to(rotProxy, {
      val: Math.PI * 4,  // 720° = degToRad(360*2)
      duration: 6,
      ease: 'power3.inOut',
      onUpdate: () => {
        carousel.animatedRotationY = rotProxy.val
      },
    }))

    // Original: x starts at {x:-10, y:-10} then lerps to {x:.5, y:.5} over 6s
    // Camera parallax = x.x * 0.7 - dx/18
    // Starting at x=-10 → strong leftward bias → cards pushed RIGHT in screen space
    mouse.set(-10.0, -10.0)
    prevMouse.set(-10.0, -10.0)
    const camMouseProxy = { x: -10.0, y: -10.0 }
    introAnims.push(gsap.to(camMouseProxy, {
      x: 0.5,
      y: 0.5,
      duration: 6,
      ease: 'power3.inOut',
      onUpdate: () => {
        mouse.set(camMouseProxy.x, camMouseProxy.y)
        prevMouse.set(camMouseProxy.x, camMouseProxy.y)
      },
    }))

    // Posters intro: animate from far (introDistance) to baseDistance
    // by moving mesh positions and updating axisPosition uniform
    posters.forEach((p, idx) => {
      const delay = 0.2 * idx + 3
      const distProxy = { d: introDistance }
      introAnims.push(gsap.to(distProxy, {
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
      }))
    })

    // Mark intro complete
    introAnims.push(gsap.delayedCall(7, () => {
      if (isDestroyed) return   // the component unmounted mid-intro — don't touch a torn-down scene
      isIntro = false
      introComplete = true
      // Sync the center text to whichever card the intro left at front (Issue #14)
      setTxtChapter(frontChapterIdx(), true)
      // Let the app apply any deep-linked chapter now that selection is allowed (Phase 2)
      if (onReadyCallback) onReadyCallback()
    }))
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
      // Post-intro clamp: if the page loads in a BACKGROUND tab, rAF is suspended and
      // GSAP lag-smoothing starves the intro's mouse tween — mouse can stay at its
      // (-10,-10) intro push, and this spring then drags the camera to ±(126,111)
      // (broken bowl-of-cards view) until the first real mousemove. The intro
      // intentionally overdrives the value, so only clamp once it completes.
      const clampM = (v) => (introComplete ? Math.max(-1.2, Math.min(1.2, v)) : v)
      const mx = isMobile ? 0 : clampM(mouse.x)   // x.x in original
      const my = isMobile ? 0 : clampM(mouse.y)   // x.y in original
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
    // Same post-intro clamp as the camera parallax (background-tab robustness).
    const uax = introComplete ? Math.max(-1.2, Math.min(1.2, mouse.x)) : mouse.x
    const currentUAngle = uax * 10 + 10  // using mouse.x = x.x equivalent
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
        // Don't touch uOpacity during the bottom exit — setExitProgress owns it (it hides the wine card
        // through phase A, then fades it in for the drop); the idle depth-fade would lerp it back to 1.
        if (!isDeselecting) {
          const cur = p.material.uniforms.uOpacity.value
          p.material.uniforms.uOpacity.value = cur + (target - cur) * 0.1
        }
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

    // Background: transparent on the homepage (shows the body), the chapter accent while a chapter is
    // open + during its exit (the ring spins on the accent), fading back out as the exit lands home.
    renderer.setClearColor(exitBg, exitBgAlpha)
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

    // hoveredIndex tracks the SLOT index (i) so only the single hovered poster reacts —
    // not its mirrored copy (Issue #13). chapterIdx is resolved for the audio/cursor
    // callback so app.vue still receives 0–3.
    //
    // Drive hover off the FRONT-facing card (mirror of the click fix). The flat hitboxes
    // don't follow the shader bend, so a raw raycast over the visible front card often
    // lands on a neighbour slot and lifted the WRONG card. Treat any hit as "cursor over
    // the carousel" and lift the front copy; lift nothing when the ray misses entirely.
    const overCarousel = getHoveredPoster(e.clientX, e.clientY) !== -1
    const targetSlot = overCarousel ? (frontPoster()?.i ?? -1) : -1

    if (targetSlot !== hoveredIndex) {
      if (hoveredIndex !== -1) {
        // Unhover previous slot
        const prevChIdx = chapterIdxForSlot(hoveredIndex)
        unhoverChapter(hoveredIndex)
        if (onHoverCallback) onHoverCallback(prevChIdx, false)
      }
      hoveredIndex = targetSlot
      if (targetSlot !== -1) {
        hoverChapter(targetSlot)
        if (onHoverCallback) onHoverCallback(chapterIdxForSlot(targetSlot), true)
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

  // The poster slot currently nearest the camera (front-facing). Robust to the group
  // tilt + carousel rotation since it reads world positions. Returns the poster object
  // (its `.i` is the slot, `.chapterIdx` the chapter).
  function frontPoster() {
    let best = null, bestDist = Infinity
    for (const p of posters) {
      p.mesh.getWorldPosition(_frontVec)
      const d = _frontVec.distanceToSquared(camera.position)
      if (d < bestDist) { bestDist = d; best = p }
    }
    return best
  }

  // Chapter index of the front-facing poster (0–3), or -1 if none.
  function frontChapterIdx() {
    return frontPoster()?.chapterIdx ?? -1
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
    // A still-running deselect would clobber this selection when its onComplete fired
    // (it resets selectedIndex/selectedHero mid-select). Kill it and clear its flag.
    // NOTE: when we interrupt a deselect, do NOT re-capture preSelectRot below — the
    // carousel is mid-flight; the existing preSelectRot still holds the true resting
    // rotation (otherwise each interrupted cycle drifts the idle carousel a bit more).
    const interruptedDeselect = !!deselectTl
    if (deselectTl) { deselectTl.kill(); deselectTl = null; isDeselecting = false }
    // Likewise kill a stale select-in (rapid re-select) so ITS onComplete can't fire.
    if (selectTl) { selectTl.kill(); selectTl = null }
    // Clear hover BEFORE selecting: hover is gated while selected, so unhover would
    // never fire — the cursor stayed stuck on "EXPLORE" and the lifted card kept its
    // +7 hover lift through the whole select (then popped down when the inner-page
    // scroll-coupling engaged). The reference un-hovers first too.
    if (hoveredIndex !== -1) {
      const prevCh = chapterIdxForSlot(hoveredIndex)
      unhoverChapter(hoveredIndex)
      if (onHoverCallback) onHoverCallback(prevCh, false)
      hoveredIndex = -1
    }
    selectedIndex = chIdx
    isSelecting = true
    scrollOffsetPx = 0   // start the hero at the top of the inner page (P1)
    if (onSelectCallback) onSelectCallback(chIdx)

    // overwrite:true on every tween so a re-select cleanly kills any still-settling
    // deselect tweens on the same objects (otherwise they stack → "floats weirdly").
    gsap.killTweensOf(carousel)
    const tl = gsap.timeline({ onComplete: () => {
      selectTl = null
      isSelecting = false
      // The select scale was baked from aspectRatio at select START — re-apply from the
      // CURRENT aspect in case the window resized during the 3s entry.
      const sFinal = aspectRatio * 2.07
      heroPoster.mesh.scale.set(sFinal, sFinal, 1)
      // Play the chapter film once the card is parked (matches the reference, which
      // plays in the select rotation's onComplete). Click-selects had it playing via
      // hover, but DEEP-LINK selects showed a static hero — this covers both. Guarded:
      // a deselect that interrupted the select must not start the video afterward.
      if (selectedIndex === chIdx && !isDeselecting) videoElements[chIdx]?.play().catch(() => {})
    } })
    selectTl = tl

    // Background fades to the chapter accent as it opens (the ring/page sit on the accent; the bottom
    // exit later reveals the ring spinning on it). Fades back out at the homepage on exit.
    exitBg.set(CHAPTERS[chIdx].accent)
    const bgP = { a: exitBgAlpha }
    tl.to(bgP, { a: 1, duration: 1.4, ease: 'power2.inOut', onUpdate: () => { exitBgAlpha = bgP.a } }, 0)

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

    // D — normalize the entry spin to one consistent FORWARD turn. The 7s intro leaves
    // animatedRotationY resting at +4π, while the front-facing target toRad(φ−90) is a
    // small absolute angle — so the old entry tweened ~2 turns BACKWARD by a chapter-
    // dependent amount (front angles −45/0/45/90° → ~765/720/675/630° spins). First
    // collapse the accumulated whole turns, subtracting the SAME multiple of 2π from the
    // lerp anchor (rotation.y) so the collapse is invisible (rotation is 2π-periodic).
    const restTurns = Math.round(carousel.animatedRotationY / TWO_PI)
    carousel.animatedRotationY -= restTurns * TWO_PI
    carousel.rotation.y        -= restTurns * TWO_PI
    if (!interruptedDeselect) preSelectRot = carousel.animatedRotationY
    // The render loop composes rotation as scrollRotationY + animatedRotationY, so the
    // homepage scroll offset must be SUBTRACTED here — otherwise any pre-click carousel
    // scrolling parks the hero off-front by exactly that amount (scroll-then-click bug).
    // Then advance FORWARD to the front-facing orientation, always landing the spin in
    // [180°,540°) so every chapter is one controlled ~360° turn in the intro/exit
    // direction (the residual ±135° spread is the cards' real 45°-apart ring positions).
    let targetRot = toRad(heroPoster.intRotationY - 90) - scrollRotationY
    while (targetRot - carousel.animatedRotationY < Math.PI) targetRot += TWO_PI
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
    // Kill a still-running select-in: its onComplete would otherwise clear isSelecting
    // early and start the video mid-deselect (back-pressed during the 3s entry).
    if (selectTl) { selectTl.kill(); selectTl = null; isSelecting = false }
    videoElements[selectedIndex]?.pause()   // reference pauses the film at exit start
    // Snap the hero back to its ring-centre pose FIRST so the reverse-spin always starts
    // from the hero position, regardless of how far the inner page had scrolled (the P1
    // coupling moves the card off-screen as you read). Without this, exiting from the
    // bottom — or hitting Back after scrolling — flew the card down from off-screen. With
    // it, the bottom exit is identical to the (correct) top-edge exit.
    if (selectedHero) selectedHero.mesh.position.y = selectedHero.baseY
    gsap.killTweensOf(carousel)
    const tl = gsap.timeline({
      onComplete: () => { selectedIndex = -1; isDeselecting = false; selectedHero = null; deselectTl = null }
    })
    deselectTl = tl

    // Fade the accent background back out to the homepage (top-edge / back-button reverse exit).
    const bgP = { a: exitBgAlpha }
    tl.to(bgP, { a: 0, duration: 1.6, ease: 'power2.inOut', onUpdate: () => { exitBgAlpha = bgP.a } }, 0)

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

  // ── Forward scroll-end exit (step E) ────────────────────────────────────────
  // The reference doesn't *rewind* the entry on scroll-end — it scrubs a forward
  // return: the hero shrinks back into the ring spinning FORWARD (+290°) as the ring
  // reassembles from the bottom (group re-tilts, carousel rises, content slides away).
  // This mirrors the reference's window.setPageProgress(0→1). The inner page drives
  // `de` via a tween; the scene just maps `de` to transforms. Distinct from
  // deselectChapter() (the back button's reverse-spin).
  //
  // beginExit() snapshots the current (selected/scrolled) state and locks out the
  // scroll-coupling + the route watcher's reverse deselect (via isDeselecting).
  function beginExit() {
    // isSelecting guard: on short pages the bottom can be reached (and overscrolled)
    // while the 3s select-in is still running — starting the exit then leaves the
    // select's non-hero drop tweens fighting the exit lerps. The page also gates
    // wheel input until settled; this is defense in depth.
    if (selectedIndex === -1 || isDeselecting || isSelecting || !selectedHero) return false
    isDeselecting = true
    // NOTE: do NOT zero scrollOffsetPx here. The animate() coupling is gated off while
    // isDeselecting, so the hero's Y is frozen at its current (scrolled-off) position and
    // setExitProgress lerps it home. Preserving the offset means a cancelExit() (user
    // scrolls back up before committing) resumes the coupling exactly where it left off —
    // no teleport. (The old code zeroed it + started the hero's return from baseY, which
    // teleported the off-screen hero to centre = the visible "snaps to the top" bug.)
    videoElements[selectedIndex]?.pause()   // reference pauses the film at exit start
    const hero = selectedHero
    gsap.killTweensOf(carousel)
    gsap.killTweensOf(carousel.position)
    gsap.killTweensOf(groupG.rotation)
    gsap.killTweensOf(hero.mesh.scale)
    gsap.killTweensOf(hero.mesh.position)
    gsap.killTweensOf(hero.material.uniforms.blendFactor)
    gsap.killTweensOf(hero.material.uniforms.progress)
    if (groupG.userData.txtMat) gsap.killTweensOf(groupG.userData.txtMat)
    exitStart = {
      rot: carousel.animatedRotationY,
      cy: carousel.position.y,
      gx: groupG.rotation.x, gy: groupG.rotation.y, gz: groupG.rotation.z,
      heroScale: hero.mesh.scale.x,
      // Capture the hero's CURRENT Y (wherever the scroll-coupling left it — off the top of
      // the frame at the page bottom). setExitProgress lerps it home EARLY (heroT, under the
      // still-opaque page) so the return is smooth, never a snap. The DOM page only fades to
      // reveal the scene AFTER the hero is settled at centre and the ring has begun rising.
      heroY: hero.mesh.position.y,
      blend: hero.material.uniforms.blendFactor.value,
      prog: hero.material.uniforms.progress.value,
      heroOpacity: hero.material.uniforms.uOpacity ? hero.material.uniforms.uOpacity.value : 1,
      // The center txt faded to 0 on select; the forward exit must bring it back
      // (deselectChapter restores it; this path previously left it invisible).
      txtOpacity: groupG.userData.txtMat ? groupG.userData.txtMat.opacity : 1,
      others: posters.filter((p) => p !== hero).map((p) => {
        gsap.killTweensOf(p.mesh.position)   // select's drop tweens must not fight the lerp
        return {
          p, y: p.mesh.position.y,
          same: p.chapterIdx === hero.chapterIdx,   // the chapter's OTHER copy — hide it too (no wine duplicate)
          op: p.material.uniforms.uOpacity ? p.material.uniforms.uOpacity.value : 1,
        }
      }),
    }
    return true
  }

  // de: 0 (selected: hero off-top full-bleed, ring low/flat) → 1 (homepage ring). Driven by the page's
  // OUTRO-section scroll position (scroll-coupled — safe to call repeatedly in either direction):
  //   heroT — the hero card descends to its ring slot
  //   fitT  — the hero un-frames + shrinks to ring size EARLY (mostly while still high/off-screen)
  function setExitProgress(de) {
    if (!exitStart || !selectedHero) return
    const t = Math.min(1, Math.max(0, de))
    const lp = (a, b, k = t) => a + (b - a) * k
    const ss = (k) => { const u = Math.min(1, Math.max(0, k)); return u * u * (3 - 2 * u) }
    const hero = selectedHero
    // TWO PHASES. A [0..DROP_START]: behind the still-scrolling-out article, the deck GATHERS into a tight,
    // low, steeply-tilted cluster (small radius) and starts spinning — ALL cards present incl. ONE wine copy
    // (the mirror, "already there"); only the SECOND wine copy (the hero) waits off-top. B [DROP_START..1]:
    // the article is gone → the cluster UNFURLS (radius grows) + rises + un-tilts to the homepage fan while
    // it spins, and the second wine copy DROPS in from the top into its slot. Card faces stay visible the
    // whole unfurl (no hide) and the accent background fades to the homepage over the late rise.
    const a = ss(Math.min(1, t / DROP_START))                       // gather into the cluster (behind the page)
    const b = ss(Math.max(0, (t - DROP_START) / (1 - DROP_START)))  // unfurl + the drop

    // Spin the whole way, in the down-scroll direction (EXIT_SPIN negative) → flows into the homepage idle.
    carousel.animatedRotationY = exitStart.rot + EXIT_SPIN * t

    // Ring height + tilt + radius: into the low tight cluster over phase A, then rise + un-tilt + unfurl to
    // the homepage over phase B.
    const homeTilt = isMobile ? { x: toRad(22), y: 0, z: 0 } : { x: toRad(25), y: toRad(70), z: toRad(15) }
    const bowlTilt = isMobile ? { x: toRad(48), y: 0, z: 0 } : BOWL_TILT
    let cy, tx, ty, tz, radius
    if (t <= DROP_START) {
      cy = lp(exitStart.cy, BOWL_Y, a)
      tx = lp(exitStart.gx, bowlTilt.x, a); ty = lp(exitStart.gy, bowlTilt.y, a); tz = lp(exitStart.gz, bowlTilt.z, a)
      radius = lp(baseDistance, CLUSTER_R, a)                       // gather inward to the tight cluster
    } else {
      cy = lp(BOWL_Y, 0, b)
      tx = lp(bowlTilt.x, homeTilt.x, b); ty = lp(bowlTilt.y, homeTilt.y, b); tz = lp(bowlTilt.z, homeTilt.z, b)
      radius = lp(CLUSTER_R, baseDistance, b)                       // unfurl back out to the full ring
    }
    carousel.position.y = cy
    groupG.rotation.set(tx, ty, tz)
    const rf = radius / baseDistance                                // scale every ring slot by the current radius

    // Phase B sub-progresses for the second wine copy: descend over most of B, fade in early.
    const drop = ss(Math.min(1, b / 0.85))
    const reveal = ss(Math.min(1, b / 0.35))
    const fitT = Math.min(1, t / HERO_FIT_END)                      // shrink to ring size early (while off-top)

    // EVERY other card (incl. the wine MIRROR = the copy that's "already there") gathers into the cluster in
    // phase A and unfurls in B — present + visible the whole time (no hide). x/z scaled by the radius.
    for (const o of exitStart.others) {
      o.p.mesh.position.x = o.p.baseX * rf
      o.p.mesh.position.z = o.p.baseZ * rf
      o.p.mesh.position.y = lp(o.y, o.p.baseY, a)
      if (o.p.material.uniforms.uOpacity) o.p.material.uniforms.uOpacity.value = 1
    }

    // The SECOND wine copy (the hero): off-top + hidden through phase A; in phase B it descends from off-top
    // into its slot and fades in — "drops in from the top." Ring-sized the whole descent (no full-bleed
    // morph); its x/z track the unfurling radius so it lands cleanly in its slot.
    hero.mesh.scale.set(lp(exitStart.heroScale, 1, fitT), lp(exitStart.heroScale, 1, fitT), 1)
    hero.mesh.position.x = hero.baseX * rf
    hero.mesh.position.z = hero.baseZ * rf
    hero.mesh.position.y = t <= DROP_START ? exitStart.heroY : lp(exitStart.heroY, hero.baseY, drop)
    hero.material.uniforms.blendFactor.value = lp(exitStart.blend, 0, fitT)
    hero.material.uniforms.progress.value = lp(exitStart.prog, 0, fitT)
    if (hero.material.uniforms.uOpacity) hero.material.uniforms.uOpacity.value = t <= DROP_START ? 0 : exitStart.heroOpacity * reveal

    // Center wordmark: stays out through the unfurl (the reference shows no floating wordmark mid-exit),
    // fading in only as the homepage fan settles over the last ~40% of de.
    if (groupG.userData.txtMat) groupG.userData.txtMat.opacity = lp(exitStart.txtOpacity, 1, ss(Math.max(0, (t - 0.6) / 0.4)))

    // Background: opaque chapter accent through the spin, fading to the homepage over the late rise.
    exitBgAlpha = t < 0.7 ? 1 : 1 - ss((t - 0.7) / 0.3)
  }

  // Abort an in-progress bottom exit (the user scrolled back up before committing). Restore
  // the selected/scrolled state captured in beginExit and hand the hero back to the scroll-
  // coupling. scrollOffsetPx was preserved through beginExit, so re-enabling the coupling
  // resumes the hero exactly where it was (no snap).
  function cancelExit() {
    if (!exitStart) return
    setExitProgress(0)        // lerp every transform back to the captured start
    isDeselecting = false     // re-enable animate() scroll-coupling + the route reverse path
    exitStart = null
  }

  function endExit() {
    // Restore the chapter's poster copies (both) so the homepage ring is complete; the idle depth loop
    // takes over their uOpacity next frame.
    if (selectedHero) {
      const ch = selectedHero.chapterIdx
      posters.forEach((p) => { if (p.chapterIdx === ch && p.material.uniforms.uOpacity) p.material.uniforms.uOpacity.value = 1 })
    }
    exitBgAlpha = 0     // homepage background (transparent → the body shows through)
    selectedIndex = -1
    isDeselecting = false
    selectedHero = null
    exitStart = null
    scrollOffsetPx = 0
    hoveredIndex = -1   // stale hover would block the idle center-text sync (deselect resets it too)
  }

  function onScroll(delta) {
    if (!introComplete) return
    // While a chapter is open, the inner page (Lenis) owns scrolling AND the exit
    // gestures (page-level, gated to its top/bottom edges). The scene must NOT react
    // to wheel here — WebGLScene's scroll handler is a global window listener, so
    // reacting would fire spurious mid-page exits. Only the homepage carousel scrolls.
    if (selectedIndex !== -1) return
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

    // Keep the hero full-bleed across resizes — its scale is aspect-dependent and was
    // baked at select time (the reference rescales on resize too). Skip while animating:
    // mid-select the live scale tween would fight this (the select onComplete re-applies
    // the final scale from the then-current aspect instead).
    if (selectedIndex !== -1 && selectedHero && !isDeselecting && !isSelecting) {
      const s = aspectRatio * 2.07
      selectedHero.mesh.scale.set(s, s, 1)
    }

    if (isMobile && selectedIndex === -1) {
      groupG.rotation.set(toRad(22), 0, 0)
    } else if (!isMobile && selectedIndex === -1) {
      groupG.rotation.set(toRad(25), toRad(70), toRad(15))
    }
  }

  // Pause/resume the render loop with tab visibility (added in init, removed in destroy).
  function handleVisibility() {
    if (isDestroyed) return
    if (document.hidden) {
      if (animFrame) { cancelAnimationFrame(animFrame); animFrame = null }
    } else if (animFrame == null) {
      animate()   // animate() reschedules animFrame; only restart when nothing is pending
    }
  }

  // Dispose a material and any textures it owns (standard maps + ShaderMaterial uniform textures).
  // dispose() is idempotent, so shared textures disposed via multiple materials are safe.
  function disposeMaterial(mat) {
    if (!mat) return
    for (const k of ['map', 'alphaMap', 'normalMap']) {
      if (mat[k] && mat[k].dispose) mat[k].dispose()
    }
    if (mat.uniforms) {
      for (const key in mat.uniforms) {
        const v = mat.uniforms[key] && mat.uniforms[key].value
        if (v && v.isTexture && v.dispose) v.dispose()
      }
    }
    mat.dispose()
  }

  function destroy() {
    isDestroyed = true
    if (animFrame) { cancelAnimationFrame(animFrame); animFrame = null }
    document.removeEventListener('visibilitychange', handleVisibility)
    // Kill in-flight GSAP work so stale tweens / the ready delayedCall can't fire into a torn-down scene.
    introAnims.forEach((a) => a && a.kill && a.kill())
    introAnims = []
    if (selectTl) { selectTl.kill(); selectTl = null }
    if (deselectTl) { deselectTl.kill(); deselectTl = null }
    // Tear down the off-screen video elements.
    videoElements.forEach((v) => {
      v.pause()
      v.src = ''
      if (v.parentNode) v.parentNode.removeChild(v)
    })
    // renderer.dispose() frees the context's own caches but NOT the per-object geometries/
    // materials/textures — traverse and dispose those explicitly to release their GPU memory.
    if (scene) {
      scene.traverse((obj) => {
        if (obj.geometry && obj.geometry.dispose) obj.geometry.dispose()
        const m = obj.material
        if (Array.isArray(m)) m.forEach(disposeMaterial)
        else disposeMaterial(m)
      })
      scene.clear()
    }
    // The hover-swapped txt frames (txtTextures[1..3]) and the video textures aren't reached by
    // the traverse (only txtTextures[0] is a live map) — dispose them directly.
    txtTextures.forEach((t) => t && t.dispose && t.dispose())
    videoTextures.forEach((t) => t && t.dispose && t.dispose())
    renderer?.dispose()
    posters = []
    videoElements = []
    videoTextures = []
    txtTextures = []
    selectedHero = null
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
    deselectChapter,  // TOP-edge / back-button exit: reverse-spin rewind into the ring
    setScroll,        // inner-page scroll → hero card coupling (P1)
    // Forward ring-reassembly primitives (de 0→1), reserved for the scroll-driven BOTTOM exit rebuild
    // (page scrolls out → ring "outro" section; see docs/PHASE-2-INNER-PAGES.md). Currently driven only
    // by the ?debug __exit* hooks.
    beginExit,        // capture the selected/scrolled state + hide the chapter's own cards
    setExitProgress,  // de 0→1 — ring rises from below, spins forward, un-tilts; hero returns from off-top
    cancelExit,       // abort → restore the selected/scrolled state
    endExit,          // commit → finalize the homepage ring (selectedIndex = -1)
    getState: () => ({ selectedIndex, hoveredIndex, introComplete, isSelecting, isDeselecting }),
  }
}
