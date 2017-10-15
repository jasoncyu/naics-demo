import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as Papa from 'papaparse'
import { Icon, Label, Menu, Table } from 'semantic-ui-react'

import * as data from '../naics.csv'

class App extends Component {
  componentWillMount() {
    const results = Papa.parse(data)
    const rows = results.data
    this.props.dataRows = data.slice(1)
    this.props.headerRow = data[0]
  }

  renderTable() {
    const headerRows = this.props.headerRow.map((header) => {
      <Table.HeaderCell>{header}</Table.HeaderCell>
    })

    const header = (
      <Table.Header>
        {headerRows}
      </Table.Header>
    )

    const bodyRows = this.props.dataRows.map((dataRow) => {
      const tableCells = dataRow.map((cell) => {
        return (
          <Table.Cell>
            {cell}
          </Table.Cell>
        )
      })
      return (
        <Table.Row>
          {tableCells}
        </Table.Row>
      )
    })

    const body = (
      <Table.Body>
      </Table.Body>
    )

    return (
    <Table celled>
      (header)
      <Table.Body>
      <Table.Row>
        <Table.Cell>
          <Label ribbon>First</Label>
        </Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
      </Table.Row>
    </Table.Body>

    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='3'>
          <Menu floated='right' pagination>
            <Menu.Item as='a' icon>
              <Icon name='left chevron' />
            </Menu.Item>
            <Menu.Item as='a'>1</Menu.Item>
            <Menu.Item as='a'>2</Menu.Item>
            <Menu.Item as='a'>3</Menu.Item>
            <Menu.Item as='a'>4</Menu.Item>
            <Menu.Item as='a' icon>
              <Icon name='right chevron' />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
