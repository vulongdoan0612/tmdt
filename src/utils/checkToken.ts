export function isLoggedIn() {
    const token = localStorage.getItem('access_token');
    return !!token; // Trả về true nếu token tồn tại, ngược lại trả về false
  }