export function selectBook(page) {
  return{
    type: 'BOOK_SELECTED',
    payload: page
  }
}
