export default function userAuthenticated(): boolean {
  const login = localStorage.getItem('loginName');

  if (login === null || login === undefined) {
    return false;
  }

  return true;
}
