const nameFailResponse = (create, h) => {
  const state = create ? 'menambahkan' : 'memperbarui';
  const res = h.response({
    status: 'fail',
    message: `Gagal ${state} buku. Mohon isi nama buku`,
  });
  res.code(400);
  return res;
};

const readPageMoreThanPageCountResponse = (create, h) => {
  const state = create ? 'menambahkan' : 'memperbarui';
  const res = h.response({
    status: 'fail',
    message:
    `Gagal ${state} buku. readPage tidak boleh lebih besar dari pageCount`,
  });
  res.code(400);
  return res;
};

module.exports = {nameFailResponse, readPageMoreThanPageCountResponse};
