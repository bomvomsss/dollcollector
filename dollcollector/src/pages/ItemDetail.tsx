import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface Item {
  id: string;
  title: string;
  thumbnail: string;
  group: string;
  sort: string;
  member: string;
  description: string;
}

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    fetch("/dollcollector/data.json")
      .then((res) => res.json())
      .then((data: Item[]) => {
        const found = data.find((i) => i.id === id);
        setItem(found || null);
      });
  }, [id]);

  if (!item) return <div>데이터를 찾을 수 없습니다.</div>;

  return (
    <div className='detail-wrap'>
      <h2 className='name'>{item.title}</h2>

      <div className='main-image'>
        <img src={item.thumbnail} alt={item.title} />
      </div>
      <div className='contents'>
        <p>
          <span>그룹</span> : {item.group}
        </p>
        <p>
          <span>멤버</span> : {item.member}
        </p>
        <p>
          <span>종류</span> : {item.sort}
        </p>
        <p className='description'>{item.description}</p>
      </div>
    </div>
  );
};

export default ItemDetail;
