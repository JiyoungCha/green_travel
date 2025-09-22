import { useDispatch, useSelector } from 'react-redux';
import './StayList.css';
import { useEffect } from 'react';
import { stayIndex } from '../../store/thunks/stayThunk';
import { useNavigate } from 'react-router-dom';
import { setScrollEventFlg } from '../../store/slices/staySlice.js';
import { setStayInfo } from '../../store/slices/stayShowSlice.js';

function StayList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { staylist, error, scrollEventFlg } = useSelector(state => state.stay);
  // const { scrollEventFlg } = useSelector(state => state.stay.scrollEventFlg);
    
  useEffect(() => {
    window.addEventListener('scroll', addNextPage);

    if (staylist.length === 0) {
      dispatch(stayIndex());
    } 

    return () => {
    window.removeEventListener('scroll', addNextPage);
  }
  }, []);

  function addNextPage() {
    const docHeight = document.documentElement.scrollHeight
    const winHeight = window.innerHeight; 
    const nowHeight = Math.ceil(window.scrollY); 
    const viewHeight = docHeight - winHeight; 
    
    if(viewHeight - nowHeight < 1 && scrollEventFlg) {
      dispatch(setScrollEventFlg(false));
      dispatch(stayIndex());
    }
  }
  if (error && staylist.length === 0) {
      return <p>Error: {error}</p>;
  }

  function redirectShow(item) {
    dispatch(setStayInfo(item));
    navigate(`/stay/${item.contentid}`);
  }

  return (
    <>
      <div className="stay-list-btn-container">
        <button type="button" className="back-btn"onClick={() => {navigate(`/menu`)}}></button>
      </div>
      
      <div className="stay-container">
        {
          staylist && staylist.map(item => {
            return (
            <div onClick={() => { redirectShow(item) }} className="stay-card" key={item.contentid}>
            <div className="stay-card-img" style={{backgroundImage: `url('${item.firstimage}')`}}></div>
            <p className="stay-card-title">{item.title}</p>
            <p className="stay-card-addr">{item.addr1}</p>
            </div>
            )            
          })          
        }
      </div>
    </>
  );
}

export default StayList;