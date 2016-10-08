// @flow
import styles from 'styles/containers/Index';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';

type Props = {
};

// eslint-disable-next-line
class Index extends Component {
  props: Props;

  render() {
    return (
      <div>
        Oh hai!
      </div>
    );
  }
}

const select = () => ({
});

const mapActions = () => ({
});

export default connect(
  select,
  mapActions
)(CSSModules(Index, styles));
