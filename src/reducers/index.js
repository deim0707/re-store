import updateBookList from "./book-list";
import updateShoppingCart from "./shopping-cart";


const reducer = (state, action) => {
    //console.log(action.type); //какой экшен поступил в редюсер

    return {
        bookList: updateBookList(state, action),
        shoppingCart: updateShoppingCart(state, action)
    }
};

export default reducer;