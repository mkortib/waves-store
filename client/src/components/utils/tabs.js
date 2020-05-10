import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
    return (
        <Typography
            component="div"
            style={{ padding: 8 * 3, color: '#999', fontSize: '16px' }}
        >
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = (theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    tabsRoot: {
        borderBottom: '1px solid #e8e8e8',
        backgroundColor: '#ffa61a',
        color: '#000',
    },
    tabSelected: {
        color: '#fff',
    },
    tabRoot: {},
    tabLabel: {
        fontSize: '14px',
        fontWeight: '700',
        fontFamily: 'Poppins',
        textTransform: 'normal',
    },
    tabsIndicator: {
        backgroundColor: '#fff',
        borderWidth: '5px',
    },
});

class SimpleTabs extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes, specs } = this.props;
        const { value } = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        classes={{
                            root: classes.tabsRoot,
                            indicator: classes.tabsIndicator,
                        }}
                        centered
                    >
                        <Tab
                            classes={{
                                root: classes.tabRoot,
                                selected: classes.tabSelected,
                            }}
                            label={
                                <span className={classes.tabLabel}>Wood</span>
                            }
                        />
                        <Tab
                            classes={{
                                root: classes.tabRoot,
                                selected: classes.tabSelected,
                            }}
                            label={
                                <span className={classes.tabLabel}>Frets</span>
                            }
                        />
                        <Tab
                            classes={{
                                root: classes.tabRoot,
                                selected: classes.tabSelected,
                            }}
                            label={
                                <span className={classes.tabLabel}>
                                    Description
                                </span>
                            }
                        />
                    </Tabs>
                </AppBar>
                {value === 0 && <TabContainer>{specs.wood.name}</TabContainer>}
                {value === 1 && <TabContainer>{specs.frets}</TabContainer>}
                {value === 2 && (
                    <TabContainer>{specs.description}</TabContainer>
                )}
            </div>
        );
    }
}

SimpleTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);
