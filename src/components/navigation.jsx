import { FcGraduationCap, FcList, FcBusinessman, FcKey, FcHome } from "react-icons/fc";
import { GiNotebook } from "react-icons/gi";
import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { useContext } from "react";
import UserContext from "../context/UserContext";

function Navigation() {
    const { firstName, lastName } = useContext(UserContext);
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate('/');
    }
    return(
        <div className="app-header header-shadow">
            <div className="app-header__logo">
                <div className="logo-src"></div>
                <div className="header__pane ml-auto">
                    <div>
                        <button type="button" className="hamburger close-sidebar-btn hamburger--elastic" data-class="closed-sidebar">
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="app-header__content">
                <div className="app-header-left">
                    <ul className="header-menu nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                <i className="nav-link-icon"><FcHome /> </i>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/take-attendance" className="nav-link">
                                <i className="nav-link-icon"><FcList /> </i>
                                Attendance
                            </Link>
                        </li>
                        <li className="nav-item" >
                            <Link to="/courses" className="nav-link">
                                <i className="nav-link-icon"><GiNotebook /></i>
                                Courses
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/students" className="nav-link">
                                <i className="nav-link-icon"><FcGraduationCap /></i>
                                Students
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/update-profile" className="nav-link">
                                <i className="nav-link-icon"><FcBusinessman /></i>
                                Profile
                            </Link>
                        </li>
                    </ul>        
                </div>
                <div className="app-header-right">
                    <div className="header-btn-lg pr-0">
                        <div className="widget-content p-0">
                            <div className="widget-content-wrapper">
                                <Link to="/update-profile" className="nav-link">
                                    <i className="nav-link-icon"><FcBusinessman /></i>
                                    {firstName} {lastName}
                                </Link>
                                <div className="widget-content-right header-user-info ml-3">
                                    <button type="button" className="btn-shadow p-1 btn btn-danger btn-lg" onClick={signOut}>
                                        Sign Out <FcKey />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>        
                </div>
            </div>
        </div>
    )
}

export default Navigation;