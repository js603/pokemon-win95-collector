import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // base에 'https://<본인아이디>.github.io/<레포지토리이름>/' 에서 레포지토리이름을 적어줍니다.
  base: 'https://js603.github.io/pokemon-win95-collector/', 
  plugins: [react()],
})
