import { useNavigate } from "react-router-dom";
import { IAnimal } from "../../models/IAnimal";
import { IAnimalSmall } from "../../models/IAnimalSmall";
import errorImage from "./../../assets/image_not_available1.94c0c57d.png";
import "./Animal.scss";

interface IAnimalProps {
  animal: IAnimalSmall;
}

export function imageError(e: any) {
  e.currentTarget.src = errorImage;
}

export const Animal = (props: IAnimalProps) => {
  const navigate = useNavigate();

  const showAnimal = () => {
    navigate(`/animal/${props.animal.id}`);
  };

  function isFeed() {
    const animals = localStorage.getItem("Animals");
    if (animals) {
      const array = JSON.parse(animals);
      const animal =
        array.find(
          (animal: IAnimal) => animal.id === Number(props.animal.id)
        ) || null;
      if (animal) {
        const lastFed = new Date(animal.lastFed);
        const rightNow = new Date();

        const timeDiffInMs = rightNow.getTime() - lastFed.getTime();
        const diffInSeconds = timeDiffInMs / 1000;
        const diffInMinutes = diffInSeconds / 60;
        const diffInHours = diffInMinutes / 60;

        if (diffInHours > 3) {
          return false;
        } else {
          return true;
        }
      }
    }
  }

  return (
    <>
      <div className="animal">
        <h4 className="animal__title">{props.animal.name}</h4>
        <div className="animal__image-container">
          <img
            src={props.animal.imageUrl}
            alt={props.animal.name}
            onError={imageError}
          />
        </div>
        <p className="animal__desc">{props.animal.shortDescription}</p>
        <p className="animal__foodTime">
          {isFeed() ? (
            <span>{props.animal.name} är mätt</span>
          ) : (
            <span className="isHungry">{props.animal.name} är hungrig</span>
          )}
        </p>
        <button className="animal__btn-readMore" onClick={showAnimal}>
          Läs mer
        </button>
      </div>
    </>
  );
};
