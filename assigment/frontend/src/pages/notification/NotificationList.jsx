import { useEffect, useState } from "react"
import { getNotifications } from "./NotificationApi"

export default function NotificationList() {

    const [notifications, setNotifications] = useState([])

    useEffect(() => {

        const fetchNotifications = async () => {

            try {

                const data = await getNotifications()
                setNotifications(data)

            } catch (error) {

                console.log(error)
            }
        }

        fetchNotifications()

    }, [])

    return (
        <div>

            <h1>Notifications</h1>

            {
                notifications.map((notification) => (

                    <div key={notification.id}>
                        <h3>{notification.title}</h3>
                        <p>{notification.message}</p>
                        <p>Type: {notification.type}</p>
                        <p>Read: {notification.is_read ? "Yes" : "No"}</p>
                    </div>
                ))
            }
        </div>
    )
}