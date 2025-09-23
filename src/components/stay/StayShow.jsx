import { useNavigate, useParams } from 'react-router-dom';
import './StayShow.css';
import { useDispatch, useSelector } from 'react-redux';
import { setStayInfo } from '../../store/slices/stayShowSlice.js';
import { useEffect } from 'react';
import { localStorageUtil } from '../../utils/localStorageUtil.js';
import { setStayList } from '../../store/slices/staySlice.js';

function StayShow() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const stayInfo = useSelector(state => state.stayShow.stayInfo);
  const { staylist } = useSelector(state => state.stay);
  // const staylist = useSelector(state => state.stay.staylist);
  // dispatch(setStayInfo(item));
  
  useEffect(() => {
    let item = staylist.find(item => params.id === item.contentid);

    if (!item) {
      const storedStayList = localStorageUtil.getStayList();
      if (storedStayList && storedStayList.length > 0) {
        dispatch(setStayList(storedStayList));
        item = storedStayList.find(item => params.id === item.contentid);
      }
    }
    
    if (item) {
     dispatch(setStayInfo(item));
    } else {
      alert('숙소 정보를 찾을 수 없습니다. 목록 페이지로 돌아갑니다.');
      navigate('/stay');
    } 
    }, [dispatch, params.id, navigate, staylist]);

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