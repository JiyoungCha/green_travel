import { useNavigate, useParams } from 'react-router-dom';
import './StayShow.css';
import { useDispatch, useSelector } from 'react-redux';
import { setStayInfo } from '../../store/slices/stayShowSlice.js';
import { useEffect } from 'react';

function StayShow() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const stayInfo = useSelector(state => state.stayShow.stayInfo);
  const staylist = useSelector(state => state.stay.staylist);
  const item = staylist.find(item => params.id === item.contentid);
  dispatch(setStayInfo(item));

  useEffect(() => {
      
  }, []);

  function redirectBack() {
    navigate(-1);
  }
  
  return (
    <>
      { stayInfo && stayInfo.title &&
        <div className='stay-show-container'>
          <button type="button" className='back-btn' onClick={redirectBack}></button>
          <p className="stay-show-title">{stayInfo.title}</p>
          <img src={stayInfo.firstimage} alt={`${stayInfo.title}사신`} className="stay-show-img" />
          <p className="stay-show-tel">{`${stayInfo.tel}`}</p>
          <p className="stay-show-addr1">{`${stayInfo.addr1}`}</p>
          <p className="stay-show-addr2">{`${stayInfo.addr2}`}</p>
        </div>
      }
    </>
  )  
}

export default StayShow;