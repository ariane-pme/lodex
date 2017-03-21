import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import translate from 'redux-polyglot/translate';
import memoize from 'lodash.memoize';

import { field as fieldPropTypes, polyglot as polyglotPropTypes } from '../propTypes';
import { fromPublication } from './selectors';
import { languages } from '../../../../config.json';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '3rem',
    },
    field: memoize(hasBorder => ({
        borderBottom: hasBorder ? '1px solid rgb(224, 224, 224)' : 'none',
        paddingBottom: '1rem',
        paddingTop: '1rem',
    })),
    name: {
        marginTop: '1rem',
        marginBottom: '1rem',
        fontStyle: 'italic',
    },
    property: {
        display: 'flex',
        marginLeft: '3rem',
        marginBottom: '0.5rem',
    },
    label: {
        marginRight: '1rem',
        minWidth: '10rem',
        textAlign: 'right',
    },
};

export const OntologyComponent = ({ fields, p: polyglot }) => (
    <div className="ontology" style={styles.container}>
        {fields.map((field, index) => (
            <div key={field.name} style={styles.field(index < fields.length - 1)}>
                <h4
                    className={classnames('field-label', field.label.toLowerCase().replace(/\s/g, '_'))}
                    style={styles.name}
                >
                    {field.label}
                </h4>
                {field.scheme &&
                    <dl style={styles.property}>
                        <dt style={styles.label}>{polyglot.t('scheme')}</dt>
                        <dd
                            className={classnames('field-scheme', field.label.toLowerCase().replace(/\s/g, '_'))}
                        >
                            {field.scheme}
                        </dd>
                    </dl>
                }
                <dl style={styles.property}>
                    <dt style={styles.label}>{polyglot.t('cover')}</dt>
                    <dd
                        className={classnames('field-cover', field.label.toLowerCase().replace(/\s/g, '_'))}
                    >
                        {polyglot.t(`cover_${field.cover}`)}
                    </dd>
                </dl>
                {field.language &&
                    <dl style={styles.property}>
                        <dt style={styles.label}>{polyglot.t('language')}</dt>
                        <dd
                            className={classnames('field-language', field.label.toLowerCase().replace(/\s/g, '_'))}
                        >
                            {languages.find(l => l.code === field.language).label}
                        </dd>
                    </dl>
                }
            </div>
        ))}
    </div>
);

OntologyComponent.propTypes = {
    fields: PropTypes.arrayOf(fieldPropTypes).isRequired,
    p: polyglotPropTypes.isRequired,
};

const mapStateToProps = state => ({
    fields: fromPublication.getFields(state),
});

export default compose(
    connect(mapStateToProps),
    translate,
)(OntologyComponent);