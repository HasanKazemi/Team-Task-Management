import { createSelector } from "@reduxjs/toolkit"
import { Task } from "../../types"

interface RootState {
    tasks: Task[];
}

interface Filters {
    searchTerm: string;
    searchStatus: "in-progress" | "done";
}

const selectTasks = (state: RootState) => state.tasks;

export const selectFilteredTasks = createSelector(
    [selectTasks,
        (_: RootState, filters: Filters) => filters
    ],
    (allTasks: Task[], {searchTerm, searchStatus}: Filters) => {
        return allTasks.filter(task => {
            const matchesTitle = !searchTerm || task.title.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesStatus = !searchStatus || task.status === searchStatus
            return matchesTitle && matchesStatus
        })
    }
)
