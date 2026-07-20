import axios from "axios";

const API_URL = "http://localhost:5000";


export async function fetchSystemInfo(){

    const response = await axios.get(
        `${API_URL}/system`
    );

    return response.data;

}
