/// <reference types="vite/client" />

interface CalcusWidget {
    show: (e: string, t?: Record<string, string>, n?: boolean) => void;
}

declare global {
    interface Window {
        CalcusWidget: CalcusWidget;
    }
}

export {};
