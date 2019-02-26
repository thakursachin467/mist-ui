import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Switch from '@material-ui/core/Switch'
import GethSettings from './GethSettings'

const drawerWidth = 240

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  toolbar: theme.mixins.toolbar
})

class NodesTab extends Component {
  static displayName = 'NodesTab'

  static propTypes = {
    classes: PropTypes.object
  }

  static defaultProps = {}

  state = {
    activeItem: 'Geth',
    nodes: [
      { name: 'Geth', on: false, disabled: false },
      { name: 'Swarm', on: false, disabled: false },
      { name: 'Clef', on: false, disabled: true },
      { name: 'Trinity', on: false, disabled: true },
      { name: 'Whisper', on: false, disabled: true },
      { name: 'ETH 2.0', on: false, disabled: true }
    ]
  }

  handleNodeSelect = name => {
    this.setState({ activeItem: name })
  }

  handleToggle = (name, on) => {
    const { nodes } = this.state
    const newNodes = nodes.map(node => {
      if (node.name === name) {
        return { ...node, on: !on }
      }
      return node
    })
    this.setState({ nodes: newNodes })
  }

  render() {
    const { classes } = this.props
    const { activeItem, nodes } = this.state

    return (
      <React.Fragment>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{ paper: classes.drawerPaper }}
        >
          <div className={classes.toolbar} />
          <List>
            {nodes.map(node => (
              <ListItem
                key={node.name}
                disabled={node.disabled}
                onClick={() => this.handleNodeSelect(node.name)}
                button
              >
                <ListItemText primary={node.name} />
                <ListItemSecondaryAction>
                  <Switch
                    color="primary"
                    onChange={() => this.handleToggle(node.name, node.on)}
                    checked={node.on}
                    disabled={node.disabled}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Drawer>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <h3>{activeItem}</h3>
          {activeItem === 'Geth' && <GethSettings />}
        </main>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(NodesTab)
