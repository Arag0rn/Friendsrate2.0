declare global {
    interface Window {
      TelegramLoginWidget?: { 
        dataOnauth: (user: unknown) => void;
      };
    }
  }
  
  export {};