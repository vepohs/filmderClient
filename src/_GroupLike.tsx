import axiosWithAuth from "./axiosUtils/axiosConfig.ts";
import {useContext} from "react";
import {SelectedGroupContext} from "./context/SelectedGroupContext.tsx";

// Renommez la fonction pour qu'elle commence par une majuscule et respecte les conventions React
export function GroupLike() {
    const selectedGroupContext = useContext(SelectedGroupContext);

    if (!selectedGroupContext) {
        throw new Error("GroupLike must be used within a SelectedGroupProvider");
    }

//    const {selectedGroup} = selectedGroupContext;
//    console.log(selectedGroup)

    async function hello() {
        try {
            const response = await axiosWithAuth.post("group/protected/getGroupMoviesCommon", {
                groupId: "24dup0huucsvzko5ei2lnd"
            });
            console.log("AAAAAAAA")
            console.log(response);
        } catch (error) {
            console.error("Erreur lors de l'appel à l'API:", error);
        }
    }

    return (
        <div className="mainPage">
            <button onClick={hello}>HOOOOOO</button>
        </div>
    );
}
