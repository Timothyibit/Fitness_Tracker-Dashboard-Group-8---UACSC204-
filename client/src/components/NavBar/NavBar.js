import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import './index.css';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1,
    // Default font size for larger screens (e.g., >= 600px)
    fontSize: '1.5rem', // You can adjust this default size
    // Media query for screens smaller than 600px
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem', // Smaller font size for screens below 600px
    },
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  list: {
    width: 250
  },
  // --- NEW STYLE ADDED HERE FOR RESPONSIVE BUTTON GROUP ---
  actionButtons: {
    display: 'flex', // Use flexbox for these buttons
    alignItems: 'center', // Vertically align buttons in the center
    [theme.breakpoints.down('sm')]: { // Apply these styles for screens smaller than 600px
      flexDirection: 'column', // Stack buttons vertically
      alignItems: 'flex-end', // Align buttons to the right when stacked
      // Optional: Add some spacing between stacked buttons
      '& > button': {
        // Corrected for Material-UI v3: theme.spacing.unit is a number
        marginBottom: theme.spacing.unit * 1, // Add bottom margin to each button
      },
      '& > button:last-child': {
        marginBottom: 0, // No margin for the last button in the stack
      },
    },
  },
  // --- END NEW STYLE ---
});

class Navbar extends React.Component {
  state = {
    left: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  logout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userId');
    window.location.reload();
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <div component="nav">
          <a style={{ textDecoration: 'none', color: 'white' }} href="/">
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </a>
          <Divider />
          <a style={{ textDecoration: 'none', color: 'white' }} href="/water">
            <ListItem button>
              <ListItemText primary="Water" />
            </ListItem>
          </a>
          <a
            style={{ textDecoration: 'none', color: 'white' }}
            href="/nutrition"
          >
            <ListItem button>
              <ListItemText primary="Nutrition" />
            </ListItem>
          </a>
          <a
            style={{ textDecoration: 'none', color: 'white' }}
            href="/exercise"
          >
            <ListItem button>
              <ListItemText primary="Exercise" />
            </ListItem>
          </a>
          <a style={{ textDecoration: 'none', color: 'white' }} href="/weight">
            <ListItem button>
              <ListItemText primary="Weight" />
            </ListItem>
          </a>
          <a style={{ textDecoration: 'none', color: 'white' }} href="/info">
            <ListItem button>
              <ListItemText primary="More Info" />
            </ListItem>
          </a>
        </div>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              onClick={this.toggleDrawer('left', true)}
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              open={this.state.left}
              onClose={this.toggleDrawer('left', false)}
            >
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer('left', false)}
                onKeyDown={this.toggleDrawer('left', false)}
              >
                {sideList}
              </div>
            </Drawer>

            <Typography
              color="inherit"
              className={classes.flex}
            >
              <a style={{ textDecoration: 'none', color: 'white' }} href="/">
                Fitness Tracker <br /> (Group 8 - UA-CSC204)
              </a>
            </Typography>

            {/* --- NEW WRAPPER DIV ADDED HERE FOR RESPONSIVE BUTTONS --- */}
            <div className={classes.actionButtons}>
                {/* HOMEPAGE LINK - NOW A BUTTON */}
                <Button
                  style={{ textDecoration: 'none', color: 'white' }}
                  href="https://fitness-tracker-homepage-group-8-uacsc-204-ognw963ny.vercel.app" // Ensure this is the correct port for your homepage
                  color="inherit" // This makes the button's text white (inherits from AppBar)
                >
                  Homepage
                </Button>
                
                {/* LOGIN/LOGOUT BUTTONS */}
                {localStorage.getItem('jwtToken') ? (
                  <Button
                    style={{ textDecoration: 'none', color: 'white' }}
                    onClick={this.logout}
                    color="inherit"
                  >
                    Logout
                  </Button>
                ) : (
                  <Button
                    style={{ textDecoration: 'none', color: 'white' }}
                    href="/login"
                    color="inherit"
                  >
                    Login
                  </Button>
                )}
            </div> {/* --- END NEW WRAPPER DIV --- */}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);
