import React from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';
import {
    ResponsiveContainer,
    RadarChart,
    Radar,
    PolarAngleAxis,
    PolarRadiusAxis,
    PolarGrid,
} from 'recharts';
import get from 'lodash.get';

import {
    field as fieldPropTypes,
    polyglot as polyglotPropTypes,
} from '../../../propTypes';

const RadarChartView = ({ chartData, colorSet, field, p: polyglot }) => {
    const color = colorSet[0];
    const axisRoundValue = get(field, 'format.args.axisRoundValue');
    const scale = get(field, 'format.args.scale');
    if (!chartData) {
        return <p>{polyglot.t('no_data')}</p>;
    }
    const max = Math.max(...chartData.map(({ value }) => value));
    return (
        <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={chartData}>
                <Radar
                    dataKey="value"
                    stroke={color}
                    fill={color}
                    fillOpacity={0.6}
                />
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis
                    scale={scale}
                    domain={scale === 'log' ? ['auto', 'auto'] : [0, 'auto']} // log scale won't work with a domain starting at 0 (`auto` detect the boudaries and ensure it is readable)
                    tickCount={axisRoundValue ? (max < 5 ? max + 1 : 5) : null}
                />
            </RadarChart>
        </ResponsiveContainer>
    );
};

RadarChartView.propTypes = {
    field: fieldPropTypes.isRequired,
    linkedResource: PropTypes.object,
    resource: PropTypes.object.isRequired,
    chartData: PropTypes.array.isRequired,
    colorSet: PropTypes.arrayOf(PropTypes.string),
    p: polyglotPropTypes,
};

RadarChartView.defaultProps = {
    className: null,
};

export default translate(RadarChartView);