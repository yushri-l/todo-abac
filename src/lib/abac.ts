export type Role = "USER" | "MANAGER" | "ADMIN";
export type TodoStatus = "draft" | "in_progress" | "completed";

export type Action =
  | "VIEW_TODO"
  | "CREATE_TODO"
  | "UPDATE_TODO"
  | "DELETE_TODO";

export interface ABACContext {
  role: Role;
  userId?: string;
  todo?: {
    ownerId: string;
    status: TodoStatus;
  };
}

export function canPerformAction(
  action: Action,
  context: ABACContext
): boolean {
  const { role, userId, todo } = context;

  // ADMIN: full visibility + delete anything
  if (role === "ADMIN") {
    if (action === "DELETE_TODO") return true;
    if (action === "VIEW_TODO") return true;
  }

  // MANAGER: view-only access to all todos
  if (role === "MANAGER") {
    if (action === "VIEW_TODO") return true;
    return false;
  }

  // USER rules
  if (role === "USER") {
    if (action === "CREATE_TODO") return true;

    if (!todo || !userId) return false;

    const isOwner = todo.ownerId === userId;

    if (action === "VIEW_TODO") return isOwner;
    if (action === "UPDATE_TODO") return isOwner;
    if (action === "DELETE_TODO")
      return isOwner && todo.status === "draft";
  }

  return false;
}

