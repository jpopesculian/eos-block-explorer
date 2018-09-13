import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Row, Field } from '../Table'

import { map, isEmpty } from 'lodash'

@inject('eosSmartContracts')
@inject('eosTokens')
@observer
export default class AccountsItem extends Component {
  render() {
    const { account, eosSmartContracts, eosTokens } = this.props
    return (
      <Row>
        <Field label="Name">{account.name}</Field>
        <Field label="Has Code">
          {isEmpty(eosSmartContracts.smart_contracts.get(account.name))
            ? 'No'
            : 'Yes'}
        </Field>
        <Field label="Created">
          {account.created.toFormat('ff')}
        </Field>
        <Field label="Updated">
          {account.updated.toFormat('ff')}
        </Field>
        <Field label="RAM Usage">
          {account.ramUsage}
        </Field>
        <Field label="Balance">
          {map(token => {
            const balance = token.balances.get(account.name)
            if (isEmpty(balance)) {
              return null
            }
            return (
              <div key={token.symbol}>
                {balance.amount} {balance.symbol}
              </div>
            )
          }, eosTokens.tokens.toJSON())}
        </Field>
      </Row>
    )
  }
}
