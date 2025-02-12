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

const FilterBar = ({ onFilter }) => {
  const [projectType, setProjectType] = useState('전체');
  const [category, setCategory] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilter = () => {
    onFilter({ projectType, category, searchTerm });
  };

  return (
    <div className="flex items-center gap-4 p-4">
      <Select value={projectType} onValueChange={setProjectType}>
        <SelectTrigger className="border p-2">
          <SelectValue placeholder="프로젝트 타입" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="전체">전체</SelectItem>
          <SelectItem value="해커톤">해커톤</SelectItem>
          <SelectItem value="경진대회">경진대회</SelectItem>
          <SelectItem value="공모전">공모전</SelectItem>
          <SelectItem value="SideProject">사이드 프로젝트</SelectItem>
          <SelectItem value="기타">기타</SelectItem>
        </SelectContent>
      </Select>

      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="border p-2">
          <SelectValue placeholder="카테고리" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="전체">전체</SelectItem>
          <SelectItem value="Web">Web</SelectItem>
          <SelectItem value="Game">Game</SelectItem>
          <SelectItem value="Window">Window</SelectItem>
          <SelectItem value="Android">Android</SelectItem>
          <SelectItem value="iOS">iOS</SelectItem>
        </SelectContent>
      </Select>

      <Input
        type="text"
        placeholder="검색어 입력"
        className="w-48 border p-2" // input 크기를 지정
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Button
        variant="primary"
        onClick={handleFilter}
        className="rounded bg-blue-500 px-4 py-2 text-white" // 버튼 스타일
      >
        검색
      </Button>
    </div>
  );
};

export default FilterBar;
