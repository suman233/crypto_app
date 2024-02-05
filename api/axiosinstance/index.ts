import axios from "axios";
import { baseUrl } from "../endpoints";

export const axiosInstance=axios.create({
    baseURL: baseUrl
})