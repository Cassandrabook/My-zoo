import { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IAnimal } from '../../models/IAnimal';
import { getAnimalsById } from '../../services/AnimalService';
import './AnimalDetail.scss';

export const AnimalDetail = ()=> {
    const [animal, setAnimal] = useState<IAnimal>();
    const [error, setError] = useState("");
    const [isFed, setIsFed] = useState(false);
    const [timeToEat, setTimeToEat] = useState<Date>();
    const [lastFed, setLastFed] = useState("");
    const [fedTime, setFedTime] = useState("");
    const [buttondisabled, setButtondisabled] = useState(false);


    localStorage.setItem("animal", JSON.stringify(animal));

    const {id} = useParams();

    useEffect(() => {
        const getData = async () => {
            if (id) {
                let response = await getAnimalsById(+id);

                if(response.animal) {
                    setAnimal(response.animal);
                }else{
                    setError(response.error);
                }
            }
        };

        const rightNow = new Date();
        const previousFeedTime = localStorage.getItem(String(animal?.id));
        const previous = new Date(previousFeedTime!);

        if(previous.getHours() + 3 < rightNow.getHours()){
            setButtondisabled(true);
            
        }
        
        console.log(previous);
        if (animal) return;
        getData();
    });

    function feedAnimal(){

        setIsFed(true);   
        localStorage.setItem(String(animal?.id), new Date().toString());
        setButtondisabled(true);

        setFedTime(new Date().toString());
    }

    console.log(isFed);

    return(
        <>
            {error !== "" ? (
                <>
                    <h2>{error}</h2>
                </>
            ): (
                <>
                    <div className='animalDetail'>
                        <div className='animalDetail__image'>
                            <img src={animal?.imageUrl} alt={animal?.name} />
                        </div>
                        <div className='animalDetail__text-container'>
                            <h2 className='animalDetail__name'>{animal?.name}</h2>
                            <p className='animalDetail__desc'>{animal?.longDescription}</p>
                            <p className='animalDetail__birthday'><span>Födelseår: </span>{animal?.yearOfBirth}</p>
                            <p className='animalDetail__medicine'><span>Mediciner: </span>{animal?.medicine}</p>
                            <p>Matad: {fedTime} </p>
                            <button className='animalDetail__btn' disabled={buttondisabled} onClick={feedAnimal}>Mata {animal?.name}</button>
                            <p></p>
                            
                        </div>
                        
                    </div>
                </>
            )}
        </>
    );
}