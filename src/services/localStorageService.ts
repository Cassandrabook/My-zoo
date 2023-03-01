import { Animal } from "../components/Animal/Animal"

export const saveToLs = () => {
    localStorage.setItem('animal', JSON.stringify(Animal))
}