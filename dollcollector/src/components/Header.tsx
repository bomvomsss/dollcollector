import "../styles/header.css";

function Header() {
  return (
    <div id='header'>
      <h1>✨돌돌도감✨</h1>
      <div className='select-box'>
        <button>?</button>
        <form action='search'>
          <input type='text' placeholder='검색' />
          <button type='submit'>검색</button>
        </form>
      </div>
    </div>
  );
}

export default Header;
