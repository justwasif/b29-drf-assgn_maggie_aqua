import { useEffect, useState } from "react"
import { getMemberships } from "./StudioMembershipApi"

export default function MembershipList() {

    const [memberships, setMemberships] = useState([])

    useEffect(() => {

        const fetchMemberships = async () => {

            try {

                const data = await getMemberships()
                setMemberships(data)

            } catch (error) {

                console.log(error)
            }
        }

        fetchMemberships()

    }, [])

    return (
        <div>

            <h1>Memberships</h1>

            {
                memberships.map((member) => (

                    <div key={member.id}>

                        <p>User: {member.user}</p>

                        <p>Studio: {member.studio}</p>

                        <p>Role: {member.role}</p>

                    </div>
                ))
            }

        </div>
    )
}