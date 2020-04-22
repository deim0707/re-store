import React, {Component} from 'react';
import {connect} from 'react-redux';
import './book-list.css';
import {withBookstoreService} from "../hoc";
import BookListItem from "../book-list-item";
import {fetchBooks} from "../../actions";
import {compose} from "../../utils";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";


class BookList  extends Component {

  componentDidMount() {
    this.props.fetchBooks(); //смотрим в самом конце у экспортом
  }

  render() {
    const {books, loading, error} = this.props;

    if (loading) {
      return <Spinner/>
    }

    if (error) {
      return <ErrorIndicator/>
    }

    return (
        <ul className='book-list'>
          {
            books.map((book)=> {
              return (
                  <li key={book.id}> <BookListItem book={book}/> </li>
              )
            })
          }
        </ul>
    )
  }
}

const mapStateToProps = state => {
  return {
    books: state.books,
    loading: state.loading,
    error: state.error
  }
};
//второй вариант получения стейта с использованием деструктуризации
// const mapStateToProps = ({books,loading}) => {
//   return { books,loading }
// };



//1) в этом способе написали экшен сами
// const mapDispatchToProps = (dispatch) => {
//   return {
//     booksLoaded: (newBooks) => {
//       dispatch({
//         type: 'BOOKS_LOADED',
//         payload: newBooks
//       })
//     }
//   }
// };

//2) тут подставили ранее написанный экшен
// const mapDispatchToProps = (dispatch) => {
//   return {
//     booksLoaded: (newBooks) => {
//       dispatch(booksLoaded(newBooks))
//     }
//   }
// };

//3) bindActionCreators (его нужно импортировать)
// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({
//     booksLoaded
//   }, dispatch)
// };

//4) по умолчанию произойдёт действие из 3его пункта. такой редакс умный. даже импортировать bindActionCreator не надо
// const mapDispatchToProps = {
//   booksLoaded, booksRequested,booksError,
// };

// 5) рефакторинг в стиле Буры. тут вынесли логику из компонента. компонент отвечает за ренединг элементов
const mapDispatchToProps = (dispatch, ownProps) => { //ownProps достаёт доступные для Коннекта пропсы
  const {bookstoreService} = ownProps;
  return {
    fetchBooks: fetchBooks(bookstoreService, dispatch)
  }
};


//используем 2 компонента высшего порядка. один написан нами, для получения компонентами методов работы с "сервером". отсюда берём метод GetBooks()
//второй редаксовский. в итоге наш компонент BookList обёрнут двумя другими компонентами
// export default withBookstoreService()
//   (connect(mapStateToProps, mapDispatchToProps)
//     (BookList));

//compose - делает композицию из 2ух компонентов высшего порядка. удобнее записывать
export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
) (BookList)