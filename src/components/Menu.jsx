import './Menu.css';
import { useNavigate } from 'react-router-dom';

function Menu() {
  const navigate = useNavigate();

  return (
    <>
      <div className="menu-container">
        <button className='menu-btn' type="button" onClick={() => {navigate(`/festivals`)}}>전국행사</button>
        <button className='menu-btn' type="button" onClick={() => {navigate(`/stay`)}}>숙박정보</button>
      </div>
    </>
  );
}

export default Menu;