import { createSelector } from "@reduxjs/toolkit"
import { Filters, Task } from "../../types"

interface RootState {
    tasks: Task[];
}

const selectTasks = (state: RootState) => state.tasks;

export const selectFilteredTasks = createSelector(
    [selectTasks,
        (_: RootState, filters: Filters) => filters
    ],
    (allTasks: Task[], {searchTerm, searchStatus, searchPriority, searchAssignedUserId}: Filters) => {
        return allTasks.filter(task => {
            const matchesTitle = !searchTerm || task.title.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesStatus = !searchStatus || task.status === searchStatus
            const matchesPriority = !searchPriority || task.priority === searchPriority
            const matchesAssignedUser = searchAssignedUserId == 0 || task.assignedUserId == searchAssignedUserId
            console.log(searchAssignedUserId);
            
            return matchesTitle && matchesStatus && matchesPriority && matchesAssignedUser
        })
    }
)
