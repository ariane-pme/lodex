import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'material-ui/Card';

const getStyles = style => ({
    marginTop: '0.5rem',
    ...style,
});

const CardComponent = ({ children, style, ...props }) => (
    <Card style={getStyles(style)} {...props}>
        {children}
    </Card>
);

CardComponent.propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
};

export default CardComponent;
