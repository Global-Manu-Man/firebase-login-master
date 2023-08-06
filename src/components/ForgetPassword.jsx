import React, { useState } from 'react';
import { Alert, Button, Form } from "react-bootstrap";
import { useUserAuth } from '../context/userAuthContext';
import { Link } from 'react-router-dom';

const ForgetPassword = () => {
    const { resetPassword } = useUserAuth();
    const [email, setEmail] = useState("");
    const [error, setError] = useState('');
    const [sendInfo, setSendInfo] = useState('');

    const handleResetPassword = (e) => {
        e.preventDefault();
        if (!email) {
            setError('Please Enter Your Email.');
            return;
        }
        resetPassword(email)
          .then(() => {
              console.log("Password reset email sent.");
              setSendInfo('Password reset email sent.');
          })
          .catch((error) => {
              console.error("Error sending password reset email:", error);
              setError('Error sending password reset email, try again.')
          });
      };

    return (
        <>
           <div className="p-4 box">
                <h2 className="mb-3 text-center">Reset Password</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleResetPassword}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </Form.Group>
                <div className="d-grid gap-2 mb-3">
                    <Button variant="primary" type="Submit">
                        Send Email
                    </Button>
                </div>
                </Form>
                {sendInfo && <Alert variant="success">{sendInfo}</Alert>}
            </div>
            <div className="p-4 box mt-3 text-center">
                Go back to Login page <Link to="/">Log In</Link>
            </div>
        </>
    );
};

export default ForgetPassword;