import { ChangeEvent, useState } from "react";

import "./IdList.css";
import data from "./example.json";

export const IdList = () => {
  const [filter, setFilter] = useState("");
  const [pagination, setPagination] = useState(0);

  const filteredData = data.filter((item) =>
    item.job.job_id.toString().includes(filter),
  );

  // Количество элементов на странице
  const itemsPerPage = 50;

  // Вычисление начального и конечного индексов для текущей страницы
  const startIndex = pagination * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Фильтрация данных в пределах текущей страницы
  const paginatedData = filteredData.slice(startIndex, endIndex);

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    setFilter(e.target.value);
    setPagination(0);
  }

  function onResetClick() {
    setFilter("");
    setPagination(0);
  }

  return (
    <div className="centered-container">
      <div className="action-container">
        <input
          type="number"
          placeholder="Filter by id"
          value={filter}
          onChange={onInputChange}
        />
        <button onClick={onResetClick}>Reset filter</button>
      </div>

      <ul>
        {paginatedData.map((item) => (
          <li key={item.id}>{item.job.job_id}</li>
        ))}
      </ul>

      <div className="action-container">
        <button
          onClick={() => setPagination((prev) => Math.max(0, prev - 1))}
          disabled={pagination === 0}
        >
          Previous
        </button>
        <button
          onClick={() =>
            setPagination((prev) =>
              Math.min(prev + 1, Math.ceil(filteredData.length / itemsPerPage)),
            )
          }
          disabled={endIndex >= filteredData.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};
