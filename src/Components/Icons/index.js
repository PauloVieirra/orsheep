import React from "react";
import { useAuth } from "../../context/AuthContext";
import { BsArrowLeft, BsBasket2 } from "react-icons/bs";
import { RiFilePaper2Line } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { FiMenu } from "react-icons/fi";
import { PiCallBellBold } from "react-icons/pi";
import { FaWindowClose } from "react-icons/fa";
import { IoSunnySharp } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";
import { FaLinkedin } from "react-icons/fa";
import { SiNotion } from "react-icons/si";
import { FaFigma } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import './style.css';

export function IconWhats() {
    const { theme } = useAuth();
    return (
        <FaWhatsappSquare size={24} color={theme.iconsColors} />
    );
}

export function IconFigma() {
    const { theme } = useAuth();
    return (
        <FaFigma size={24} color={theme.iconsColors} />
    );
}

export function IconNotion() {
    const { theme } = useAuth();
    return (
        <SiNotion size={24} color={theme.iconsColors} />
    );
}

export function IconLinkedin() {
    const { theme } = useAuth();
    return (
        <FaLinkedin size={24} color={theme.iconsColors} />
    );
}

export function IconVoltar() {
    const { theme } = useAuth();
    return (
        <BsArrowLeft size={24} color="#fff" />
    );
}

export function IconVoltarBlack() {
    const { theme } = useAuth();
    return (
        <BsArrowLeft size={24} color={theme.textGeral} />
    );
}

export function IconCart() {
    return (
        <BsBasket2 />
    );
}

export function IconBills() {
    const { theme } = useAuth();

    return (
        <RiFilePaper2Line size={24} color={theme.textGeral} />
    );
}

export function IconSearch() {
    const { theme } = useAuth();
    return (
        <CiSearch size={24} color={theme.textGeral} />
    );
}

export function IconMenu() {
    const { theme } = useAuth();

    return (
        <FiMenu size={24} color={theme.textGeral} />
    );
}

export function IconEntrad() {
    return (
        <>
            <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Green%20Salad.png" className="icon-bear" />
        </>
    );

}

export function IconTudo() {
    return (
        <>
            <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/House%20with%20Garden.png" alt="House with Garden" className="icon-bear" />
        </>
    );

}

export function IconPrato() {
    return (
        <>
            <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Spaghetti.png" alt="Spaghetti" className="icon-bear" />
        </>
    );

}

export function IconLanche() {
    return (
        <>
            <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Rice%20Cracker.png" alt="Rice Cracker" className="icon-bear" />
        </>
    );

}

export function IconBebiAl() {
    return (
        <>
            <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Cocktail%20Glass.png" alt="Cocktail Glass" className="icon-bear" />
        </>
    );

}

export function IconHappy() {
    return (
        <>
            <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Clinking%20Beer%20Mugs.png" alt="Clinking Beer Mugs" className="icon-bear" />
        </>
    );

}

export function IconPedir() {
    return (
        <PiCallBellBold />
    );
}

export function IconClose() {
    return (
        <FaWindowClose className="icon-close" />
    );
}


export function IconSun() {
    return (
        <IoSunnySharp className="icon-close" />
    );
}

export function IconMoon() {
    return (
        <IoMoonOutline className="icon-close" />
    );
}





