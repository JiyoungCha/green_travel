import './TopBtn.css'

function TopBtn() {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <button onClick={scrollTop} className='top-btn' type="button">TOP</button>
    </>
  );
}

export default TopBtn