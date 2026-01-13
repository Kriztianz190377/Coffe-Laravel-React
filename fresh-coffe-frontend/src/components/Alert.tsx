


// src/components/Alert.tsx
import type { ReactNode } from "react";

type AlertVariant = "error" | "warning" | "success" | "info";

type AlertProps = {
  children: ReactNode;
  variant?: AlertVariant;
};

const styles: Record<AlertVariant, string> = {
  error: "bg-red-100 border-red-400 text-red-700",
  warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
  success: "bg-green-100 border-green-400 text-green-700",
  info: "bg-blue-100 border-blue-400 text-blue-700",
};

export default function Alert({ children, variant = "error" }: AlertProps) {
  return (
    <div className={`mb-4 rounded-lg border px-4 py-3 ${styles[variant]}`}>
      {children}
    </div>
  );
}
