import React, {useState, useEffect} from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import '../styles/register.css';
import { db } from "../firebase";
import { auth } from "../firebase";
import { query, getDocs, collection, where, addDoc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup,
  createUserWithEmailAndPassword} from "firebase/auth";

function Register() {
  /*Google Auth */
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = async() => {
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

  /*Register Email and Pass */
  const registerWithEmailAndPass = async(e, name, email, password) =>{
    e.preventDefault()
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, 'users'), {
            user: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
  };

/*Register */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPass(name, email, password);
    if (user) navigate.replace("/title");
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate.replace("/");
  })


  return (
    <div className='register'>
      <div className='register__container'>
        <input 
          type='text'
          className='register__textBox'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Full Name'
        />
        <input 
          type='text'
          className='register__textBox'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='E-mail Address'
        />
        <input 
          type='password'
          className='register__textBox'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
        <button className='register__btn' onClick={register}>Register</button>
        <button className='register__btn register__google' onClick={signInWithGoogle}>Register with Google</button>
        <div>
          Already have an account? <Link to="/">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register