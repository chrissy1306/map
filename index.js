// create a building
// add the sphere

var SWITCH_TO_3D = true;

var CONTAINER, SCENE;
var LEIADISPLAYINFO, LEIAHOLOSCREEN, LEIARENDERER, LEIAKEYS;
var RENDERSTART = new Date().getTime();
var PLANE_Y_POS = -10;
	 
init();
//render();
animate()

function init() {
    CONTAINER = document.createElement( 'div' );
    document.body.appendChild( CONTAINER );

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
    //camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set( -10, 5, 50 ); // does not effect Leia3d
    //camera.position.set( 500, 800, 1300 );
    camera.lookAt( new THREE.Vector3() );
    SCENE = new THREE.Scene();

    // ground
    var geo = new THREE.PlaneBufferGeometry( 40, 40 );
    //var geo = new THREE.PlaneBufferGeometry( 1000, 1000 );
    geo.rotateX( - Math.PI / 2 );
    var plane = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0x999999 }) );
    //var plane = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0x999933 }) );
    plane.position.y = PLANE_Y_POS;
    SCENE.add( plane )

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
    line.position.y = PLANE_Y_POS;
    SCENE.add( line );

    //buildings
    building()
    
    add_sphere()
    

    // lighting
    var ambientLight = new THREE.AmbientLight( 0xcccccc );
    SCENE.add( ambientLight );
    var directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
    directionalLight.position.set( 1, 1, 0.5 ).normalize();
    SCENE.add( directionalLight );

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( 0xbfd1e5 );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );

    CONTAINER.innerHTML = "";

    //CONTAINER.appendChild( renderer.domElement );
    // Essential Leia Objects
    //var LEIADISPLAYINFO, LEIAHOLOSCREEN, LEIARENDERER, LEIAKEYS;
    // leia init
	LEIADISPLAYINFO = new LeiaDisplayInfo('https://www.leiainc.com/config/displayPrototypeSmallDevKit.json') ;
    LEIAHOLOSCREEN = new LeiaHoloScreen(LEIADISPLAYINFO) ;
    LEIARENDERER = new LeiaRenderer(LEIAHOLOSCREEN) ;
    LEIAKEYS = new LeiaKeystrokeHandler(SCENE, LEIAHOLOSCREEN, LEIARENDERER, true );

    if (SWITCH_TO_3D == true) {
    	CONTAINER.appendChild(LEIARENDERER.renderer.domElement);    
    } else {
    	CONTAINER.appendChild( renderer.domElement );
    }
             
}

function render() {
    //renderer.render( SCENE, camera );
	if (SWITCH_TO_3D == true) {
    	LEIARENDERER.render(SCENE, LEIAHOLOSCREEN) ;
	} else {
		renderer.render(SCENE, camera);
	}
}

function building() {
    var buildingOneGeo = new THREE.BoxGeometry( 4, 20, 8 );
    //var buildingOneGeo = new THREE.BoxGeometry( 200, 500, 200 );
    var buildingOneMaterial = new THREE.MeshBasicMaterial( { color: 0x444444 } );
    //var buildingOneMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var buildingOne = new THREE.Mesh( buildingOneGeo, buildingOneMaterial );
    buildingOne.position.x = 10; 
    buildingOne.position.y = 0; 
    SCENE.add(buildingOne);

    var whitematerial =  new THREE.MeshBasicMaterial( { color:0xffffff, wireframe: true, transparent: true, overdraw:true } );
    
    var cubeOne = new THREE.Mesh( buildingOneGeo, whitematerial );
    cubeOne.position.x = buildingOne.position.x;
    cubeOne.position.z = buildingOne.position.z;
    cubeOne.position.y = buildingOne.position.y;
    SCENE.add( cubeOne );

    var buildingTwoGeo = new THREE.BoxGeometry( 4, 26, 12 );
    //var buildingTwoGeo = new THREE.BoxGeometry( 400, 800, 200 );
    var buildingTwoMaterial = new THREE.MeshBasicMaterial( { color: 0x888888 } );
    //var buildingTwoMaterial = new THREE.MeshBasicMaterial( { color: 0xFF3300 } );
    var buildingTwo = new THREE.Mesh( buildingTwoGeo, buildingTwoMaterial );
    buildingTwo.position.x = 5;
    buildingTwo.position.z = -8;
    buildingTwo.position.y = 3;
    //buildingTwo.position.x = 300;
    //buildingTwo.position.z = -400;
    SCENE.add(buildingTwo)
    
    var cubeTwo = new THREE.Mesh( buildingTwoGeo, whitematerial );
    cubeTwo.position.x = buildingTwo.position.x;
    cubeTwo.position.z = buildingTwo.position.z;
    cubeTwo.position.y = buildingTwo.position.y;
    SCENE.add( cubeTwo );
    

}

function add_sphere() {
var sphereGeometry = new THREE.SphereGeometry(4, 32, 32);
//var sphereGeometry = new THREE.SphereGeometry(2,16,16);
var whiteMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, shininess: 30 } );
sphere = new THREE.Mesh(sphereGeometry, whiteMaterial);
sphere.position.set(-5,5,10.0);
SCENE.add(sphere);
}

function animate() {		
	var elapsed = new Date().getTime()-RENDERSTART;
	requestAnimationFrame(animate);
	sphere.position.y = (4*(1.5+0.5*Math.cos(elapsed/1000.0)) + (PLANE_Y_POS / 2.0)) - 2.0;
	if (SWITCH_TO_3D == true) {
    	//sphere.position.y = 2*(1.5+0.5*Math.cos(LEIARENDERER.timer*3));
    	LEIARENDERER.render(SCENE, LEIAHOLOSCREEN) ;
	} else {
		//alert('Rendered in ' + elapsed + 'ms');  
		//sphere.position.y = 2.0*(1.5+0.5*Math.cos(elapsed/1000.0));
    	//sphere.position.z = sphere.position.z + 0.01;
    	renderer.render(SCENE, camera);
	}
}


