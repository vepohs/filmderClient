import './App.css';
import RegistrationForm from "./signUp/components/RegistrationForm.tsx";

function App() {

    return (
        <>
            <RegistrationForm/>
        </>
    );
}

export default App;


//     const data = {
//         firstName: 'John',
//         lastName: 'Doe',
//         email: 'john.doe@example.com',
//         age: 25, // Assurez-vous de fournir un nombre ici
//         password: 'your_password1',
//         confirmPassword: 'your_password1',
//         countryId: 1, // Par exemple, vous pouvez définir l'ID du pays en fonction d'une logique TMDB
//         ppPath: 'path/to/profile_picture.jpg' // Ce champ est optionnel, ajoutez-le seulement si nécessaire
//     };
//
//     const response = await axios.post('http://localhost:3012/api/users/createUser', data);
//
//     console.log(response.data);
// } catch (error) {
//     console.error("Erreur lors de la requête :", error);
//