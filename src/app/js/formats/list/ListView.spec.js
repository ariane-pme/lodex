import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import Component, { UL, OL } from './ListView';
import Title from '../title/TitleView';

describe('list format view Component', () => {
    it('should render list of value', () => {
        const props = {
            className: 'class',
            field: {
                name: 'name',
            },
            subFormat: null,
            subFormatOptions: {},
            resource: {
                name: ['value1', 'value2', 'value3'],
            },
        };
        const component = shallow(<Component {...props} />);
        const li = component.find('li');
        expect(li.length).toBe(3);
        expect(li.map(l => l.text())).toEqual(['value1', 'value2', 'value3']);
    });

    it('should render list of subFormat if subformat is provided', () => {
        const props = {
            className: 'class',
            field: {
                name: 'name',
            },
            subFormat: 'title',
            subFormatOptions: {
                level: 2,
            },
            resource: {
                name: ['value1', 'value2', 'value3'],
            },
        };
        const component = shallow(<Component {...props} />);
        const title = component.find(Title);
        expect(title.length).toBe(3);
        title.forEach((t, index) => {
            expect(t.props().resource).toEqual(['value1', 'value2', 'value3']);
            expect(t.props().field.name).toBe(index.toString());
            expect(t.props().field.format.args).toEqual({ level: 2 });
        });
    });

    it('should wrap list in UL if no format type provided', () => {
        const props = {
            className: 'class',
            field: {
                name: 'name',
            },
            subFormat: null,
            subFormatOptions: {},
            resource: {
                name: ['value1', 'value2', 'value3'],
            },
        };
        const component = shallow(<Component {...props} />);
        const ul = component.find(UL);
        expect(ul.length).toBe(1);
        const ol = component.find(OL);
        expect(ol.length).toBe(0);
    });

    it('should wrap list in OL if format type is ordered', () => {
        const props = {
            className: 'class',
            field: {
                name: 'name',
            },
            type: 'ordered',
            subFormat: null,
            subFormatOptions: {},
            resource: {
                name: ['value1', 'value2', 'value3'],
            },
        };
        const component = shallow(<Component {...props} />);
        const ul = component.find(UL);
        expect(ul.length).toBe(0);
        const ol = component.find(OL);
        expect(ol.length).toBe(1);
    });
});