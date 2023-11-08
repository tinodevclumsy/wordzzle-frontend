import client from './client';

export const getWordList = (page = 1) => {
  return client
    .get('/word', {
      params: { page },
    })
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
