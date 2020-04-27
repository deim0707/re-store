//функции для чистоты кода в редюсере
const updateCartItems = (cartItems, item, idx) => {
    //удаление элемента в корзине, если ушли в минус по их числу
    if(item.count===0) {
        return [
            ...cartItems.slice(0, idx),//от начала массива до выбранного индекса он буде как раньше
            ...cartItems.slice(idx +1) //после вставляем старую часть. после нового индекса
        ]
    }

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

const updateCartItem = (book, item = {}, quantity) => {
    //тут либо значения из существоющего айтема, либо первого выбранного*
    const {
        id = book.id,
        count=0,
        title=book.title,
        total=0} = item;

    return {
        id,
        title,
        count: count + quantity,
        total: total + quantity*book.price
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

const updateOrder = (state, bookId, quantity) => {
    const book = state.bookList.books.find((book) => book.id===bookId);
    //проверка на наличие в корзине элемента с которым работаем
    const itemIndex = state.shoppingCart.cartItems.findIndex(({id})=> id === bookId); //айди элемента, если он уже есть в списке (если нет, то вернёт -1)
    const item = state.shoppingCart.cartItems[itemIndex];
    const newItem = updateCartItem(book, item, quantity);
    const numItemsNow = state.shoppingCart.numItems; //колличество товаров в корзине
    //тут когда-то должен появиться подсчёт всей суммы заказа
    // let orderItem = 0;
    // if(!item && state.shoppingCart.orderTotal === 0) {
    //     orderItem = newItem.total;
    // }
    // let orderItem1 = state.shoppingCart.cartItems[0] ? state.shoppingCart.cartItems[0].total : 0;
    // let orderItem2 = state.shoppingCart.cartItems[1] ? state.shoppingCart.cartItems[1].total : 0;
    //
    // if(itemIndex<-1) {
    //     orderItem = orderItem1 + orderItem2
    // }
    // // console.log(orderItem1 + '     ' + orderItem2 + '     ' +  orderItem)
    // console.log(state.shoppingCart)

//////////////////////
    return {
        numItems: numItemsNow+quantity,
        orderTotal: 0,
        cartItems: updateCartItems(state.shoppingCart.cartItems, newItem, itemIndex)
    }
};


//функции написанны для простоты кода. далее используются в редюсере. объединяют в себе работу с определённой частью стейта
const updateShoppingCart = (state, action) => {

    if (state === undefined) {
        return {
            cartItems: [],
            orderTotalItems: 0,
            orderTotal: 0,
            numItems: 0
        }
    }

    switch (action.type) {
        case 'BOOK_ADDED_TO_CART': {
            return updateOrder(state, action.payload, 1)
        }

        case 'BOOK_REMOVED_FROM_CART': {
            return updateOrder(state, action.payload, -1)
        }

        case 'ALL_BOOKS_REMOVED_FROM_CART': {
            const item = state.shoppingCart.cartItems.find(({id}) => id === action.payload);
            return updateOrder(state, action.payload, -item.count)
        }

        default:
            return state.shoppingCart;
    }
};

export default updateShoppingCart;