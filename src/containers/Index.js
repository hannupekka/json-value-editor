// @flow
import styles from 'styles/containers/Index';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
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
      <form>
        {map(flatten(json.toJS()), (value, key) => {
          return (
            <input
              type="text"
              id={key}
              key={key}
              value={value}
              onChange={(this:any).onChange}
            />
          );
        })}
      </form>
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
      const json = JSON.parse(reader.result);
      onImport(json);
    });

    return reader.readAsText(file);
  }

  render(): ElementType {
    return (
      <div>
        <Dropzone onDrop={(this:any).onDrop} multiple={false} accept="application/json">
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
        {this.renderFields()}
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
