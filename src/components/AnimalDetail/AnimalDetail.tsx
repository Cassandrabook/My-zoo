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

        if (animal) return;
        getData(); 
    });

    const rightNow = new Date();
    const previousFeedTime = localStorage.getItem(String(animal?.id));
    const previous = new Date(previousFeedTime!);

    // localStorage.setItem(String(animal?.id), new Date().toString());

    function feedAnimal(){

        let loggedTime : any = localStorage.setItem(String(animal?.id), rightNow.toString());

        if(previous.getHours() + 3 < rightNow.getHours()){
            console.log("logged");
            
            setLastFed(loggedTime); 
        };

        setIsFed(true);   
    //     localStorage.setItem(String(animal?.id), new Date().toString());
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
                            <p>{isFed ? <span>Matad senast:</span> : <span>Matad:</span>} {animal?.lastFed}</p>
                            <button className='animalDetail__btn' onClick={feedAnimal}>Mata {animal?.name}</button>
                            <p></p>
                            
                        </div>
                        
                    </div>
                </>
            )}
        </>
    );
}