/*
 * Copyright (c) 2023 Contributors to the Eclipse Foundation
 *
 *  See the NOTICE file(s) distributed with this work for additional information regarding copyright ownership.
 *
 *  This program and the accompanying materials are made available under the terms of the Apache License, Version 2.0 which is available at https://www.apache.org/licenses/LICENSE-2.0.
 *
 *  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 *
 *  SPDX-License-Identifier: Apache-2.0
 */

import React, { useContext, useState, useMemo, useCallback } from 'react';
import { Modal, Button,Form,Col,Row } from 'react-bootstrap';
import { DemandContext, Demand } from '../contexts/DemandContextProvider';
import Pagination from './Pagination';
import DemandsTable from './DemandsTable';
import DemandsSearch from './Search';
import { FcCancel } from 'react-icons/fc';


const DemandsPage: React.FC = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDemand, setSelectedDemand] = useState<Demand | null>(null);
  const { demands, deleteDemand } = useContext(DemandContext)!;

  
  const [startDate, setStartDate] =  useState<Date>(new Date("2024/02/08"));
  const [endDate, setEndDate] =  useState<Date>(new Date("2024/02/26"));

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [demandsPerPage, setDemandsPerPage] = useState(5); // Set the default value here

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      // If the same column is clicked again, toggle the sort order
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // If a different column is clicked, set it as the new sort column and default to ascending order
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const handleDeleteDemand = useCallback(
    async (id: number) => {
      try {
        await deleteDemand(id);
      } catch (error) {
        console.error('Error deleting demand:', error);
      }
    },
    [deleteDemand]
  );

  const handleEdit = (demand: Demand) => {
    setSelectedDemand(demand);
    setShowEditModal(true);
  };

  const handleCloseEdit = () => setShowEditModal(false);


  const filteredDemands = useMemo(() => {
    let sortedDemands = [...demands];

    if (searchQuery !== '') {
      sortedDemands = sortedDemands.filter((demand) =>
        demand.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        demand.id.toString().includes(searchQuery.toLowerCase()) ||
        demand.companyId.toString().includes(searchQuery.toLowerCase())
      );
    }

    if (sortColumn !== '') {
      sortedDemands.sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

        if (typeof aValue === 'string') {
          // Sort strings alphabetically
          return aValue.localeCompare(bValue, undefined, { sensitivity: 'base' });
        } else if (typeof aValue === 'number') {
          // Sort numbers numerically
          return aValue - bValue;
        }

        return 0;
      });

      if (sortOrder === 'desc') {
        // Reverse the array if the sort order is descending
        sortedDemands.reverse();
      }
    }

    return sortedDemands;
  }, [demands, searchQuery, sortColumn, sortOrder]);

  const slicedDemands = useMemo(() => {
    const indexOfLastDemand = currentPage * demandsPerPage;
    const indexOfFirstDemand = indexOfLastDemand - demandsPerPage;
    return filteredDemands.slice(indexOfFirstDemand, indexOfLastDemand);
  }, [filteredDemands, currentPage, demandsPerPage]);

  const totalPagesNum = useMemo(() => Math.ceil(filteredDemands.length / demandsPerPage), [
    filteredDemands,
    demandsPerPage,
  ]);

  const demandItems = useMemo(
    () =>
      slicedDemands.map((demand) => (
        <tr key={demand.id}>
          <td>{demand.id}</td>
          <td>{demand.companyId}</td>
          <td>{demand.requiredValue}</td>
          <td>{demand.deliveredValue}</td>
          <td>{demand.maximumValue}</td>
          <td>{demand.description}</td>
          <td>{demand.startDate.split('T')[0]}</td>
          <td>{demand.endDate.split('T')[0]}</td>
          <td>
            {/* TODO Depending on status, this should be a different span*/}
        <span className="badge rounded-pill text-bg-success" id="tag-ok">OK</span>
        <span className="badge rounded-pill text-bg-warning" id="tag-warning">Warning</span>
        <span className="badge rounded-pill text-bg-danger" id="tag-danger">Danger</span>
      </td>
          <td>
          <Button onClick={() => handleEdit(demand)} variant="outline-secondary">Edit</Button>
          </td>
          <td>
          <Button onClick={() => handleDeleteDemand(demand.id)} variant="outline-danger"><FcCancel/></Button>
          </td>
        </tr>
      )),
    [slicedDemands, handleDeleteDemand]
  );

  return (
    <>
      <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
          <DemandsSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          </div>
          <div className="col-sm-6">
            <Button className="btn btn-success float-end" data-toggle="modal">
              <i className="material-icons">&#xE147;</i> <span>Add New Demand</span>
            </Button>
          </div>
        </div>
      </div>

      <DemandsTable
        sortColumn={sortColumn}
        sortOrder={sortOrder}
        handleSort={handleSort}
        demandItems={demandItems}
      />
      <div className="container">
      <div className="row">
          <Pagination
            pages={totalPagesNum}
            setCurrentPage={setCurrentPage}
            currentItems={slicedDemands}
            items={filteredDemands}
          />
        <div className="col-sm">
          <div className="float-end">
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="6">
              Per Page:
              </Form.Label>
              <Col sm="6">
              <Form.Control
                  type="number"
                  aria-describedby="demandsPerPageInput"
                  min={1}
                  htmlSize={10}
                  max={100}
                  value={demandsPerPage}
                  onChange={(e) => setDemandsPerPage(Number(e.target.value))}
                />
              </Col>
            </Form.Group>
          </Form>
          </div>
        </div>
      </div>
      </div>

      <Modal
        show={showEditModal}
        onHide={handleCloseEdit}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <Form id='edit-form'>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formgridStartDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control 
                 type="date"
                 name="startdate"
                 placeholder="Start Date"
                 />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>End Date</Form.Label>
              <Form.Control 
                 type="date"
                 name="enddate"
                 placeholder="End Date"
                 />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="formGridAddress1">
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formgridStartDate">
                <Form.Label>Required Value</Form.Label>
                <Form.Control
                 name="startdate"
                 placeholder="Required Value"
                 />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Delivered Value</Form.Label>
              <Form.Control
                 name="enddate"
                 placeholder="Delivered Value"
                 />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Maximum Value</Form.Label>
              <Form.Control 
                 name="enddate"
                 placeholder="Maximum Value"
                 />
              </Form.Group>
            </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Description</Form.Label>
              <Form.Control placeholder="Description" />
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
              Submit
            </Button>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DemandsPage;
