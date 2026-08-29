import * as THREE from 'three'
import { gsap } from 'gsap'
import { asset } from '~/utils/asset'

const toRad = (deg) => (deg * Math.PI) / 180
const TWO_PI = Math.PI * 2

// Chapter data — the four chapters of the Covenant & Uvie journey.
// The card FILMS are the couple's own (2026-08-10, sourced from `new frames/`,
// crop-encoded to the 900×1200 the card shader expects — see CONTENT-AND-ASSETS).
// AUDIO is still inherited from the Milla Nova build as a PLACEHOLDER; the cu-*
// textures are ours.
export const CHAPTERS = [
  {
    slug: 'us',
    title: 'Us',
    accent: '#42221A',
    accentLight: '#F2EEE8',
    accentLighter: '#D2C3AE',
    audio: asset('/audio/eat-merry-love.mp3'),
    video: asset('/video/us.mp4'),
    txt: asset('/images/cu-txt1.png'),
    svg: asset('/images/cu-p1.png'),
    index: 0,
  },
  {
    slug: 'the-big-day',
    title: 'The Big Day',
    accent: '#41492D',
    accentLight: '#E9ECE2',
    accentLighter: '#A6B18A',
    audio: asset('/audio/la-storia.mp3'),
    video: asset('/video/the-big-day.mp4'),
    txt: asset('/images/cu-txt2.png'),
    svg: asset('/images/cu-p2.png'),
    index: 1,
  },
  {
    slug: 'in-frames',
    title: 'In Frames',
    accent: '#453350',
    accentLight: '#EFE8F5',
    accentLighter: '#C3A6D8',
    audio: asset('/audio/wine-time.mp3'),
    video: asset('/video/in-frames.mp4'),
    txt: asset('/images/cu-txt3.png'),
    svg: asset('/images/cu-p3.png'),
    index: 2,
  },
  {
    slug: 'with-love',
    title: 'With Love',
    accent: '#2E4A52',
    accentLight: '#E8EDF2',
    accentLighter: '#9FB4C8',
    audio: asset('/audio/amour-getway.mp3'),
    video: asset('/video/with-love.mp4'),
    txt: asset('/images/cu-txt4.png'),
    svg: asset('/images/cu-p4.png'),
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
  // -1 (not 0) so the FIRST setTxtChapter always applies: the material is built with
  // txtTextures[0], and if the post-intro front card happened to be chapter 0 the early-return
  // would leave the plane at opacity 0 forever. It also means we never show a wrong wordmark.
  let currentTxtChapter = -1             // chapter shown on the center txtMesh (#9/#14)
  let lastFrontChapter = -1              // last front chapter reported for the cursor tint
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
  // Card geometry — the hover territory is derived from these, so they must match
  // the PlaneGeometry below.
  const CARD_W = 24, CARD_H = 32
  const CARD_HALF_H = CARD_H / 2
  const CARD_ASPECT = CARD_W / CARD_H
  // Release territory is 1.45x the acquire territory. Big enough that a card lifting
  // out from under the pointer never releases it; small enough that moving off the
  // card still does.
  const HOVER_RELEASE_GROW = 1.45
  // ── Card lean (uAngle) ──────────────────────────────────────────────────────
  // uAngle Z-ROTATES every card before the cylindrical bend, so it is literally how
  // far the deck leans. It used to be `mouse.x * 10 + 10`, and the intro tweens the
  // mouse proxy to 0.5 — so the deck came to rest permanently leaning 15°, and on
  // TOUCH, where no mousemove ever fires, there was nothing to bring it back. That is
  // the "cards are offset to the left, worse on mobile" report. Rest is now 0° (upright)
  // and input only ever deflects it from there.
  const LEAN_MAX_DEG = 10        // deflection at full mouse travel / a hard swipe
  const LEAN_EASE = 0.06         // how fast the deck follows
  const SWIPE_LEAN_PER_VEL = 90  // touch: lean per unit of scroll velocity. Calibrated on prod:
                                 // a normal swipe settles swipeVel near 0.1, so 9 gave <1° — invisible.
  const SWIPE_DECAY = 0.90       // …and how quickly that settles back upright
  let leanDeg = 0
  let swipeVel = 0
  let hasPointer = false         // a real pointer has moved at least once
  let hoveredIndex = -1
  // Last known cursor position (screen px). animate() re-resolves the hover target from this
  // each frame, so a wheel scroll (which fires no mousemove) still hands the lift to whatever
  // card rotates under the pointer. Off-screen until the first real mousemove.
  let lastCursorX = -100000
  let lastCursorY = -100000
  const _sv = new THREE.Vector3()   // scratch: project poster world pos → screen for hover pick
  let selectedIndex = -1
  let isIntro = true
  let introComplete = false
  let isMobile = false

  const N = 8
  const baseDistance = 40  // original source: ve=40
  const introDistance = 75
  // World size of the centre wordmark plane. It's a fixed 60 units, but a portrait phone only
  // sees ~34 units across at that depth (three's `fov` is VERTICAL, so narrow aspect ⇒ narrow
  // horizontal view) — which cropped the wordmark at both edges. fitTxtMesh() scales it down.
  const TXT_PLANE = 60
  const TXT_Y_DESKTOP = -8   // tuned so it clears the top logo/subtitle (issue #11)
  const TXT_Y_MOBILE = 14    // upper third — clear of the cards, matching the reference
  // Desktop: the tagline is a large central plane; the front card rose into its lower half.
  // Shrink the wordmark a touch AND drop the whole idle ring so the front card clears the text.
  // Both are DESKTOP-ONLY (mobile keeps its own fitTxtMesh scale + 0 idle Y, tuned separately).
  const TXT_SCALE_DESKTOP = 0.82
  const IDLE_Y_DESKTOP = -12   // idle carousel Y on desktop (was 0); select still uses SELECTED_Y
  // Selected card resting Y. The shader's progress=1 layout frames the content into
  // a sub-region of the plane, so scale/position are hand-tuned (not camera-derived):
  // scale = aspectRatio*2.07, this Y top-anchors the content band as the hero.
  // (Step A of the card-becomes-the-page rework — see docs/PHASE-2-INNER-PAGES.md.)
  const SELECTED_Y = -43
  // PORTRAIT needs its own value. The card is scaled to fill the viewport WIDTH, but a 24×32
  // card filling a narrow width is far shorter than a tall screen — so at -43 it landed at
  // world y −60.9…−25.1 against a visible band of −29…+29, i.e. almost entirely BELOW the
  // screen (you saw only its top edge peeking up). This sits its top edge at the viewport top,
  // with the accent clear-colour filling beneath — which is what the reference shows on a phone.
  const SELECTED_Y_MOBILE = 11
  const selectedCarouselY = () => (isMobile ? SELECTED_Y_MOBILE : SELECTED_Y)
  // Hero "fill the width" scale. The old hard-coded `aspectRatio * 2.07` is exactly
  // (2·60·tan(fov/2))/24 — derived for the DESKTOP camera distance (100 − baseDistance = 60).
  // The mobile camera sits further back (110 − 40 = 70), where the constant is 2.42, so the
  // desktop value under-scaled the hero on phones. Deriving it keeps desktop bit-identical
  // (it evaluates to 2.071) while adapting to any camera distance.
  const heroFillScale = () => {
    const d = Math.max(1, camera.position.z - baseDistance)
    return aspectRatio * ((2 * d * Math.tan(toRad(camera.fov / 2))) / 24)
  }
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
  let onReadyCallback = null  // fired once when the intro finishes (for deep-link selection)
  // Fired whenever the FRONT-facing chapter changes (the one the centre text tracks). The
  // explore cursor uses it to tint itself to the card it's sitting over — on the homepage no
  // chapter is "selected", so the route-derived accent isn't enough.
  let onFrontChapterCallback = null

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
    carousel.position.y = idleCarouselY()   // drop the desktop ring below the central tagline
    groupG.add(carousel)

    // Load logo texture
    const logoTexture = await loadTexture(asset('/images/cu-logo.png'))
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
    const txtGeo = new THREE.PlaneGeometry(TXT_PLANE, TXT_PLANE)
    // opacity 0 until the first setTxtChapter picks the RIGHT chapter (at intro end, instant)
    // — otherwise the plane flashes chapter 0's wordmark and then swaps.
    const txtMat = new THREE.MeshBasicMaterial({ map: txtTextures[0], transparent: true, opacity: 0.0, depthWrite: false, alphaTest: 0.5 })
    txtMat.toneMapped = false
    const txtMesh = new THREE.Mesh(txtGeo, txtMat)
    // y=-8 pushes the text lower on screen so it clears the top logo/subtitle
    // (Issue #11 — at y=0 it projected too high given the camera tilt). z=20
    // matches original (le.position.z = 20).
    txtMesh.position.set(0, -8, 20)
    scene.add(txtMesh)
    groupG.userData.txtMesh = txtMesh
    groupG.userData.txtMat = txtMat
    fitTxtMesh()   // portrait viewports are far narrower than the plane — scale it to fit
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
        leanDeg: +leanDeg.toFixed(2), swipeVel: +swipeVel.toFixed(4),
      })
      // What does a click at screen (x,y) resolve to, vs the front-facing card?
      window.__probe = (x, y) => {
        const slot = resolveHoverTarget(x, y)   // what hover/click really resolve to
        const slugs = CHAPTERS.map((c) => c.slug)
        const fc = frontChapterIdx()
        const hc = chapterIdxForSlot(slot)
        return {
          leanDeg: +leanDeg.toFixed(2),
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
    // The card faces were SVGs rasterized through a CanvasTexture, which set SRGB;
    // now they're plain PNGs through TextureLoader, which doesn't. Without this the
    // pastel faces wash toward white (linear-as-sRGB double conversion).
    posterTex.colorSpace = THREE.SRGBColorSpace

    // Photo texture: video (will update on hover)
    const photoTex = videoTextures[chapterIdx]

    // Create geometry: 24x32 plane, 40x40 segments
    const geometry = new THREE.PlaneGeometry(CARD_W, CARD_H, 40, 40)

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

    // ── Entry timing ──────────────────────────────────────────────────────────
    // DESKTOP IS UNCHANGED (6s spin, cards settle 5.9s, introComplete 7s — a deliberate 1.1s
    // beat). MOBILE gets its own, shorter cue sheet: on a phone the long spin reads as dead
    // time, and the wordmark landing ~1.1s AFTER the cards had already settled looked broken.
    // The spin still covers the same 720° (it isn't sped past legibility, just shortened), and
    // introComplete now lands just after the last card settles so the wordmark appears ON cue.
    // The EXPLORE button is gated on that same moment (app.vue), so it can't precede the cards
    // or flash a placeholder colour before the front chapter is known.
    const introSpinDur = isMobile ? 3.8 : 6            // full 720° either way
    const posterDelay = isMobile ? 1.5 : 3             // when cards start flying in
    const posterStagger = isMobile ? 0.12 : 0.2
    const posterDur = isMobile ? 1.2 : 1.5
    // last card settles at posterDelay + stagger*7 + dur  →  mobile 3.54s, desktop 5.9s
    const introEndAt = isMobile ? 3.75 : 7

    // Original: B.animatedRotationY starts at 0, animates to degToRad(360*2) = 720°
    carousel.animatedRotationY = 0
    carousel.rotation.y = 0
    carouselLerpTarget = 0
    introAnims = []   // track the intro's tweens so destroy() can kill them (no fire into a torn-down scene)
    const rotProxy = { val: 0 }
    introAnims.push(gsap.to(rotProxy, {
      val: Math.PI * 4,  // 720° = degToRad(360*2)
      duration: introSpinDur,
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
      duration: introSpinDur,
      ease: 'power3.inOut',
      onUpdate: () => {
        mouse.set(camMouseProxy.x, camMouseProxy.y)
        prevMouse.set(camMouseProxy.x, camMouseProxy.y)
      },
    }))

    // Posters intro: animate from far (introDistance) to baseDistance
    // by moving mesh positions and updating axisPosition uniform
    posters.forEach((p, idx) => {
      const delay = posterStagger * idx + posterDelay
      const distProxy = { d: introDistance }
      introAnims.push(gsap.to(distProxy, {
        d: baseDistance,
        duration: posterDur,
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

    // Mark intro complete — cued just after the last card settles (see the timing block above),
    // so the wordmark reveal lands on the settle rather than trailing it.
    introAnims.push(gsap.delayedCall(introEndAt, () => {
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
    // Lean. During the intro this stays on the original curve (the deck swings in from
    // -90°); afterwards it eases to an UPRIGHT rest and is deflected only by live input —
    // the pointer on desktop, the swipe on touch, where the deck now follows the finger
    // instead of being frozen wherever the intro left the mouse proxy.
    swipeVel *= SWIPE_DECAY
    let leanTarget
    if (!introComplete) {
      leanTarget = mouse.x * 10 + 10        // unchanged intro sweep
    } else if (isMobile) {
      leanTarget = Math.max(-LEAN_MAX_DEG, Math.min(LEAN_MAX_DEG, swipeVel * SWIPE_LEAN_PER_VEL))
    } else {
      const mx = hasPointer ? Math.max(-1.2, Math.min(1.2, mouse.x)) : 0
      leanTarget = mx * LEAN_MAX_DEG
    }
    // Eased rather than snapped, so intro → upright is a settle, not a jump.
    leanDeg += (leanTarget - leanDeg) * (introComplete ? LEAN_EASE : 1)
    const currentUAngle = leanDeg
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

    // Keep hover + center text + cursor tint in sync each idle frame (Issues #9/#13/#14).
    if (introComplete && selectedIndex === -1) {
      // Re-resolve the hover from the last cursor position against the CURRENT ring — this hands
      // the lift to whatever card scrolls under a still pointer (a wheel fires no mousemove).
      // But NEVER unhover from here: a lifting card moves its own hitbox up off the cursor, so
      // unhovering on that miss made the bottom edge oscillate (lift → miss → drop → hit → …).
      // Only SWITCH between cards; leaving the deck is onMouseMove's job (it fires on move-off).
      const reTarget = resolveHoverTarget(lastCursorX, lastCursorY)
      if (reTarget !== -1) applyHover(reTarget)

      const fc = frontChapterIdx()
      // Center text tracks the front card when NOT hovering (hover owns the wordmark, #9).
      if (hoveredIndex === -1) setTxtChapter(fc)

      // Explore-cursor tint = the card under the pointer (hovered), else the front card.
      // Reported every change so it tracks the ring even with no mousemove.
      const reportCh = hoveredIndex !== -1 ? chapterIdxForSlot(hoveredIndex) : fc
      if (reportCh >= 0 && reportCh !== lastFrontChapter) {
        lastFrontChapter = reportCh
        if (onFrontChapterCallback) onFrontChapterCallback(reportCh)
      }
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
  // (The old raycast picker lived here. It was removed once hover moved to screen-space
  // containment: the flat hitboxes don't follow the shader's cylindrical bend, so a raycast
  // could never say WHICH card was under the pointer — and a lifting card moved its own
  // hitbox off the cursor, which is what made the bottom edge flicker.)

  // Resolve the chapter index (0–3) for a given slot index (i). Used for
  // chapter-keyed behaviour: video playback, txt swap, audio, selection.
  function chapterIdxForSlot(slotI) {
    const p = posters.find((p) => p.i === slotI)
    return p ? p.chapterIdx : -1
  }

  function onMouseMove(e) {
    // Original: x.x = de.x/width*2-1 (NDC), x.y = de.y/height*2-1 (NDC)
    // Camera parallax uses x.x and x.y directly (not be)
    hasPointer = true
    mouse.x = (e.clientX / width) * 2 - 1
    mouse.y = (e.clientY / height) * 2 - 1

    // Remember the pointer so the animate() loop can keep the hover resolved against the
    // moving ring between mousemoves (a wheel scroll fires none).
    lastCursorX = e.clientX
    lastCursorY = e.clientY

    // hoveredIndex tracks the SLOT (i) so only the single hovered poster reacts (#13); the
    // chapter is resolved for the audio/cursor callback. Hover the card actually under the
    // pointer — front OR side (posterAtScreen), not always the front card as before.
    applyHover(resolveHoverTarget(e.clientX, e.clientY))
  }

  // Crossfade the center txtMesh to a chapter's txt (Issues #9 + #14).
  // No-ops if that chapter is already showing.
  function setTxtChapter(chIdx, instant = false) {
    if (chIdx < 0 || chIdx === currentTxtChapter) return
    const txtMat = groupG.userData.txtMat
    const newTex = txtTextures[chIdx]
    if (!txtMat || !newTex) return
    currentTxtChapter = chIdx
    // (The front-chapter callback for the cursor tint is fired by the animate() tracker,
    // not here — so it also updates during a scroll-settle while hovering, no mousemove.)
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

  // ── Which VISIBLE card is under the cursor ──────────────────────────────────
  // The flat hitboxes don't follow the shader bend, so a raycast can't tell WHICH card
  // was struck. Instead we work in screen space: project each poster's centre and test
  // whether the pointer is inside that card's own territory.
  //
  // Two rules this enforces, both of which were bugs:
  //  • Only cards with VISIBLE CONTENT are hoverable. The far half of the ring is faded
  //    by the depth fade, and hovering one of those swapped the centre wordmark to a
  //    chapter the viewer can't even see.
  //  • Hover is CONTAINMENT, not nearest-neighbour. Picking the nearest centre meant a
  //    pointer over a faded back card still grabbed some front card.
  const HOVER_MIN_OPACITY = 0.75   // below this the card is a background ghost
  const _hb1 = new THREE.Vector3(), _hb2 = new THREE.Vector3()
  const _hbOff = new THREE.Vector3(), _hbQ = new THREE.Quaternion()

  // Centre + half-extents of a poster in SCREEN px (derived from the card's real
  // geometry, so it stays right at any zoom, distance or viewport).
  //
  // ⚠️ Measured from the card's RESTING position, with the hover lift subtracted back
  // out. If the territory moved with the lift it would drag itself out from under the
  // pointer, and hysteresis cannot help: releasing drops the card, which slides the
  // region back under the pointer, which re-acquires… the same flicker, one step out.
  // The territory a card owns must not depend on whether it is currently hovered.
  function posterScreenBox(p) {
    p.mesh.getWorldPosition(_hb1)
    const lift = p.mesh.position.y - (p.baseY ?? p.mesh.position.y)
    if (lift) {
      // local +Y through the ring's tilt → world, so this is exact under the tilted group
      _hbOff.set(0, lift, 0).applyQuaternion(p.mesh.parent.getWorldQuaternion(_hbQ))
      _hb1.sub(_hbOff)
    }
    _hb2.copy(_hb1)
    _hb2.y += CARD_HALF_H
    _hb1.project(camera)
    _hb2.project(camera)
    const cx = ((_hb1.x + 1) / 2) * width
    const cy = ((1 - _hb1.y) / 2) * height
    const ry = Math.abs(cy - ((1 - _hb2.y) / 2) * height)
    return { cx, cy, rx: ry * CARD_ASPECT, ry }
  }

  // Is (x,y) inside this card's territory? `grow` widens it for the RELEASE test.
  function posterContains(p, x, y, grow = 1) {
    const b = posterScreenBox(p)
    const nx = (x - b.cx) / (b.rx * grow)
    const ny = (y - b.cy) / (b.ry * grow)
    return nx * nx + ny * ny <= 1
  }

  function posterVisible(p) {
    const o = p.material.uniforms?.uOpacity?.value
    return o === undefined || o >= HOVER_MIN_OPACITY
  }

  function posterAtScreen(clientX, clientY) {
    let sum = 0
    for (const p of posters) { p.mesh.getWorldPosition(_sv); sum += _sv.distanceTo(camera.position) }
    const meanD = sum / posters.length
    let best = null, bestD = Infinity
    for (const p of posters) {
      p.mesh.getWorldPosition(_sv)
      if (_sv.distanceTo(camera.position) > meanD) continue   // far copy — behind the ring
      if (!posterVisible(p)) continue                          // faded ghost — not hoverable
      if (!posterContains(p, clientX, clientY)) continue        // pointer isn't on THIS card
      _sv.project(camera)
      const sx = ((_sv.x + 1) / 2) * width
      const sy = ((1 - _sv.y) / 2) * height
      const d = (sx - clientX) ** 2 + (sy - clientY) ** 2
      if (d < bestD) { bestD = d; best = p }                    // overlap → the nearer centre wins
    }
    return best
  }

  // Slot (i) the cursor should hover/click: -1 unless the pointer is over the deck (raycast
  // gate) and the intro's done with nothing selected. Shared by mousemove, the per-frame
  // scroll re-target, and click — so all three agree on the card under the pointer.
  function resolveHoverTarget(x, y) {
    if (!introComplete || selectedIndex !== -1) return -1
    const found = posterAtScreen(x, y)
    if (found) return found.i

    // ── RELEASE HYSTERESIS ──────────────────────────────────────────────────
    // A hovered card LIFTS, which moves its own hitbox up off the pointer. At a
    // card's bottom edge that produced a loop: lift → pointer now outside → unhover
    // → card drops → pointer inside again → lift … i.e. the flicker. Acquiring needs
    // the pointer inside the card; RELEASING needs it outside a deliberately larger
    // region, so the lift alone can never trigger it. Classic hysteresis: the two
    // thresholds must differ or a boundary will always oscillate.
    const held = hoveredIndex !== -1 ? posters[hoveredIndex] : null
    if (held && posterContains(held, x, y, HOVER_RELEASE_GROW)) return hoveredIndex
    return -1
  }

  // Move the lift to `targetSlot` (or clear it at -1): only the one poster lifts (#13), and
  // its flatten/film/text swap ride along. hover/unhover tweens overwrite, so a change hands
  // off smoothly (old lowers as new rises). Fires the hover callback both ways (audio + cursor).
  function applyHover(targetSlot) {
    if (targetSlot === hoveredIndex) return
    if (hoveredIndex !== -1) {
      const prevCh = chapterIdxForSlot(hoveredIndex)
      unhoverChapter(hoveredIndex)
      if (onHoverCallback) onHoverCallback(prevCh, false)
    }
    hoveredIndex = targetSlot
    if (targetSlot !== -1) {
      hoverChapter(targetSlot)
      if (onHoverCallback) onHoverCallback(chapterIdxForSlot(targetSlot), true)
    }
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

    // power2.OUT (not inOut) so the lift starts immediately on hover — inOut eases IN, so the
    // first ~0.3s barely moved and the hover read as laggy though it registered instantly.
    gsap.to(p.material.uniforms.blendFactor, {
      value: 2.0,
      duration: 0.55,
      ease: 'power2.out',
      overwrite: true,
    })
    gsap.to(p.mesh.position, {
      y: p.baseY + 7,
      duration: 0.55,
      ease: 'power2.out',
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
      duration: 0.5,
      ease: 'power2.out',
      overwrite: true,
    })
    gsap.to(p.mesh.position, {
      y: p.baseY,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: true,
    })
    const vid = videoElements[chIdx]
    if (vid) {
      vid.pause()
    }
  }

  function onClick(e) {
    if (!introComplete || selectedIndex !== -1) return

    // Open the card actually under the pointer — front OR side — matching what hover lifts.
    // resolveHoverTarget requires the pointer to be INSIDE a visible card, so a click on
    // empty screen or on a faded background card selects nothing. selectChapter rotates the
    // chosen card to front and opens it, so a side card animates forward first.
    // (Touch uses the parked EXPLORE button → front chapter.)
    const slot = resolveHoverTarget(e.clientX, e.clientY)
    if (slot === -1) return
    selectChapter(chapterIdxForSlot(slot))
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
      const sFinal = heroFillScale()
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
    // camera) when the carousel rotates to (φ − 90)°.
    //
    // The hero must be the copy CURRENTLY nearest the camera — i.e. the physical card the
    // user clicked. Each chapter has two identical copies 180° apart on the ring (the far
    // one faces away). `posters.find()` always returned the LOWER copy (slots 1–4): whenever
    // the MIRROR copy was the one in front, that made the BACK copy the hero and spun the
    // clicked card AWAY to bring its twin round — reading as "the card behind rotates, not
    // the one I clicked". Both copies look identical, so choosing the near one changes only
    // WHICH physical card becomes the hero (the clicked one now does a clean forward spin).
    let heroPoster = null
    let heroDist = Infinity
    for (const p of posters) {
      if (p.chapterIdx !== chIdx) continue
      p.mesh.getWorldPosition(_frontVec)
      const d = _frontVec.distanceToSquared(camera.position)
      if (d < heroDist) { heroDist = d; heroPoster = p }
    }
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
    tl.to(carousel.position, { y: selectedCarouselY(), duration: 3, ease: 'power3.inOut', overwrite: true }, 0)

    // Flatten groupG
    tl.to(groupG.rotation, { x: 0, y: 0, z: 0, duration: 3, ease: 'power3.inOut', overwrite: true }, 0)

    // Scale tuned to the shader's progress=1 content framing (the wordmark/logo sit
    // at a fixed UV; over-scaling pushes them out of the hero). aspectRatio*2.07 is
    // the reference-tuned value.
    const s = heroFillScale()

    tl.to(heroPoster.material.uniforms.blendFactor, { value: 1.0, duration: 2, ease: 'power3.inOut', overwrite: true }, 0)
    tl.to(heroPoster.material.uniforms.progress, { value: 1.0, duration: 2, ease: 'power3.inOut', overwrite: true }, 0)
    tl.to(heroPoster.mesh.scale, { x: s, y: s, z: 1, duration: 2, ease: 'power3.inOut', overwrite: true }, 0)

    // Hide every other poster (including the same chapter's back copy) by dropping it below the
    // frame. The offset must clear the CAROUSEL's selected height, not just be "a big number":
    // -30 clears a carousel parked at -43 (landscape), but portrait parks it at +11, which left
    // the first card at world y -19 — inside the visible -29…+29 band, so the ring sat in plain
    // sight under the hero. Push from the carousel's own resting height instead.
    // The offset has to clear (a) the carousel's own resting height and (b) the frustum at the
    // ring's DEEPEST card. A perspective frustum widens with distance: the front of the ring
    // (z=+40, d=70) has a visible band of ±29, but the BACK (z=-40, d=150) has ±62 — so a card
    // parked for the front band still shows at the back. Landscape never needed this because its
    // hero is ~106 units tall and occludes the whole deck; portrait's hero only covers the top
    // ~62%, leaving them poking out at the bottom.
    let hideFrom = -30                                       // desktop: unchanged, tuned value
    if (isMobile) {
      const dFar = camera.position.z + baseDistance          // deepest ring card
      const halfH = dFar * Math.tan(toRad(camera.fov / 2))   // visible half-height there
      hideFrom = -(halfH + 16 + 12) - selectedCarouselY()    // 16 = card half-height, 12 = margin
    }
    posters.filter((p) => p !== heroPoster).forEach((p, idx) => {
      tl.to(p.mesh.position, { y: hideFrom - idx * 8, duration: 2, ease: 'power3.inOut', overwrite: true }, 0)
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
    tl.to(carousel.position, { y: idleCarouselY(), duration: 2.5, ease: 'power3.inOut', overwrite: true }, 0)

    // Reset all posters
    posters.forEach((p) => {
      tl.to(p.material.uniforms.blendFactor, { value: 0, duration: 1.5, ease: 'power3.inOut', overwrite: true }, 0)
      tl.to(p.material.uniforms.progress, { value: 0, duration: 1.5, ease: 'power3.inOut', overwrite: true }, 0)
      tl.to(p.mesh.scale, { x: 1, y: 1, z: 1, duration: 1.5, ease: 'power3.inOut', overwrite: true }, 0)
      // Restore x/z too (the bottom exit moves cards onto the cluster radius); a deselect reached after a
      // canceled exit would otherwise animate the ring home with cards still collapsed inward.
      tl.to(p.mesh.position, { x: p.baseX, y: p.baseY, z: p.baseZ, duration: 1.5, ease: 'power3.inOut', overwrite: true }, 0)
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

    // Ring height + tilt: gather into the low bowl over phase A, then rise + un-tilt to the homepage over B.
    // (Radius is separate, below — it grows monotonically the whole way; no shrink-first dip.)
    const homeTilt = isMobile ? { x: toRad(22), y: 0, z: 0 } : { x: toRad(25), y: toRad(70), z: toRad(15) }
    const bowlTilt = isMobile ? { x: toRad(48), y: 0, z: 0 } : BOWL_TILT
    let cy, tx, ty, tz
    if (t <= DROP_START) {
      cy = lp(exitStart.cy, BOWL_Y, a)
      tx = lp(exitStart.gx, bowlTilt.x, a); ty = lp(exitStart.gy, bowlTilt.y, a); tz = lp(exitStart.gz, bowlTilt.z, a)
    } else {
      cy = lp(BOWL_Y, 0, b)
      tx = lp(bowlTilt.x, homeTilt.x, b); ty = lp(bowlTilt.y, homeTilt.y, b); tz = lp(bowlTilt.z, homeTilt.z, b)
    }
    carousel.position.y = cy
    groupG.rotation.set(tx, ty, tz)
    // Radius grows MONOTONICALLY from the tight cluster out to the full ring across the whole exit — the deck
    // starts small and continuously expands (no shrink-first dip), so the front cards keep coming toward the
    // camera and the second wine "catches" at the right size as it drops in.
    const radius = lp(CLUSTER_R, baseDistance, ss(t))
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
    // setExitProgress(0) parks the cards on the small cluster radius; the resumed selected state wants them
    // back on their ring slots — the hero especially must return to baseX/baseZ so the scroll-coupling
    // (which only moves .y) keeps it centred full-bleed.
    for (const o of exitStart.others) { o.p.mesh.position.x = o.p.baseX; o.p.mesh.position.z = o.p.baseZ }
    if (selectedHero) { selectedHero.mesh.position.x = selectedHero.baseX; selectedHero.mesh.position.z = selectedHero.baseZ }
    isDeselecting = false     // re-enable animate() scroll-coupling + the route reverse path
    exitStart = null
  }

  function endExit() {
    // Finalize the homepage ring from ANY exit progress. commitExit calls setExitProgress(1) first (clean
    // pose), but a Back pressed mid-scroll calls endExit ALONE — so snap the carousel pose + every poster
    // back to its homepage slot here, else the ring is left low/tilted/collapsed-inward. (animatedRotationY
    // is intentionally left at its spun value — EXIT_SPIN is negative so it flows into the idle, no reversal.)
    carousel.position.y = idleCarouselY()
    groupG.rotation.set(isMobile ? toRad(22) : toRad(25), isMobile ? 0 : toRad(70), isMobile ? 0 : toRad(15))
    posters.forEach((p) => {
      p.mesh.position.set(p.baseX, p.baseY, p.baseZ)
      p.mesh.scale.set(1, 1, 1)
      if (p.material.uniforms.uOpacity) p.material.uniforms.uOpacity.value = 1
      if (p.material.uniforms.blendFactor) p.material.uniforms.blendFactor.value = 0
      if (p.material.uniforms.progress) p.material.uniforms.progress.value = 0
    })
    if (groupG.userData.txtMat) groupG.userData.txtMat.opacity = 1
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
    // Touch: the deck leans with the swipe, then settles upright (see LEAN_* above).
    swipeVel += delta * 0.0008
  }

  // Inner-page scroll position (px), pushed in from the page's Lenis instance.
  // Read by animate() to scroll-couple the hero card (P1). No-op on the homepage
  // (the coupling block is gated by selectedIndex).
  function setScroll(px) {
    scrollOffsetPx = Math.max(0, px || 0)
  }

  // Scale the centre wordmark plane so it always fits the viewport WIDTH. The visible width at
  // the plane's depth is 2·d·tan(fov/2)·aspect; on a portrait phone that's far less than the
  // plane's 60 units, which cropped the wordmark. Only ever scales DOWN (desktop keeps 1:1).
  // Idle (homepage) carousel Y. Desktop drops the ring so the front card clears the central
  // tagline; mobile keeps 0 (its ring/text separation is handled by TXT_Y_MOBILE + fitTxtMesh).
  function idleCarouselY() { return isMobile ? 0 : IDLE_Y_DESKTOP }

  function fitTxtMesh() {
    const mesh = groupG?.userData?.txtMesh
    if (!mesh || !camera) return
    // Portrait puts the wordmark in the UPPER third so the (large, central) cards don't bury it
    // — the reference separates them the same way. Landscape keeps the tuned -8 (issue #11).
    mesh.position.y = isMobile ? TXT_Y_MOBILE : TXT_Y_DESKTOP
    const d = Math.max(1, camera.position.z - mesh.position.z)
    const visibleW = 2 * d * Math.tan(toRad(camera.fov / 2)) * aspectRatio
    // Mobile scales to fit the narrow frustum; desktop applies a fixed shrink so the big
    // central tagline no longer reaches down into the card cluster.
    const s = isMobile ? Math.min(1, (visibleW * 0.92) / TXT_PLANE) : TXT_SCALE_DESKTOP
    mesh.scale.set(s, s, 1)
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
    fitTxtMesh()   // aspect changed (incl. iOS URL-bar show/hide) → refit the wordmark

    // Keep the hero full-bleed across resizes — its scale is aspect-dependent and was
    // baked at select time (the reference rescales on resize too). Skip while animating:
    // mid-select the live scale tween would fight this (the select onComplete re-applies
    // the final scale from the then-current aspect instead).
    if (selectedIndex !== -1 && selectedHero && !isDeselecting && !isSelecting) {
      const s = heroFillScale()
      selectedHero.mesh.scale.set(s, s, 1)
      // The hero's resting height is orientation-dependent too (see SELECTED_Y_MOBILE), so a
      // rotate — or an iOS URL-bar resize that flips the aspect — has to re-anchor it as well,
      // otherwise the card slides off the bottom of a portrait viewport.
      carousel.position.y = selectedCarouselY()
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
  function onFrontChapter(cb) { onFrontChapterCallback = cb }
  function onProgress(cb) { onProgressCallback = cb }
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
    onFrontChapter,
    onProgress,
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
