import { useNavigate } from 'react-router-dom';
import './Main.css';

function Main() {
  const navigate = useNavigate();

  return (
    <>
      <img className='title-img' 
      onClick={() => { navigate('/festivals') }} 
      src='base/main__img.png' alt="대문" />
    </>
  )
}

export default Main;