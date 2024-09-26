import React from "react";
import Pedidos from "../../Components/Pedidos";
import './styles.css';
import '../../App.css';


export default function HomeScreen(){
    return(
        <div className="main">
           <Pedidos/>
        </div>
    );
}