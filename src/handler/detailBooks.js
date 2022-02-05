const books = require('../books');

const {
  nameFailResponse, readPageMoreThanPageCountResponse,
} = require('../utils');

const failUpdateOrDeleteResponse = (updated, h) => {
  const state = updated ? 'Gagal memperbarui buku' : 'Buku gagal dihapus';
  const res = h.response({
    status: 'fail',
    message: `${state}. Id tidak ditemukan`,
  });
  res.code(404);
  return res;
};

const successUpdateOrDeleteResponse = (updated, h) => {
  const state = updated ? 'diperbarui' : 'dihapus';
  const res = h.response({
    status: 'success',
    message: `Buku berhasil ${state}`,
  });
  res.code(200);
  return res;
};

const getBookDetailHandler = (req, h) => {
  const {id} = req.params;
  const book = books.filter((book) => book.id === id)[0];
  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }
  const res = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  res.code(404);
  return res;
};

const updateBookDetailHandler = (req, h) => {
  const {id} = req.params;
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = req.payload;

  if (name === undefined || name === '') return nameFailResponse(false, h);

  const updatedAt = new Date().toISOString();

  if (readPage > pageCount) return readPageMoreThanPageCountResponse(false, h);

  const finished = readPage === pageCount;

  const index = books.findIndex((book) => book.id === id);
  if (index !== -1) {
    books[index] = {
      ...books[index], name, year, author, summary, publisher, pageCount,
      readPage, finished, reading, updatedAt,
    };
    return successUpdateOrDeleteResponse(true, h);
  }
  return failUpdateOrDeleteResponse(true, h);
};

const deleteBookHandler = (req, h) => {
  const {id} = req.params;
  const index = books.findIndex((book) => book.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    return successUpdateOrDeleteResponse(false, h);
  }
  return failUpdateOrDeleteResponse(false, h);
};

module.exports = {
  getBookDetailHandler, updateBookDetailHandler,
  deleteBookHandler,
};
