import React from 'react'
import '../Styles/Cstyles/sellerauth.css'
export default function Sellerauth() {
	const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
  return (
    <div className=" login">
            <div>
                <section>
                    <div className="authcontainer" id="container">
                       
                        <div className="form-container sign-in-container">
                            <form action="#">
                                <h1>Register</h1>

                                <span> Or sign in using E-Mail Address</span>
                                <label>
                                    <input type="number" placeholder="Organization ID" />
                                </label>
                                <label>
                                    <input type="text" placeholder="GSTNO" />
                                </label>
                                <button>Sign In</button>
                                <a href="#">if already registered then go</a>
								<button>GO</button>
                            </form>
                        </div>
                        <div className="overlay-container">
                            <div className="overlay">
                               
                                <div className="overlay-panel overlay-right">
                                    <h1>Register, Organization!</h1>
                                    <p>Register your organization... </p>
                                    <button className="ghost" id="signUp">Register</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
  )
}
