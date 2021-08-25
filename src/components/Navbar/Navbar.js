import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  iconButton: {
    display: "flex",
    flexDirection: "row",
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <AccountBalanceWalletIcon className={classes.menuButton}/>
          <Typography variant="h6" className={classes.title}>
            ATM Application
          </Typography>
          <IconButton classes={classes.iconButton} color="inherit">
          Logout
            <ExitToAppIcon />
        </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
