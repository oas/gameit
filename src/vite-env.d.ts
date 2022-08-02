/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// https://vitejs.dev/guide/features.html#web-workers
declare module "*?worker&url" {
  const value: string;
  export = value;
}
