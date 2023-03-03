import axios from "axios"
import { IAnimal } from "../models/IAnimal";
import { IAnimalSmall } from "../models/IAnimalSmall";
import { IApiResponse } from "../models/IApiRespons";

const BASE_URL = "https://animals.azurewebsites.net/api/animals/";


export const getAnimals = async (): Promise<IAnimalSmall[]> => {
    let response = await axios.get<IAnimalSmall[]>(BASE_URL);   

    return response.data;
}

export const getAnimalsById = async (id: number): Promise<IApiResponse> => {
    try {
        let response = await axios.get<IAnimal>(BASE_URL + id);

        return {animal: response.data, error: ""}
    } catch {
        return {error: "Ett fel inträffade"};
    }
}

