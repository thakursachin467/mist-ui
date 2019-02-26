import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
// import NoSsr from '@material-ui/core/NoSsr'
import NodesTab from './NodesTab'

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  toolbar: theme.mixins.toolbar
})

function LinkTab(props) {
  return (
    <Tab component="a" onClick={event => event.preventDefault()} {...props} />
  )
}

class NavTabs extends React.Component {
  static propTypes = {
    classes: PropTypes.object
  }

  state = {
    value: 0
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  render() {
    const { classes } = this.props
    const { value } = this.state

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" color="default" className={classes.appBar}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
          >
            <LinkTab label="Nodes" />
            <LinkTab label="Network" />
            <LinkTab disabled label="Transactions" />
            <LinkTab label="Tools" />
          </Tabs>
        </AppBar>

        {value === 0 && <NodesTab />}

        {value === 1 && (
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <div>Network</div>
          </main>
        )}
        {value === 2 && (
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <div>Transactions</div>
          </main>
        )}
        {value === 3 && (
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <div>Tools</div>
          </main>
        )}
      </div>
    )
  }
}

export default withStyles(styles)(NavTabs)
