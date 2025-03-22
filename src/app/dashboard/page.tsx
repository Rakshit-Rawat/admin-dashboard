// app/dashboard/page.tsx
import { getPosts } from '@/lib/api';
import { Post } from '@/types';
import DashboardClient from './dashboard-client';
import { Suspense } from 'react';
import LoadingSpinner from '@/components/ui/loading-spinner';

export default async function DashboardPage() {
  // Fetch posts on the server
  let posts: Post[] = [];
  
  try {
    posts = await getPosts();
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
  
  return (
    <main className="container py-6 mx-auto">
      <Suspense fallback={<LoadingSpinner />}>
        <DashboardClient initialPosts={posts} />
      </Suspense>
    </main>
  );
}