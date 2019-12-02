import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import Flashcards from './Flashcards'

configure({adapter: new Adapter()})

describe('Flashcards', () => {
    const flashcards = shallow(<Flashcards />)

    it('renders correctly', () => {
        expect(flashcards).toMatchSnapshot()
    })

    // TEST THAT STATE INITIALIZES FLASHCARD ARRAY FROM PROPS

    // TEST THAT COUNT OF FLASHCARD COMPONENTS RENDERED IS  EQUAL TO THE LENGTH OF STATE.FLASHCARDS
})