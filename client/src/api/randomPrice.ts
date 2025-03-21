import axios from 'axios';

type IamTokenResponse = {
  iamToken: string;
};

type YandexGPTResponse = {
  result: {
    alternatives: {
      message: {
        text: string;
      };
    }[];
  };
};

export const getRandomPrice = async (): Promise<number> => {
  try {
    const response = await axios.get(
      'https://www.random.org/integers/?num=1&min=500&max=50000&col=1&base=10&format=plain&rnd=new',
    );
    return Number(response.data);
  } catch (error) {
    console.error('Ошибка:', error);
    throw error;
  }
};

export const getIamToken = async (): Promise<string> => {
  const response = await axios.post<IamTokenResponse>('http://localhost:3000/api/token');
  return response.data.iamToken;
};

export const descriptionCard = async (title: string): Promise<string> => {
  const API_URL = 'http://localhost:3000/api/completion';
  const token = await getIamToken();

  const response = await axios.post<YandexGPTResponse>(API_URL, {
    token,
    modelUri: `gpt://${import.meta.env.VITE_YANDEX_FOLDER_ID as string}/yandexgpt/latest`,
    completionOptions: {
      stream: false,
      temperature: 1,
      maxTokens: 100,
    },
    messages: [
      {
        role: 'user',
        text: `У меня сайт по продаже воздуха, воды или земли. Составь язвительное, остроумное и оскорбительное для пользователя описание до 200 знаков к ${title}`,
      },
    ],
  });
  return response.data.result.alternatives[0].message.text;
};

export const clickButton = async (): Promise<string> => {
  const API_URL = 'http://localhost:3000/api/completion';
  const token = await getIamToken();

  const response = await axios.post<YandexGPTResponse>(API_URL, {
    token,
    modelUri: `gpt://${import.meta.env.VITE_YANDEX_FOLDER_ID as string}/yandexgpt/latest`,
    completionOptions: {
      stream: false,
      temperature: 1,
      maxTokens: 100,
    },
    messages: [
      {
        role: 'user',
        text: `При твоём вызове ты должен шуткой отвечать что этот функционал не работает. Ничего не анализируй, не пиши лишнего, просто отвечай шуткой.`,
      },
    ],
  });
  return response.data.result.alternatives[0].message.text;
};

export const speakText = (utterance: SpeechSynthesisUtterance): void => {
  window.speechSynthesis.speak(utterance);
};

export const stopSpeaking = (): void => {
  window.speechSynthesis.cancel(); // Остановка
};
