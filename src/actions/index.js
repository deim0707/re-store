
const booksloaded = (newBooks) =>{
        return {
            type: 'BOOKS_LOADED',
            payload: newBooks
        }
};

export {
    booksloaded,
}

