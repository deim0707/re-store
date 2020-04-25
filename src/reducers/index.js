
const initialState = {
    books: [],
    loading: true,
    error: null,
    cartItems: [],
    orderTotal: 225
};

//функции для чистоты кода в редюсере
const updateCartItems = (cartItems, item, idx) => {
    if (idx === -1) { //если индекс -1, то есть у нас новый элемент. то возвращаем новый массив. который состоит из всех элемент cartItems и новый эллемент
        return [...cartItems, item]
    }
    //если индекс любое другое число. то обновляем существующий
    return [
        ...cartItems.slice(0, idx),//от начала массива до выбранного индекса он буде как раньше
        item, //вставим наш новый элемент
        ...cartItems.slice(idx +1) //после вставляем старую часть. после нового индекса
    ]
};

const updateCartItem = (book, item = {}) => {
    //тут либо значения из существоющего айтема, либо первого выбранного*
    const {
        id = book.id,
        count=0,
        title=book.title,
        total=0} = item;

    return {
        id,
        title,
        count: count+1,
        total: total + book.price
    }

    //ИННОЕ НАПИСАНИЕ ЭТОЙ ФУНКЦИИ
    //если у нас есть старый айтем (если айтем не равен undefined, т.к. при индексе -1 будет undefined), то, создаём новый на основании старого
    // if (item) {
    //     //тут мы берём все из уже существующей книги, и меняем только пару полей
    //     return  {
    //         ...item,
    //         count: item.count+1,
    //         total: item.total + book.price
    //     };
    // }
    // else {             //если нет, то создаём новый
    //     return  {
    //         id: book.id,
    //         title: book.title,
    //         count: 1,
    //         total: book.price
    //     };
    // }
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
            //проверка на наличие в корзине элемента с которым работаем
            const itemIndex = state.cartItems.findIndex(({id})=> id === bookId); //айди элемента, если он уже есть в списке (если нет, то вернёт -1)
            const item = state.cartItems[itemIndex];
            const newItem = updateCartItem(book,item)

            return {
                ...state,
                cartItems: updateCartItems(state.cartItems, newItem, itemIndex)
            }
        }


        default: return state;
    }
};

export default reducer;