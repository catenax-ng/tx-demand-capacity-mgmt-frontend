/********************************************************************************
 * Copyright (c) 2021,2023 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import React, { useEffect, useState } from "react";

interface PaginationProps {
  pages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentDemands: any[]; // Update with the correct type for currentDemands
  demands: any[]; // Update with the correct type for demands
}

const Pagination: React.FC<PaginationProps> = ({ pages, setCurrentPage, currentDemands, demands }) => {
  const numOfPages: number[] = [];

  for (let i = 1; i <= pages; i++) {
    numOfPages.push(i);
  }

  const [currentButton, setCurrentButton] = useState(1);

  useEffect(() => {
    setCurrentPage(currentButton);
  }, [currentButton, setCurrentPage]);

  return (
    <div className="clearfix">
      <div className="hint-text">
        Showing <b>{currentDemands.length}</b> out of <b>{demands.length}</b> entries
      </div>
      <ul className="pagination">
        <li className={`${currentButton === 1 ? 'page-item disabled' : 'page-item'}`}>
          <a href="#!" onClick={() => setCurrentButton((prev) => (prev === 1 ? prev : prev - 1))}>Previous</a>
        </li>
        {numOfPages.map((page, index) => {
          return (
            <li key={index} className={`${currentButton === page ? 'page-item active' : 'page-item'}`}>
              <a href="#!" className="page-link" onClick={() => setCurrentButton(page)}>{page}</a>
            </li>
          )
        })}
        <li className={`${currentButton === numOfPages.length ? 'page-item disabled' : 'page-item'}`}>
          <a href="#!" onClick={() => setCurrentButton((next) => (next === numOfPages.length ? next : next + 1))}>Next</a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
