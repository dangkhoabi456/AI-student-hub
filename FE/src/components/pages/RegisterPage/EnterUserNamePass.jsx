import "./Register.css";
import FormInput from "../../common/FormInput/FormInput.jsx";


 // Đảm bảo đường dẫn đúng
function EnterUserNamePass() {
return (
    <div className="register_page">
      <form className="register_form" onSubmit={(e) => e.preventDefault()}>
        <p className="register_title">Register</p>
        <div className="register_flex">
          <FormInput
            type="text"
            label="Username or gmail"
            className="username_input"
          />

          <FormInput
            type="password"
            label="Password"pp
            className="password_input"
          />
        </div>

        <button className="register_submit" type="submit">Submit</button>

      </form>
    </div>
  );
}
export default EnterUserNamePass;