import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

/** Flat config — `next lint` is deprecated in Next 15 and removed in 16,
    so the ESLint CLI is invoked directly via `npm run lint`. */
const config = [
  { ignores: [".next/**", "node_modules/**", "docs/**", "next-env.d.ts"] },
  ...nextCoreWebVitals,
  ...nextTypescript,
];

export default config;
