import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import { map } from 'lodash'

@inject('eosAccounts')
@observer
export default class AccountsList extends Component {
  render() {
    return (
      <div>
        {map(account => account.name, this.props.eosAccounts.accounts)}
      </div>
    )
  }
}
