import React, { Component } from 'react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';

import { withStyles } from '@material-ui/core/styles';

class CollapseCheckbox extends Component {
    state = {
        open: false,
        checked: [],
    };

    componentDidMount() {
        if (this.props.initState) {
            this.setState({
                open: this.props.initState,
            });
        }
    }

    handleClick() {
        this.setState({ open: !this.state.open });
    }

    handleAngle() {
        return this.state.open ? (
            <FontAwesomeIcon icon={faAngleUp} className="icon" />
        ) : (
            <FontAwesomeIcon icon={faAngleDown} className="icon" />
        );
    }

    renderList() {
        return this.props.list
            ? this.props.list.map((value) => (
                  <ListItem key={value._index} style={{ padding: '10px 0' }}>
                      <ListItemText
                          className="check-radio-label"
                          primary={value.name}
                      />
                      <ListItemSecondaryAction>
                          <CustomCheckbox
                              color="primary"
                              onChange={this.handleToggle(value._id)}
                              checked={
                                  this.state.checked.indexOf(value._id) !== -1
                              }
                          />
                      </ListItemSecondaryAction>
                  </ListItem>
              ))
            : null;
    }

    handleToggle = (value) => () => {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({ checked: newChecked }, () => {
            this.props.handleFilters(newChecked);
        });
    };

    render() {
        return (
            <div className="collapse-items">
                <List>
                    <ListItem
                        onClick={() => this.handleClick()}
                        style={{
                            padding: '1.5rem 2.5rem 1rem 0',
                            marginBottom: '1rem',
                            borderBottom: '1px solid #eaeaea',
                        }}
                    >
                        <ListItemText
                            primary={this.props.title}
                            className="collapse-title"
                        />
                        {this.handleAngle()}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {this.renderList()}
                        </List>
                    </Collapse>
                </List>
            </div>
        );
    }
}

const checkBoxStyles = (theme) => ({
    root: {
        '&$checked': {
            color: '#ffd32c',
        },
    },
    checked: {},
});

const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);

export default CollapseCheckbox;
