export function getUserId() {
    const userInfo = localStorage.getItem('USER_INFO');
    if (userInfo) {
      const { id } = JSON.parse(userInfo);
      return id;
    }
    return null;
  }
