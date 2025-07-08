import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.ts', // 진입점 지정 (여기서부터 번들링 시작)
  output: {
    file: 'dist/bundle.js', // 번들된 출력 파일
    format: 'esm', // ES 모듈 형태의 출력
    sourcemap: true, // 소스맵 생성 (디버깅에 매우 중요)
  },
  plugins: [
    copy({
      targets: [{ src: 'src/bhaptics_web_bg.wasm', dest: 'dist' }],
    }),
    typescript(),
    terser({
      compress: {
        drop_console: true, // console 제거
      },
      mangle: false, // 변수명 축약 안 함
      format: {
        beautify: true, // 읽기 좋은 형태로 포맷팅
        comments: false, // 주석 제거
      },
    }),
  ], // tsconfig.json을 자동으로 참조합니다
};
