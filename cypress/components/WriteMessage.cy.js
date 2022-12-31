import React from 'react'
import WriteMessage from '../../components/WriteMessage'

describe('<WriteMessage />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<WriteMessage />)
    })
})
