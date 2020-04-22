const booksRequested = () => {
    return {type: 'FETCH_BOOKS_REQUEST'}
};

const booksLoaded = (newBooks) => {
    return {
        type: 'FETCH_BOOK_SUCCESS',
        payload: newBooks
    }
};

const booksError = (error) => {
    return {
        type: 'FETCH_BOOKS_FAILURE',
        payload: error
    }
};

//это не экшен. но уместно здесь хранить эту функцию, т.к. она работает с экшенами
const fetchBooks = (bookstoreService, dispatch) => () => {
    dispatch(booksRequested()); //booksRequested поможет при заходе на страницу, например с другой внутренней, снова показать лоадер и загрузить книги
    bookstoreService.getBooks()
        .then( (data) => dispatch(booksLoaded(data)))
        .catch( (err) => dispatch(booksError(err)))
}
//1) первый вариант. экспортировали всё наружу
// export {
//     booksLoaded, booksRequested, booksError, fetchBooks
// }
//2) но функция fetchBooks содержит все это экшены. и красивее экспортировать её одну. т.к. другие нам наруже просте не нужны
export {
    fetchBooks
}

