
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";
import { FaBookReader } from "react-icons/fa";
import "./Login.css";

function Login() {
  const [activeTab, setActiveTab] = useState('admin');
  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState('');

  const navigate = useNavigate();
  const { user, login } = useAuth();

  useEffect(()=>{
    if(user?.role === "admin"){
      navigate("/issuedbooks")
    }
    else if(user?.role === "student"){
       navigate("/Mybooks");
    }
  },[user,navigate])

  const handleSubmit =(e)=> {
    e.preventDefault();

    if(email === "nithi@gmail.com" && password ==='nithi'){
       login(email, "admin");
      navigate("/IssuedBooks");
    }
    else if (email === "ram@gmail.com" && password === "ram123") {
      login(email, "student");
      navigate("/Mybooks");
  }
  else{
    window.alert("Invalid email or password")
    setError("Invalid email or password");
  }
}


  return ( 

    <>
    <div className="logodiv d-flex mt-5 align-items-center gap-3 ms-5"><FaBookReader size={41} style={{ color: '#ED7966' }}/>
    <p className="pt-3 fw-bold "  style={{ color: '#ED7966' }}>LMS</p></div>
    <div className="main-container">     
      <form className="login-card" onSubmit={handleSubmit}>
        <h2 className="login-title " style={{ color: '#09174A' }}>Login</h2>
        <p style={{ color: '#646464' }}>Welcome back! Please enter your details.</p>
        <div className="active-tab">
          <button type="button" className={activeTab === 'admin' ? 'tab active' : 'tab'} onClick={() => setActiveTab('admin')}>Admin</button>

          <button type="button" className={activeTab === 'student' ? 'tab active' : 'tab'} onClick={() => setActiveTab('student')}>Student</button>
        </div>

        <label className="mb-2" style={{ color: '#09174A' }} >Email</label> <br />
        <input className="custom-input mb-2 w-100" type="email" placeholder="Enter your email" value={email} onChange={(e) => {setEmail (e.target.value);setError("");}} /><br />

        <label className="mb-2" style={{ color: '#09174A' }}>Password</label><br />
        <input type="password" placeholder="Enter your password" className=" custom-input mb-3 w-100" value={password} onChange={(e) => {setPassword(e.target.value); setError("");}}/><br />

        <button type="submit" className="login-button w-100 ">Login</button>
        {activeTab === 'student' && (
          <p style={{ marginTop: '10px', color: '#646464', fontSize: '14px', textAlign: 'center'}}>
            Don’t have an account? <a href="/register" style={{ color: '#e66c5a' }}>Register</a>
          </p>
        )}

      </form>

    </div>
   </>
  );
}

export default Login;

