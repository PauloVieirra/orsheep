import React from "react";
import { IconLinkedin,IconNotion, IconFigma, IconWhats } from "../Icons";
import { useAuth } from "../../context/AuthContext";
import './style.css';

export function Footer() {
    const {theme}= useAuth();
    return (
        <div className="footer" style={{background:theme.footerBackground}}>
            
            <div className="footer-links">
                <a href="https://www.linkedin.com/in/paulo-vieira-a16723210/" target="_blank" rel="noopener noreferrer">
                    <IconLinkedin size={24}/>
                </a>
                <a href="https://www.notion.so/Paulo-Vieira-165edff61b1c80d5bc89f4d199f5dfee" target="_blank" rel="noopener noreferrer">
                    <IconNotion size={24} />
                </a>
                <a href="tel:+61996454194">
                    <IconFigma size={24} />
                </a>
                <a href="tel:+61996454194">
                    <IconWhats size={24} />
                </a>
            </div>
            <p className="footer-text">© 2025 VgentsTech - Paulo Vieira. Todos os direitos reservados.</p>
        </div>
    );
}
