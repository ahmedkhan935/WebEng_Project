import axios from "axios";
import { url } from "./url";

const BASE_URL = url;

const handleResponse = async (response) => {
    if (response.status >= 200 && response.status < 300) { //all possible valid (success) status codes
        return { data: response.data };
    } else {
        return { error: response.data.errorMessage };
    }
};    

// export const createClassroom = async (classroom) => {
//     try {
//         const response = await axios.post(`${BASE_URL}/teacher/classroom`,
//         {

//         }
//         return handleResponse(response);
//     } catch (error) {
//         return { error: error.message };
//     }
// }