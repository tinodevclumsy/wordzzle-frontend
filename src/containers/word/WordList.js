import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  wordList,
  changePagination,
  searchKeyword,
  updateModal,
} from '../../modules/word';
import TableWord from '../../components/word/TableWord';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal'

const WordTable = () => {
  const dispatch = useDispatch();
  const { list, totalWords, totalPages, page, keyword } = useSelector(
    ({ word }) => ({
      list: word.list.words,
      totalWords: word.list.totalWords,
      totalPages: word.list.totalPages,
      page: word.options.page,
      keyword: word.options.keyword,
    }),
  );

  useEffect(() => {
    dispatch(wordList({}));
  }, []);

  const onSearch = (e) => {
    dispatch(
      searchKeyword({
        keyword: e,
      }),
    );
    dispatch(
      wordList({
        page,
        keyword: e,
      }),
    );
  };

  const onPageChange = (e) => {
    dispatch(
      changePagination({
        page: e,
      }),
    );

    dispatch(
      wordList({
        page: e,
        keyword,
      }),
    );
  };

  const onActionClick = (modal, item) => {
    dispatch(
      updateModal({
        modal,
        item,
      }),
    );
  };

  return (
    <>
      <TableWord
        list={list}
        totalWords={totalWords}
        totalPages={totalPages}
        onSearch={onSearch}
        onPageChange={onPageChange}
        onEditClick={onActionClick}
        onDeleteClick={onActionClick}
      />
      <EditModal />
      <DeleteModal />
    </>
  );
};

export default WordTable;
