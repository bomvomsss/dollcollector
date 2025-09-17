import "./styles/App.css";
import ItemDetail from "./pages/ItemDetail";
import Main from "./pages/Main";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className='body-wrap'>
      <Routes>
        <Route path='/' element={<Main />}></Route>
        <Route path='/item/:id' element={<ItemDetail />}></Route>
      </Routes>
    </div>
  );
}

export default App;
