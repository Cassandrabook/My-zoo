import axios from "axios"
import { IAnimalSmall } from "../models/IAnimalSmall";

const BASE_URL = "https://animals.azurewebsites.net/api/animals/";


export const getAnimals = async (): Promise<IAnimalSmall[]> => {
    let response = await axios.get<IAnimalSmall[]>(BASE_URL);   

    return response.data;
}