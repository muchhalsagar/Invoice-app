// Placeholder for authentication service
export const login = async (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('adminToken', 'dummyToken');
      return true;
    } else {
      return false;
    }
  };
  