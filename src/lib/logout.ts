export async function logout() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authentication/logout`, {
      method: 'POST',
      credentials: 'include',
    });
  
    if (res.ok) {
      return true;
    } else {
      const error = await res.json();
      throw new Error(error.message || "Logout failed");
    }
  }
  