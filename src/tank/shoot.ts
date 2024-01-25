import * as Cannon from 'cannon';
import { enemyTank } from './enemy_Tank';
import { Tank } from './createTank';
import {  useAREngine } from '@/AREngine';
import * as Three from 'three';

const ar_Engine = useAREngine();
// Tankから発射されるBaret
const baretGeometry = new Three.SphereGeometry();
const baretMaterial = new Three.MeshBasicMaterial({ color: 0x00ff00 });
const baretMesh = new Three.Mesh(baretGeometry, baretMaterial);
ar_Engine.scene.add(baretMesh);

// 発射のトリガーフラグ
export　let isFiring = false;

// 発射処理
function fireBaret() {
  const tankForward = new Three.Vector3(0, 0, -1); // 例としてTankの前方向と仮定
  const baretSpeed = 0.1; // Baretの速度

  // Tankの位置にBaretを配置
  baretMesh.position.copy(Tank.position);

  // Tankの向きに合わせてBaretを回転
  baretMesh.quaternion.copy(Tank.quaternion);

  // Baretを発射方向に動かす
  baretMesh.translateOnAxis(tankForward, baretSpeed);

  // シーンにBaretを追加
  ar_Engine.scene.add(baretMesh);

  // 発射後の処理（例: 一定時間後にBaretを削除する）
  setTimeout(() => {
    ar_Engine.scene.remove(baretMesh);
  }, 1000); // 1000ミリ秒後に削除
}

// Update loop
function animate() {
  requestAnimationFrame(animate);

  // 発射フラグが立っている場合、Baretを発射
  if (isFiring) {
    fireBaret();
    isFiring = false; // フラグをリセット
  }

  // 他の更新処理...
  
  ar_Engine.renderer.render(ar_Engine.scene, ar_Engine.camera);
}
animate();