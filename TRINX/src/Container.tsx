// ============================================
// الملف: Container.tsx
// المكان: src/components/Container.tsx
// ده الملف الوحيد المسؤول عن حدود الشبكة (margin + width)
// ============================================

import { type ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div
      className={`
        w-full
        mx-auto
        max-w-[1440px]
        px-4        /* Mobile margin   = 16px */
        sm:px-10    /* Tablet margin   = 40px */
        lg:px-20    /* Desktop margin  = 80px */
        ${className}
      `}
    >
      {children}
    </div>
  );
}