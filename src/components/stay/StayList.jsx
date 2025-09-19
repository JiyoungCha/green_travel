import { useDispatch, useSelector } from 'react-redux';
import './StayList.css';
import { useEffect } from 'react';
import { stayIndex } from '../../store/thunks/stayThunk';

function StayList() {
  const dispatch = useDispatch();

  const { staylist, error } = useSelector(state => state.stay);

  useEffect(() => {
    dispatch(stayIndex());
  }, [dispatch])

  if (error) {
    return console.error(error);
  }

  return (
    <>
      <div className="stay-list-btn-container">
        <button type="button" className="back-btn"></button>
      </div>
      
      <div className="stay-container">
        {
          staylist && staylist.map(item => {
            return (
            <div className="stay-card" key={item}>
            <div className="stay-card-img" style={{backgroundImage: `url('${item.firstimage}')`}}></div>
            <p className="stay-card-title">{item.title}</p>
            <p className="saty-card-addr">{item.addr1}</p>
            </div>
            )            
          })          
        }
      </div>
    </>
  );
}

export default StayList;