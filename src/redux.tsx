import React, {createContext, FC, useContext, useEffect, useState} from 'react'

const store: Store<AppState> = {
  state: undefined,
  reducer: undefined,
  setState(newState: any) {
    store.state = newState
    store.listeners.map((fn: Function) => fn(store.state))
  },
  listeners: [],
  subscribe(fn: Function) {
    store.listeners.push(fn)
    return () => {
      const index = store.listeners.indexOf(fn)
      store.listeners.splice(index, 1)
    }
  }
}

export function createStore<State>(reducer: Function, initState: State) {
  // @ts-ignore
  store.state = initState
  store.reducer = reducer
  return store
}

export const AppContext = createContext(store)

const changed = (oldData: Object, newData: Object) => {
  for (let key in oldData) {
    // @ts-ignore
    if (oldData[key] !== newData[key]) {
      return true
    }
  }
  return false
}

export const connect = (selector?: Function, mapDispatchToProps?: Function) => (Component: any) => {
  return (props: any) => {
    const {state, setState} = useContext(AppContext)

    const [, update] = useState({})

    const dispatch = (action: Action) => {
      if (store.reducer) {
        setState(store.reducer(state, action))
      }
    }

    const data = selector ? selector(state) : {state}

    const dispatcher = mapDispatchToProps ? mapDispatchToProps(dispatch) : {dispatch}

    useEffect(() => {
      return store.subscribe(() => {
        const newData = selector ? selector(store.state) : {state: store.state}
        if (changed(data, newData)) {
          console.log('update')
          update({})
        }
      })
    }, [selector])

    return <Component {...props} {...data} {...dispatcher}/>
  }
}

export const Provider:FC<{store: Store<AppState>}> = ({store, children}) => {
  return (
    <AppContext.Provider value={store}>
      {children}
    </AppContext.Provider>
  )
}
