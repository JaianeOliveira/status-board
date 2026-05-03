import type { MonitoredService } from "../types/services.js";

export const monitoredServices: MonitoredService[] = [
  {
    id: "portfolio",
    name: "Portfolio",
    url: "https://jaianeoliveira.com",
  },
  {
    id: "hiremate-prod",
    name: "Hiremate",
    url: "https://hiremate.xyz",
  },
  {
    id: "tap-notes",
    name: "Tap Notes",
    url: "https://tapnotes-ruby.vercel.app",
  },
  {
    id: "password-generator",
    name: "Password Generator",
    url: "https://jaianeoliveira.github.io/password-generator",
  },
  {
    id: "qr-code-generator",
    name: "QR Code Generator",
    url: "https://qrcode-generator-gamma-ecru.vercel.app",
  },
];

export const serviceMonitorConfig = {
  requestTimeoutMs: 5_000,
  degradedThresholdMs: 1_000,
} as const;
