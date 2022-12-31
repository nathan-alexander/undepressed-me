import React from 'react'
import MessageCard from './MessageCard'

describe('<MessageCard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<MessageCard />)
  })
})