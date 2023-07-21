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

import React, { useContext, useState, ChangeEvent, FormEvent } from 'react';
import { Form, Button, Row,Col } from 'react-bootstrap';
import { DemandContext } from '../contexts/DemandContextProvider';


const AddForm: React.FC = () => {
  const { createDemand } = useContext(DemandContext)!;

  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [requiredValue, setRequiredValue] = useState('');
  const [deliveredValue, setDeliveredValue] = useState('');
  const [maximumValue, setMaximumValue] = useState('');
  const [demandCategory, setDemandCategory] = useState('');
  

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newDemandSeriesValue = {
      calendarWeek: '',
      demand: ''
    }

    const newMaterialDemandSeries = {
      customerLocationId: 'string',
      expectedSupplierLocationId: '',
      demandCategoryId: '',
      demandSeriesValues: newDemandSeriesValue
    }
    
    const newDemand = {
      id: 0,
      materialDescriptionCustomer: '',
      materialNumberCustomer: '',
      materialNumberSupplier: '',
      customerId: '',
      supplierId: '',
      unitMeasureId: '',
      materialDemandSeries: newMaterialDemandSeries
    };


    createDemand(newDemand);
    resetForm();
  };

  const resetForm = () => {
    setDescription('');
    setStartDate('');
    setEndDate('');
    setRequiredValue('');
    setDeliveredValue('');
    setMaximumValue('');
    setDemandCategory('');
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'description':
        setDescription(value);
        break;
      case 'startDate':
        setStartDate(value);
        break;
      case 'endDate':
        setEndDate(value);
        break;
      case 'requiredValue':
        if (value >= '0') {
          setRequiredValue(value);
        }
        break;
      case 'deliveredValue':
        if (value >= '0') {
          setDeliveredValue(value);
        }
        break;
      case 'maximumValue':
        if (value >= '0') {
          setMaximumValue(value);
        }
        break;
      case 'demandCategory':
        setDemandCategory(value);
        break;
      default:
        break;
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formgridStartDate">
          <Form.Label>Start Date</Form.Label>
          <Form.Control 
            type="date"
            placeholder="Start Date"
            name="startDate"
            value={startDate}
            pattern="\d{4}-\d{2}-\d{2}"
            onChange={onInputChange}
            required
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridPassword">
        <Form.Label>End Date</Form.Label>
        <Form.Control 
            type="date"
            placeholder="End Date"
            name="endDate"
            value={endDate}
            onChange={onInputChange}
            pattern="\d{4}-\d{2}-\d{2}"
            required
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
      <Form.Group as={Col} controlId="formgridStartDate">
      <Form.Label>Demand Value</Form.Label>
      <Form.Control
          type="number"
          placeholder="Required Value"
          name="requiredValue"
          value={requiredValue}
          onChange={onInputChange}
          required
        />
      </Form.Group>
      <Form.Group as={Col} >
      <Form.Label>Unit of Measure</Form.Label>
        <Form.Select
                  name="unitofmeasure"
                  value={deliveredValue}
                  onChange={onInputChange}
                  required>
          <option value="1">Un</option>
          <option value="2">kg</option>
          <option value="3">ft</option>
        </Form.Select>
      </Form.Group>
    </Row>
    <Form.Group className="mb-3">
      <Form.Label>Supplier</Form.Label>
      <Form.Select aria-label="Default select example"
                  name="supplierid"
                  value={deliveredValue}
                  onChange={onInputChange}
                  required>
          <option value="1">Supplier1</option>
          <option value="2">Supplier2</option>
          <option value="3">Supplier3</option>

        </Form.Select>
      </Form.Group>

    <Form.Group className="mb-3">
      <Form.Label>Demand Category</Form.Label>
      <Form.Select aria-label="Default select example"
                  placeholder="Demand Category"
                  name="demandCategory"
                  value={deliveredValue}
                  onChange={onInputChange}
                  required>
          <option value="1">Category 1</option>
          <option value="2">Category 2</option>
          <option value="3">Category 3</option>
        </Form.Select>
      </Form.Group>

    <Form.Group className="mb-3">
      <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Description"
          name="description"
          value={description}
          onChange={onInputChange}
          required
        />
      </Form.Group>

      <Button variant="success" type="submit">
        Add New Demand  
      </Button>
    </Form>
  );
};

export default AddForm;
