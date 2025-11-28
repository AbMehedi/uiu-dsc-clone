const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  data?: AdminUser;
  error?: string;
  message?: string;
}

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    // Store token in localStorage as backup
    if (data.success && data.token) {
      localStorage.setItem('token', data.token);
    }
    
    return data;
  } catch (error) {
    console.error('Login error:', error);
    return { 
      success: false, 
      error: 'Failed to connect to server' 
    };
  }
};

export const logout = async (): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    
    // Clear localStorage
    localStorage.removeItem('token');
    
    return await response.json();
  } catch (error) {
    console.error('Logout error:', error);
    
    // Clear localStorage even if logout fails
    localStorage.removeItem('token');
    
    return { 
      success: false, 
      error: 'Failed to logout' 
    };
  }
};

export const getCurrentUser = async (): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: 'GET',
      credentials: 'include',
    });
    return await response.json();
  } catch (error) {
    console.error('Get current user error:', error);
    return { 
      success: false, 
      error: 'Failed to fetch user data' 
    };
  }
};
