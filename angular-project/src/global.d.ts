declare global {
    interface Window {
      React: {
        createElement: (type: any, props?: any, ...children: any[]) => any;
        StrictMode?: any;
      };
      ReactDOM: {
        createRoot: (container: Element) => {
          render: (element: any) => void;
          unmount: () => void;
        };
      };
      App?: {  
        A: any;
      };
      App2?: {  
        A: any;
      };
    }
  }
  
  export {};
  