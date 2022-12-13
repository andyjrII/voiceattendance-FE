import { Link } from "react-router-dom";
import { FcBusinessman, FcGraduationCap, FcList, FcHome } from "react-icons/fc";
import { GiNotebook } from "react-icons/gi";

function Sidebar() {
    return(
        <div className="app-sidebar sidebar-shadow">
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
            <div className="app-header__mobile-menu">
                <div>
                    <button type="button" className="hamburger hamburger--elastic mobile-toggle-nav">
                        <span className="hamburger-box">
                            <span className="hamburger-inner"></span>
                        </span>
                    </button>
                </div>
            </div>
            <div className="app-header__menu">
                <span>
                    <button type="button" className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav">
                        <span className="btn-icon-wrapper">
                            <i className="fa fa-ellipsis-v fa-w-6"></i>
                        </span>
                    </button>
                </span>
            </div>    
            <div className="scrollbar-sidebar">
                <div className="app-sidebar__inner">
                    <ul className="vertical-nav-menu">
                        <li className="app-sidebar__heading">Quick Links</li>
                        <li>
                            <Link to="/lecturer">
                                <i className="metismenu-icon"><FcHome /></i>
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/attendance">
                                <i className="metismenu-icon"><FcList /></i>
                                Attendance
                            </Link>
                        </li>
                        <li>
                            <Link to="/courses">
                                <i className="metismenu-icon"><GiNotebook /></i>
                                Courses
                            </Link>
                        </li>
                        <li>
                            <Link to="/students">
                                <i className="metismenu-icon"><FcGraduationCap /></i>
                                Students
                            </Link>
                        </li>
                        <li>
                            <Link to="/update-profile">
                                <i className="metismenu-icon"><FcBusinessman /></i>
                                Profile
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;