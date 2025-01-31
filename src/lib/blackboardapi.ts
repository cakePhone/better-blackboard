export async function loginToBlackboard(username: string, password: string): Promise<void> {
  try {
    const response = await
      fetch('https://elearning.uminho.pt/learn/api/public/v1/courses', {
        method: 'GET',
        headers: {
          'Cookie': 'JSESSIONID=FEBC8773762B98F8E9D1C73C74564BBC; samlCookie=33323A645867767866554142437154527350646861796F6F3975435A4859354469525149346E63504B6754696B55626C4D69664F52643770475A69382B536E58355247;',
          'Accept': 'application/json',
        }
      })
    if (!response.ok) {
      throw new Error('Login failed');
    }

  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

