import { createSelector } from "@reduxjs/toolkit"
import { Task } from "../../types"

interface RootState {
    tasks: Task[];
}

interface Filters {
    searchTerm: string;
}

const selectTasks = (state: RootState) => state.tasks;

export const selectFilteredTasks = createSelector(
    [selectTasks,
        (_: RootState, filters: Filters) => filters
    ],
    (allTasks: Task[], {searchTerm}: Filters) => {
        return allTasks.filter(task => {
            return !searchTerm || task.title.toLowerCase().includes(searchTerm.toLowerCase())
        })
    }
)
