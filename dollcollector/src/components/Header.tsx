import "../styles/header.css";
import { useLocation, useNavigate } from "react-router-dom";

interface HeaderProps {
  search: string;
  setSearch: any;
}
function Header({ search, setSearch }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();

  // 상세페이지 경로 판별
  const isDetail = location.pathname.startsWith("/item/");

  return (
    <div id='header'>
      <h1>돌돌도감</h1>
      {isDetail ? (
        <button onClick={() => navigate(-1)}>뒤로가기</button>
      ) : (
        <div className='select-box'>
          <div className='search'>
            <input
              type='text'
              placeholder='인형 검색'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type='submit'>검색</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
