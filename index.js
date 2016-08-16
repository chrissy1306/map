// create a building
// add the sphere

var container, scene;

init();
render();

function init() {
    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set( 500, 800, 1300 );
    camera.lookAt( new THREE.Vector3() );
    scene = new THREE.Scene();

    // ground
    var geo = new THREE.PlaneBufferGeometry( 1000, 1000 );
    geo.rotateX( - Math.PI / 2 );
    var plane = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0x999933 }) );
    scene.add( plane )

    // grid
    var size = 500, step = 200;

    var geometry = new THREE.Geometry();

    for ( var i = - size; i <= size; i += step ) {

        geometry.vertices.push( new THREE.Vector3( - size, 0, i ) );
        geometry.vertices.push( new THREE.Vector3(   size, 0, i ) );

        geometry.vertices.push( new THREE.Vector3( i, 0, - size ) );
        geometry.vertices.push( new THREE.Vector3( i, 0,   size ) );

    }

    var material = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 100 } );
    var line = new THREE.LineSegments( geometry, material );
    scene.add( line );

    //buildings
    building()

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

    container.appendChild( renderer.domElement );
}

function render() {
    renderer.render( scene, camera );
}

function building() {
    var buildingOneGeo = new THREE.BoxGeometry( 200, 500, 200 );
    var buildingOneMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var buildingOne = new THREE.Mesh( buildingOneGeo, buildingOneMaterial );
    scene.add(buildingOne)


    var buildingTwoGeo = new THREE.BoxGeometry( 400, 800, 200 );
    var buildingTwoMaterial = new THREE.MeshBasicMaterial( { color: 0xFF3300 } );
    var buildingTwo = new THREE.Mesh( buildingTwoGeo, buildingTwoMaterial );
    buildingTwo.position.x = 300;
    buildingTwo.position.z = -400;
    scene.add(buildingTwo)

}
