import "../App.css"
import Nav from "../components/nav.jsx"
import "boxicons"
import React, { useState } from 'react';
import { User, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router'

function SignIn() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <Nav name={isLogin ? 'CONNEXION' : 'INSCRIPTION'}/>
      <div className="sign">
        <div className="form">
          <div className="icon-container">
            <User className="icon" />
          </div>
          
          <h2 className="title">{isLogin ? 'Connexion' : 'Inscription'}</h2>

          <form className="formElt">
            {!isLogin && (
              <>
                <div className="input-container">
                  <User className="input-icon" />
                  <input
                    type="text"
                    placeholder="Prénom"
                    className="input-field"
                  />
                </div>

                <div className="input-container">
                  <User className="input-icon" />
                  <input
                    type="text"
                    placeholder="Nom"
                    className="input-field"
                  />
                </div>
              </>
            )}

            <div className="input-container">
              <Mail className="input-icon" />
              <input
                type="email"
                placeholder="Email"
                className="input-field"
              />
            </div>

            <div className="input-container">
              <Lock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                className="input-field password-field"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-password"
              >
                {showPassword ? <EyeOff/> : <Eye/>}
              </button>
            </div>

            {!isLogin && (
              <div className="input-container">
                <Lock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirmer le mot de passe"
                  className="input-field"
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
}
  
export default SignIn
