import { useEffect, useState } from "react"
import { getStudios } from "./StudioApi"

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

            <h1>Studios</h1>

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