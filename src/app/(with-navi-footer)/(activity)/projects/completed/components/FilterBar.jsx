import { useState } from "react";

const FilterBar = ({ onFilter }) => {
  const [projectType, setProjectType] = useState("전체");
  const [category, setCategory] = useState("전체");
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilter = () => {
    onFilter({ projectType, category, searchTerm });
  };

  return (
    <div className="flex items-center gap-4 p-4">
      <select
        className="border p-2"
        onChange={(e) => setProjectType(e.target.value)}
      >
        <option value="전체">전체</option>
        <option value="해커톤">해커톤</option>
        <option value="경진대회">정대회</option>
        <option value="공모전">공모전</option>
        <option value="SideProject">사이드 프로젝트</option>
        <option value="기타">기타</option>
      </select>
      <select
        className="border p-2"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="전체">전체</option>
        <option value="Web">Web</option>
        <option value="Game">Game</option>
        <option value="Window">Window</option>
        <option value="Android">Android</option>
        <option value="iOS">iOS</option>
      </select>
      <input
        type="text"
        placeholder="검색어 입력"
        className="border p-2"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={handleFilter}>
        검색
      </button>
    </div>
  );
};

export default FilterBar;
