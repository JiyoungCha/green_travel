import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    VitePWA({
      registerType: 'autoUpdate', // 서비스 워커 자동 업데이트
      strategies: 'injectManifest', // 커스텀 서비스 워커 사용 설정
      srcDir: 'src', // 커스텀 서비스 워커가 배치되어 있는 디렉토리
      filename: 'sw.js', // 커스텀 서비스 워커 파일명
      includeAssets: [ // 로컬 경로의 이미지 참조(PWA에 포함 시킬 정적파일)
        `/icons/main__img_180.png`, // iOS용 아이콘 이미지
        `/icons/main__img_192.png`, // web | Android용 아이콘 이미지
        `/icons/main__img_512.png`, // web | Android용 아이콘 이미지
        `/base/main__img.png` // 대문 이미지
      ],
      manifest: {
        name: 'Green Travel', // PWA 앱 이름(설치 배너에 표시)
        short_name: 'Green Travel', // 홈 화면 아이콘 아래에 표시될 이름
        description: '축제 정보 제공합니다.', // 앱 설명
        theme_color: '#26282b', // 브라우저 UI 테마 색상
        background_color: '#26282b', // 기본 배경색
        lang: 'ko', // 언어 설정(기본 언어)
        display: 'standalone', // 브라우저 UI 업이 앱처럼 독립 실행
        orientation: 'portrait', // 앱 실행시 뷰의 기본방향을 세로로 설정
        start_url: '/', // PWA가 설치되어 있을 때, 홈화면에서 앱을 실행했을 때 처음 열릴 URL
        icons: [
          // 편의를 위해서 public 디렉토리에 배치하고 사용할 것
          {
            src: '/icons/main__img_192.png', // 로컬 경로 설정
            sizes: '192x192', // 아이콘 크기
            type: 'image/png', // 해당 파일의 타입
            purpose: 'any' 
            // Windows(Edge, Chrome on Desktop 등)의 경우, `any` 중 가장 첫번쨰 아이콘을 사용
            // Android(Chrome 등)의 경우, `maskable`을 우선 사용
            // iOS의 경우, manifest를 무시, index.hrml의 `<link rel="apple-touch-icon">`만 사용
          },
          {
            src: '/icons/main__img_512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],
})
