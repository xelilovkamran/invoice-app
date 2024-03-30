export const getUserData = async (id) => {
  const res = await fetch(`http://localhost:3005/users/${id}`);
  if (!res.ok) throw new Error("bad connection");
  const data = await res.json();
  return data;
};
