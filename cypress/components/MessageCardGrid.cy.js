import React from 'react'
import MessageCardGrid from './MessageCardGrid'

describe('<MessageCardGrid />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<MessageCardGrid />)
  })
})