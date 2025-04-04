import "../App.css";
import Nav from "../components/nav.jsx";
import React, { useState } from 'react';
import { User, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

function SignIn() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, register } = useAuth();
  
  // États pour les champs du formulaire
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  
  // État pour les erreurs de validation
  const [errors, setErrors] = useState({});

  // Gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Effacer l'erreur pour ce champ lors de la modification
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  // Valider le formulaire
  const validateForm = () => {
    const newErrors = {};
    
    // Validation de l'email
    if (!formData.email) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }
    
    // Validation du mot de passe
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }
    
    // Validation spécifique à l'inscription
    if (!isLogin) {
      if (!formData.firstName) {
        newErrors.firstName = "Le prénom est requis";
      }
      
      if (!formData.lastName) {
        newErrors.lastName = "Le nom est requis";
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (isLogin) {
        // Tentative de connexion
        login({
          email: formData.email,
          // Dans un vrai système, vous n'enverriez pas le mot de passe directement
          // mais plutôt un token d'authentification
        });
        
        // Rediriger vers la page d'accueil après connexion
        navigate('/Accueil');
      } else {
        // Tentative d'inscription
        register({
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          // Dans un vrai système, vous crypteriez le mot de passe avant de l'envoyer
        });
        
        // Rediriger vers la page d'accueil après inscription
        navigate('/Accueil');
      }
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

          <form className="formElt" onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="input-container">
                  <User className="input-icon" />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Prénom"
                    className="input-field"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                {errors.firstName && <p className="error-message">{errors.firstName}</p>}

                <div className="input-container">
                  <User className="input-icon" />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Nom"
                    className="input-field"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
                {errors.lastName && <p className="error-message">{errors.lastName}</p>}
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
              />
            </div>
            {errors.email && <p className="error-message">{errors.email}</p>}

            <div className="input-container">
              <Lock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Mot de passe"
                className="input-field password-field"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-password"
              >
                {showPassword ? <EyeOff/> : <Eye/>}
              </button>
            </div>
            {errors.password && <p className="error-message">{errors.password}</p>}

            {!isLogin && (
              <div className="input-container">
                <Lock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirmer le mot de passe"
                  className="input-field"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            )}
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}

            <button type="submit" className="submit-button">
              {isLogin ? 'Se connecter' : "S'inscrire"}
            </button>
          </form>

          <p className="switch-text">
            {isLogin ? "Vous n'avez pas encore de compte ?" : "Vous avez déjà un compte ?"}
            <button type="button" onClick={() => setIsLogin(!isLogin)} className="switch-button">
              {isLogin ? "S'INSCRIRE" : "SE CONNECTER"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
  
export default SignIn;