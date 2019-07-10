const backgroundColor = 0x000000

/*////////////////////////////////////////*/
let clock = new THREE.Clock()
var renderCalls = []
function render() {
  requestAnimationFrame(render)
  renderCalls.forEach(callback => {
    callback()
  })
}
render()

/*////////////////////////////////////////*/

var scene = new THREE.Scene()
let mixer = null
var camera = new THREE.PerspectiveCamera(2, window.innerWidth / window.innerHeight, 0.1, 800)
camera.position.set(-200, -200, -200)

var renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(backgroundColor) //0x );

renderer.toneMapping = THREE.LinearToneMapping
renderer.toneMappingExposure = Math.pow(0.94, 5.0)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap

window.addEventListener(
  'resize',
  function() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  },
  false
)

document.body.appendChild(renderer.domElement)

function renderScene() {
  renderer.render(scene, camera)
}
renderCalls.push(renderScene)

/* ////////////////////////////////////////////////////////////////////////// */

var controls = new THREE.OrbitControls(camera)

controls.rotateSpeed = 0.3
controls.zoomSpeed = 0.9

controls.minDistance = 3
controls.maxDistance = 20

controls.minPolarAngle = 0 // radians
controls.maxPolarAngle = Math.PI / 2 // radians

controls.enableDamping = true // for (var i = 0; i < gltf.animations.length; i++) {

controls.dampingFactor = 0.05

renderCalls.push(function() {
  controls.update()
})

var light = new THREE.AmbientLight(0xffffff) // soft white light
scene.add(light)

var directionalLight2 = new THREE.DirectionalLight(0xff0000, 2)
directionalLight2.position.set(0, -39, 30)

var directionalLight = new THREE.DirectionalLight(0x0000ff, 2)
directionalLight.position.set(30, -100, 30)
scene.add(directionalLight2)
scene.add(directionalLight)
/* ////////////////////////////////////////////////////////////////////////// */

/* ////////////////////////////////////////////////////////////////////////// */
var object
var loader = new THREE.GLTFLoader()
loader.crossOrigin = true
loader.load('scene.gltf', function(data) {
  object = data.scene

  object.scale.set(0.1, 0.1, 0.1)
  console.log(object)
  object.rotation.x = 3
  object.rotation.y = 3

  var gltf = data
  // if (gltf.animations && gltf.animations.length) {
  //   // mixer = new THREE.AnimationMixer(gltf.scene)
  //   // for (var i = 0; i < gltf.animations.length; i++) {
  //   //   // var animation = gltf.animations[0]
  //   //   // mixer.clipAction(animation).play()
  //   // }
  // }

  scene.add(object)
  //, onProgress, onError );
})

function animate() {
  requestAnimationFrame(animate)
  controls.update()
  if (mixer) {
    mixer.update(clock.getDelta() * mixer.timeScale)
  }
  renderer.render(scene, camera)
}
animate()
