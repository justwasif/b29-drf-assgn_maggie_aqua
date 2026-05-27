import { useEffect, useState } from "react"
import { getTasks } from "./proujectapi"

export default function TaskList() {

    const [tasks, setTasks] = useState([])

    useEffect(() => {

        const fetchTasks = async () => {

            try {

                const data = await getTasks()
                setTasks(data)

            } catch (error) {

                console.log(error)
            }
        }

        fetchTasks()

    }, [])

    return (
        <div>

            <h1>Tasks</h1>

            {
                tasks.map((task) => (

                    <div key={task.id}>

                        <h3>{task.title}</h3>

                        <p>{task.description}</p>

                        <p>Priority: {task.priority}</p>

                        <p>Deadline: {task.deadline}</p>

                    </div>
                ))
            }

        </div>
    )
}