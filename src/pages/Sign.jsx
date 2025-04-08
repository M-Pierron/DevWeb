import React, { useState } from 'react';
import { User, Lock, Mail, Eye, EyeOff, CircleAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Nav from "../components/nav"; 
import "../App.css";

const SignIn = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    pseudonyme: '',
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();
  const { login, register } = useAuth(); // 💡 du contexte

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`[handleChange] ${name}:`, value); // 📝 LOG
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("[handleSubmit] Formulaire soumis !");
    console.log("isLogin ?", isLogin);
    console.log("formData:", formData);
  
    const url = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/register";
  
    try {
      console.log(`[handleSubmit] Envoi requête vers: ${url}`);
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          ...(isLogin ? {} : { 
            prenom: formData.prenom,
            nom: formData.nom,
            pseudonyme: formData.pseudonyme
          }),
        }),
      });
  
      const data = await response.json();
      console.log("[handleSubmit] Réponse reçue:", data);
      console.log("[handleSubmit] Statut HTTP:", response.status);
  
      if (response.ok && data) {
        console.log("[handleSubmit] Succès côté serveur");
        if (isLogin) {
          console.log("[handleSubmit] Login via contexte avec:", data);
          login(data);
      
          // Enregistrer le token dans localStorage
          localStorage.setItem("token", data.token);
          console.log("🔑 Token enregistré localement:", localStorage.getItem("token"));
      
          // Navigation vers le profil après connexion
          console.log("[handleSubmit] Navigation vers /Profil");
          navigate("/Accueil/Profil");
        } else {
          // ✅ ALERTE INSCRIPTION RÉUSSIE
          alert("Inscription réussie ! Attendez la vérifiquation d'un admin.");
      
          
          setIsLogin(true);
          
          // Optionnel : reset le formulaire
          setFormData({
            prenom: '',
            nom: '',
            pseudonyme: '',
            email: '',
            password: '',
          });
        }
      }
      else if (!response.ok && data){
        setFormErrors(data.errors);
      }
      
    } catch (error) {
      console.error("[handleSubmit] Erreur catché:", error);
      alert("Une erreur est survenue lors de la connexion ou de l'inscription.");
    }
  };
  

  return (
    <div>
      <Nav name={isLogin ? 'CONNEXION' : 'INSCRIPTION'} />
      <div className="sign">
        <div className="form">
          <div className="icon-container">
            <User className="icon" />
          </div>

          <h2 className="title">{isLogin ? 'Connexion' : 'Inscription'}</h2>

          <form onSubmit={handleSubmit} className="formElt">
            {!isLogin && (
              <>
                <div className="input-container">
                  <User className="input-icon" />
                  <input
                    type="text"
                    name="prenom"
                    placeholder="Prénom"
                    className="input-field"
                    value={formData.prenom}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-container">
                  <User className="input-icon" />
                  <input
                    type="text"
                    name="nom"
                    placeholder="Nom"
                    className="input-field"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-container">
                  <User className="input-icon" />
                  <input
                    type="text"
                    name="pseudonyme"
                    placeholder="Pseudonyme"
                    className="input-field"
                    value={formData.pseudonyme}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}

            <div>
              <div className="input-container">
                <Mail className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input-field"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              {formErrors.email &&
              <div className='flex flex-row size-full text-red-500'>
                <CircleAlert className='mr-1'/>
                <span>{formErrors.email}</span>
              </div>}
            </div>

            <div className="input-container">
              <Lock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Mot de passe"
                className="input-field password-field"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => {
                  console.log("[togglePassword] Affichage mdp :", !showPassword);
                  setShowPassword(!showPassword);
                }}
                className="toggle-password"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {!isLogin && (
              <div className="input-container">
                <Lock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirmer le mot de passe"
                  className="input-field"
                  required
                />
              </div>
            )}

            <button type="submit" className="submit-button">
              {isLogin ? 'Se connecter' : "S'inscrire"}
            </button>
          </form>

          <p className="switch-text">
            {isLogin ? "Vous n'avez pas encore de compte ?" : "Vous avez déjà un compte ?"}
            <button
              onClick={() => {
                console.log("[switchForm] Passage à :", !isLogin ? "Connexion" : "Inscription");
                setIsLogin(!isLogin);
              }}
              className="switch-button"
            >
              {isLogin ? "S'INSCRIRE" : "SE CONNECTER"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
