import React from 'react';
import { 
    Table,
    IconButton,
    Icon,
} from 'rsuite'
import 'rsuite-table/dist/css/rsuite-table.css'
import './Table.css'

const CompactCell = props => <Table.Cell {...props} style={{ padding: 4 }} />;
const CompactHeaderCell = props => (
  <Table.HeaderCell {...props} style={{ padding: 4, backgroundColor: '#3498ff', color: '#fff' }} />
);

function TableCustom({tcolumn,tvalue,action,loading}) {
    const data = tvalue
    const [compact, setCompact] = React.useState(true);
    const [bordered, setBordered] = React.useState(true);
    const [noData, setNoData] = React.useState(false);
    const [showHeader, setShowHeader] = React.useState(true);
    const [autoHeight, setAutoHeight] = React.useState(true);
    const [hover, setHover] = React.useState(true);
    const [columnKeys, setColumnKeys] = React.useState(tcolumn.map(column => column.key));

    const columns = tcolumn.filter(column => columnKeys.some(key => key === column.key));
    const CustomCell = compact ? CompactCell : Table.Cell;
    const CustomHeaderCell = compact ? CompactHeaderCell : Table.HeaderCell;


    const ActionCell = ({ rowData, dataKey, ...props }) => {
        function handleAction() {
            alert(`Name : ${rowData[dataKey]}`);
        }
        return (
            <Table.Cell {...props} className="link-group">
                {
                    !props.checkPackage ?
                        <IconButton appearance="subtle" onClick={handleAction} icon={<Icon icon="pencil"/>}/>
                    :
                    rowData.package === "advanced" ?
                        <IconButton appearance="subtle" onClick={handleAction} icon={<Icon icon="pencil"/>}/>
                    : "-"
                }
            </Table.Cell>
        );
    }

    return (
        <div>
            <Table
                loading={loading}
                height={500}
                hover={hover}
                showHeader={showHeader}
                autoHeight={autoHeight}
                data={noData ? [] : data}
                bordered={bordered}
                cellBordered={bordered}
                headerHeight={compact ? 80 : 90}
                rowHeight={compact ? 80 : 96}
                affixHorizontalScrollbar
                width={"80vw"}
            >
                {
                    columns.map(column => {
                        const { key, label, ...rest } = column;
                        return (
                            <Table.Column {...rest} key={key} width={160} align="center">
                                <CustomHeaderCell>{label}</CustomHeaderCell>
                                <CustomCell dataKey={key} />
                            </Table.Column>
                        );
                    })
                }
                {
                    action.map(action => {
                        const { key, label, ...rest } = action;
                        return (
                            <Table.Column {...rest} key={key} width={160} align="center">
                                <CustomHeaderCell>{label}</CustomHeaderCell>
                                <ActionCell dataKey="name" action/>
                            </Table.Column>
                        );
                    })
                }
            </Table> 
        </div>
    )
}
export default TableCustom