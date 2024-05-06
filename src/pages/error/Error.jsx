import Styled from './Error.module.css';
import { Link, useLocation } from 'react-router-dom';

export const  Error = () => {
  const location = useLocation();
  const { statusCode, statusText, message } = location.state;
  return (
    <div className={Styled.Body}>
      <h1 className={Styled.H1}>{statusCode}</h1>
      <div className={Styled.cloak__wrapper}>
        <div className={Styled.cloak__container}>
          <div className={Styled.cloak} />
        </div>
      </div>
      <div className={Styled.info}>
        <h2 className={Styled.H2}>{statusText}</h2>
        <p className={Styled.paragraf}>{message}</p>
        <Link to='/home' className={Styled.link}>
          Home
        </Link>
      </div>
    </div>
  );
};
