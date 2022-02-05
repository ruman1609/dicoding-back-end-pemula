const books = require('../books');
const {nanoid} = require('nanoid');

const {
  nameFailResponse, readPageMoreThanPageCountResponse,
} = require('../utils');

const errorAddBook = (h) => {
  const res = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  res.code(500);
  return res;
};

const addBookHandler = (req, h) => {
  try {
    const {
      name, year, author, summary, publisher, pageCount, readPage, reading,
    } = req.payload;

    if (name === undefined || name === '') return nameFailResponse(true, h);

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    if (readPage > pageCount) return readPageMoreThanPageCountResponse(true, h);

    const finished = readPage === pageCount;

    const newBook = {
      id, name, year, author, summary, publisher, pageCount,
      readPage, finished, reading, insertedAt, updatedAt,
    };
    books.push(newBook);

    if (books.filter((book) => book.id === id).length > 0) {
      const res = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id,
        },
      });
      res.code(201);
      return res;
    }
    return errorAddBook(h);
  } catch (e) {
    console.log(e);
    return errorAddBook(h);
  }
};

const getBooksHandler = (req, h) => {
  let listBook = books.map((book) => {
    return {...book};
  });

  const {name, reading, finished} = req.query;

  if (name !== undefined && name != '') {
    listBook = listBook.filter((book) =>
      book.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (reading !== undefined && reading != '') {
    listBook = listBook.filter((book) => {
      const condition = reading == 1;
      return book.reading === condition;
    });
  }

  if (finished !== undefined && finished != '') {
    listBook = listBook.filter((book) => {
      const condition = finished == 1;
      return book.finished === condition;
    });
  }

  const mapper = (book) => {
    return {
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    };
  };

  listBook = listBook.map(mapper);

  return h.response({
    status: 'success',
    data: {
      books: listBook,
    },
  });
};

module.exports = {addBookHandler, getBooksHandler};
