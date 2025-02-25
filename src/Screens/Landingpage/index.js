import React, { useEffect, useRef, useState } from "react";
import { Slider } from "infinite-react-carousel";
import "./style.css";

import imghero1 from '../../assets/images/app.png';
import logo from '../../assets/images/Group8.png';

const images = [imghero1, imghero1, imghero1,imghero1,imghero1,imghero1];


export default function Casehome() {

  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const totalSlides = images.length;

  

  return (
    <main> 
    <div className="landing-container">
      
    <section className="auth">
        <div>
          <img src={logo} className="logoimg"/>  
        </div>
        
         <div>  
            <button className="login-btn">Login</button>
         </div>
        
      </section>
      {/* Seção Hero */}
      <section className="hero">
        <div className="hero-text">

          <div className="textTituliocentral">Transforme seu Atendimento com Pedidos Digitais</div>
          <p>Facilite sua operação, aumente suas vendas e melhore a experiência do cliente.</p>
          <button className="cta-btn">Experimente Grátis</button>

        </div>
      </section>

       {/* Seção de Apresentacao */}
       <section className="apresentacao">

        <div>
            <h2>O que é o Orsheep !</h2> 
        </div>
       
         <div className="apres"> 
            
        <div className="itemapres">
          <img src={imghero1} className="hero-image"/>
        </div>

        <div className="itemapres">
        <img src={imghero1} className="hero-image"/>
        </div>

        <div className="itemapres">
        <img src={imghero1} className="hero-image"/>
        </div>

       </div>

      </section>

      {/* Seção de Estatísticas */}
      <section className="stats">
        <div className="stat-item">
          <h2>+15.000</h2>
          <p>Pedidos por mês</p>
        </div>
        <div className="stat-item">
          <h2>+500</h2>
          <p>Restaurantes ativos</p>
        </div>
        <div className="stat-item">
          <h2>+50.000</h2>
          <p>Produtos cadastrados</p>
        </div>
      </section>

      {/* Seção de Testemunhos */}
      <section className="testimonials">
        <h2>O que nossos clientes dizem</h2>
        <div className="testimonial">
          <p>"Nosso faturamento aumentou 35% desde que implementamos o cardápio digital!"</p>
          <span>- João Silva, Dono do Restaurante Sabor & Arte</span>
        </div>
        <div className="testimonial">
          <p>"Facilitou muito o atendimento e reduziu erros nos pedidos!"</p>
          <span>- Maria Oliveira, Gerente do Burger House</span>
        </div>
      </section>

     

      {/* Seção de Imagens do Sistema */}
      <section className="features">
        <h2>Veja nosso sistema em ação</h2>
        <div className="image-gallery">
          <img src="/images/menu-preview1.png" alt="Prévia do Cardápio" />
          <img src="/images/menu-preview2.png" alt="Tela de Pedidos" />
          <img src="/images/menu-preview3.png" alt="Gestão de Produtos" />
        </div>
      </section>

      {/* Seção de Contato */}
      <section className="contact">
        <h2>Entre em contato</h2>
        <form>
          <input type="text" placeholder="Seu Nome" required />
          <input type="email" placeholder="Seu E-mail" required />
          <textarea placeholder="Sua mensagem" required></textarea>
          <button type="submit">Enviar</button>
        </form>
      </section>

      {/* Seção de Login/Cadastro */}
    

      {/* Rodapé */}
      <footer>
        <div>
            <img src={logo} className="logoimg" />
        </div>
        <p>&copy; 2025 - Orsheep Asistente de atendimento Digital | Todos os direitos reservados.</p>
      </footer>
    </div>
    </main>
  );
}
