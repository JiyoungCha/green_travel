import { useDispatch, useSelector } from 'react-redux';
import './StayList.css';
import { useEffect, useState } from 'react';
import { stayIndex } from '../../store/thunks/stayThunk';
import { useNavigate } from 'react-router-dom';
// import { setScrollEventFlg, setStayList } from '../../store/slices/staySlice.js';
import { setStayInfo } from '../../store/slices/stayShowSlice.js';
import { localStorageUtil } from '../../utils/localStorageUtil.js';
import { REGION_CODE, REGION_CODE_NAME } from '../../configs/regionCodes.js';

function StayList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  // 지역 목록
  const [showArea, setShowArea] = useState(false);

  const [selectedRegions, setSelectedRegions] = useState([]);
  const { staylist, error } = useSelector(state => state.stay);
  // const { scrollEventFlg } = useSelector(state => state.stay.scrollEventFlg);

  let stayFilter;
  if (selectedRegions.length === 0) {
    stayFilter = staylist;
  } else {
    stayFilter = staylist.filter(item => {
      return selectedRegions.some(regionCode => 
        String(item.lDongRegnCd).startsWith(regionCode)
      );
    });
  }
    
  useEffect(() => {
    if (staylist.length === 0) {
      dispatch(stayIndex());
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', addNextPage);

    return () => {
      window.removeEventListener('scroll', addNextPage);
    }
  }, [stayFilter, page]);

  useEffect(() => {
    if (staylist && staylist.length > 0) {
      localStorageUtil.setStayList(staylist);
      console.log('StayList: localStorage에 저장된 staylist', localStorageUtil.getStayList());
    }
  }, [staylist]); 

  function addNextPage() {
    const docHeight = document.documentElement.scrollHeight
    const winHeight = window.innerHeight; 
    const nowHeight = Math.ceil(window.scrollY); 
    const viewHeight = docHeight - winHeight; 
    
    if(viewHeight - nowHeight < 1 && (page * 12 < stayFilter.length)) {
      setPage(prevPage => prevPage + 1)
    //   dispatch(setScrollEventFlg(false));
    //   dispatch(stayIndex());
    }
  }
  if (error && staylist.length === 0) {
      return <p>Error: {error}</p>;
  }

  function redirectShow(item) {
    dispatch(setStayInfo(item));
    navigate(`/stay/${item.contentid}`);
  }

  // 지역 선택

  const handleRegionChange = (region) => {
    setPage(1);
    setSelectedRegions(prev => {
      if (prev.includes(region)) {
        return prev.filter(r => r !== region);
      } else {
        return [...prev, region];
      }
    })
  };

  return (
    <>
      <div className="stay-list-btn-container">
        <button type="button" className="back-btn"onClick={() => {navigate(`/menu`)}}></button>
      </div>

      {/* 지역 선택 */}
      <div className='area-toggle-btn-container'>
      <button type="button" className='area-toggle-btn' onClick={() => {setShowArea(prev => !prev)}}>
        지역 선택
      </button>
      </div>
      <div className="stay-area-container"> 
        { showArea && (
            REGION_CODE_NAME.map(regionName => {
              const regionCode = REGION_CODE[regionName];
              return (
                <label className='stay-area-label' key={regionName}>
                  <input className='stay-area-checkbox' type="checkbox" 
                  checked={selectedRegions.includes(regionCode)}
                  onChange={() => handleRegionChange(regionCode)} /> 
                  <span className='stay-area-text'>{regionName}</span>
                </label>
              )
            })
          )
        }
      </div>
      
      <div className="stay-container">
        {
          staylist && stayFilter.slice(0, page * 12).map(item => {
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