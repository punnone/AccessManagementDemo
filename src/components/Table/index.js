import React, { useEffect , useState } from 'react';
import { 
    Table,
    IconButton,
    Icon,
} from 'rsuite'
import 'rsuite-table/dist/css/rsuite-table.css'
import './Table.css'

function TableCustom({tcolumn,tvalue,action,loading,noData}) {

    const ActionCell = ({ rowData, dataKey, ...props }) => {
        // console.log("check package ",props.checkPackage,rowData.package)
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
        <div className="rs-panel rs-panel-default">
            <div 
                className="rs-panel-body bg-white" 
                style={{width:"80vw"}}
            >
                <Table
                    loading={loading}
                    height={500}
                    hover={true}
                    showHeader={true}
                    autoHeight={true}
                    data={noData ? [] : tvalue}
                    bordered={true}
                    cellBordered={true}
                    virtualized
                    affixHorizontalScrollbar
                >
                    {
                        tcolumn.map(column => {
                            const { key, label, ...rest } = column;
                            return (
                                <Table.Column {...rest} key={key} width={160} align="center">
                                    <Table.HeaderCell
                                        style={{ padding: 2, backgroundColor: '#3498ff', color: '#fff' }}
                                    >
                                        {label}
                                    </Table.HeaderCell>
                                    <Table.Cell dataKey={key} />
                                </Table.Column>
                            );
                        })
                    }
                    {
                        action.map(action => {
                            const { key, label, ...rest } = action;
                            return (
                                <Table.Column {...rest} key={key} width={160} align="center">
                                    <Table.HeaderCell
                                        style={{ padding: 2, backgroundColor: '#3498ff', color: '#fff' }}
                                    >
                                        {label}
                                    </Table.HeaderCell>
                                    <ActionCell dataKey="name" action/>
                                </Table.Column>
                            );
                        })
                    }
                </Table> 
            </div>
        </div>
    )
}
export default TableCustom