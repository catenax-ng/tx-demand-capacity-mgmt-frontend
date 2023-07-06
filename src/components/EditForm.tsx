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

import React, { useContext, useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { DemandContext, Demand } from '../contexts/DemandContextProvider';

interface EditFormProps {
  theDemand: Demand;
}

const EditForm: React.FC<EditFormProps> = ({ theDemand }) => {
  const { updateDemand } = useContext(DemandContext)!;

  const [demand, setDemand] = useState<Demand>(theDemand);

  useEffect(() => {
    setDemand(theDemand);
  }, [theDemand]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (demand.requiredValue <= 0) {
      console.log('Required value must be greater than 0');
      return;
    }

    updateDemand(demand);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDemand((prevDemand) => ({ ...prevDemand, [name]: value }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <p>Required Value</p>
      <Form.Group>
        <Form.Control
          type="number"
          placeholder="Required Value"
          name="requiredValue"
          value={demand.requiredValue}
          onChange={handleInputChange}
        />
      </Form.Group>

      {/* Add other input fields for the remaining properties of Demand */}

      <p />
      <Button variant="primary" type="submit" className="btn-block">
        Save Changes
      </Button>
    </Form>
  );
};

export default EditForm;
