export const saveStatePlugin = (store: any): void => {
  store.subscribe((_: any, state: object): void => localStorage.setItem('state', JSON.stringify(state)))
}

export const uuid: Function = (): string => (Math.random() * 10 ** 10).toString(16)
