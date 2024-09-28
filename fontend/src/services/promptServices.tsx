
export const createPrompt = async (token: string, text: string, categoryId: string) => {
    const response = await fetch(`http://localhost:4000/api/prompts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ text, categoryId }),
    });
    if (!response.ok) throw new Error('Failed to create prompt');
    return await response.json();
  };