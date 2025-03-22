// lib/api.ts
import { Post } from '@/types';

const API_URL = 'https://jsonplaceholder.typicode.com';

// Server-side function to get all posts
export async function getPosts(): Promise<Post[]> {
  try {
    const response = await fetch(`${API_URL}/posts`, { 
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

// Server-side function to get a single post by ID
export async function getPostById(id: number): Promise<Post> {
  try {
    const response = await fetch(`${API_URL}/posts/${id}`, { 
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch post with ID ${id}`);
    }
    
    return response.json();
  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error);
    throw error;
  }
}

// Client-side function to filter posts
export function filterPosts(posts: Post[], searchTerm: string, searchField: 'all' | 'id' | 'title' = 'all'): Post[] {
  if (!searchTerm.trim()) {
    return posts;
  }

  const term = searchTerm.toLowerCase().trim();

  return posts.filter((post) => {
    if (searchField === 'id') {
      // If searching by ID, check if the term is a valid number
      if (!isNaN(Number(term))) {
        return post.id.toString() === term;
      }
      return false;
    } 
    
    if (searchField === 'title') {
      // Search only in title
      return post.title.toLowerCase().includes(term);
    } 
    
    // Default: search in both id and title
    return (
      post.id.toString() === term ||
      post.title.toLowerCase().includes(term)
    );
  });
}

// Client-side function to paginate posts
export function paginatePosts(posts: Post[], page: number, limit: number): Post[] {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  return posts.slice(startIndex, endIndex);
}