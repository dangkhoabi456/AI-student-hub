function EmailInput() {
  return (
    <div>
      <h2>Forgot Password</h2>
      <p>Please enter your email address to receive a password reset link.</p>
      <input type="email" placeholder="Enter your email" />
      <button>Send Reset Link</button>
    </div>
  );
}
export default EmailInput;