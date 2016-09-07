var SWITCH_TO_3D = false;

var CONTAINER, SCENE, CAMERA, RENDERER;
var LEIADISPLAYINFO, LEIAHOLOSCREEN, LEIARENDERER, LEIAKEYS;
var RENDERSTART = new Date().getTime();
var PLANE_Y_POS = -10;
var SPHERE;

init();
animate();

function init() {
    CONTAINER = document.createElement( 'div' );
    document.body.appendChild( CONTAINER );
    CONTAINER.innerHTML = "";

    SCENE = new THREE.Scene();

    CAMERA = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
    CAMERA.position.z = 50; // does not effect Leia3d

    addLighting();
    addGround();
    addGridMarkingsToGround();
    addBuildings();
    addSphere();


    if (SWITCH_TO_3D == true) {
        setupLeiaComponents();
        CONTAINER.appendChild(LEIARENDERER.renderer.domElement);    
    } else {
        setupThreeRenderer();
        CONTAINER.appendChild( RENDERER.domElement );
    }
             
}

function setupThreeRenderer() {
    RENDERER = new THREE.WebGLRenderer();
    RENDERER.setClearColor( 0xbfd1e5 );
    RENDERER.setPixelRatio( window.devicePixelRatio );
    RENDERER.setSize( window.innerWidth, window.innerHeight );
}

function setupLeiaComponents() {
    // Essential Leia Objects
    //var LEIADISPLAYINFO, LEIAHOLOSCREEN, LEIARENDERER, LEIAKEYS;
    // leia init
	LEIADISPLAYINFO = new LeiaDisplayInfo('https://www.leiainc.com/config/displayPrototypeSmallDevKit.json') ;
    LEIAHOLOSCREEN = new LeiaHoloScreen(LEIADISPLAYINFO) ;
    LEIARENDERER = new LeiaRenderer(LEIAHOLOSCREEN) ;
    LEIAKEYS = new LeiaKeystrokeHandler(SCENE, LEIAHOLOSCREEN, LEIARENDERER, true );    
}

function addBuildings() {
    var buildingsConfig = [{
            "boxGeometry" : {
                "x" : 4,
                "y" : 20,
                "z" : 8
            },
            "color" : 0x444444,
            "position" : {
                "x" : 10,
                "y" : 0,
                "z" : 0
            }
        },
        {
            "boxGeometry" : {
                "x" : 4,
                "y" : 26,
                "z" : 12
            },
            "color" : 0x888888,
            "position" : {
                "x" : 5,
                "y" : 3,
                "z" : -8
            }
        }];

    for (var i = 0; i < buildingsConfig.length; i++) {
        addBuilding(buildingsConfig[i]);
    }
    
}

function addBuilding(buildingConfig) {
    var buildingOneGeo = new THREE.BoxGeometry( buildingConfig.boxGeometry.x, buildingConfig.boxGeometry.y, buildingConfig.boxGeometry.z );
    var buildingOneMaterial = new THREE.MeshBasicMaterial( {color: buildingConfig.color} );
    var buildingOne = new THREE.Mesh( buildingOneGeo, buildingOneMaterial );
    buildingOne.position.x = buildingConfig.position.x; 
    buildingOne.position.y = buildingConfig.position.y; 
    buildingOne.position.z = buildingConfig.position.z; 
    SCENE.add(buildingOne);

    addCubeOutline(buildingOneGeo, buildingOne);
}

function addCubeOutline(buildingGeo, building) {
    var whiteMaterial =  new THREE.MeshBasicMaterial( { color:0xffffff, wireframe: true, transparent: true, overdraw:true } ),
        cube          = new THREE.Mesh( buildingGeo, whiteMaterial );
    cube.position.x = building.position.x;
    cube.position.y = building.position.y;
    cube.position.z = building.position.z;
    SCENE.add( cube );
}

function addLighting() {
    var ambientLight     = new THREE.AmbientLight( 0xcccccc ),
        directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
    directionalLight.position.set( 1, 1, 0.5 ).normalize();
    SCENE.add( ambientLight );
    SCENE.add( directionalLight );
}

function addGround() {
    var geo   = new THREE.PlaneBufferGeometry( 40, 40 ),
        plane = new THREE.Mesh(geo.rotateX( - Math.PI / 2 ), new THREE.MeshBasicMaterial({ color: 0x999999 }) );
    
    plane.position.y = PLANE_Y_POS;
    SCENE.add( plane )
}

function addGridMarkingsToGround() {
    var size = 20, 
        step = 2,
        geometry = new THREE.Geometry(),
        material = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 10 } ),
        line = new THREE.LineSegments( geometry, material );

    for ( var i = - size; i <= size; i += step ) {
        geometry.vertices.push( new THREE.Vector3( - size, 0, i ) );
        geometry.vertices.push( new THREE.Vector3(   size, 0, i ) );
        geometry.vertices.push( new THREE.Vector3( i, 0, - size ) );
        geometry.vertices.push( new THREE.Vector3( i, 0,   size ) );
    }

    line.position.y = PLANE_Y_POS;
    SCENE.add(line);
}

function addSphere() {
    var sphereGeometry = new THREE.SphereGeometry(4, 32, 32),
        whiteMaterial  = new THREE.MeshPhongMaterial( { color: 0xffffff, shininess: 30 } );
    
    SPHERE = new THREE.Mesh(sphereGeometry, whiteMaterial);
    SPHERE.position.set(-5,5,10.0);
    SCENE.add(SPHERE);
}

function animate() {		
	var elapsed = new Date().getTime()-RENDERSTART;
	requestAnimationFrame(animate);
	SPHERE.position.y = (4*(1.5+0.5*Math.cos(elapsed/1000.0)) + (PLANE_Y_POS / 2.0)) - 2.0;
	if (SWITCH_TO_3D == true) {
    	LEIARENDERER.render(SCENE, LEIAHOLOSCREEN) ;
	} else {
    	RENDERER.render(SCENE, CAMERA);
	}
}


