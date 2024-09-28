export const createCategory = async (token: string, surveyId: string, title: string) => {
    const response = await fetch(`http://localhost:4000/api/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ surveyId, title }),
    });
    if (!response.ok) throw new Error('Failed to create category');
    return await response.json();
  };