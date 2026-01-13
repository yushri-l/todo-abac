export const ROLES = {
  USER: "USER",
  MANAGER: "MANAGER",
  ADMIN: "ADMIN",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
