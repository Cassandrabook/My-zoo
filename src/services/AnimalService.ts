import axios from "axios"
import { IAnimal } from "../models/IAnimal";
import { IAnimalSmall } from "../models/IAnimalSmall";
import { IApiResponse } from "../models/IApiRespons";


export const getAnimals = async (): Promise<IAnimalSmall[]> => {
    let response = await axios.get<IAnimalSmall[]>("https://animals.azurewebsites.net/api/animals");   

    return response.data;
}

export const getAnimalsById = async (id: number): Promise<IApiResponse> => {
    try {
        let response = await axios.get<IAnimal>("https://animals.azurewebsites.net/api/animals/" + id);

        return {animal: response.data, error: ""}
    } catch {
        return {error: "Ett fel inträffade"};
    }
        
       
}

