import React, {Component} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

export class Messagebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true
        };
    }

    render() {
        return(
            <Snackbar open={this.state.show} autoHideDuration={5000}
                      onClose={() => {this.setState({show: false})}}>
                <Alert size={40} severity={this.props.type} action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            this.setState({show: false})
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }>
                    {this.props.message}
                </Alert>
            </Snackbar>
        );
    }
}