import { useEffect, useState } from "react"
import { getProjects } from "./proujectapi"
import { Link } from "react-router-dom"

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

            <div className="page-header">
                <h1>Projects</h1>

                <Link to="/createproject">
                    <button>Create Project</button>
                </Link>
            </div>

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