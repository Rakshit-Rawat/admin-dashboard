export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
  }
  
  export interface User {
    id: number;
    name: string;
    email: string;
  }
  
  export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
  }