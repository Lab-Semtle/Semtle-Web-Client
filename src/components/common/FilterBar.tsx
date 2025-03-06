'use client';

import { useState } from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Filter {
  projectType: string;
  category: string;
  searchTerm: string;
}

interface FilterBarProps {
  onFilter: (filter: Filter) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilter }) => {
  const [projectType, setProjectType] = useState('전체');
  const [category, setCategory] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');

  // 필터 적용 버튼 클릭 시 실행
  const handleFilter = () => {
    onFilter({ projectType, category, searchTerm });
  };

  // 엔터 키 입력 시 검색 실행
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleFilter();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4 p-4">
      {/* 프로젝트 유형 선택 */}
      <Select value={projectType} onValueChange={setProjectType}>
        <SelectTrigger className="w-40 border p-2">
          <SelectValue placeholder="프로젝트 유형" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="전체">전체</SelectItem>
          <SelectItem value="해커톤">해커톤</SelectItem>
          <SelectItem value="경진대회">경진대회</SelectItem>
          <SelectItem value="공모전">공모전</SelectItem>
          <SelectItem value="사이드프로젝트">사이드 프로젝트</SelectItem>
          <SelectItem value="기타">기타</SelectItem>
        </SelectContent>
      </Select>

      {/* 연관 분야 선택 */}
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="w-40 border p-2">
          <SelectValue placeholder="연관 분야" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="전체">전체</SelectItem>
          <SelectItem value="Web">Web</SelectItem>
          <SelectItem value="Mobile">Mobile</SelectItem>
          <SelectItem value="IOS">IOS</SelectItem>
          <SelectItem value="DATA">DATA</SelectItem>
          <SelectItem value="Game">Game</SelectItem>
          <SelectItem value="기타">기타</SelectItem>
        </SelectContent>
      </Select>

      {/* 검색 입력창 */}
      <Input
        type="text"
        placeholder="검색어 입력"
        className="w-48 border p-2"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {/* 검색 버튼 */}
      <Button
        variant="default"
        onClick={handleFilter}
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        검색
      </Button>
    </div>
  );
};

export default FilterBar;
