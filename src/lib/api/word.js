import client from './client';

export const getWordList = () => {
  return client
    .get('/word')
    .then((response) => {
      console.log(response);
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
      console.log(response);
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

