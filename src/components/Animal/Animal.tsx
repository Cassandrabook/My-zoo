import { useNavigate } from "react-router-dom";
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

    return(
        <>
            <div className="animal">
                <h4 className="animal__title">{props.animal.name}</h4>
                <div className="animal__image-container">
                    <img src={props.animal.imageUrl} alt={props.animal.name} />
                </div>
                <p className="animal__desc">{props.animal.shortDescription}</p>
                <button className="animal__btn-readMore" onClick={showAnimal}>Läs mer</button>
            </div>
        </>
    );
}