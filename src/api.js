import axios from "axios";


const API =
"http://localhost:5000";


export async function getDashboard(){

    const response =
    await axios.get(
        `${API}/dashboard`
    );


    return response.data;

}