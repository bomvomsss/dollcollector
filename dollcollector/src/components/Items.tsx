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
  // 그룹명을 가나다 순으로 정렬
  const sortedGroups = Object.keys(groupedItems).sort((a, b) =>
    a.localeCompare(b, "ko")
  );
  return (
    <div id='items'>
      {sortedGroups.map((group) => (
        <div className='group-wrap' key={group}>
          <h2>
            {group}{" "}
            {/* <span className='sort'>
              {groupedItems[group][0].sort
                ? ` (${groupedItems[group][0].sort})`
                : ""}
            </span> */}
          </h2>
          <div className='flex-box'>
            {groupedItems[group].map((item) => (
              <Link to={`/item/${item.id}`} key={item.id} className='item'>
                <p className='title'>{item.title}</p>
                <div className='thumbnail'>
                  <img src={item.thumbnail} alt={item.title + ` 사진`} />
                </div>
                <div className='contents'>
                  {/* <p className='group'>
                    <span>그룹 : </span>
                    {item.group}
                  </p> */}
                  <p className='sort'>{item.sort}</p>
                  <p className='member'>
                    {/* <span>멤버 : </span> */}
                    {item.member}
                  </p>
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
