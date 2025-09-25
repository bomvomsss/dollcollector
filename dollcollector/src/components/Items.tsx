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
interface ItemProps {
  search: string;
}

function Items({ search }: ItemProps) {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetch("/dollcollector/data.json")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  // 검색어로 필터링
  const filteredItems = items.filter(
    (item) =>
      item.title.includes(search) ||
      item.group.includes(search) ||
      item.sort.includes(search) ||
      item.member.includes(search)
  );

  // 그룹별로 아이템 분류
  const groupedItems = filteredItems.reduce<{ [key: string]: Item[] }>(
    (acc, item) => {
      if (!acc[item.group]) acc[item.group] = [];
      acc[item.group].push(item);
      return acc;
    },
    {}
  );

  const sortedGroups = Object.keys(groupedItems).sort((a, b) => {
    const aIsKorean = /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(a);
    const bIsKorean = /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(b);

    if (aIsKorean && !bIsKorean) {
      return -1; // a가 한글이고 b가 한글이 아니면 a를 먼저 정렬
    }
    if (!aIsKorean && bIsKorean) {
      return 1; // b가 한글이고 a가 한글이 아니면 b를 먼저 정렬
    }

    const aIsNumber = /^[0-9]/.test(a);
    const bIsNumber = /^[0-9]/.test(b);

    if (aIsNumber && !bIsNumber) {
      return 1; // a가 숫자이고 b가 숫자가 아니면 b를 먼저 정렬
    }
    if (!aIsNumber && bIsNumber) {
      return -1; // b가 숫자이고 a가 숫자가 아니면 a를 먼저 정렬
    }

    return a.localeCompare(b, "ko"); // 둘 다 한글이거나 둘 다 한글이 아니면 localeCompare로 정렬
  });

  return (
    <div id='items'>
      {sortedGroups.map((group) => (
        <div className='group-wrap' key={group}>
          <h2>{group}</h2>
          <div className='flex-box'>
            {groupedItems[group].map((item) => (
              <Link to={`/item/${item.id}`} key={item.id} className='item'>
                <p className='title'>{item.title}</p>
                <div className='thumbnail'>
                  <img src={item.thumbnail} alt={item.title + ` 사진`} />
                </div>
                <div className='contents'>
                  <p className='sort'>{item.sort}</p>
                  <p className='member'>{item.member}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Items;
