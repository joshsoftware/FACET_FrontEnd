import React from 'react'
import { Accordion, Tab, Table, Tabs } from 'react-bootstrap';
import BadgeComponent from '../../../BadgeComponent';
import JSONView from '../../../JSONView';
import TestdataOutcomeTable from './TestdataOutcomeTable';

const TestdataReportInfo = ({ item, eventKey }) => {
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
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>Key</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(item.parameters).map(([key, val], ind) => {
                                    return (
                                        <tr key={ind}>
                                            <td>{key}</td>
                                            <td>{val}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Tab>
                    <Tab eventKey="payload" title="Payload">
                        <JSONView 
                            data={item.payload}
                        />
                    </Tab>
                    <Tab eventKey="outcome" title="Outcome">
                        <TestdataOutcomeTable 
                            data={item.outcome}
                            testdata={item.name}
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