import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaPen } from "react-icons/fa";
import axios from '../api/axios';
import { Link, useNavigate } from 'react-router-dom' 
import '../components/components.css';
import HomeNavigation from "../components/home-nav";

const REGISTER_URL = '/auth/signup';

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,24}$/;
const NAME_REGEX = /^[a-zA-Z-]+$/;
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function StaffRegister() {
    const navigate = useNavigate();
    const to = "/";

    const firstNameRef = useRef();
    const errRef = useRef();

    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [validConfirm, setValidConfirm] = useState(false);
    const [confirmFocus, setConfirmFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        firstNameRef.current.focus();
    }, [])

    useEffect(() => {
        setValidFirstName(NAME_REGEX.test(firstName));
    }, [firstName])

    useEffect(() => {
        setValidLastName(NAME_REGEX.test(lastName));
    }, [lastName])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password));
        setValidConfirm(password === confirmPassword);
    }, [password, confirmPassword])

    useEffect(() => {
        setErrMsg('');
    }, [firstName, lastName, email, password, confirmPassword])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await axios.post(REGISTER_URL, 
                JSON.stringify({ 
                    firstName, lastName, email, password
                }), {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            window.alert('Registration Successful!');
            navigate(to, { replace: true});
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 403) {
                setErrMsg('Invalid Email Address.');
            } else {
                setErrMsg('Registration Failed!')
            }
            errRef.current.focus();
        }
    }

    return (
        <div>
            <HomeNavigation />
            <div className="col-md-4 register">
                <div className="main-card mb-3 card">
                    <div className="card-body">
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> 
                        <h5 className="card-title">Staff Registration <FaPen /></h5>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-primary text-light">
                                        First Name
                                        <FontAwesomeIcon icon={faCheck} className={validFirstName ? "valid" : "hide"} />
                                        <FontAwesomeIcon icon={faTimes} className={validFirstName || !firstName ? "hide" : "invalid"} />
                                    </span>
                                </div>
                                <input
                                    type="text" id="firstName" ref={firstNameRef} autoComplete="off" className="form-control"
                                    onChange={(e) => setFirstName(e.target.value)} value={firstName} required
                                    aria-invalid={validFirstName ? "false" : "true"} aria-describedby="firstnamenote"
                                    onFocus={() => setFirstNameFocus(true)} onBlur={() => setFirstNameFocus(false)}
                                />
                                <p 
                                    id="firstnamenote" className={firstNameFocus && !validFirstName ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} 
                                />
                                    Must not contain special characters except hyphen. <br />
                                    Must not contain numbers & space.
                                </p>
                            </div>
                            <br />
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-primary text-light">
                                        Last Name
                                        <FontAwesomeIcon icon={faCheck} className={validLastName ? "valid" : "hide"} />
                                        <FontAwesomeIcon icon={faTimes} className={validLastName || !lastName ? "hide" : "invalid"} />
                                    </span>
                                </div>
                                <input
                                    type="text" id="lastName" autoComplete="off" className="form-control"
                                    onChange={(e) => setLastName(e.target.value)} value={lastName} required
                                    aria-invalid={validLastName ? "false" : "true"} aria-describedby="lastnamenote"
                                    onFocus={() => setLastNameFocus(true)} onBlur={() => setLastNameFocus(false)}
                                />
                                <p 
                                    id="lastnamenote" className={lastNameFocus && !validLastName ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} 
                                />
                                    Must not contain special characters except hyphen. <br />
                                    Must not contain numbers & space.
                                </p>
                            </div>
                            <br />
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-primary text-light">
                                        Email
                                        <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                                        <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                                    </span>
                                </div>
                                <input
                                    type="email" id="email" autoComplete="off" className="form-control"
                                    onChange={(e) => setEmail(e.target.value)} value={email} required
                                    aria-invalid={validEmail ? "false" : "true"} aria-describedby="emailnote"
                                    onFocus={() => setEmailFocus(true)} onBlur={() => setEmailFocus(false)}
                                />
                                <p 
                                    id="emailnote" className={emailFocus && !validEmail ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} 
                                />
                                    Email Address must be in the format <br />
                                    xxxxxxxxx@xxxxx.xxx
                                </p>
                            </div>
                            <br />
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-primary text-light">
                                        Password
                                        <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
                                        <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
                                    </span>
                                </div>
                                <input
                                    type="password" id="password" onChange={(e) => setPassword(e.target.value)}
                                    value={password} className="form-control" required 
                                    aria-invalid={validPassword ? "false" : "true"} aria-describedby="passwordnote"
                                    onFocus={() => setPasswordFocus(true)} onBlur={() => setPasswordFocus(false)}
                                />
                                <p 
                                    id="passwordnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} 
                                />
                                    8 to 24 characters.<br />
                                    Must include uppercase & lowercase letters, a number & a special character.<br />
                                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                </p>
                            </div>
                            <br />
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-primary text-light">
                                        Confirm Password:
                                        <FontAwesomeIcon icon={faCheck} className={validConfirm && confirmPassword ? "valid" : "hide"} />
                                        <FontAwesomeIcon icon={faTimes} className={validConfirm || !confirmPassword ? "hide" : "invalid"} />
                                    </span>
                                </div>
                                <input
                                    type="password" id="confirmPassword" className="form-control"
                                    onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}
                                    required aria-invalid={validConfirm ? "false" : "true"}
                                    aria-describedby="confirmnote" onFocus={() => setConfirmFocus(true)}
                                    onBlur={() => setConfirmFocus(false)}
                                />
                                <p id="confirmnote" className={confirmFocus && !validConfirm ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Must match the first password input field.
                                </p>
                            </div>
                            <br />
                            <button disabled={!validFirstName || !validLastName || !validEmail || !validPassword || !validConfirm ? true : false} className='mt-1 btn btn-success'>
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-md-2 text-center card text-danger card-body bg-white welcome">
                <h1 className="text-danger card-title">NOTE</h1>
                For student registration click the link below<br /> 
                <Link to="/student-register" className="text-light btn btn-dark">Register</Link>
            </div>
        </div>
    )
}

export default StaffRegister