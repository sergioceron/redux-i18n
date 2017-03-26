import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import {describe, before, it} from 'mocha'
import expect from 'expect'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'

// TODO: Change src to dist!!!!
// TODO: Check imutable version!!!
import I18n from '../src/component'
import {i18nState} from '../src/reducer'
import {setLanguage} from '../src/actions'

import TransWithoutParams from './components/TransWithoutParams'

describe('translations in reducer', function() {
  before('rendering component', function() {
    this.store = createStore(
      combineReducers({i18nState}),
      applyMiddleware(thunk)
    )

    this.component = ReactDOM.findDOMNode(TestUtils.renderIntoDocument(
      <Provider store={this.store}>
        <I18n translations={{}} useReducer={true}>
          <TransWithoutParams/>
        </I18n>
      </Provider>
    ))

  })

  it('default component', function() {
    const state = this.store.getState()
    expect(state.i18nState.translations).toEqual({})
    this.store.dispatch(setLanguage('es'))
    expect(this.component.textContent).toEqual('Hello')
  })
})
