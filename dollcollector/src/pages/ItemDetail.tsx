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
    <div>
      <img src={item.thumbnail} alt={item.title} />
      <div className='contents'>
        <h2>{item.title}</h2>
        <p>그룹: {item.group}</p>
        <p>멤버: {item.member}</p>
        <p>종류: {item.sort}</p>
        <p>{item.description}</p>
      </div>
    </div>
  );
};

export default ItemDetail;
