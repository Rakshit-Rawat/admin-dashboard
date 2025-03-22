'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { toast } from 'sonner';
import PostsTable from '@/components/dashboard/posts-table';
import SearchFilter from '@/components/dashboard/search-filter';
import { filterPosts } from '@/lib/api';
import { Post } from '@/types';
import LoadingSpinner from '@/components/ui/loading-spinner';

interface DashboardClientProps {
  initialPosts: Post[];
}

export default function DashboardClient({ initialPosts }: DashboardClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [userData, setUserData] = useState<any>(null);
  const [posts] = useState<Post[]>(initialPosts); 
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(initialPosts);
  const [isLoading, setIsLoading] = useState(true);
  
  // Get search params from URL
  const searchTerm = searchParams.get('search') || '';
  const searchField = (searchParams.get('field') as 'all' | 'id' | 'title') || 'all';
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      router.push('/'); 
      return;
    }
    
    
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      setUserData(user);
      
  
      const minLoadingTime = 1000;
      const loadingTimer = setTimeout(() => {
        setIsLoading(false);
      }, minLoadingTime);
      
      // Clean up timer if component unmounts
      return () => clearTimeout(loadingTimer);
      
    } catch (error) {
      console.error('Error loading user data:', error);
      handleLogout();
    }
  }, [router]);
  
  // Update filtered posts when search params change
  useEffect(() => {
    setFilteredPosts(filterPosts(posts, searchTerm, searchField));
  }, [posts, searchTerm, searchField]);
  
  const handleSearch = (term: string, field: 'all' | 'id' | 'title') => {
    // Set loading state when searching
    setIsLoading(true);
    
    // Create new URLSearchParams object
    const params = new URLSearchParams(searchParams);
    
    // Update search parameters
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    
    if (field !== 'all') {
      params.set('field', field);
    } else {
      params.delete('field');
    }
    
    // Update URL with new search params
    router.push(`${pathname}?${params.toString()}`);
    
    // Add artificial delay for loading state
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    router.push('/');
  };
  
  if (isLoading || !userData) {
    return <LoadingSpinner />;
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">Welcome, {userData.email}</h2>
        <p className="text-muted-foreground">
          {userData.role === 'admin' ? 'You are logged in as an administrator.' : 'You are now logged in.'}
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h3 className="text-xl font-semibold">Recent Posts</h3>
          <div className="w-full sm:w-auto">
            <SearchFilter 
              onSearch={handleSearch} 
              initialValue={searchTerm}
              initialField={searchField}
            />
          </div>
        </div>
        
        <PostsTable posts={filteredPosts} />
      </div>
    </div>
  );
}