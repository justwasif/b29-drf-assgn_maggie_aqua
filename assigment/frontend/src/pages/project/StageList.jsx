// import { useEffect, useState } from "react"
// import { getStages } from "./proujectapi"
// import { useNavigate } from "react-router-dom"

// export default function StageList() {
    

//     const [stages, setStages] = useState([])

//     useEffect(() => {

//         const fetchStages = async () => {

//             try {

//                 const data = await getStages()
//                 setStages(data)

//             } catch (error) {

//                 console.log(error)
//             }
//         }

//         fetchStages()

//     }, [])

//     return (
//         <div>

//             <h1>Stages</h1>

//             {
//                 stages.map((stage) => (

//                     <div key={stage.id}>

//                         <h3>{stage.name}</h3>

//                         <p>Project: {stage.project}</p>

//                         <p>Order: {stage.order}</p>

//                     </div>
//                 ))
//             }

//         </div>
//     )
// }