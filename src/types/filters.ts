export interface Filters {
    searchTerm: string;
    searchStatus: "all" | "in-progress" | "done";
    searchPriority: "all" | "low" | "medium" | "high";
    searchAssignedUserId: number;
}
