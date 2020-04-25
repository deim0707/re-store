
const initialState = {
    books: [],
    loading: true,
    error: null,
    cartItems: [],
    orderTotal: 225
};

const reducer = (state = initialState, action) => {
    // console.log(action.type); //какой экшен поступил в редюсер
    switch (action.type) {
        case 'FETCH_BOOKS_REQUEST': {
            return {
                ...state,
                books: [],
                loading: true,
                error: null
            }
        }

        case 'FETCH_BOOK_SUCCESS':
            return {
                ...state,
                books: action.payload,
                loading: false,
                error: null
            };

        case 'FETCH_BOOKS_FAILURE': {
            return {
                ...state,
                books: [],
                loading: false,
                error: action.payload
            }
        }

        case 'BOOK_ADDED_TO_CART': {
            const bookId = action.payload;
            const book = state.books.find((book) => book.id===bookId);
            const newBook = {
                id: book.id,
                name: book.title,
                count: 1,
                total: book.price
            };
            return {
                ...state,
                cartItems: [
                    ...state.cartItems,
                    newBook
                ]
            }
        }


        default: return state;
    }
};

export default reducer;