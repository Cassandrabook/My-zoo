import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IAnimal } from '../../models/IAnimal';
import { getAnimals } from '../../services/AnimalService';
import './AnimalDetail.scss';

export const AnimalDetail = () => {
    const {id} = useParams();
    const [animals, setAnimals] = useState<IAnimal[]>([]); 
    const [buttondisabled, setButtondisabled] = useState(false);
    const [fedTime, setFedTime] = useState("");
    const [pet, setPet] = useState<IAnimal | null>(null);
    
    useEffect( () => {
      const getData = async () => {
        
        if (id) {
            let response = await getAnimals();

            if(response) {
                setAnimals(response as any);
            }
        }
    };
    
      const animalsFromLocalStorage = localStorage.getItem("Animals");
      if(animalsFromLocalStorage){
        setAnimals(JSON.parse(animalsFromLocalStorage));
      }else{
        getData();
      }
    }, []);

    useEffect(() => {
      const animal = animals.find((animal:IAnimal) => animal.id === Number(id)) || null;
      
        if(animal){
          setFedTime(animal.lastFed);
          setPet(animal);

          const lastFed = new Date(animal.lastFed);
          const rightNow = new Date();

          const timeDiffInMs = rightNow.getTime() - lastFed.getTime();
          const diffInSeconds = timeDiffInMs / 1000; 
          const diffInMinutes = diffInSeconds / 60;
          const diffInHours = diffInMinutes / 60;

          if(diffInHours > 3){
            setButtondisabled(false);
          }else{
            setButtondisabled(true);
          }
        }   
    }, [animals]);

      const handleFeedClick = () => {
        const timeElapsed = Date.now();
        const rightNow = new Date(timeElapsed);
        const rightNowAsString = rightNow.toString();
        const updatedTime = animals.map((animal) => {
          if (animal.id === pet?.id) {
            return {
              ...animal,
              isFed: true,
              lastFed: rightNowAsString,
            };
          }
          return animal;
        });
      
        localStorage.setItem("Animals", JSON.stringify(updatedTime));
        setAnimals(updatedTime);  
        setButtondisabled(true); 
        setFedTime(rightNowAsString);
      };
   
    return(
            <>    
              <div className='animalDetail'>
                  <div className='animalDetail__image'>
                      <img src={pet?.imageUrl} alt={pet?.name} />
                  </div>
                  <div className='animalDetail__text-container'>
                      <h2 className='animalDetail__name'>{pet?.name}</h2>
                      <p className='animalDetail__desc'>{pet?.longDescription}</p>
                      <p className='animalDetail__birthday'><span>Födelseår: </span>{pet?.yearOfBirth}</p>
                      <p className='animalDetail__medicine'><span>Mediciner: </span>{pet?.medicine}</p>
                      <p><span>Matad: </span>{fedTime}</p>
                      <button className='animalDetail__btn' disabled={buttondisabled} onClick={handleFeedClick}>Mata {pet?.name}</button>
                      <p></p>
                  </div>
              </div> 
            </>
        );
    }