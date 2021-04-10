import React, {createContext, useContext, useEffect, useState} from 'react'

export const store: Store<{user: User, group: Group}> = {
  state: {
    user: {name: 'Jack', age: 18},
    group: {name: '前端组'},
  },
  setState(newState: any) {
    store.state = newState
    store.listeners.map(fn => fn(store.state))
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

export const AppContext = createContext<ContextValue>(store)

export const reducer = (state: AppState, {type, payload}: Action<Partial<User>>) => {
  if (type === 'updateUser') {
    return {
      ...state,
      user: {
        ...state.user,
        ...payload,
      }
    }
  } else {
    return state
  }
}

const changed = (oldData: Object, newData: Object) => {
  for (let key in oldData) {
    // @ts-ignore
    if (oldData[key] !== newData[key]) {
      return true
    }
  }
  return false
}

export const connect = (selector?: Function) => (Component: any) => {
  return (props: any) => {
    const {state, setState} = useContext(AppContext)

    const [, update] = useState({})

    const data = selector ? selector(state) : {state}

    useEffect(() => {
      return store.subscribe(() => {
        const newData = selector ? selector(store.state) : {state: store.state}
        if (changed(data, newData)) {
          console.log('update')
          update({})
        }
      })
    }, [selector])

    const dispatch = (action: Action) => {
      setState(reducer(state, action))
    }

    return <Component {...props} {...data} dispatch={dispatch}/>
  }
}
