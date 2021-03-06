const presentation = document.querySelector('#presentation');
const contact = document.querySelector('#contact');
const skills = document.querySelector('#skills');
const container = document.querySelector('body');
const portfolio = document.querySelector('#portfolio');
const download = document.querySelector('#download');
const skillsTitle = document.querySelector('#skillsTitle');
const presentationTitle = document.querySelector('#presentationTitle');
const contactTitle = document.querySelector('#contactTitle');
const portfolioTitle = document.querySelector('#portfolioTitle');
const downloadTitle = document.querySelector('#downloadTitle');

// scene init
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 110, window.innerWidth / window.innerHeight, 0.1, 1000 );

// sphere
const geometry = new THREE.SphereGeometry( 50, 32, 32 );
const texture = new THREE.TextureLoader().load('images/office.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.repeat.x = -1;
const material = new THREE.MeshBasicMaterial( {
    map: texture,
    side: THREE.DoubleSide
} );
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

// Sprite
function addSprite(position, name) {
    let map = new THREE.TextureLoader().load( 'images/question.png' );
    let spriteMaterial = new THREE.SpriteMaterial( { map: map } );
    let sprite = new THREE.Sprite( spriteMaterial );
    sprite.name = name;
    sprite.position.copy(position.clone().normalize().multiplyScalar(30));
    if (window.innerWidth < 1024) {
        sprite.scale.multiplyScalar(3.2);
    } else {
        sprite.scale.multiplyScalar(2.2);
    }
    
    scene.add( sprite );
}

// rendu
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
container.appendChild( renderer.domElement );

// controls
const controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.enableZoom = false;
if (window.innerWidth < 1024) {
    controls.rotateSpeed = -0.5;
} else {
    controls.rotateSpeed = 0.5;
}

camera.position.set(1, 0, 0);
controls.update();

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();

function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

const rayCaster = new THREE.Raycaster();


var visible = false;

function displayOnIntersect() {
    let intersects = rayCaster.intersectObjects(scene.children);
    intersects.forEach(intersect => {
        if(intersect.object.name === 'skills' && intersect.object.type === 'Sprite' && visible === false) {
            let p = intersect.object.position.clone().project(camera);
            // skills.style.top = window.innerHeight / 3 + 'px';
            // skills.style.left = window.innerWidth / 3 + 'px';
            skills.classList.remove('hidden');
            skills.classList.add('is-active');
            setTimeout(function(){
                skills.classList.add('opacity');
            }, 0.1);
            visible = true;
        } else if(intersect.object.name === 'contact' && intersect.object.type === 'Sprite' && visible === false) {
            let p = intersect.object.position.clone().project(camera);
            // contact.style.top = window.innerHeight / 5 + 'px';
            // contact.style.left = window.innerWidth / 3 + 'px';
            contact.classList.remove('hidden');
            contact.classList.add('is-active');
            setTimeout(function(){
                contact.classList.add('opacity');
            }, 0.1);
            visible = true;
        } else if(intersect.object.name === 'presentation' && intersect.object.type === 'Sprite' && visible === false) {
            let p = intersect.object.position.clone().project(camera);
            // presentation.style.top = window.innerHeight / 3 + 'px';
            // presentation.style.left = window.innerWidth / 3 + 'px';
            presentation.classList.remove('hidden');
            presentation.classList.add('is-active');
            setTimeout(function(){
                presentation.classList.add('opacity');
            }, 0.1);
            visible = true;
        } else if(intersect.object.name === 'portfolio' && intersect.object.type === 'Sprite' && visible === false) {
            let p = intersect.object.position.clone().project(camera);
            // portfolio.style.top = window.innerHeight / 3 + 'px';
            // portfolio.style.left = window.innerWidth / 3 + 'px';
            portfolio.classList.remove('hidden');
            portfolio.classList.add('is-active');
            setTimeout(function(){
                portfolio.classList.add('opacity');
            }, 0.1);
            visible = true;
        } else if(intersect.object.name === 'download' && intersect.object.type === 'Sprite' && visible === false) {
            let p = intersect.object.position.clone().project(camera);
            // download.style.top = window.innerHeight / 3 + 'px';
            // download.style.left = window.innerWidth / 3 + 'px';
            download.classList.remove('hidden');
            download.classList.add('is-active');
            setTimeout(function(){
                download.classList.add('opacity');
            }, 0.1);
            visible = true;
        }
    });
}

function onClick(e) {
    
    let mouse = new THREE.Vector2(
        ( e.clientX / window.innerWidth ) * 2 - 1,
        - ( e.clientY / window.innerHeight ) * 2 + 1
    );
    rayCaster.setFromCamera(mouse, camera);
    displayOnIntersect();
        //Add sprite with intersects (decomment next lines and comment line 65 to 70)

        // let intersects = rayCaster.intersectObject(sphere);
        // if(intersects.length > 0) {
        // console.log(intersects[0].point);
        // addSprite(intersects[0].point);
        // }
}

function onTouch(e) {
    let touch = new THREE.Vector2(
        ( e.changedTouches[0].clientX / window.innerWidth ) * 2 - 1,
        - ( e.changedTouches[0].clientY / window.innerHeight ) * 2 + 1
    );
    rayCaster.setFromCamera(touch, camera);
    displayOnIntersect();
}

let spriteIsActive = false;

/**
 *  Detect mouse hover the stripes
 */
function onMouseMove(e) {
    let mouse = new THREE.Vector2(
        ( e.clientX / window.innerWidth ) * 2 - 1,
        - ( e.clientY / window.innerHeight ) * 2 + 1
    );
    rayCaster.setFromCamera(mouse, camera);
    let foundSprite = false;
    let intersects = rayCaster.intersectObjects(scene.children);
    intersects.forEach(intersect => {
        if(intersect.object.name === 'skills' && intersect.object.type === 'Sprite' && visible === false) {
            let p = intersect.object.position.clone().project(camera);
            skillsTitle.style.top = ((-1 * p.y + 1) * window.innerHeight / 2) + 'px';
            skillsTitle.style.left = ((p.x +1) * window.innerWidth / 2) + 'px';
            skillsTitle.classList.add('is-active');
            setTimeout(function(){
                skillsTitle.classList.add('opacity');
            }, 0.1);
            spriteIsActive = true;
            foundSprite = true;
        } else if(intersect.object.name === 'contact' && intersect.object.type === 'Sprite' && visible === false) {
            let p = intersect.object.position.clone().project(camera);
            contactTitle.style.top = ((-1 * p.y + 1) * window.innerHeight / 2) + 'px';
            contactTitle.style.left = ((p.x +1) * window.innerWidth / 2) + 'px';
            contactTitle.classList.remove('hidden');
            contactTitle.classList.add('is-active');
            setTimeout(function(){
                contactTitle.classList.add('opacity');
            }, 0.1);
            spriteIsActive = true;
            foundSprite = true;
        } else if(intersect.object.name === 'presentation' && intersect.object.type === 'Sprite' && visible === false) {
            let p = intersect.object.position.clone().project(camera);
            presentationTitle.style.top = ((-1 * p.y + 1) * window.innerHeight / 2) + 'px';
            presentationTitle.style.left = ((p.x +1) * window.innerWidth / 2) + 'px';
            presentationTitle.classList.add('is-active');
            setTimeout(function(){
                presentationTitle.classList.add('opacity');
            }, 0.1);
            spriteIsActive = true;
            foundSprite = true;
        } else if(intersect.object.name === 'portfolio' && intersect.object.type === 'Sprite' && visible === false) {
            let p = intersect.object.position.clone().project(camera);
            portfolioTitle.style.top = ((-1 * p.y + 1) * window.innerHeight / 2) + 'px';
            portfolioTitle.style.left = ((p.x +1) * window.innerWidth / 2) + 'px';
            portfolioTitle.classList.add('is-active');
            setTimeout(function(){
                portfolioTitle.classList.add('opacity');
            }, 0.1);
            spriteIsActive = true;
            foundSprite = true;
        } else if(intersect.object.name === 'download' && intersect.object.type === 'Sprite' && visible === false) {
            let p = intersect.object.position.clone().project(camera);
            downloadTitle.style.top = ((-1 * p.y + 1) * window.innerHeight / 2) + 'px';
            downloadTitle.style.left = ((p.x +1) * window.innerWidth / 2) + 'px';
            downloadTitle.classList.add('is-active');
            setTimeout(function(){
                downloadTitle.classList.add('opacity');
            }, 0.1);
            spriteIsActive = true;
            foundSprite = true;
        }

    });
    if(foundSprite === false && spriteIsActive) {
        presentationTitle.classList.remove('is-active', 'opacity');
        skillsTitle.classList.remove('is-active', 'opacity');
        contactTitle.classList.remove('is-active', 'opacity');
        portfolioTitle.classList.remove('is-active', 'opacity');
        downloadTitle.classList.remove('is-active', 'opacity');
    }
}


addSprite(new THREE.Vector3(44.20589230137809, 12.195792476384847, -19.53438912600601), 'presentation');
addSprite(new THREE.Vector3(25.65603108948047, 7.616022495239612, -41.981803818297344), 'contact');
addSprite(new THREE.Vector3(16.650711157432735, -12.790775277011582, 45.15725580746167), 'skills');
addSprite(new THREE.Vector3(36.308094670303774, 7.813525968263457, 33.13894040549743), 'portfolio');
addSprite(new THREE.Vector3(48.530593701017644, -10.796425452155306, -2.514799759653478), 'download');

window.addEventListener('resize', onResize);
container.addEventListener('click', onClick);
container.addEventListener('mousemove', onMouseMove);
container.addEventListener('touchend', onTouch);