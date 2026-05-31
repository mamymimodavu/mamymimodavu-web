import type { ReactNode } from "react";

export default function Prose({ children }: { children: ReactNode }) {
  return <div className="prose">{children}</div>;
}
