'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SearchFilterProps {
  onSearch: (term: string, field: 'all' | 'id' | 'title') => void;
  initialValue?: string;
  initialField?: 'all' | 'id' | 'title';
}

export default function SearchFilter({ 
  onSearch, 
  initialValue = '', 
  initialField = 'all' 
}: SearchFilterProps) {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [searchField, setSearchField] = useState<'all' | 'id' | 'title'>(initialField);

  // Update the search term when initialValue changes (e.g., from URL params)
  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  useEffect(() => {
    setSearchField(initialField);
  }, [initialField]);

  const handleSearch = () => {
    onSearch(searchTerm, searchField);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('', searchField);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Select
        value={searchField}
        onValueChange={(value) => setSearchField(value as 'all' | 'id' | 'title')}
      >
        <SelectTrigger className="w-[110px]">
          <SelectValue placeholder="Search by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Fields</SelectItem>
          <SelectItem value="id">Post ID</SelectItem>
          <SelectItem value="title">Title</SelectItem>
        </SelectContent>
      </Select>
      
      <div className="relative flex-grow">
        <Input
          type="text"
          placeholder={`Search by ${searchField === 'all' ? 'ID or title' : searchField}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pr-10"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Button
        variant="default"
        size="icon"
        onClick={handleSearch}
      >
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </div>
  );
}