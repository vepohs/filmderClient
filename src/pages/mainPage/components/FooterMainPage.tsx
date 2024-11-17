import {useNavigate} from "react-router-dom";

export function FooterMainPage() {
    const navigate = useNavigate(); // Initialisez le hook useNavigate

    const handleGroupPageNavigation = () => {
        navigate("/protected/groupPage"); // Redirige vers la route groupPage
    };

    return (
        <div className="footerPrefer">
            <h1>Footer</h1>
            <button onClick={handleGroupPageNavigation}>Groupe</button>
        </div>
    );
}
