import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import Flashcard from './Flashcard'

configure({adapter: new Adapter()})

describe('Flashcard', () => {
    const flashcard = shallow(<Flashcard />)

    it('renders correctly', () => {
        expect(flashcard).toMatchSnapshot()
    })

    it('initializes `state` with reveal set to false', () => {
        expect(flashcard.state().reveal).toEqual(false)
    })
})