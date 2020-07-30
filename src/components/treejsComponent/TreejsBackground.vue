<template>
    <div class="main-container">
        <div ref="container">
            <canvas class="main-container" ref="threejs"></canvas>
        </div>
    </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as Model from "../../assets/3dmodel/scene.gltf";

export default {
    data: () => ({
        sceneFromData: null,
        cameraFromData: null,
        rendererFromData: null,
        animationFromData: null,
        controlsFromData: null,
    }),
    watch: {
        orbitPosition() {
            console.log(this.orbitPosition);
        },
        $route() {
            this.magicKeyPressCtrl();

            this.cameraFromData.updateProjectMatrix()
            
            // this.controlsFromData.update();            
        },
    },
    created() {
        const component = this;
        this.handler = function (event) {
            if( event.key === 'Alt' ) component.magicKeyPress();
            if( event.key === 'Control' ) component.magicKeyPressCtrl();
        }
        window.addEventListener('keyup', this.handler);
    },
    beforeDestroy() {
        window.removeEventListener('keyup', this.handler);
    },
    mounted() {
        let scene = new THREE.Scene();
        scene.background = new THREE.Color(0xc9e9ff);
        
        this.sceneFromData = scene;

        let camera = new THREE.PerspectiveCamera(
            40,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.set(-10, -8, 30)

        this.cameraFromData = camera;

        // var camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 );
        // scene.add( camera );

        // camera.position.x = 10;
        // camera.position.y = 5;
        // camera.position.z = 0;

        // camera.position.x = -6.3281362676028134;
        // camera.position.y = -5.400194348869583;
        // camera.position.z = -7.578026157920969;

        var helper = new THREE.CameraHelper(camera);
        scene.add(helper);

        const controls = new OrbitControls(camera, this.$refs.threejs);
        // controls.target.set(0, 5, 0);
        controls.update();

        this.controlsFromData = controls;

        let hlight = new THREE.AmbientLight(0x404040, 100);
        scene.add(hlight);

        let renderer = new THREE.WebGLRenderer({
            canvas: this.$refs.threejs,
            antialias: true,
            alpha: true
        });

        this.rendererFromData = renderer;

        renderer.setSize(window.innerWidth, window.innerHeight);

        let loader = new GLTFLoader();

        const component = this;

        loader.load(
            Model,
            function (gltf) {
                console.log("xxxx", gltf);

                // gltf.scene.position.z = -5;
                // gltf.scene.rotation.z = 10;
                gltf.scene.position.y = 0;

                scene.add(gltf.scene);
                // let vector;

                const animate = () => {
                    requestAnimationFrame(animate);

                    // cube.rotation.x += 0.01;
                    // cube.rotation.y += 0.01;

                    // gltf.scene.rotation.y += 0.001; ----------------------------------------------------
                    gltf.scene.rotation.y += 0.000001;
                    

                    // console.log(camera.position)

                    renderer.render(scene, camera);

                    // console.log('camera.position ', [
                    //     camera.position,
                    //     camera.quaternion,
                    //     camera.rotation,
                    //     camera.scale,
                    //     camera.up
                    // ])
                };
                component.animationFromData = animate

                animate();
                
                // console.log(camera);
                // console.log(vector);

                // camera.position.copy(vector);
                
                // camera.lookAt(new THREE.Vector3(
                //     -3.315410069327821,
                //     -7.0384729780032975,
                //     4.258302799165038
                // ));
                //----------------------------------------------------  <---------------
                // camera.position.copy(new THREE.Vector3(
                //     -3.315410069327821,
                //     -7.0384729780032975,
                //     4.258302799165038
                // ));
                // camera.quaternion.copy(new THREE.Quaternion( 
                //     -0.11799903661847104, 
                //     -0.2844143982883737, 
                //     -0.035298850067878695, 
                //     0.950756892474233
                // ));
                // camera.rotation.copy(new THREE.Euler( 
                //     -0.2929787820187084, 
                //     -0.5615365714920308, 
                //     -0.15926949045526353, 
                //     'XYZ'
                // ));  
                              
            },
            function (xhr) {
                console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
                
            },
            function (error) {
                console.log("An error happened", error);
            }
        );
    },
    methods: {
        // animate() {
        //     requestAnimationFrame( animate );

        //     // required if controls.enableDamping or controls.autoRotate are set to true
        //     controls.update();

        //     renderer.render( scene, camera );
        // },
        magicKeyPress() {
            this.cameraFromData.position.copy(new THREE.Vector3(
                -4.511119613136664,
                -8.036841456742291,
                -8.255596297819778
            ));
            this.cameraFromData.quaternion.copy(new THREE.Quaternion( 
                -0.2709828419019336,
                0.00027276962462566615,
                0.9625836515154815, 
                0.0009689306505601582,
            ));
            this.cameraFromData.rotation.copy(new THREE.Euler( 
                -3.1392329071196596,
                -0.5488269062482671,
                -3.1403616033930146, 
                'XYZ'
            )); 
        },
        magicKeyPressCtrl() {
            console.log('press Ctr')
            
            this.cameraFromData.position.copy(new THREE.Vector3(
                -3.315410069327821,
                -7.0384729780032975,
                4.258302799165038
            ));
            this.cameraFromData.quaternion.copy(new THREE.Quaternion( 
                -0.11799903661847104, 
                -0.2844143982883737, 
                -0.035298850067878695, 
                0.950756892474233
            ));
            this.cameraFromData.rotation.copy(new THREE.Euler( 
                -0.2929787820187084, 
                -0.5615365714920308, 
                -0.15926949045526353, 
                'XYZ'
            ));
        }
    },
};
</script>

<style lang="scss" scoped>
canvas {
    position: fixed;
}
</style>
