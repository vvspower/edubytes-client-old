import React ,  {useContext, useState} from "react";
import dataContext from "../Context.js/dataContext";
import classes from "./signup.module.css";
import { useNavigate } from "react-router-dom";
import user from '../../Images//user.png'

const SignupComponent = () => {
  const navigate = useNavigate()
  const context = useContext(dataContext)
  const redirectuser = context.redirectuser
  const getUserAndRedirect = context.getUserAndRedirect
  const Signup = context.Signup
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  console.log(name , email , password)


  const createuser = async () => {
    let success = await Signup(name , email ,password)
    console.log(success)
    if(success) {
      let user = await getUserAndRedirect(localStorage.getItem("auth-token"))
      console.log(user)
        navigate(`/u/user?id=${user.json.userId}`)
    }
  }
  
  return (
    <div style={{margin: "auto" , width: "300px"}}>
        <h1 style={{textAlign: "center" , marginBlock: "20px"}}>Logo</h1>
      <div className={classes.Signup}>
        <h4 style={{marginBottom: "30px"}}>Create a ------- Account</h4>
        <p>Engage in Informative Forums for O & A Level Students.  
          Want  guidance  for your education in the future? 
          Do it all with EduBytes</p>
        <form style={{ marginTop: "50px" }}>
        <div class="mb-4">
           
           <input
           placeholder="Name"
             type="text"
             class="form-control"
             id="exampleInputEmail1"
             aria-describedby="emailHelp"
             onChange={(e)=> {
                 setname(e.target.value)
             }}
           />
         </div>
          <div class="mb-4">
           
            <input
            placeholder="Email"
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e)=> {
                setemail(e.target.value)
                             }}
            />
          </div>
          <div class="mb-4">
            
            <input
            placeholder="Password"
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              onChange={(e)=> {
                setpassword(e.target.value)
                             }}
            />
          </div>
          <div class="mb-4 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
              style={{width: "15px"}}
            />
            <label
              style={{ maxWidth: "380px" , fontSize: "12px" , marginRight: "50px" }}
              class="form-check-label"
              for="exampleCheck1"
            >
              By clicking Create Account , you agree to our Terms and have
              acknowleged our Privacy Policies
            </label>
          </div>
          <button onClick={
            (e) => {
              e.preventDefault()
              createuser()}
          } type="submit" class="btn">
            Create An Account
          </button>
        </form>
      </div>
     
    </div>
  );
};

export default SignupComponent;
