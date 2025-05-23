export interface Task {
    id: number;
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    status: "in-progress" | "done";
    deadline: string;
    assignedUserId: number;
    assignedProjectId: number;
}