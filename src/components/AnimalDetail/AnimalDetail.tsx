import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IAnimal } from '../../models/IAnimal';
import './AnimalDetail.scss';

export const AnimalDetail = ()=> {
    const [animal, setAnimal] = useState<IAnimal>();

    const {id} = useParams();

    useEffect(() => {
        
    })

    return(
        <></>
    );
}