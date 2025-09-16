import { useDispatch, useSelector } from 'react-redux';
import './FestivalList.css';
import { useEffect } from 'react';
import { festivalIndex } from '../../store/thunks/festivalThunk.js';
import { dateFormatter } from '../../utils/dateFormatter.js';
import { setScrollEventFlg } from '../../store/slices/festivalSlice.js';

function FestivalList() {
  const dispatch = useDispatch();
  
  const festivalList = useSelector(state => state.festival.list);
  
  const scrollEventFlg = useSelector(state => state.festival.scrollEventFlg);

  useEffect(() => {
    // 로컬스토리지에 저장된 날짜 획득
    //  저장된 날짜 없으면 로컬스토리지에 현재 날짜 저장
    //  저장된 날짜 있으면 아래처리 속행
    //    오늘 날짜랑 비교
    //      날짜가 과거면 로컬 스토리지 및 스테이트 초기화
    //      아직 과거가 아니면 처리 속행

    window.addEventListener('scroll', addNextPage); 

    if(festivalList.length === 0) {
      dispatch(festivalIndex());
    }
    
    return () => {
      window.removeEventListener('scroll', addNextPage);
    }
  }, []);

  // 다음 페이지 가져오기
  function addNextPage() {
    // 스크롤 이벤트 시 주의사항
    // 1. 굉장히 잦은 빈도로 실행됨 > 디바운싱 & 쓰로틀링 & IntersectionObserver 이용 실행 빈도 조절 필수
    // 2. 같은 요청을 반복적으로 할 가능성이 높아, 반복적으로 실행이 안되도록 제어하는 것이 필수
    // 스크롤 관리 처리
    const docHeight = document.documentElement.scrollHeight; // 문서의 Y축 총 길이
    const winHeight = window.innerHeight; // 윈도우의 Y측 총 길
    const nowHeight = Math.ceil(window.scrollY); // 현재 스크롤의 Y축 위치
    const viewHeight = docHeight - winHeight; // 스크롤을 끝까지 내렸을 때의 Y축 위치
    console.log(viewHeight, nowHeight);
    if(viewHeight === nowHeight && scrollEventFlg) {
      dispatch(setScrollEventFlg(false));
      dispatch(festivalIndex());
    }
  }
    

  return (
    <>
    <div className="container">
      {
        festivalList.length > 0 && festivalList.map(item => {
          return (
            <div className="card" key={item.contentid + item.createdtime}>
              <div className="card-img" style={{backgroundImage: `url('${item.firstimage}')`}}></div>
              <p className="card-title">{item.title}</p>
              <p className="card-period">{dateFormatter.WithHyphenYMD(item.eventstartdate)} - {dateFormatter.WithHyphenYMD(item.eventenddate)}</p>
            </div>
          )
        })
      } 
    </div>
    <div className=''>
      <button className='morebutton' type='button' onClick={addNextPage}>더보기</button>
    </div>
    </>
  )  
}

export default FestivalList;