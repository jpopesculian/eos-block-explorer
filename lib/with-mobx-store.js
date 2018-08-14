import React from 'react'
import { getOrCreateStore } from '../store'

const isServer = typeof window === 'undefined'

export default App => {
  return class AppWithMobx extends React.Component {
    static async getInitialProps(appContext) {
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      const mobxStore = getOrCreateStore(isServer)

      // Provide the store to getInitialProps of pages
      appContext.ctx.mobxStore = mobxStore

      let appProps = {}
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps.call(App, appContext)
      }

      return {
        ...appProps,
        initialMobxState: mobxStore
      }
    }

    constructor(props) {
      super(props)
      this.mobxStore = getOrCreateStore(isServer, props.initialMobxState)
    }

    render() {
      return <App {...this.props} mobxStore={this.mobxStore} />
    }
  }
}
