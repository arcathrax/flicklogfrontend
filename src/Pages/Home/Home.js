import { useEffect } from "react";

function Home()
{
    useEffect(() => {
        document.title = "home"
    }, [])
    return(
        <div>
            <h1>
                home
            </h1>
            <p>
                this is the homepage of my react frontend project
            </p>
        </div>
    )
}

export default Home;