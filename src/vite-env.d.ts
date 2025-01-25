/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string // 根据你在 `.env` 文件中的变量定义
  readonly VITE_APP_TITLE: string
  // 添加更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
