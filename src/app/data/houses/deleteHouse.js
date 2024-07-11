import axios from "axios"

export default async function deleteHouses(house_id) {
   
    let url = `http://localhost:8080/houses/${house_id}`
    try {
        const { status } = await ((await axios.delete(url)))
        console.log(status)
        if (status == 204) {
            return 1
        }
    } catch (error) {
        console.log(error)
    }
    return 0
}