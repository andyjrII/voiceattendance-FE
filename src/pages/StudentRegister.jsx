import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaPen } from "react-icons/fa";
import axios from '../api/axios';
import { Link, useNavigate } from 'react-router-dom' 
import '../components/components.css';
import HomeNavigation from "../components/home-nav";

const REGISTER_URL = '/student/create';

const NAME_REGEX = /^[a-zA-Z-]+$/;
const MATRIC_REGEX = /^[a-zA-Z]{3,4}-[0-9]{2}-[0-9]{4}$/;

function StudentRegister() {
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

    const [matric, setMatric] = useState('');
    const [validMatric, setValidMatric] = useState(false);
    const [matricFocus, setMatricFocus] = useState(false);

    const [gender, setGender] = useState('');
    const [session, setSession] = useState('');
    const [level, setLevel] = useState('');

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
        setValidMatric(MATRIC_REGEX.test(matric));
    }, [matric])

    useEffect(() => {
        setErrMsg('');
    }, [firstName, lastName, matric, gender, session, level])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await axios.post(REGISTER_URL, 
                JSON.stringify({ 
                    firstName, lastName, gender, session, level,
                    matricNumber: matric
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
                setErrMsg('Invalid Matric Number.');
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
                        <h5 className="card-title">Student Registration <FaPen /></h5>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text bg-primary text-light">
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
                                <div class="input-group-prepend">
                                    <span class="input-group-text bg-primary text-light">
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
                                <div class="input-group-prepend">
                                    <span class="input-group-text bg-primary text-light">
                                        Matric Number
                                        <FontAwesomeIcon icon={faCheck} className={validMatric ? "valid" : "hide"} />
                                        <FontAwesomeIcon icon={faTimes} className={validMatric || !matric ? "hide" : "invalid"} />
                                    </span>
                                </div>
                                <input
                                    type="text" id="matric" autoComplete="off" className="form-control"
                                    onChange={(e) => setMatric(e.target.value)} value={matric} required
                                    aria-invalid={validMatric ? "false" : "true"} aria-describedby="matricnote"
                                    onFocus={() => setMatricFocus(true)} onBlur={() => setMatricFocus(false)}
                                />
                                <p 
                                    id="matricnote" className={matricFocus && !validMatric ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} 
                                />
                                    Matriculation number must be in the format: <br />
                                    XXX-00-0000
                                </p>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="accountType">Gender:</label>
                                </div>
                                <div className="col">
                                    <div role="group">
                                        <label className="btn btn-primary">
                                        <input 
                                            type="radio" name="gender" id="male"
                                            value='MALE' onChange={(e) => setGender(e.target.value)}
                                        />
                                            Male
                                        </label>
                                        <label className="btn btn-primary">
                                            <input 
                                                type="radio" name="gender" id="female" 
                                                value='FEMALE' onChange={(e) => setGender(e.target.value)}
                                            />
                                            Female
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-primary text-light">Level</span>
                                        </div>
                                        <select
                                            id="level" className="form-control" name="level"
                                            onChange={(e) => setLevel(e.target.value)} required
                                        >
                                            <option value="">-----</option>
                                            <option value="ND1">ND1</option>
                                            <option value="ND2">ND2</option>
                                            <option value="HND1">HND1</option>
                                            <option value="HND2">HND2</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-primary text-light">Session</span>
                                        </div>
                                        <select
                                            id="session" className="form-control" name="session"
                                            onChange={(e) => setSession(e.target.value)} required
                                        >
                                            <option value="">-----</option>
                                            <option value="2019/2020">2019/2020</option>
                                            <option value="2020/2021">2020/2021</option>
                                            <option value="2021/2022">2021/2022</option>
                                            <option value="2022/2023">2022/2023</option>
                                            <option value="2023/2024">2023/2024</option>
                                            <option value="2024/2025">2024/2025</option>
                                            <option value="2025/2026">2025/2026</option>
                                            <option value="2026/2027">2026/2027</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <button disabled={!validFirstName || !validLastName || !validMatric ? true : false} className='mt-1 btn btn-success'>
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-md-2 text-center card text-danger card-body bg-white welcome">
                <h1 class="text-danger card-title">NOTE</h1>
                For staff registration click the link below<br /> 
                <Link to="/staff-register" className="text-light btn btn-dark">Register</Link>
            </div>
        </div>
    )
}

export default StudentRegister