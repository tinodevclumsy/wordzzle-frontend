import client from './client';

export const getQuizList = () => {
  return client
    .get('/word/quiz')
    .then((response) => {
      return response;
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
};

export const getWordList = (payload) => {
  return client.get('/word', {
    params: payload,
  });
};

export const updateWord = (req) => {
  const { id, title, status, meaning } = req;
  return client.post(`/word/update/${id}`, {
    title,
    status,
    meaning,
  });
};

export const addWord = (req) => {
  return client.post(`/word/add`, req);
};

export const deleteWord = (req) => {
  return client.delete(`/word/remove/${req.id}`);
};
