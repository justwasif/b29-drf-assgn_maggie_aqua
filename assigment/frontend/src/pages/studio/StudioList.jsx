import { useEffect, useState } from "react"
import { getStudios } from "./StudioApi"
import { Link } from "react-router-dom"

export default function StudioList() {

    const [studios, setStudios] = useState([])

    useEffect(() => {

        const fetchStudios = async () => {

            try {

                const data = await getStudios()
                setStudios(data)

            } catch (error) {

                console.log(error)
            }
        }

        fetchStudios()

    }, [])

    return (
        <div>

            <div className="page-header">
                <h1>Studios</h1>

                <Link to="/createstudio">
                    <button>Create Studio</button>
                </Link>
            </div>

            {
                studios.map((studio) => (

                    <div key={studio.id}>

                        <h3>{studio.name}</h3>

                        <p>{studio.description}</p>

                    </div>
                ))
            }

        </div>
    )
}

