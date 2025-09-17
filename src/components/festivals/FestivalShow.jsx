import { useNavigate, useParams } from "react-router-dom";
import './FestivalShow.css';
import { dateFormatter } from '../../utils/dateFormatter.js';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setfestivalInfo } from "../../store/slices/festivalShowSlices.js";


function FestivalShow() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const festivalInfo = useSelector(state => state.festivalShow.festivalInfo);
  const festivalList = useSelector(state => state.festival.list)
  const item = festivalList.find(item => params.id === item.contentid);
  dispatch(setfestivalInfo(item));

  useEffect(() => {
    
  }, []);

  function redirectBack() {
    navigate(-1);
  }

  return (
    <>
      { festivalInfo.title && 
        <div className="show-contaier">
          <button type="button" className="back-btn" onClick={redirectBack}></button>
          <p className="show-title">{festivalInfo.title}</p>
          <img className="show-img" src={festivalInfo.firstimage} alt={`${festivalInfo.title}사진`} />
          <p className="show-period">{dateFormatter.WithHyphenYMD(festivalInfo.eventstartdate)} - {dateFormatter.WithHyphenYMD(festivalInfo.eventenddate)}</p>
          <p className="show-addr">{`${festivalInfo.addr1}`}</p>
          <p className="show-addr">{`${festivalInfo.addr2}`}</p>
        </div>
      }
    </>
  )  
}

export default FestivalShow;