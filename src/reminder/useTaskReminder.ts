import { useEffect } from "react"
import { Task } from "../types";
import { Bounce, toast } from "react-toastify";

const useTaskReminder = (tasks:Task[])=> {
    useEffect(()=>{
        const interval = setInterval(() => {
            for (const task of tasks) {
                const now = new Date()
                const taskDeadline = new Date(task.deadline)
                const timeDiff = taskDeadline.getTime() - now.getTime()
                if (timeDiff > 0 && timeDiff <= 1000 * 60 * 60 * 24) {
                    console.log(task.title);
                    toast.info(`Deadline is approaching for: ${task.title}`, {
                        position: "top-right",
                        autoClose: false,
                        closeOnClick: false,
                        draggable: true,
                        transition: Bounce,
                        progress: undefined,
                    });
                }                
            }
        }, 60000);
        return () => clearInterval(interval);
    },[])
}

export default useTaskReminder