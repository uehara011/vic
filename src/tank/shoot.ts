import { useAREngine } from "@/AREngine";
import * as CANNON from "cannon";
import * as THREE from "three"
import { Tank } from "./createTank";
import { enemyTank } from "./enemy_Tank";
import { reactive, ref, watchEffect } from 'vue';
import useHeart from "@/Heart";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Object3D } from "three";


const ar_Engine = useAREngine();
export　const remainingTime = ref(60); 

let hasBaret = false;

const radius = 0.15;
const Baret_Body = new CANNON.Body({
    mass: 5,
    shape: new CANNON.Sphere(radius),
    position: new CANNON.Vec3(0, Tank.position.y + 1, 0),
});

const enemyTank_body = new CANNON.Body({
    mass:10
});
ar_Engine.world.addBody(enemyTank_body);
/*
function link_enemyTank() {
    // CannonからTHREEへの同期
    enemyTank.position.copy(enemyTank_body.position as any);
    enemyTank.quaternion.copy(enemyTank_body.quaternion as any);
}

export function updateLoop() {
    link_enemyTank();
    // 他の更新処理...
    ar_Engine.renderer.render(ar_Engine.scene, ar_Engine.camera);
    requestAnimationFrame(updateLoop);
}
*/
//updateLoop();

const Baret = new THREE.Mesh(
    new THREE.SphereGeometry(radius),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
);
//const enemy_p = updateLoop();

Baret.userData.physicsBody = Baret_Body;
Baret_Body.threeMesh = Baret;
Baret.position.copy(Tank.position)

const thresholdDistance = 0.5;

export function createBaret() {
    //removeBaret();
    ar_Engine.scene.add(Baret);
    Baret.position.copy(Tank.position);
    setInterval(() => {
        Baret.position.x += 0.25;
        console.log("0.25秒ごとに実行されるコード");
    }, 300); 
    if(Baret.position.z === enemyTank.position.z){//areVectorsNear(Baret.position, enemyTank.position, thresholdDistance)
        //removeBaret()
        const nextPageURL = `victory.html?`;
        window.location.href = nextPageURL;
    }else{}

    setTimeout(() => {
        removeBaret();
    }, 750)
}
function areVectorsNear(vector1:THREE.Vector3 ,vector2:THREE.Vector3, threshold:number) {
    // ベクトル間の距離を計算
    const distance = vector1.distanceTo(vector2);
    // 距離が閾値以下であれば true を返す
    return distance <= threshold;
}

function removeBaret() {
    if (ar_Engine.scene.getObjectByName("Baret")) {
        ar_Engine.scene.remove(Baret);
        ar_Engine.world.remove(Baret_Body);
        hasBaret = false;
    }
}


/*
export function createBaret(){
    const radius = 0.1;
    const Baret_Body = new CANNON.Body({
    mass: 5, // kg
    shape: new CANNON.Sphere(radius),
    position: new CANNON.Vec3(0, Tank.position.y + 1, 0),
    //material: new CANNON.Material({restitution: 1}),
    });

    const Baret = new THREE.Mesh(
        new THREE.SphereGeometry(radius),
        new THREE.MeshBasicMaterial({ color:0x00ff00 }),
    )
   
    //Baret.position.copy(Baret_Body.position)
    Baret.userData.physicsBody = Baret_Body;
    Baret_Body.threeMesh = Baret;

    Baret_Body.velocity.set(0, 1, 0); // 例として初速度を設定
    Baret_Body.applyForce(new CANNON.Vec3(1,0.5,0), new CANNON.Vec3(0, 0, 0));
    //applyForceの一つ目の引数に加える力のベクトル
    //二つ目の引数に力が加わる場所。中心の場合は000

    ar_Engine.scene.add(Baret);
    ar_Engine.world.addBody(Baret_Body);

    ar_Engine.world.step(1 / 60);
    ar_Engine.renderer.render(ar_Engine.scene, ar_Engine.camera);
    requestAnimationFrame(createBaret);
    

}
*/


//animate();