import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Table from '../Table'
import Item from './Item'

import { map } from 'lodash'

@inject('eosAccounts')
@inject('eosSmartContracts')
@inject('eosTokens')
@observer
export default class AccountsList extends Component {
  render() {
    const { accounts } = this.props.eosAccounts
    const { smart_contracts } = this.props.eosSmartContracts
    const { tokens } = this.props.eosTokens
    return (
      <div>
        <Table colNum={6}>
          {map(
            account => <Item key={account.name} account={account} />,
            accounts.toJSON()
          )}
        </Table>
        <style jsx>{`
          .container {
            display: grid;
          }
        `}</style>
      </div>
    )
  }
}
