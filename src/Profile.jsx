import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ setIsAuthenticated }) => {
    const [user, setUser] = useState(null);
    const [isChecking, setIsChecking] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("Token récupéré dans Profile:", token);
    
        if (!token) {
            console.warn("Aucun token trouvé, redirection vers login");
            setIsAuthenticated(false);
            navigate("/");
            return;
        }
    
        fetch("http://localhost:5000/api/auth/profile", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Erreur dans la récupération du profil");
            }
            return res.json();
        })
        .then((data) => {
            console.log("Réponse du serveur pour profile:", data);
    
            if (data.error) {
                console.error("Erreur API Profil:", data.error);
                alert("Erreur: " + data.error);
                setIsAuthenticated(false);
                navigate("/");
            } else {
                setUser(data);
            }
        })
        .catch((err) => {
            console.error("Erreur Fetch profil:", err);
            alert("Erreur serveur lors de la récupération du profil");
            setIsAuthenticated(false);
            navigate("/");
        })
        .finally(() => setIsChecking(false));
    }, [navigate, setIsAuthenticated]);
    

    // Si la vérification est encore en cours, afficher un message d'attente
    if (isChecking) {
        return <div>Vérification en cours...</div>;
    }

    return (
        <div>
            <h2>Profil</h2>
            {user ? (
                <>
                    <p>Prénom : {user.prenom}</p>
                    <p>Nom : {user.nom}</p>
                    <p>Email : {user.email}</p>
                </>
            ) : (
                <div>Chargement du profil...</div>
            )}
            <button onClick={() => {
                console.log("Déconnexion, suppression du token");
                localStorage.removeItem("token");
                setIsAuthenticated(false);
                navigate("/");
            }}>
                Déconnexion
            </button>
        </div>
    );
};

export default Profile;
