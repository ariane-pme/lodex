import React, { PropTypes } from 'react';
import RadioButton from 'material-ui/RadioButton';
import translate from 'redux-polyglot/translate';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { FIELD_FORM_NAME } from '../';

import { polyglot as polyglotPropTypes } from '../../propTypes';

const styles = {
    inset: {
        paddingLeft: 40,
    },
    radio: {
        marginTop: 12,
    },
};

export const StepUriAutogenerateComponent = ({
    handleSelect,
    p: polyglot,
    selected,
}) => (
    <div>
        <RadioButton
            className="radio_generate"
            label={polyglot.t('an_autogenerated_uri')}
            value="generate"
            onClick={handleSelect}
            checked={selected}
            style={styles.radio}
        />
    </div>
);

StepUriAutogenerateComponent.propTypes = {
    handleSelect: PropTypes.func.isRequired,
    p: polyglotPropTypes.isRequired,
    selected: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    const transformers = formValueSelector(FIELD_FORM_NAME)(state, 'transformers');

    const valueTransformer =
        transformers && transformers[0] && transformers[0].operation === 'AUTOGENERATE_URI'
            ? transformers[0]
            : null;

    if (valueTransformer) {
        return {
            selected: true,
        };
    }

    return { selected: false };
};

export default compose(
    connect(mapStateToProps),
    withHandlers({
        handleSelect: ({ onChange }) => () => {
            onChange({
                operation: 'AUTOGENERATE_URI',
                args: [],
            });
        },
    }),
    translate,
)(StepUriAutogenerateComponent);
