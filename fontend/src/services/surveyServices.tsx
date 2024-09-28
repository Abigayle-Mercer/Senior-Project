export const createSurvey = async (token: string, title: string, authorId: string) => {
    const response = await fetch(`http://localhost:4000/api/surveys`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ title, authorId }),
    });
    if (!response.ok) throw new Error('Failed to create survey');
    return await response.json();
  };