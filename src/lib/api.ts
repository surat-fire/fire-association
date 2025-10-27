// Utility functions for API calls with authentication

export const getAuthHeaders = () => {
  if (typeof window === 'undefined') {
    return {};
  }
  
  const token = localStorage.getItem('adminToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const apiRequest = async (url: string, options: RequestInit = {}) => {
  const headers: any = {
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || 'Request failed');
  }

  return response.json();
};

export const apiRequestWithFormData = async (url: string, formData: FormData) => {
  const headers: any = {
    ...getAuthHeaders(),
  };

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || 'Request failed');
  }

  return response.json();
};
