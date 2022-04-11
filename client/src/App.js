import "./App.css";
import { useState } from "react";

function App() {
    const [name, setName] = useState("");
    const [out, setOut] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = async(e) => {
        setLoading(true);
        const response = await fetch(`/anime?name=${name}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });

        await response.text().then(setOut).then(setLoading(false));
    };

    return ( <
        div className = "App" >
        <
        div >
        Enter Anime Name <
        br / >
        <
        input type = "text"
        value = { name }
        onChange = { handleChange }
        /> <
        button onClick = { handleSubmit } > go < /button> < /
        div > {
            loading ? ( <
                div id = "out" > Loding recommendation < /div>
            ) : ( <
                div id = "out" > { out } < /div>
            )
        } <
        /div>
    );
}

export default App;