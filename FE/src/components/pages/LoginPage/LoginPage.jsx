import FormInput from "../../common/FormInput/FormInput.jsx";
import "./LoginPage.css";
function LoginPage(){
    return(
        <div className="login_page">
        <form className="login_form">
    <p className="login_title">Log in </p>
    <div className = "login_flex">
                <FormInput
          type="text"
          label="Username or gmail"
          className="username_input"
        />

        <FormInput
          type="password"
          label="Password"
          className="password_input"
        />
    </div>

    <button className="login_submit">Submit</button>
    <p className="login_message">
        Didn't have an account ? <a href="#">Create one</a> 
    </p>
    <p className = "forgot_password_message">
        <a href="#">Forgot password?</a>
    </p>
    <div className="account_link_container">
  <p className = "link_account_text">Or with</p>

  <button className="btn google" type="button">
    <svg
      version="1.1"
      width="20"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
    >
      <path
        style={{ fill: "#FBBB00" }}
        d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256
        c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644
        c-5.317,15.501-8.215,32.141-8.215,49.456
        C103.821,274.792,107.225,292.797,113.47,309.408z"
      />

      <path
        style={{ fill: "#518EF8" }}
        d="M507.527,208.176C510.467,223.662,512,239.655,512,256
        c0,18.328-1.927,36.206-5.598,53.451
        c-12.462,58.683-45.025,109.925-90.134,146.187
        l-0.014-0.014l-73.044-3.727l-10.338-64.535
        c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887
        L507.527,208.176L507.527,208.176z"
      />

      <path
        style={{ fill: "#28B446" }}
        d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512
        c-97.491,0-182.252-54.491-225.491-134.681
        l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771
        c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"
      />

      <path
        style={{ fill: "#F14336" }}
        d="M419.404,58.936l-82.933,67.896
        c-23.335-14.586-50.919-23.012-80.471-23.012
        c-66.729,0-123.429,42.957-143.965,102.724
        l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0
        C318.115,0,375.068,22.126,419.404,58.936z"
      />
    </svg>

    Google
  </button>
</div>
</form>
</div>
    );
}
export default LoginPage;