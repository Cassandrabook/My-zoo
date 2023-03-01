import { useEffect, useState } from "react";
import { IAnimalSmall } from "../../models/IAnimalSmall";
import { getAnimals } from "../../services/AnimalService";
import { Animal } from "../Animal/Animal";
import './Animals.scss';


export const Animals = () => {
    const [animals, setAnimals] = useState<IAnimalSmall[]>([]);

    useEffect(() => {
        const getData = async () => {
            let animals = await getAnimals();

            setAnimals(animals);
        }
        if (animals.length > 0) return;

        getData();
    })

    let animalsHtml = animals.map((animal) => {
        return(
            <Animal animal={animal} key={animal.id} />
        );
    })

    return(
        <>
            <h1 className="title">My zoo</h1>
            <div className="animals">{animalsHtml}</div>
        </>
    );
}