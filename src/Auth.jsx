import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);
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
    const url = isLogin ? 'http://localhost:5000/auth/login' : 'http://localhost:5000/auth/register';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Réponse du serveur:", data);

      if (response.ok) {
        if (isLogin) {
          // Si c'est une connexion, on récupère et stocke le token
          console.log("Token reçu :", data.token);
          localStorage.setItem("token", data.token);
          setIsAuthenticated(true);
          navigate("/profile");  // Redirige vers la page du profil
        } else {
          alert("Inscription réussie !");
          setIsLogin(true);  // Après l'inscription, on passe à la page de connexion
        }
      } else {
        // Si l'API retourne une erreur, on l'affiche
        alert("Erreur : " + data.error || "Une erreur est survenue.");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion/inscription:", error);
      alert("Erreur serveur lors de la connexion/inscription.");
    }
  };

  return (
    <div>
      <h2>{isLogin ? 'Connexion' : 'Inscription'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <input type="text" name="prenom" placeholder="Prénom" onChange={handleChange} required />
            <input type="text" name="nom" placeholder="Nom" onChange={handleChange} required />
          </>
        )}
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Mot de passe" onChange={handleChange} required />
        <button type="submit">{isLogin ? 'Se connecter' : "S'inscrire"}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Créer un compte' : 'Déjà un compte ? Connectez-vous'}
      </button>
    </div>
  );
};

export default Auth;
