import fetch from 'node-fetch'

export const push = (store: string) => {
  return {
    token: (token: string) => {
      return false
    },
    message: (title: string, message: string, payload: object) => {
      return false
    }
  }
}

// helper fns
// --------
