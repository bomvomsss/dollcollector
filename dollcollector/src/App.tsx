import "./styles/App.css";
import ItemDetail from "./pages/ItemDetail";
import Main from "./pages/Main";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { useState } from "react";
import Footer from "./components/Footer";

function App() {
  const [search, setSearch] = useState("");

  return (
    <div className='body-wrap'>
      <Header search={search} setSearch={setSearch} />
      <Routes>
        <Route path='/' element={<Main search={search} />}></Route>
        <Route path='/item/:id' element={<ItemDetail />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
