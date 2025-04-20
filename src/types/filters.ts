export interface Filters {
    searchTerm: string;
    searchStatus: "in-progress" | "done";
    searchPriority: "low" | "medium" | "high";
    searchAssignedUserId: number;
}
