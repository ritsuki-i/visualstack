"use client"; // App Router 下でClient Componentとするため
import React, { useEffect, useRef } from 'react';
import { Hands } from '@mediapipe/hands';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { HAND_CONNECTIONS } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';

function VisualCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current!;
    const canvasElement = canvasRef.current!;
    const canvasCtx = canvasElement.getContext('2d')!;

    // 1. Mediapipe Hands の初期化
    const hands = new Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    // 2. 検出結果が返ってきたときの処理
    hands.onResults((results) => {
      // Canvas のクリア
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      // カメラ映像を Canvas に描画
      canvasCtx.drawImage(
        videoElement,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );

      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const landmarks = results.multiHandLandmarks[0];

        // 手のランドマークと接続線を Canvas に描画
        drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
          color: '#00FF00',
          lineWidth: 5,
        });
        drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 2 });

        // ランドマーク座標を1次元配列にする
        const landmarkDataArray: number[] = [];
        landmarks.forEach((landmark) => {
          landmarkDataArray.push(
            parseFloat(landmark.x.toFixed(3)),
            parseFloat(landmark.y.toFixed(3)),
            parseFloat(landmark.z.toFixed(3))
          );

        });

        // 3. REST API (POST /api/udpToUnity) に送信
        const jsonData = JSON.stringify({ data: landmarkDataArray });
        console.log(JSON.stringify(landmarkDataArray));

        // 3. ここで Unity(C#) へデータ送信
        //    Unity WebGL が page 内で起動している場合、 window.gameInstance 等が存在するはず
        if (typeof window !== "undefined") {
          // gameInstance.SendMessage("HandManager", "ReceiveHandData", jsonData);
          //  ↑ Unity HTML テンプレートによっては window.gameInstance ではなく
          //    globalThis.unityInstance など違う変数名の場合があります。

          console.log("unityInstance:", (window as any).unityInstance);
          if ((window as any).unityInstance) {
            (window as any).unityInstance.SendMessage("UDPReceiver", "ReceiveHandData", jsonData);
          }
        }else{
          console.log('typeof window !== "undefined"');
        }
      }
    });

    // 4. カメラの初期化
    const camera = new Camera(videoElement, {
      onFrame: async () => {
        await hands.send({ image: videoElement });
      },
      width: 1280,
      height: 720,
    });
    camera.start();

    // 5. アンマウント時のクリーンアップ
    return () => {
      camera.stop();
      hands.close();
    };
  }, []);

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          transform: 'scaleX(-1)', // ミラー表示
          display: 'none', // カメラ映像のビデオ要素は非表示
        }}
      ></video>
      <canvas
        ref={canvasRef}
        width="1280"
        height="720"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          transform: 'scaleX(-1)', // ミラー表示
        }}
      ></canvas>
    </div>
  );
}

export default VisualCamera;
