import { useDispatch } from 'react-redux';
import './FestivalList.css';
import { useEffect } from 'react';
import { festivalIndex } from '../../store/thunks/festivalThunk.js';

function FestivalList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(festivalIndex());
  }, []);

  return (
    <>
    <div className="container">
      <div className="card">
        <div className="card-img" style={{backgroundImage: `url('http://tong.visitkorea.or.kr/cms/resource/91/3484791_image2_1.jpg')`}}></div>
        <p className="card-title">가락몰 3층 하늘공원</p>
        <p className="card-period">2025.09.01 - 2025.09.25</p>
      </div>
      <div className="card">
        <div className="card-img" style={{backgroundImage: `url('http://tong.visitkorea.or.kr/cms/resource/91/3484791_image2_1.jpg')`}}></div>
        <p className="card-title">가락몰 3층 하늘공원</p>
        <p className="card-period">2025.09.01 - 2025.09.25</p>
      </div>
      <div className="card">
        <div className="card-img" style={{backgroundImage: `url('http://tong.visitkorea.or.kr/cms/resource/91/3484791_image2_1.jpg')`}}></div>
        <p className="card-title">가락몰 3층 하늘공원</p>
        <p className="card-period">2025.09.01 - 2025.09.25</p>
      </div>
      <div className="card">
        <div className="card-img" style={{backgroundImage: `url('http://tong.visitkorea.or.kr/cms/resource/91/3484791_image2_1.jpg')`}}></div>
        <p className="card-title">가락몰 3층 하늘공원</p>
        <p className="card-period">2025.09.01 - 2025.09.25</p>
      </div>
    </div>
    </>
  )  
}

export default FestivalList;