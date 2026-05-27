import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
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

            <div className="page-header">

                <h1>Attachments</h1>

                <Link to="/createattachment">
                    <button>Upload Attachment</button>
                </Link>

            </div>

            {
                attachments.map((attachment) => (

                    <div key={attachment.id} className="card">

                        <h3>Attachment #{attachment.id}</h3>

                        <p>{attachment.description}</p>

                        <a
                            href={attachment.file_url}
                            target="_blank"
                            rel="noreferrer"
                        >
                            View File
                        </a>

                    </div>
                ))
            }

        </div>
    )
}