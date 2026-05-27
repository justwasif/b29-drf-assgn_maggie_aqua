import { useEffect, useState } from "react"
import { getAttachments } from "./taskapi"



export default function AttachmentList() {

    const [attachments, setAttachments] = useState([])

    useEffect(() => {

        const fetchAttachments = async () => {

            try {

                const data = await getAttachments()

                setAttachments(data)

            } catch (error) {

                console.log(error)
            }
        }

        fetchAttachments()

    }, [])

    return (
        <div>

            <h1>Attachments</h1>

            {
                attachments.map((attachment) => (

                    <div key={attachment.id}>

                        <p>Task: {attachment.task}</p>

                        <p>{attachment.description}</p>

                        <a
                            href={`${API_BASE}${attachment.file_url}`}
                            target="_blank"
                        >
                            View File
                        </a>

                    </div>
                ))
            }

        </div>
    )
}