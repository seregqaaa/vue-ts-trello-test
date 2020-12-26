export const saveStatePlugin = (store: any): void => {
  store.subscribe((_: any, state: object): void => localStorage.setItem('state', JSON.stringify(state)))
}
