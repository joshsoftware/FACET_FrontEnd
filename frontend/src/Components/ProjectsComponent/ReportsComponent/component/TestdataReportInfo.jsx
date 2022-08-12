import React from 'react'
import { Accordion, Tab, Table, Tabs } from 'react-bootstrap';
import BadgeComponent from '../../../BadgeComponent';
import JSONView from '../../../JSONView';

const TestdataReportInfo = ({ item, eventKey }) => {
    return (
        <Accordion.Item eventKey={eventKey} className={`border-${item.status==='passed'?"success":"danger"}`}>
            <Accordion.Header>
                {item.testdata.name}
                <BadgeComponent 
                    bg={item.status==='passed'?'success':'danger'}
                    className='text-capitalize report_results'
                    label={item.status}
                />
            </Accordion.Header>
            <Accordion.Body>
                <Tabs
                    defaultActiveKey="errors"
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
                                {Object.entries(item.testdata.parameters).map(([key, val], ind) => {
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
                            data={item.testdata.payload}
                        />
                    </Tab>
                    <Tab eventKey="expOutcome" title="Exp. Outcome">
                        <JSONView 
                            data={item.testdata.expected_outcome}
                        />
                    </Tab>
                    <Tab eventKey="errors" title="Errors">
                        {item.errors?(
                            <Table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Field</th>
                                        <th>Errors</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {item.errors.map((err, ind) => {
                                        return (
                                            <tr key={ind}>
                                                <td>{ind+1}</td>
                                                <td>{err.name}</td>
                                                <td>
                                                    <JSONView 
                                                        data={err.errors}
                                                    />
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        ):(
                            <>
                                <h3>No Errors Found!</h3>
                            </>
                        )}
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