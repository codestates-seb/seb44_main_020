import axios,{AxiosResponse} from 'axios';

export const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
    timeout: 5000,
})

export const fetchData = async (url:string):Promise<any> => {
    try {
        const response: AxiosResponse<any>=await api.get(url);
        return response.data;
    } catch (error:any) {
        throw new Error(error.message);
    }
}

export const deleteData = async (url:string):Promise<any> => {
    try {
        await api.delete(url);
    } catch (error:any) {
        throw new Error(error.message)
    }
}