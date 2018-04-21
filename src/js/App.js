'use strict';

'use strict';

import { Component } from 'react';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'TESTE APP'
    };
  }

  render() {
    return (
      <div className="app">
        {this.state.message}
      </div>
    );
  }
}
