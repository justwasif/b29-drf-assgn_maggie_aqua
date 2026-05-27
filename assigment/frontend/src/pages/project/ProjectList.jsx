import { useEffect, useState } from "react"
import { getProjects } from "./proujectapi"

export default function ProjectList() {

    const [projects, setProjects] = useState([])

    useEffect(() => {

        const fetchProjects = async () => {

            try {

                const data = await getProjects()
                setProjects(data)

            } catch (error) {

                console.log(error)
            }
        }

        fetchProjects()

    }, [])

    return (
        <div>

            <h1>Projects</h1>

            {
                projects.map((project) => (

                    <div key={project.id}>

                        <h3>{project.title}</h3>

                        <p>{project.description}</p>

                        <p>Studio: {project.studio}</p>

                    </div>
                ))
            }

        </div>
    )
}