import React, { Component, useState, useEffect } from 'react';
import {
  Nav,
  Table,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  SelectPicker,
  Dropdown,
  Popover,
  Whisper,
  Divider,
  IconButton,
  Icon
} from 'rsuite'
import 'rsuite-table/dist/css/rsuite-table.css'
import './Table.css'
import _ from "lodash"

const { Column, HeaderCell, Cell, Pagination: TablePagination } = Table;
const ReactSuiteTable = (
  {
    data,
    loading: isFetchingData,
    tableName,
    tableNavigation,
    tableNavigationStyle,
    tableSearchPlaceHolder,
    tableDropdownMenuMore,
    tableColumnActionName,
    isColumnActionAvaliable,
    tableSubColumnActionName,
    tableColumnActionComponent,
    tableColumnActionRole,
    isExpandComponent,
    isSubExpandComponent,
    isCheckboxComponent,
    isSubCheckboxComponet,
    onClickView,
    onClickMore,
    onClickNavigation,
  }
) => {
  const [columns, setColumns] = useState([])
  const [values, setValues] = useState([])
  const [search, setSearch] = useState("")
  const [sortColumn, setSortColumn] = useState()
  const [sortType, setSortType] = useState()
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalRows, setTotalRows] = useState(((+window.innerHeight - (45 + 16 + 37 + 200 + 23 + 40 + 16 + 8)) / 46).toFixed(0))
  const [displayLength, setDisplayLength] = useState(handleInnerHeightBrowser())
  const [expandedRowKeys, setExpandedRowKeys] = React.useState([])
  const [checkedKeys, setCheckedKeys] = React.useState([]);
  const [checked, setChecked] = useState(false)
  const [indeterminate, setIndeterminate] = useState(false)
  const [isExpand, setIsExpand] = useState(false)
  const [isCheckbox, setIsCheckbox] = useState(false)
  const [isRadio, setIsRadio] = useState(false)
  const [activeNavigation, setActiveNavigation] = useState()
  const [isActionAvaliable, setIsActionAvaliable] = useState(true)
  const [rowKey, setRowKey] = useState('uid')
  const [menuLength] = useState([
    {
      value: handleInnerHeightBrowser(),
      label: "Fit to height"
    },
    {
      value: 10,
      label: "10"
    },

    {
      value: 20,
      label: "20"
    },
    {
      value: 50,
      label: "50"
    },
    {
      value: 100,
      label: "100"
    }
  ])
  let tableBody;

  useEffect(() => {
    if (data.columns) {
      setColumns(data.columns)
    }

    if (data.values) {
      setValues(data.values)
    }
  }, [data.columns, data.values])

  useEffect(() => {
    setTotalRows(handleInnerHeightBrowser())
    totalRows === displayLength && setDisplayLength(handleInnerHeightBrowser())
  }, [window.innerHeight])

  useEffect(() => {
    handleExpandComponent(isExpandComponent)
  }, [isExpandComponent])

  useEffect(() => {
    handleCheckboxComponent(isCheckboxComponent)
  }, [isCheckboxComponent])

  useEffect(() => {
    handleActionComponent(isColumnActionAvaliable)
  }, [isColumnActionAvaliable])

  useEffect(() => {
    handleLoadingTable(isFetchingData)
  }, [isFetchingData])

  useEffect(() => {
    if (checkedKeys.length === values.length) {
      setChecked(true)
      setIndeterminate(false)
    } else if (checkedKeys.length === 0) {
      setChecked(false)
      setIndeterminate(false)
    } else if (checkedKeys.length > 0 && checkedKeys.length < values.length) {
      setIndeterminate(true)
    }
  }, [checkedKeys])

  function handleInnerHeightBrowser() {
    let innerHeightBrowser = (+window.innerHeight - (45 + 16 + 37 + 200 + 23 + 40 + 16 + 8)) / 46
    return +innerHeightBrowser.toFixed(0)
  }

  function handleExpandComponent(isExpandComponent) {
    return isExpandComponent ? setIsExpand(true) : setIsExpand(false)
  }

  function handleCheckboxComponent(isCheckboxComponent) {
    return isCheckboxComponent ? setIsCheckbox(true) : setIsCheckbox(false)
  }

  function handleActionComponent(isColumnActionAvaliable = true) {
    return isColumnActionAvaliable ? setIsActionAvaliable(true) : setIsActionAvaliable(false)
  }

  function handleLoadingTable(isFetchingData = false) {
    return setLoading(isFetchingData)
  }

  const handleOnRowClick = (rowData) => {
    // console.log({ onRowClick: rowData })
  }

  const handleGetData = () => {

    if (sortColumn && sortType) {
      values.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === 'string') {
          x = x.charCodeAt();
        }
        if (typeof y === 'string') {
          y = y.charCodeAt();
        }
        if (sortType === 'asc') {
          return x - y;
        } else {
          return y - x;
        }
      })
    }

    return handleSearch(values).filter((v, i) => {
      const start = displayLength * (page - 1)
      const end = start + displayLength
      return i >= start && i < end
    })
  }

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true)

    setTimeout(() => {
      setSortColumn(sortColumn)
      setSortType(sortType)
      setLoading(false)
    }, 500)
  }

  const handleSearchOnChange = (event) => {
    let value = event.target.value

    return setSearch(value)
  }

  const handleSearchOnKeyPress = (event) => {
    let value = event.target.value
    let keyPress = event.key

    return keyPress === "Enter" && setSearch(value)
  }

  const handleSearch = (rows) => {
    let columns = rows[0] && Object.keys(rows[0])

    return rows.filter((row) =>
      columns.some((column) =>
        row[column]?.toString()?.toLowerCase().indexOf(search.toLowerCase()) > -1
      )
    )
  }

  const Menu = ({ onSelect, rowData, dropdownItem }) => {
    return (
      <Dropdown.Menu onSelect={onSelect}>
        {
          dropdownItem &&
          dropdownItem.map(({ key, icon, text, available, field }, index) => (
            <Dropdown.Item eventKey={key} key={index}
              style={{
                display: available
                  ? rowData?.isAction?.field
                    ? field.includes(rowData?.isAction?.field) ? 'none' : ''
                    : ''
                  : 'none'
              }}
            >
              <Icon icon={icon} />{" "}{text}
            </Dropdown.Item>
          ))
        }
      </Dropdown.Menu>
    )
  }

  const MenuPopover = ({ onSelect, rowData, dropdownItem, ...rest }) => (
    <Popover {...rest} full>
      <Menu onSelect={onSelect} rowData={rowData} dropdownItem={dropdownItem} />
    </Popover>
  )

  class CustomWhisper extends Component {

    constructor(props) {
      super(props);
      this.handleSelectMenu = this.handleSelectMenu.bind(this);
      this.rowData = props.data
    }

    handleSelectMenu(eventKey) {
      onClickMore(eventKey, this.rowData)
      this.trigger.hide()
    }

    render() {
      return (
        <Whisper
          placement="autoVerticalStart"
          trigger="click"
          triggerRef={ref => {
            this.trigger = ref
          }}
          container={() => {
            return tableBody
          }}
          speaker={<MenuPopover onSelect={this.handleSelectMenu} rowData={this.rowData} dropdownItem={tableDropdownMenuMore} />}
        >
          {this.props.children}
        </Whisper>
      );
    }
  }

  const CustomNavigation = ({ active = 1, onSelect, ...props }) => {

    function handleOnClickNavigationItem() {
      return onClickNavigation()
    }

    return (
      <Nav {...props} activeKey={active} onSelect={onSelect} style={tableNavigationStyle}>
        {
          tableNavigation &&
          tableNavigation.map(({ key, icon, text }, index) => (
            <Nav.Item eventKey={key} key={index}>
              <Icon icon={icon} />{" "}{text}
            </Nav.Item>
          ))
        }
      </Nav>
    )
  }

  const handleSelectNav = (activeKey) => {
    return setActiveNavigation(activeKey)
  }

  const ActionCell = ({ rowData, dataKey, ...props }) => {

    function handleAction({ name, action, icon }) {
      switch (action) {
        case 'more': onClickMore({ rowData }); break;
        default: onClickView({ rowData }); break;
      }
    }

    function handleActionNormal({ name, action, icon }) {
      return (
        <IconButton
          appearance="subtle"
          onClick={() => handleAction({ name, action, icon })}
          icon={<Icon icon={icon} />}
        />
      )
    }

    function handleActionMore({ name, action, icon }) {
      return (
        <CustomWhisper data={rowData}>
          <IconButton
            appearance="subtle"
            icon={<Icon icon={icon} />}
          />
        </CustomWhisper>
      )
    }

    return (
      <Cell {...props} className="link-group">
        {
          tableColumnActionComponent &&
          tableColumnActionComponent.map((elem, index) => {
            if (tableColumnActionComponent.length === 1) {
              return (
                <>
                  {
                    <IconButton key={index}
                      appearance="subtle"
                      onClick={() => handleAction(elem)}
                      icon={<Icon icon={elem.icon} />}
                      style={{ display: elem?.available ? '' : 'none' }}
                    />
                  }
                </>
              )
            } else {
              return (
                <>
                  {
                    <IconButton key={index}
                      appearance="subtle"
                      onClick={() => handleAction(elem)}
                      icon={<Icon icon={elem.icon} />}
                      style={{ display: elem?.available ? '' : 'none' }}
                    />
                  }

                  <Divider vertical />
                </>
              )
            }
          })
        }

        {
          tableColumnActionComponent &&
            tableColumnActionComponent.length > 1
            ? <Divider vertical />
            : false
        }

        {
          tableDropdownMenuMore &&
            tableDropdownMenuMore.length > 0
            ?
            <CustomWhisper data={rowData}>
              <IconButton
                appearance="subtle"
                icon={<Icon icon="more" />}
              />
            </CustomWhisper>
            : false
        }

      </Cell>
    );
  }

  const handleChangePage = (dataKey) => {
    setPage(dataKey)
  }

  const handleRenderTotal = (total, activePage) => {
    const fromRowIndex = (+displayLength * (+activePage - 1)) + 1
    const toRowIndex = +displayLength * +activePage
    const from = +activePage === 1 ? +activePage : +fromRowIndex
    const to = +toRowIndex > +total ? +total : +toRowIndex

    return `Showing ${from} to ${to} of ${total} entries`
  }

  const handleHeightTable = () => {
    return +window.innerHeight - (45 + 16 + 37 + 200 + 23)
  }

  const handleRenderLengthMenu = (picker) => {
    return (
      <>
        <span>Show{" "}</span>
        <SelectPicker {...picker.props} />
        <span>{" "}entries</span>
      </>
    )
  }

  const handleChangeLength = (dataKey) => {
    setPage(1)
    setDisplayLength(dataKey)
  }

  const handleCheckAll = (value, checked) => {
    const keys = checked ? values.map(item => item.uid) : []
    setCheckedKeys(keys)
  }

  const handleCheck = (value, checked) => {
    const keys = checked ? [...checkedKeys, value] : checkedKeys.filter(item => item !== value)
    setCheckedKeys(keys)
  }

  const CheckCell = ({ rowData, dataKey, checkedKeys, onChange, ...props }) => (
    <Cell {...props} style={{ padding: 0 }}>
      <div style={{ lineHeight: '46px' }}>
        <Checkbox style={{ marginTop: '-30px' }}
          value={rowData[dataKey]}
          inline
          onChange={onChange}
          checked={checkedKeys.some(item => item === rowData[dataKey])}
        />
      </div>
    </Cell>
  )

  const RadioCell = ({ rowData, dataKey, checkedKeys, onChange, ...props }) => (
    <Cell {...props} style={{ padding: 0 }}>
      <div style={{ lineHeight: '46px' }}>
        <Radio
          value={rowData[dataKey]}
          inline
          onChange={onChange}
          checked={checkedKeys.some(item => item === rowData[dataKey])}
        />
      </div>
    </Cell>
  )

  const ExpandCell = ({ rowData, dataKey, expandedRowKeys, onChange, ...props }) => (
    <Cell {...props}>
      <IconButton
        size="xs"
        appearance="subtle"
        onClick={() => {
          onChange(rowData)
        }}
        icon={
          expandedRowKeys.some((key) => key === rowData[rowKey])
            ? <Icon icon="minus-square-o" />
            : <Icon icon="plus-square-o" />
        }
      />
    </Cell>
  )

  const renderRowExpanded = (rowData) => {
    const rowDataExpanded = isSubExpandComponent(rowData.uid)
    const isDisplayType = rowDataExpanded?.expand_type
    const isColumns = rowDataExpanded?.columns
    const isData = rowDataExpanded?.values

    return _.isEmpty(rowDataExpanded)
      ? (<>No Data</>)
      : (
        <Table
          style={{ padding: 0 }}
          height={400}
          virtualized
          affixHorizontalScrollbar
          data={[isData]}
        >
          {/* Expand column of table  */}
          <Column width={50} align="center">
            <HeaderCell style={{ padding: 0 }}>
              <div style={{ lineHeight: '40px' }}>
                <Checkbox
                  style={{ marginTop: '-25px' }}
                  inline
                  checked={checked}
                  indeterminate={indeterminate}
                  onChange={handleCheckAll}
                />
              </div>
            </HeaderCell>
            <Cell></Cell>
            {/* <CheckCell
                        dataKey="uid"
                        checkedKeys={checkedKeys}
                        onChange={handleCheck}
                    /> */}
          </Column>
          <Column width={70} align="center">
            <HeaderCell>#</HeaderCell>
            <Cell></Cell>
            {/* <ExpandCell dataKey="id" expandedRowKeys={expandedRowKeys} onChange={handleExpanded} /> */}
          </Column>
          {/* Loop columns return title of table */}
          {/* columns "LOOP" */}
          {isColumns && isColumns.map((column, index) => {
            const Key = column.column // Setting Mapping Data
            const TitleName = column.display.en // Setting Display

            return (
              <Column
                key={index}
                align="center"
                flexGrow={1}
                minWidth={100}
                sortable
              >
                <HeaderCell id={Key}>
                  {TitleName}
                </HeaderCell>

                <Cell
                  dataKey={Key}
                  rowIndex={index}
                />
              </Column>
            )
          })}
          {/* end columns "LOOP" */}
          {/* column "ACTION" */}
          <Column
            align="center"
            fixed="right"
            flexGrow={1}
            minWidth={110}
          >
            <HeaderCell>Action</HeaderCell>

            <Cell>
              {(rowData) => {
                function handleAction() {
                  alert(`uid: ${rowData.uid}`);
                }
                return (
                  <span>
                    <a href="#" className="pointer" onClick={handleAction}> View </a>
                  </span>
                );
              }}
            </Cell>
          </Column>
          {/* end column "ACTION" */}
        </Table>
      )
  }

  const handleExpanded = (rowData, dataKey) => {
    let open = false
    const nextExpandedRowKeys = []

    expandedRowKeys.forEach((key) => {
      if (key === rowData[rowKey]) {
        open = true
      } else {
        nextExpandedRowKeys.push(key)
      }
    })

    if (!open) {
      nextExpandedRowKeys.push(rowData[rowKey])
    }

    setExpandedRowKeys(nextExpandedRowKeys)
  }

  return (
    <>
      <div className="rs-panel rs-panel-default">
        <div className="rs-panel-body bg-white">
          {/* container */}
          <div className="flex pb2">
            {/* 70 percent of grid system */}
            <div className="flex w-70 items-center">
              {
                tableNavigation?.length > 0
                  ? <CustomNavigation
                    appearance="subtle"
                    active={activeNavigation}
                    onSelect={handleSelectNav}
                  />
                  : <span className="pa2 mb2 f5 b w-100">
                    {tableName}
                  </span>
              }
            </div>
            {/* end 70 percent of grid system */}
            {/* 30 percent of grid system */}
            <div className="w-30 items-center">
              <div className="rs-input-group rs-input-group-inside">
                <span className="rs-input-group-addon">
                  <Icon icon="search" />
                </span>
                <input
                  id="search"
                  className="rs-input pa2 mb2 db"
                  type="text"
                  placeholder={tableSearchPlaceHolder || "Search"}
                  value={search}
                  onChange={handleSearchOnChange}
                  onKeyPress={handleSearchOnKeyPress}
                />
              </div>
            </div>
            {/* end 30 percent of grid system */}
          </div>
          {/* end container */}
          <Table
            virtualized // Effectively render large tabular data
            height={handleHeightTable()}
            // cellBordered
            affixHorizontalScrollbar
            data={handleGetData()}
            // virtualized={true}
            sortColumn={sortColumn}
            sortType={sortType}
            onSortColumn={handleSortColumn}
            loading={loading}
            rowKey={rowKey}
            expandedRowKeys={expandedRowKeys}
            onRowClick={handleOnRowClick}
            renderRowExpanded={renderRowExpanded}
            rowExpandedHeight={300}
          >
            {/* Checkbox column of table */}
            {
              isCheckbox && (
                <Column width={50} align="center">
                  <HeaderCell style={{ padding: 0 }}>
                    <div style={{ lineHeight: '40px' }}>
                      <Checkbox
                        style={{ marginTop: '-25px' }}
                        inline
                        checked={checked}
                        indeterminate={indeterminate}
                        onChange={handleCheckAll}
                      />
                    </div>
                  </HeaderCell>

                  <CheckCell
                    dataKey="uid"
                    checkedKeys={checkedKeys}
                    onChange={handleCheck}
                  />
                </Column>
              )
            }
            {/* Expand column of table  */}
            {
              isExpand && (
                <Column width={70} align="center">
                  <HeaderCell>#</HeaderCell>

                  <ExpandCell
                    dataKey="id"
                    expandedRowKeys={expandedRowKeys}
                    onChange={handleExpanded}
                  />
                </Column>
              )
            }
            {/* Loop columns return title of table */}
            {columns.map((column, index) => {
              const Key = column.column // Setting Mapping Data
              const TitleName = column.display.en // Setting Display

              return (
                <Column
                  key={index}
                  align="center"
                  flexGrow={1}
                  minWidth={100}
                  sortable
                  style={{ display: column?.display?.available ? '' : 'none' }}
                >
                  <HeaderCell id={Key}>
                    {TitleName}
                  </HeaderCell>

                  <Cell
                    dataKey={Key}
                    rowIndex={index}
                  />
                </Column>
              )
            })}
            {/* end Loop columns return title of table */}
            {/* column "ACTION" */}
            {
              isActionAvaliable &&
              <Column
                align="center"
                fixed="right"
                flexGrow={1}
                minWidth={110}
              >
                <HeaderCell>
                  {tableColumnActionName || `Action`}
                </HeaderCell>

                <ActionCell dataKey={'action'} />
              </Column>
            }
            {/* end column "ACTION" */}
          </Table>
          {/* Pagination of Table */}
          <TablePagination
            style={{ paddingBottom: 0 }}
            activePage={page}
            displayLength={displayLength}
            showLengthMenu={true}
            lengthMenu={menuLength}
            onChangeLength={handleChangeLength}
            onChangePage={handleChangePage}
            renderLengthMenu={handleRenderLengthMenu} // Custom menu
            renderTotal={handleRenderTotal} // Custom total
            total={values.length}
          />
          {/* end Pagination of Table */}
        </div>
      </div>
    </>
  )
};

export default ReactSuiteTable
