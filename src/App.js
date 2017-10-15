import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as Papa from 'papaparse'
import { Icon, Label, Menu, Table } from 'semantic-ui-react'

import * as data from './naics.csv'

class App extends Component {
  renderTable() {
    const results = Papa.parse(data)
    const headerRow = results.data[0]
    const dataRows = results.data.slice(1)

    const headerCells = headerRow.map((header) => {
      return (
        <Table.HeaderCell>{header}</Table.HeaderCell>
      )
    })

    const header = (
      <Table.Header>
        <Table.Row>
          {headerCells}
        </Table.Row>
      </Table.Header>
    )

    const bodyRows = dataRows.map((dataRow) => {
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
        {bodyRows}
      </Table.Body>
    )

    return (
      <Table>
        {header}
        {body}
      </Table>
    )

    return body
  }

  render() {
    return (
      <div className="App">
        {this.renderTable()}
      </div>
    );
  }
}

export default App;
