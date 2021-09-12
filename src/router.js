import React from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import Home from '@/pages/home'
import Text from '@/pages/text'
import LeetCode from '@/pages/leetcode'
import '@/assets/style/common.scss'

const App = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/text/:id' component={Text} />
        <Route path='/leetcode/:id' component={LeetCode} />
        <Redirect to='/' />
      </Switch>
    </HashRouter>
  )
}

export default App
