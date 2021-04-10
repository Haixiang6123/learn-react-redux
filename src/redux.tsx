import React, {createContext, FC, useContext, useEffect, useState} from 'react'

let state: AppState | undefined = undefined
let reducer: Function | undefined
let listeners: Function[] = []
const setState = (newState: any) => {
  state = newState
  listeners.map((fn: Function) => fn(state))
}

const store: Store<AppState> = {
  getState() {
    return state
  },
  dispatch: (action: Action) => {
    if (reducer) {
      setState(reducer(state, action))
    }
  },
  subscribe(fn: Function) {
    listeners.push(fn)
    return () => {
      const index = listeners.indexOf(fn)
      listeners.splice(index, 1)
    }
  }
}

let dispatch = store.dispatch

const prevDispatch = dispatch

dispatch = (action: Function | Object) => {
  if (typeof action === 'function') {
    action(dispatch)
  } else {
    prevDispatch(action)
  }
}

export function createStore<State>(_reducer: Function, initState: State) {
  // @ts-ignore
  state = initState
  reducer = _reducer
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
    const [, update] = useState({})

    const data = selector ? selector(state) : {state}

    const dispatcher = mapDispatchToProps ? mapDispatchToProps(dispatch) : {dispatch}

    useEffect(() => {
      return store.subscribe(() => {
        const newData = selector ? selector(state) : {state}
        if (changed(data, newData)) {
          console.log('update')
          update({})
        }
      })
    }, [selector])

    return <Component {...props} {...data} {...dispatcher} dispatch={dispatch}/>
  }
}

export const Provider:FC<{store: Store<AppState>}> = ({store, children}) => {
  return (
    <AppContext.Provider value={store}>
      {children}
    </AppContext.Provider>
  )
}
