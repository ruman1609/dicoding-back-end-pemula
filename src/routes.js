const {addBookHandler, getBooksHandler} = require('./handler/books');
const {
  getBookDetailHandler, updateBookDetailHandler, deleteBookHandler,
} = require('./handler/detailBooks');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookDetailHandler,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: updateBookDetailHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookHandler,
  },
];

module.exports = routes;
