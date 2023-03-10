import SourceLogo from "../assets/images/source-logo.svg";
import "../assets/style/auth.scss";
import { IChildrenProps } from "../common/interfaces";

export const AuthLayout = (props: IChildrenProps) => {
  return (
    <section
      id="auth-layout"
      className="vh-100 d-flex align-items-center justify-content-center overflow-hidden"
    >
      <div className="row vw-100">
        <div className="col"></div>
        <div className="col-12 col-sm-8 col-md-4 card border-0">
          <div className="card-body px-5 py-4">
            <div className="card-title d-flex flex-column align-items-center text-center">
              <img src={SourceLogo} alt="sourcemind" width={50} />
              <h5 className="my-1">Webb Fontain</h5>
              <small className="text-muted">powered with Sourcemind</small>

              <h4 className="title my-3">
                Welcome to Inventorization Asset Management
              </h4>
              <h6 className="text-secondary font-weight-light">
                Fill your credentials below
              </h6>
            </div>
            {props.children}
            <div className="card-footer mt-4 bg-transparent border-0 d-flex justify-content-center gap-2">
              <small className="text-secondary text-center">
                Your credentials are stored in a secure database. We will never
                share your information with anyone.
              </small>
            </div>
          </div>
        </div>
        <div className="col"></div>
      </div>
    </section>
  );
};
