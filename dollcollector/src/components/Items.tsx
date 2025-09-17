import { useState, useEffect } from "react";
import "../styles/item.css";
import { Link } from "react-router-dom";

interface Item {
  id: string;
  title: string;
  thumbnail: string;
  group: string;
  sort: string;
  member: string;
}

function Items() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <div id='items'>
      {items.map((item, idx) => (
        <Link to={`/item/${item.id}`} key={idx} className='item'>
          <p className='title'>{item.title}</p>
          <div className='thumbnail'>
            <img src={item.thumbnail} alt={item.title} />
          </div>
          <div className='contents'>
            <p className='group'>{item.group}</p>
            <p className='sort'>{item.sort}</p>
            <p className='member'>{item.member}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Items;
