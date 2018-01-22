import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import { CardActions } from 'material-ui/Card';

import convertHtmlToPng from '../lib/convertHtmlToPng';

const styles = {
    message: {
        margin: 20,
    },
};

export default FormatView => {
    class ExportableComponent extends Component {
        constructor(props) {
            super(props);
            this.state = { error: null };
        }

        exportElement = () => {
            this.setState({ error: null });
            convertHtmlToPng(this.element)
                .then(uri => {
                    const link = document.createElement('a');
                    link.download = this.props.field.label;
                    link.href = uri;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                })
                .catch(error => {
                    this.setState({
                        error:
                            'We encountered an error while trying to export this chart.',
                    });
                    console.error(error.message);
                });
        };

        render() {
            const { error } = this.state;
            return (
                <div>
                    <div
                        ref={element => {
                            this.element = element;
                        }}
                    >
                        <FormatView {...this.props} />
                    </div>
                    <CardActions style={styles.actions}>
                        {error && <p style={styles.error}>{error}</p>}
                        <FlatButton
                            primary
                            style={styles.button}
                            onClick={this.exportElement}
                        >
                            SAVE AS PNG
                        </FlatButton>
                    </CardActions>
                </div>
            );
        }
    }

    ExportableComponent.WrappedComponent = FormatView;

    ExportableComponent.propTypes = {
        children: PropTypes.element.isRequired,
        label: PropTypes.any.isRequired,
        field: PropTypes.shape({ label: PropTypes.string }),
    };

    return ExportableComponent;
};
