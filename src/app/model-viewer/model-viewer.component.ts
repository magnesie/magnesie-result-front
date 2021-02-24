import { Component, ViewChild, AfterViewInit, ElementRef, Input } from '@angular/core';
import * as THREE from 'three';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import { PhotogrametryResult } from '../photogrametry-result';

@Component({
  selector: 'app-model-viewer',
  templateUrl: './model-viewer.component.html',
  styleUrls: ['./model-viewer.component.css']
})
export class ModelViewerComponent implements AfterViewInit {

  @ViewChild("viewerdiv") divView: ElementRef;

  @Input('model') model: PhotogrametryResult;

  mesh:THREE.Mesh;
  scene:THREE.Scene;
  camera:THREE.Camera;
  renderer:THREE.Renderer;

  constructor() {

  }

  ngAfterViewInit(): void {

    var scene = new THREE.Scene();
    this.scene = scene;
    scene.background = new THREE.Color( 0xffffff );
    scene.fog = new THREE.Fog( 0xa0a0a0, 10, 50 );

    var dirLight = new THREE.DirectionalLight( 0xffffff );
    dirLight.position.set( 10, 10, 10 );
    dirLight.castShadow = true;
    scene.add( dirLight );

    var camera = new THREE.PerspectiveCamera( 50, 1, 0.1, 2000 );
    this.camera = camera;
    
    var renderer = new THREE.WebGLRenderer();
    this.renderer = renderer;
    renderer.setSize( 1000, 1000 );
    this. divView.nativeElement.appendChild( renderer.domElement );
    
    var plyLoader = new PLYLoader();

    plyLoader.load(this.model.path, geometry => {
      geometry.computeVertexNormals();

      //var texture = new THREE.TextureLoader().load('http://localhost/files/results/12345/scene_dense_mesh_refine_texture.png');

      var material = new THREE.MeshStandardMaterial({ 
        color: 0x777a80,
        flatShading: true
       });
      var mesh = new THREE.Mesh(geometry, material);
      this.mesh = mesh;

      mesh.position.x = 0;
      mesh.position.y = -1.5;
      mesh.position.z = 0;
      mesh.rotation.x = 6.440264939859076;
      mesh.rotation.y = 2.9845130209103035;
      mesh.rotation.z =  -3.141592653589793;

      mesh.castShadow = false;
      mesh.receiveShadow = false;

      scene.add( mesh );
      scene.add(new THREE.HemisphereLight(0xffffff, 0xffffff));
      var light = new THREE.SpotLight();
      light.position.set(0, 0, 0)
      scene.add(light);
      renderer.render( scene, camera );
    }, undefined, function ( error ) {
      console.error( error );
    });
    
    camera.position.z = 3;
    
  }

  getXRotation(){
    if(this.mesh){
      return this.mesh.rotation.x;
    }
    return 0;
  }

  getYRotation(){
    if(this.mesh){
      return this.mesh.rotation.y;
    }
    return 0;
  }

  getZRotation(){
    if(this.mesh){
      return this.mesh.rotation.z;
    }
    return 0;
  }

  rotationXinc(){
    this.mesh.rotation.x += Math.PI/20 ;
    this.renderer.render( this.scene, this.camera );
  }

  rotationYinc(){
    this.mesh.rotation.y += Math.PI/20 ;
    this.renderer.render( this.scene, this.camera );
  }

  rotationZinc(){
    this.mesh.rotation.z += Math.PI/20;
    this.renderer.render( this.scene, this.camera );
  }

  rotationXdec(){
    this.mesh.rotation.x -= Math.PI/20 ;
    this.renderer.render( this.scene, this.camera );
  }

  rotationYdec(){
    this.mesh.rotation.y -= Math.PI/20 ;
    this.renderer.render( this.scene, this.camera );
  }

  rotationZdec(){
    this.mesh.rotation.z -= Math.PI/20;
    this.renderer.render( this.scene, this.camera );
  }

}
