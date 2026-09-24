import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import './ScrollStar.css'

function ScrollStar() {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    // 1. Scene & Camera Setup (Matching wondermakers.digital: fov: 75, pos: [0, 0, 5])
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      50
    )
    camera.position.set(0, 0, 5)

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.0
    container.appendChild(renderer.domElement)

    // 3. Exact Lighting from wondermakers.digital
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 20)
    dirLight1.position.set(5, -2, 0)
    scene.add(dirLight1)

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 3)
    dirLight2.position.set(-5, -2, 0)
    scene.add(dirLight2)

    // 4. Exact Environment Map from wondermakers.digital
    // Essential for realistic physical glass transmission & chrome reflections
    const textureLoader = new THREE.TextureLoader()
    textureLoader.load('/models/env.jpg', (envTexture) => {
      envTexture.mapping = THREE.EquirectangularReflectionMapping
      envTexture.colorSpace = THREE.SRGBColorSpace
      scene.environment = envTexture
    })

    // 5. Star Hierarchy
    const starGroup = new THREE.Group()
    scene.add(starGroup)

    let starMesh = null
    let darkMaterial = null
    let lightMaterial = null

    // Exact Light Mode Material from wondermakers.digital
    lightMaterial = new THREE.MeshPhysicalMaterial({
      color: '#ffffff',
      opacity: 1,
      transparent: true,
      side: THREE.FrontSide,
      metalness: 0,
      roughness: 0.05,
      ior: 2.4,
      clearcoat: 1,
      clearcoatRoughness: 0.5,
      sheen: 0,
      sheenRoughness: 0.3,
      sheenColor: '#e1fc06',
      iridescence: 0,
      iridescenceIOR: 1,
      transmission: 1,
      thickness: 1.5,
      attenuationDistance: Infinity,
      attenuationColor: '#ffffff',
      specularIntensity: 1,
      specularColor: '#ffffff',
      anisotropy: 0,
      anisotropyRotation: 0,
      envMapIntensity: 1,
    })

    // Scale calculation from wondermakers.digital
    const computeScale = () => {
      const distance = camera.position.z
      const radFov = (camera.fov * Math.PI) / 180
      const frustumHeight = 2 * Math.tan(radFov / 2) * distance
      const frustumWidth = frustumHeight * camera.aspect
      const isDesktop = window.innerWidth > 1024
      const base = isDesktop ? frustumHeight / 8 : frustumWidth / 5
      return base * 0.85
    }

    let targetBaseScale = computeScale()

    // Intro Animation Progress (from scale 0, rot [PI/2, 0, PI/2] to normal)
    let introProgress = 0
    const introDuration = 1.5 // seconds
    let startTime = null

    // Cubic-bezier ease matching wondermakers.digital D(.2, .6, .35, 1)
    const cubicEase = (t) => {
      // standard cubic-bezier approximation for (.2, .6, .35, 1)
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    }

    // Initial group transform matching wondermakers.digital:
    // Parent group has rotation.z = Math.PI / 2 so local Y rotation pitches the star vertically along the scroll axis
    starGroup.rotation.set(Math.PI / 2, 0, Math.PI / 2)
    starGroup.scale.set(0, 0, 0)
    starGroup.position.set(0, 0, 0)

    // Load Star Model
    const gltfLoader = new GLTFLoader()
    gltfLoader.load(
      '/models/star.glb',
      (gltf) => {
        let mesh = null
        gltf.scene.traverse((child) => {
          if (child.isMesh && !mesh) {
            mesh = child
          }
        })
        if (!mesh && gltf.scene.children.length > 0) {
          mesh = gltf.scene.children[0]
        }

        if (mesh) {
          starMesh = mesh

          // Reset local rotation to [0, 0, 0] matching wondermakers.digital
          starMesh.rotation.set(0, 0, 0)

          // Store dark material (original clone from star.glb)
          if (mesh.material) {
            darkMaterial = mesh.material.clone()
            if (darkMaterial.metalness !== undefined) {
              darkMaterial.metalness = 0.95
              darkMaterial.roughness = 0.08
              darkMaterial.envMapIntensity = 1.2
            }
          } else {
            darkMaterial = new THREE.MeshStandardMaterial({
              color: 0x111111,
              metalness: 0.95,
              roughness: 0.1,
            })
          }

          // Center geometry to pivot perfectly at origin
          if (starMesh.geometry) {
            starMesh.geometry.center()
          }

          // Apply current theme material
          const isDark =
            document.documentElement.classList.contains('dark') ||
            document.documentElement.getAttribute('data-theme') === 'dark'
          starMesh.material = isDark ? darkMaterial : lightMaterial

          starGroup.add(starMesh)
          container.classList.add('is-loaded')
          startTime = performance.now()
        }
      },
      undefined,
      (err) => {
        console.warn('Could not load star.glb:', err)
      }
    )

    // Theme Switcher Observer
    const themeObserver = new MutationObserver(() => {
      if (!starMesh) return
      const isDark =
        document.documentElement.classList.contains('dark') ||
        document.documentElement.getAttribute('data-theme') === 'dark'
      starMesh.material = isDark ? darkMaterial : lightMaterial
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    })

    // Scroll Tracking matching reversed bottom-to-top flow
    let scrollY = window.scrollY
    let currentRotY = window.scrollY * 0.003

    const onScroll = () => {
      scrollY = window.scrollY
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    // Window Resize Handler
    const onResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
      targetBaseScale = computeScale()
    }
    window.addEventListener('resize', onResize)

    // Animation Loop
    let animationFrameId


    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      // Handle Intro Transition: rotation.x from Math.PI/2 -> 0, rotation.z remains Math.PI/2
      if (startTime !== null && introProgress < 1) {
        const timePassed = (performance.now() - startTime) / 1000
        introProgress = Math.min(1, timePassed / introDuration)
        const eased = cubicEase(introProgress)

        const currentScale = targetBaseScale * eased
        starGroup.scale.set(currentScale, currentScale, currentScale)

        starGroup.rotation.x = (Math.PI / 2) * (1 - eased)
        starGroup.rotation.y = 0
        starGroup.rotation.z = Math.PI / 2
      } else if (introProgress >= 1) {
        starGroup.scale.set(targetBaseScale, targetBaseScale, targetBaseScale)
        starGroup.rotation.x = 0
        starGroup.rotation.y = 0
        starGroup.rotation.z = Math.PI / 2
      }

      // Scroll Rotation: rolls backward (top tip tilts away into background, bottom rises forward towards you)
      if (starMesh) {
        const targetRotY = scrollY * 0.003
        currentRotY += (targetRotY - currentRotY) * 0.1
        starMesh.rotation.y = currentRotY
        starMesh.rotation.x = 0
        starMesh.rotation.z = 0
      }

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      themeObserver.disconnect()

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }

      renderer.dispose()
      if (starMesh) {
        if (starMesh.geometry) starMesh.geometry.dispose()
        if (darkMaterial) darkMaterial.dispose()
        if (lightMaterial) lightMaterial.dispose()
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="wm-scroll-star-wrap"
      aria-hidden="true"
    />
  )
}


export default ScrollStar

