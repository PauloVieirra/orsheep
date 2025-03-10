import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import localforage from "localforage";
import './styles.css';

export default function Configuracoes() {
  const {changePlaySound, canPlaySound, logout, configuracao, updateConfiguration, isLoading}= useAuth();

  const [fontSize, setFontSize] = useState(16);
  const [darkMode, setDarkMode] = useState(false);
  const [deliveryMode, setDeliveryMode] = useState(false);
  const [tableMode, setTableMode] = useState(false);

  

  

  
  const handlePlay = () => {
    changePlaySound();
   }
    

  // Carregar configurações salvas
  useEffect(() => {
    const loadSettings = async () => {
      const savedFontSize = await localforage.getItem("fontSize");
      const savedDarkMode = await localforage.getItem("darkMode");
      const savedDeliveryMode = await localforage.getItem("deliveryMode");
      const savedTableMode = await localforage.getItem("tableMode");

      if (savedFontSize) setFontSize(savedFontSize);
      if (savedDarkMode !== null) setDarkMode(savedDarkMode);
      if (savedDeliveryMode !== null) setDeliveryMode(savedDeliveryMode);
      if (savedTableMode !== null) setTableMode(savedTableMode);
    };

    loadSettings();
  }, []);

  // Atualizar e salvar as configurações
  const updateSetting = async (key, value) => {
    await localforage.setItem(key, value);
  };

  const increaseFont = () => {
    const newSize = fontSize + 1;
    setFontSize(newSize);
    updateSetting("fontSize", newSize);
  };

  const decreaseFont = () => {
    const newSize = fontSize > 10 ? fontSize - 1 : 10;
    setFontSize(newSize);
    updateSetting("fontSize", newSize);
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    updateSetting("darkMode", newMode);
  };

  const toggleDeliveryMode = () => {
    const newMode = !deliveryMode;
    setDeliveryMode(newMode);
    updateSetting("deliveryMode", newMode);
  };

  const toggleTableMode = () => {
    const newMode = !tableMode;
    setTableMode(newMode);
    updateSetting("tableMode", newMode);
  };

  return (
    <div className={`settings-container ${darkMode ? "dark" : ""}`}>
      <h2>Configurações</h2>

      <div className="setting-item">
        <span>Tamanho da Fonte</span>
        <div className="font-controls">
          <button onClick={decreaseFont}>-</button>
          <span>{fontSize}px</span>
          <button onClick={increaseFont}>+</button>
        </div>
      </div>

      <div className="setting-item">
        <span>Modo Escuro</span>
        <label className="switch">
          <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
          <span className="slider"></span>
        </label>
      </div>

      <div className="setting-item">
        <span>Modo Delivery</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={configuracao.status_delivery}
            onChange={() => updateConfiguration("status_delivery", !configuracao.status_delivery)}
          />
          <span className="slider"></span>
        </label>
        {configuracao.status_delivery}
      </div>

      <div className="setting-item">
        <span>Modo Mesa</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={configuracao.status_mesa}
            onChange={() => updateConfiguration("status_mesa", !configuracao.status_mesa)}
          />
          <span className="slider"></span>
        </label>
      </div>

      <div className="setting-item">
        <span>Modo Cardapio</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={configuracao.status_loja}
            onChange={() => updateConfiguration("status_loja", !configuracao.status_loja)}
          />
          <span className="slider"></span>
        </label>
      </div>


      {canPlaySound ? <button onClick={handlePlay}>Desativa Som de Notificação</button> : <button onClick={handlePlay}>Ativar Som de Notificação</button> }
      <button onClick={logout}>Sair</button>
    </div>
  );
}
