import React, { useState } from 'react';
import { User, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Nav from "../components/nav"; // Assure-toi d'avoir ce composant de navigation
import "../App.css";

const SignIn = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/register";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        ...(isLogin ? {} : { prenom: formData.prenom, nom: formData.nom }), // Ajoute prénom et nom si c'est une inscription
      }),
    });

    const data = await response.json();

    if (data.token) {
      // Stocke le token dans le localStorage
      localStorage.setItem("token", data.token);
      setIsAuthenticated(true); // Mise à jour de l'état d'authentification
      navigate("/profile"); // Redirige vers le profil
    } else {
      alert(data.error || "Une erreur est survenue");
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
              </>
            )}

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
                onClick={() => setShowPassword(!showPassword)}
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
            <button onClick={() => setIsLogin(!isLogin)} className="switch-button">
              {isLogin ? "S'INSCRIRE" : "SE CONNECTER"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
