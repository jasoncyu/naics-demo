import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import logo from './logo.svg';
import './App.css';
import * as Papa from 'papaparse'
import { Input, Icon, Label, Menu, Table } from 'semantic-ui-react'
import _ from 'lodash'

import * as data from './naics.csv'

const inputDomainIdx = 0
const flagsIndices = [2, 3, 4]
const industryScoreIdx = 7
const jjCorrectionsIdx = 15
const scoresIdxs = [7, 14]

const idxToRemove = [inputDomainIdx, ...flagsIndices, industryScoreIdx, jjCorrectionsIdx, ...scoresIdxs]
const pageSize = 10

class App extends Component {
  constructor(props) {
    super(props)

    this.setQueryStr = _.debounce(this.setQueryStr, 500)
    this.state = {
      queryStr: '',
      curPageIdx: 0,
    }
  }

  setQueryStr(queryStr) {
    this.setState({
      queryStr,
    })
  }

  onChange(evt) {
    const queryStr = evt.currentTarget.value
    this.setQueryStr(queryStr)
  }

  renderInput() {
    return (
      <Input
        focus
        placeholder='Website'
        onChange={this.onChange.bind(this)}
      />
    )
  }

  renderTable() {
    // if (!this.state.queryStr) {
    //   return
    // }

    const results = Papa.parse(data)
    // results.data[0].forEach((data, i) => {
    //   console.log("i: ", i)
    //   console.log("data: ", data)
    // })

    const removeIdxs = (element, idx) => {
      if (idxToRemove.includes(idx)) {
        return false
      }
      return true
    }
    const headerRow = results.data[0].filter(removeIdxs)
    const dataRows = results.data.slice(1).map((row) => {
      return row.filter(removeIdxs)
    })

    const headerCells = headerRow.map((header, i) => {
      return (
        <Table.HeaderCell key={i.toString()}>{header}</Table.HeaderCell>
      )
    })

    const header = (
      <Table.Header>
        <Table.Row>
          {headerCells}
        </Table.Row>
      </Table.Header>
    )

    const bodyRows = dataRows
          .filter((row) => {
            const domainCell = row[0]
            if (domainCell.toLowerCase().includes(this.state.queryStr.toLowerCase())) {
              return true
            }

            return false
            // return true
          }).slice(this.state.curPageIdx * pageSize, (this.state.curPageIdx + 1) * pageSize).map((dataRow, j) => {
            // let css = {}
            // if (!dataRow[0].toLowerCase().includes(this.state.queryStr.toLowerCase())) {
            //   css = {
            //     display: 'none'
            //   }
            // }
            const tableCells = dataRow
                  .map((cell, i) => {
                    const cellStyle = {
                      height: '80px',
                    }
                    return (
                      <Table.Cell key={i.toString()} style={cellStyle}>
                        {cell}
                      </Table.Cell>
                    )
                  })
            return (
        <Table.Row key={dataRow[0]}>
          {tableCells}
        </Table.Row>
      )
    })

    const body = (
      <Table.Body>
        {bodyRows}
      </Table.Body>
    )

    const numPages = Math.floor(dataRows.length / pageSize)
    _.range(numPages).map((pageIdx) => {
      return (
        <Menu.Item as='a'>(pageIdx + 1)</Menu.Item>
      )
    })

    const prevPage = () => {
      this.setState({
        curPageIdx: this.state.curPageIdx - 1
      })
    }

    const nextPage = () => {
      this.setState({
        curPageIdx: this.state.curPageIdx + 1
      })
    }

    const atFirstPage = this.state.curPageIdx == 0
    let leftChevronStyle = {}
    if (atFirstPage) {
      leftChevronStyle['display'] = 'none'
    }

    const atLastPage = this.state.curPageIdx == numPages - 1
    let rightChevronStyle = {}
    if (atLastPage) {
      rightChevronStyle['display'] = 'none'
    }

    const footer = (
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan={dataRows[0].length}>
            <Menu floated='right' pagination >
              <Menu.Item as='a' icon onClick={prevPage.bind(this)} style={leftChevronStyle}>
                <Icon name='left chevron' />
              </Menu.Item>
              <Menu.Item as='a' icon onClick={nextPage.bind(this)} style={rightChevronStyle}>
                <Icon name='right chevron' />
              </Menu.Item>
            </Menu>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    )

    return (
      <Table celled>
        {header}
        {body}
        {footer}
      </Table>
    )

    return body
  }

  render() {
    return (
      <div className="App">
        <Helmet>
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
        </Helmet>
        {this.renderInput()}
        {this.renderTable()}
      </div>
    );
  }
}

export default App;
