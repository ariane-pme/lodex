import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import translate from 'redux-polyglot/translate';
import Checkbox from 'material-ui/Checkbox';

import { polyglot as polyglotPropTypes } from '../../../propTypes';

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '200%',
        justifyContent: 'space-between',
    },
    input: {
        marginLeft: '1rem',
        width: '40%',
    },
    input2: {
        width: '100%',
    },
};

class ChartEdition extends Component {
    static propTypes = {
        params: PropTypes.shape({
            maxSize: PropTypes.number,
            maxValue: PropTypes.number,
            minValue: PropTypes.number,
            orderBy: PropTypes.string,
        }),
        colors: PropTypes.string,
        axisRoundValue: PropTypes.bool,
        rightMargin: PropTypes.number,
        scale: PropTypes.oneOf(['log', 'linear']),
        direction: PropTypes.oneOf(['horizontal', 'vertical']),
        onChange: PropTypes.func.isRequired,
        p: polyglotPropTypes.isRequired,
    };

    static defaultProps = {
        params: {
            maxSize: 5,
            orderBy: 'value/asc',
        },
        colors: '#1D1A31 #4D2D52 #9A4C95 #F08CAE #C1A5A9',
        axisRoundValue: true,
        direction: 'horizontal',
        scale: 'linear',
        rightMargin: 120,
    };
    constructor(props) {
        super(props);
        const {
            params,
            colors,
            axisRoundValue,
            scale,
            direction,
            rightMargin,
        } = this.props;
        this.state = {
            params,
            colors,
            axisRoundValue,
            scale,
            direction,
            rightMargin,
        };
    }

    setMaxSize = (_, maxSize) => {
        const { params, ...state } = this.state;
        const newState = { ...state, params: { ...params, maxSize } };
        this.setState(newState);
        this.props.onChange(newState);
    };

    setMaxValue = (_, maxValue) => {
        const { params, ...state } = this.state;
        const newState = { ...state, params: { ...params, maxValue } };
        this.setState(newState);
        this.props.onChange(newState);
    };

    setMinValue = (_, minValue) => {
        const { params, ...state } = this.state;
        const newState = { ...state, params: { ...params, minValue } };
        this.setState(newState);
        this.props.onChange(newState);
    };

    setOrderBy = (_, __, orderBy) => {
        const { params, ...state } = this.state;
        const newState = { ...state, params: { ...params, orderBy } };
        this.setState(newState);
        this.props.onChange(newState);
    };

    setColors = (_, colors) => {
        const newState = { ...this.state, colors };
        this.setState(newState);
        this.props.onChange(newState);
    };

    setAxisRoundValue = () => {
        const { axisRoundValue, ...state } = this.state;
        const newState = { ...state, axisRoundValue: !axisRoundValue };
        this.setState(newState);
        this.props.onChange(newState);
    };

    setScale = (_, __, scale) => {
        const newState = { ...this.state, scale };
        this.setState(newState);
        this.props.onChange(newState);
    };

    setDirection = (_, __, direction) => {
        const newState = { ...this.state, direction };
        this.setState(newState);
        this.props.onChange(newState);
    };

    setRightMargin = (_, rightMargin) => {
        const newState = { ...this.state, rightMargin };
        this.setState(newState);
        this.props.onChange(newState);
    };

    render() {
        const { p: polyglot } = this.props;
        const {
            params: { maxSize, maxValue, minValue, orderBy },
            colors,
            axisRoundValue,
            scale,
            direction,
            rightMargin,
        } = this.state;
        return (
            <div style={styles.container}>
                <TextField
                    floatingLabelText={polyglot.t('max_fields')}
                    onChange={this.setMaxSize}
                    style={styles.input}
                    value={maxSize}
                />
                <TextField
                    floatingLabelText={polyglot.t('max_value')}
                    onChange={this.setMaxValue}
                    style={styles.input}
                    value={maxValue}
                />
                <TextField
                    floatingLabelText={polyglot.t('min_value')}
                    onChange={this.setMinValue}
                    style={styles.input}
                    value={minValue}
                />
                <SelectField
                    floatingLabelText={polyglot.t('order_by')}
                    onChange={this.setOrderBy}
                    style={styles.input}
                    value={orderBy}
                >
                    <MenuItem
                        value="label/asc"
                        primaryText={polyglot.t('label_asc')}
                    />
                    <MenuItem
                        value="label/desc"
                        primaryText={polyglot.t('label_desc')}
                    />
                    <MenuItem
                        value="value/asc"
                        primaryText={polyglot.t('value_asc')}
                    />
                    <MenuItem
                        value="value/desc"
                        primaryText={polyglot.t('value_desc')}
                    />
                </SelectField>
                <TextField
                    floatingLabelText={polyglot.t('colors_set')}
                    onChange={this.setColors}
                    style={styles.input2}
                    value={colors}
                />
                <Checkbox
                    label={polyglot.t('axis_round_value')}
                    onCheck={this.setAxisRoundValue}
                    style={styles.input}
                    checked={axisRoundValue}
                />
                <SelectField
                    floatingLabelText={polyglot.t('scale')}
                    onChange={this.setScale}
                    style={styles.input}
                    value={scale}
                >
                    <MenuItem
                        value="linear"
                        primaryText={polyglot.t('linear')}
                    />
                    <MenuItem value="log" primaryText={polyglot.t('log')} />
                </SelectField>
                <SelectField
                    floatingLabelText={polyglot.t('direction')}
                    onChange={this.setDirection}
                    style={styles.input}
                    value={direction}
                >
                    <MenuItem
                        value="horizontal"
                        primaryText={polyglot.t('horizontal')}
                    />
                    <MenuItem
                        value="vertical"
                        primaryText={polyglot.t('vertical')}
                    />
                </SelectField>
                <TextField
                    type="number"
                    floatingLabelText={polyglot.t('right_margin')}
                    onChange={this.setRightMargin}
                    style={styles.input2}
                    value={rightMargin}
                />
            </div>
        );
    }
}

export default translate(ChartEdition);