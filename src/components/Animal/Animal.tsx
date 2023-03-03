import { useNavigate } from "react-router-dom";
import { IAnimal } from "../../models/IAnimal";
import { IAnimalSmall } from "../../models/IAnimalSmall";
import './Animal.scss';

interface IAnimalProps{
    animal: IAnimalSmall;
}

export const Animal = (props: IAnimalProps)=> {
    const navigate = useNavigate();

    const showAnimal = () => {
        navigate(`/animal/${props.animal.id}`);
    };
    
    function isFeed(){
        const animals = localStorage.getItem("Animals");
        if(animals){
            const array = JSON.parse(animals);
            const animal = array.find((animal:IAnimal) => animal.id === Number(props.animal.id)) || null;
            if(animal){
                const lastfed = new Date(animal.lastFed);
                const rightnow = new Date();

                if(lastfed.getHours() + 3 < rightnow.getHours()){
                    return true;
                }else{
                    return false;
                }
            }
        } 
    }

    return(
        <>
            <div className="animal">
                <h4 className="animal__title">{props.animal.name}</h4>
                <div className="animal__image-container">
                    <img src={props.animal.imageUrl} alt={props.animal.name} />
                </div>
                <p className="animal__desc">{props.animal.shortDescription}</p>
                <p className="animal__foodTime">{isFeed() ? <span>Mätt</span> : <span className="isHungry">Hungrig</span>}</p>
                <button className="animal__btn-readMore" onClick={showAnimal}>Läs mer</button>
            </div>
        </>
    );
}