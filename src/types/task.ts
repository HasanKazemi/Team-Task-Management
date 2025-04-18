export interface Task {
    id: number;
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    status: "in-progress" | "done";
    dueDate: string;
    assingedUserId: number;
}