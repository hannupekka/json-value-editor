// @flow
import styles from 'styles/containers/Application';
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

type Props = {
  children: ElementType | Array<ElementType>
}

// eslint-disable-next-line react/prefer-stateless-function
class Application extends Component {
  props: Props;
  render(): ElementType {
    const { children } = this.props;

    return (
      <div>
        <section styleName="content">
          {children}
        </section>
      </div>
    );
  }
}

export default CSSModules(Application, styles);
