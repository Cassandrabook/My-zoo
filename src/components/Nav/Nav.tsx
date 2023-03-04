import { Link } from "react-router-dom";
import './Nav.scss';

export const Nav = () => {

    return(
        <>
            <nav className="menu">
                <ul className="menu__nav-container">
                    <li className="menu__navbar">
                        <Link className="menu__link" to="/">Home</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}