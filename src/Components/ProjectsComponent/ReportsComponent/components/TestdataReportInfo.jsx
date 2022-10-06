import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Tab, Tabs } from 'react-bootstrap';

import BadgeComponent from 'Components/BadgeComponent';
import JSONView from 'Components/JSONView';
import TestdataOutcomeTable from './TestdataOutcomeTable';
import TableComponent from 'Components/CustomComponents/TableComponent/index';


const TestdataReportInfo = (props) => {
    const { item, eventKey } = props;

    return (
        <Accordion.Item eventKey={eventKey} className={`border-${item.status==='passed'?"success":"danger"}`}>
            <Accordion.Header>
                {item.name}
                <BadgeComponent 
                    bg={item.status==='passed'?'success':'danger'}
                    className='text-capitalize report_results'
                    label={item.status}
                />
            </Accordion.Header>
            <Accordion.Body>
                <Tabs
                    defaultActiveKey="outcome"
                >
                    <Tab eventKey="parameters" title="Parameters">
                        <TableComponent
                            striped
                            bordered
                            headings={["Key", "Value"]}
                        >
                            {Object.entries(item.parameters).map(([key, val], ind) => {
                                return (
                                    <tr key={ind}>
                                        <td>{key}</td>
                                        <td>{val}</td>
                                    </tr>
                                )
                            })}
                        </TableComponent>
                    </Tab>
                    <Tab eventKey="payload" title="Payload">
                        <JSONView 
                            data={item.payload}
                        />
                    </Tab>
                    <Tab eventKey="outcome" title="Outcome">
                        <TestdataOutcomeTable 
                            data={item.outcome}
                            testdataName={item.name}
                        />
                    </Tab>
                    <Tab eventKey="response" title="Response">
                        <JSONView 
                            data={item.response}
                        />
                    </Tab>
                </Tabs>
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default TestdataReportInfo;

TestdataReportInfo.propTypes = { 
    item: PropTypes.object, 
    eventKey: PropTypes.number 
}
