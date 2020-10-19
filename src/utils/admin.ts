export default function userAuthenticated(): boolean {
  const userType = localStorage.getItem('userType');

  if (userType === '1') {
    return true;
  }

  return false;
}
