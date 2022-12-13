import HomeNavigation from "../components/home-nav";
import Login from "../components/login";
import '../main.css';

function Home() {
    return (
        <div>
            <HomeNavigation />
            <div className="col-md-3 card text-danger text-center card-body bg-white welcome">
                <h1 className="text-danger card-title">VOICE CONTROLLED ATTENDANCE SYSTEM</h1>
                Department of Computer Science, DS Adegbenro ICT Polytechnic, Itori, Ogun State
            </div>
            <Login />
        </div>
    )
}

export default Home;