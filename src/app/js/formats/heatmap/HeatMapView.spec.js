import React from 'react';
import { shallow } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';

import { HeatMapView } from './HeatMapView';

describe('HeatMapView', () => {
    beforeEach(() => StyleSheetTestUtils.suppressStyleInjection());
    it('should render Heat Map chart', () => {
        const xAxis = ['one', 'two', 'three'];
        const yAxis = ['A', 'B', 'C'];
        const dictionary = {
            one: {
                A: 1,
                B: 2,
                C: 3,
            },
            two: {
                A: 10,
                B: 20,
                C: 30,
            },
            three: {
                A: 100,
                B: 200,
                C: 300,
            },
        };

        const wrapper = shallow(
            <HeatMapView
                xAxis={xAxis}
                yAxis={yAxis}
                dictionary={dictionary}
                colorScale={() => 'color'}
                legend="legend"
            />,
        );

        const tds = wrapper.find('td');
        expect(tds).toHaveLength(12);

        expect(tds.map(b => b.prop('data-tip'))).toEqual([
            undefined,
            'one,A,1',
            'one,B,2',
            'one,C,3',
            undefined,
            'two,A,10',
            'two,B,20',
            'two,C,30',
            undefined,
            'three,A,100',
            'three,B,200',
            'three,C,300',
        ]);

        expect(tds.map(b => b.text())).toEqual([
            'one',
            '',
            '',
            '',
            'two',
            '',
            '',
            '',
            'three',
            '',
            '',
            '',
        ]);
    });
    afterEach(() => StyleSheetTestUtils.clearBufferAndResumeStyleInjection());
});
