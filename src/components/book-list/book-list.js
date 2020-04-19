import React, {Component} from 'react';
import {connect} from 'react-redux';
import './book-list.css';
import {withBookstoreService} from "../hoc";
import BookListItem from "../book-list-item";
import {booksLoaded} from "../../actions";
import {compose} from "../../utils";


class BookList  extends Component {

  componentDidMount() {
    const {bookstoreService} = this.props;
    const data = bookstoreService.getBooks();
    this.props.booksLoaded(data);
  }

  render() {
    const {books} = this.props;

    return (
        <ul>
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
    books: state.books
  }
};
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
const mapDispatchToProps = {
  booksLoaded
};


//используем 2 компонента высшего порядка. один написан нами, для получения компонентами методов работы с "сервером". отсюда берём метод GetBooks()
//второй редаксовский. в итоге наш компонент BookList обёрнут двумя другими компонентами
// export default withBookstoreService()
//   (connect(mapStateToProps, mapDispatchToProps)
//     (BookList));

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
) (BookList)