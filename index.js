// create a building
// add the sphere

var switch_to_3d = false;

var container, scene;
var leiaDisplayInfo, leiaHoloScreen, leiaRenderer, leiaKeys;
var renderStart = new Date().getTime();
var plane_y_pos = -10;
	 
init();
//render();
animate()

function init() {
    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
    //camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set( -10, 5, 50 ); // does not effect Leia3d
    //camera.position.set( 500, 800, 1300 );
    camera.lookAt( new THREE.Vector3() );
    scene = new THREE.Scene();

    // ground
    var geo = new THREE.PlaneBufferGeometry( 40, 40 );
    //var geo = new THREE.PlaneBufferGeometry( 1000, 1000 );
    geo.rotateX( - Math.PI / 2 );
    var plane = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0x999999 }) );
    //var plane = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0x999933 }) );
    plane.position.y = plane_y_pos;
    scene.add( plane )

    // grid
    var size = 20, step = 2;
    //var size = 500, step = 200;
    var geometry = new THREE.Geometry();
    for ( var i = - size; i <= size; i += step ) {

        geometry.vertices.push( new THREE.Vector3( - size, 0, i ) );
        geometry.vertices.push( new THREE.Vector3(   size, 0, i ) );

        geometry.vertices.push( new THREE.Vector3( i, 0, - size ) );
        geometry.vertices.push( new THREE.Vector3( i, 0,   size ) );

    }
    var material = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 10 } );
    //var material = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 100 } );
    var line = new THREE.LineSegments( geometry, material );
    line.position.y = plane_y_pos;
    scene.add( line );

    //buildings
    building()
    
    add_sphere()
    

    // lighting
    var ambientLight = new THREE.AmbientLight( 0xcccccc );
    scene.add( ambientLight );
    var directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
    directionalLight.position.set( 1, 1, 0.5 ).normalize();
    scene.add( directionalLight );

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( 0xbfd1e5 );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );

    container.innerHTML = "";

    //container.appendChild( renderer.domElement );
    // Essential Leia Objects
    //var leiaDisplayInfo, leiaHoloScreen, leiaRenderer, leiaKeys;
    // leia init
	leiaDisplayinfo = new LeiaDisplayInfo('https://www.leiainc.com/config/displayPrototypeSmallDevKit.json') ;
    leiaHoloScreen = new LeiaHoloScreen(leiaDisplayInfo) ;
    leiaRenderer = new LeiaRenderer(leiaHoloScreen) ;
    leiaKeys = new LeiaKeystrokeHandler(scene, leiaHoloScreen, leiaRenderer, true );

    if (switch_to_3d == true) {
    	container.appendChild(leiaRenderer.renderer.domElement);    
    } else {
    	container.appendChild( renderer.domElement );
    }
             
}

function render() {
    //renderer.render( scene, camera );
	if (switch_to_3d == true) {
    	leiaRenderer.render(scene, leiaHoloScreen) ;
	} else {
		renderer.render(scene, camera);
	}
}

function building() {
    var buildingOneGeo = new THREE.BoxGeometry( 4, 20, 8 );
    //var buildingOneGeo = new THREE.BoxGeometry( 200, 500, 200 );
    var buildingOneMaterial = new THREE.MeshBasicMaterial( { color: 0x444444 } );
    //var buildingOneMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var buildingOne = new THREE.Mesh( buildingOneGeo, buildingOneMaterial );
    buildingOne.position.x = 10; 
    buildingOne.position.y = 2; 
    scene.add(buildingOne)


    var buildingTwoGeo = new THREE.BoxGeometry( 8, 12, 8 );
    //var buildingTwoGeo = new THREE.BoxGeometry( 400, 800, 200 );
    var buildingTwoMaterial = new THREE.MeshBasicMaterial( { color: 0x888888 } );
    //var buildingTwoMaterial = new THREE.MeshBasicMaterial( { color: 0xFF3300 } );
    var buildingTwo = new THREE.Mesh( buildingTwoGeo, buildingTwoMaterial );
    buildingTwo.position.x = -10;
    buildingTwo.position.z = -8;
    buildingTwo.position.y = 6;
    //buildingTwo.position.x = 300;
    //buildingTwo.position.z = -400;
    scene.add(buildingTwo)

}

function add_sphere() {
var sphereGeometry = new THREE.SphereGeometry(4, 32, 32);
//var sphereGeometry = new THREE.SphereGeometry(2,16,16);
var whiteMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, shininess: 30 } );
sphere = new THREE.Mesh(sphereGeometry, whiteMaterial);
//sphere.position.set(-5,5,2.0);
sphere.position.set(-5,0,2.0);
//sphere.position.y = sphere.position.y + plane_y_pos;
scene.add(sphere);
}

function animate() {		
	var elapsed = new Date().getTime()-renderStart;
	requestAnimationFrame(animate);
	sphere.position.y = 4*(1.5+0.5*Math.cos(elapsed/1000.0)) + (plane_y_pos / 2.0);
	if (switch_to_3d == true) {
    	//sphere.position.y = 2*(1.5+0.5*Math.cos(leiaRenderer.timer*3));
    	leiaRenderer.render(scene, leiaHoloScreen) ;
	} else {
		//alert('Rendered in ' + elapsed + 'ms');  
		//sphere.position.y = 2.0*(1.5+0.5*Math.cos(elapsed/1000.0));
    	//sphere.position.z = sphere.position.z + 0.01;
    	renderer.render(scene, camera);
	}
}


