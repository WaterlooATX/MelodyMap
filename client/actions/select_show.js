export const SELECT_SHOW = 'SELECT_SHOW';

export function selectShow(show) {
  return {
    type: SELECT_SHOW,
    payload :  show
  }
}
