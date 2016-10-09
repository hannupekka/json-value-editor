// @flow
import styles from 'styles/containers/Index';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CSSModules from 'react-css-modules';
import map from 'lodash/map';
import flatten from 'flat';
import Error from 'components/Error';
import * as dataActions from 'redux/modules/data';

type Props = {
  json: Object,
  error: bool,
  onImport: (json: Object) => ActionType,
  onError: () => ActionType,
  onUpdateValue: (id: string, value: string) => ActionType
};

// eslint-disable-next-line
class Index extends Component {
  props: Props;

  renderError = (): ?ElementType => {
    const { error } = this.props;

    if (!error) {
      return null;
    }

    return <Error message="Importing file failed." />;
  }

  renderFields = (): ?ElementType => {
    const { json } = this.props;

    if (json.count() === 0) {
      return null;
    }

    return (
      <form styleName="fields">
        {map(flatten(json.toJS()), (value, key) => {
          return (
            <input
              type="text"
              id={key}
              key={key}
              value={value}
              styleName={value.length > 0 ? 'field' : 'field--empty'}
              onChange={(this:any).onChange}
            />
          );
        })}
      </form>
    );
  }

  renderDownloadButton = (): ?ElementType => {
    const { json } = this.props;

    if (json.count() === 0) {
      return null;
    }

    return (
      <button onClick={(this:any).onDownload} styleName="button">Download</button>
    );
  }

  onChange = (event: Object): void => {
    const { id, value } = event.target;
    const { onUpdateValue } = this.props;
    onUpdateValue(id.split('.'), value);
  }

  onDrop = (files: Array<Object>): ActionType | void => {
    const { onError, onImport } = this.props;

    if (files.length === 0) {
      return onError();
    }

    const file = files[0];
    const reader = new FileReader();
    reader.addEventListener('loadend', () => {
      try {
        const json = JSON.parse(reader.result);
        onImport(json);
      } catch (error) {
        onError();
      }
    });

    return reader.readAsText(file);
  }

  onDownload = (): void => {
  }

  render(): ElementType {
    return (
      <div>
        <Dropzone
          onDrop={(this:any).onDrop}
          styleName="button"
          multiple={false}
          accept="application/json"
        >
          <div>Try dropping some files here, or click to select file to upload.</div>
        </Dropzone>
        {this.renderError()}
        <ReactCSSTransitionGroup
          transitionEnterTimeout={150}
          transitionLeaveTimeout={150}
          transitionName={{
            enter: styles.enter,
            enterActive: styles['enter--active'],
            leave: styles.leave,
            leaveActive: styles['leave--active'],
          }}
        >
          {this.renderFields()}
        </ReactCSSTransitionGroup>
        {this.renderDownloadButton()}
      </div>
    );
  }
}

const select = (state: StateType): StateType => ({
  json: state.data.get('json'),
  error: state.data.get('error')
});

const mapActions = (dispatch: Function): Object => ({
  onImport: (json: Object): ActionType => dispatch(dataActions.importJSON(json)),
  onError: (): ActionType => dispatch(dataActions.importJSONFailure()),
  onUpdateValue: (id: string, value: string): ActionType =>
    dispatch(dataActions.updateValue(id, value))
});

export default connect(
  select,
  mapActions
)(CSSModules(Index, styles));
