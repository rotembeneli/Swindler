import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { EntrancePage } from './pages/EntrancePage'
import { App } from './pages/App'
import { CreateAccount } from './pages/CreateAccount'
import { userService } from './services/user.service'
import { matchService } from './services/match.service'

export const RootCmp = () => {

  userService.queryAll();
  matchService.queryMatchesCards();

  return (
    <div className="root-cmp">
      <Routes>
        <Route element={<EntrancePage />} path="/" />
        <Route element={<App />} path="/main-page/:id" />
        <Route element={<CreateAccount />} path="/new-member" />
      </Routes>
    </div>
  )
}