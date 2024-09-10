// global.d.ts
declare global {
  interface Window {
    onTelegramAuth?: (user: any) => void;
  }
}

export {};