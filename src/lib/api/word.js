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
  return client
    .get('/word', {
      params: payload,
    })
    .then((response) => {
      return response;
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
};

export const updateWord = (req) => {
  return client
    .post(`/word/update/${req.id}`, req.body)
    .then((response) => {
      return response;
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
};

export const addWord = (req) => {
  return client
    .post(`/word/add`, req)
    .then((response) => {
      return response;
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
};

export const deleteWord = (req) => {
  return client
    .delete(`/word/remove/${req.id}`, req)
    .then((response) => {
      return response;
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
};
