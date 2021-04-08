import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {AuthPage} from './pages/AuthPage'
import {SearchPage} from './pages/SearchPage'
import {FavouritesPage} from './pages/FavouritesPage'


export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/search" exact>
            <SearchPage />
        </Route>
        <Route path="/currentSearch/:id" exact>
            <SearchPage />
        </Route>
        <Route path="/favourites">
            <FavouritesPage />
        </Route>
        <Route path="/favourites/:id">
            <FavouritesPage />
        </Route>
        <Redirect to="/search" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}
