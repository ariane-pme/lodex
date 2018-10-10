import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import translate from 'redux-polyglot/translate';
import classnames from 'classnames';
import { StyleSheet, css } from 'aphrodite/no-important';
import debounce from 'lodash.debounce';

import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';

import {
    polyglot as polyglotPropTypes,
    field as fieldProptypes,
    resource as resourcePropTypes,
} from '../../propTypes';
import { preLoadPublication as preLoadPublicationAction } from '../../fields';
import { search as searchAction, fromSearch } from './';
import { fromFields } from '../../sharedSelectors';
import SearchResult from './SearchResult';

const styles = StyleSheet.create({
    container: {
        width: 500,
        margin: '0 auto',
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
    },
    searchBarContainer: {
        width: '100%',
    },
    advancedSearchToggle: {
        alignSelf: 'flex-end',
    },
    searchResults: {
        margin: '1.5rem 0',
    },
    loading: {
        marginRight: '1rem',
        marginTop: '-0.2rem',
    },
});

const cnames = (name, ...classes) => classnames(name, ...classes.map(css));

class Search extends Component {
    state = {
        query: null,
    };

    componentWillMount() {
        this.props.preLoadPublication();
        this.props.search();
    }

    debouncedSearch = debounce(params => {
        this.props.search(params);
    }, 500);

    handleTextFieldChange = (_, query) => {
        this.debouncedSearch({ query });
        this.setState({ query });
    };

    render() {
        const { query } = this.state;
        const {
            loading,
            fields,
            fieldNames,
            results,
            p: polyglot,
        } = this.props;

        return (
            <div className={cnames('search', styles.container)}>
                <div className={cnames('search-header', styles.header)}>
                    <h2 className={css(styles.title)}>Revues</h2>
                    <div
                        className={cnames(
                            'search-bar',
                            styles.searchBarContainer,
                        )}
                    >
                        <TextField
                            hintText="🔍 search"
                            fullWidth
                            onChange={this.handleTextFieldChange}
                            value={query || ''}
                        />
                    </div>
                    <div
                        className={cnames(
                            'search-advanced-toggle',
                            styles.advancedSearchToggle,
                        )}
                    >
                        <a href="#">Recherche avancée</a>
                    </div>
                </div>
                <div className={cnames('search-results', styles.searchResults)}>
                    {loading && (
                        <div>
                            <CircularProgress
                                size={20}
                                className={css(styles.loading)}
                            />{' '}
                            {polyglot.t('loading')}
                        </div>
                    )}
                    {!loading &&
                        results.map(result => (
                            <SearchResult
                                key={result.uri}
                                fields={fields}
                                fieldNames={fieldNames}
                                result={result}
                            />
                        ))}
                    {!loading &&
                        results.length === 0 && (
                            <p>{polyglot.t('no_result')}</p>
                        )}
                </div>
            </div>
        );
    }
}

Search.propTypes = {
    search: PropTypes.func.isRequired,
    preLoadPublication: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    p: polyglotPropTypes.isRequired,
    results: PropTypes.arrayOf(resourcePropTypes).isRequired,
    fieldNames: PropTypes.shape({
        uri: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
    }).isRequired,
    fields: PropTypes.arrayOf(fieldProptypes).isRequired,
};

const mapStateToProps = state => ({
    loading: fromSearch.isLoading(state),
    results: fromSearch.getDataset(state),
    fieldNames: fromSearch.getFieldNames(state),
    fields: fromFields.getFields(state),
});

const mapDispatchToProps = {
    search: searchAction,
    preLoadPublication: preLoadPublicationAction,
};

export default compose(translate, connect(mapStateToProps, mapDispatchToProps))(
    Search,
);
