import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import '../styles/login.css';
import { db } from "../firebase";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, getDocs, collection, where, addDoc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";


function Login() {
    /*Google Auth */
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = async(e) => {
    e.preventDefault()
      try {
          const res = await signInWithPopup(auth, googleProvider);
          const user = res.user;
          const q = query(collection(db, 'users'), where("uid", "==", user.uid));
          const docs = await getDocs(q);
          if (docs.docs.length === 0) {
              await addDoc(collection(db, 'users'), {
                  uid: user.uid,
                  name: user.displayName,
                  authProvider: "google",
                  email: user.email,
              });
          }
      } catch (err) {
          console.error(err);
          alert(err.message);
      }
  };

    /*Login with Email & Password */
    const loginWithEmailAndPass = async( email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    /*Login */
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [user] = useAuthState(auth);
      const navigate = useNavigate("");

      useEffect(() => {
        if (user) navigate("/title");
      });

    return (
        <div className='login'>
            <div className='login__container'>
                <input 
                type="text"
                className='login__textBox'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail Address"
                />
                <input 
                type="password"
                className='login__textBox'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                />
                <button className='login__btn' 
                onClick={() => loginWithEmailAndPass(email, password)}>Login
                </button>
                <button className='login__btn login__google'
                onClick={signInWithGoogle}>
                    Login with Google
                </button>
                <div>
                    <Link to="/reset">Forgot Password</Link>
                </div>
                <div>
                    Don't have an account? <Link to="/register">Register</Link> now.
                </div>
            </div>
        </div>
    );
}

export default Login