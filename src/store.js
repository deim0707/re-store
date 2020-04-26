import {createStore, applyMiddleware} from "redux";
import reducer from "./reducers";

//enhancer - меняет весь процесс. в т.ч. создание стор и диспатч
//middleware - может поменять Только диспатч

//под next в этих случаях обычно понимают dispatch. следующий в цепочке dispatch
const logMiddleware = (store) => (next) => (action) => {
    console.log(action.type, store.getState());
    return next(action);
};
//аналог функции ниже, с использованием не enhancer, a middleware
const stringMiddleware = () => (next) => (action) => {
    if (typeof  action === 'string') {
        return next({
            type: action
        })
    }
    else {
        return next(action)
    }
};

//заменяем механизм создания стор. принимает createStore и возвращает его новую релизацию. метод: enhancer. паттерн функционального программирование. менее популярный, нежели middleware. уже существует множество таких библиотек.
// const stringEnhancer = (createStore) => (...args) => {
//     const store = createStore(...args);
//
//     //здесь наш оригинанльный диспэтч
//     const originalDispatch = store.dispatch;
//     //модифицируем dispath, учим его принимать не только объекты, но и строки
//     store.dispatch = (action) => {
//         if (typeof  action === 'string') {
//             return originalDispatch({
//                 type: action
//             })
//         }
//         else {
//             return originalDispatch(action)
//         }
//     };
//     return store;
// };



const store = createStore(reducer, applyMiddleware(stringMiddleware, logMiddleware));



//проверяем, что наше преобразование диспетча работает. и приложение не крашится
store.dispatch('HELLO_WORLD');


export default store;