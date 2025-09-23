import "../styles/header.css";
import { useLocation, useNavigate } from "react-router-dom";
import { BsXLg, BsInfoCircle } from "react-icons/bs";
import { useState } from "react";

interface HeaderProps {
  search: string;
  setSearch: any;
}
function Header({ search, setSearch }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [pop, setPop] = useState(false);

  const togglePop = () => {
    setPop(!pop);
  };

  const closePop = () => {
    setPop(false);
  };
  // 상세페이지 경로 판별
  const isDetail = location.pathname.startsWith("/item/");

  return (
    <div id='header'>
      <h1 onClick={() => navigate("./")}>돌돌도감</h1>
      <div className='tooltip-wrap'>
        <button className='tooltip' onClick={togglePop}>
          <BsInfoCircle />
        </button>
        <div
          className='tooltip-popup'
          style={{ display: pop ? "block" : "none" }}
        >
          <div className='head'>
            <h3>돌돌도감이란?</h3>
            <button className='popup-close' onClick={closePop}>
              <BsXLg />
            </button>
          </div>
          <p>
            아이돌 인형들을 아카이빙한 사이트 입니다. <br />
            사람이 손수 작성하는 데이터라 잘못된 정보가 있을 수 있으며, 계속해서
            업데이트 중입니다..! 초반이라 아직 데이터가 부족한 점 양해
            부탁드립니다. <br />
            절대로 제가 해당 그룹을 무시해서가 아니고 아는 게 없어서 없는
            거랍니다..
            <br /> 혼자 열심히 하고 있습니다 예쁘게 봐주세요💜
            <br />* 순서는 ㄱㄴㄷ 순이며 인형은 멤버 나이순(추정)으로
            되어있습니다!
          </p>
        </div>
      </div>
      {isDetail ? (
        <button className='back-btn' onClick={() => navigate(-1)}>
          <BsXLg />
        </button>
      ) : (
        <div className='search'>
          <span className='input-wrap'>
            <input
              type='text'
              placeholder='인형 검색'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              name='search-input'
            />
          </span>
          <button type='submit'>검색</button>
        </div>
      )}
    </div>
  );
}

export default Header;
