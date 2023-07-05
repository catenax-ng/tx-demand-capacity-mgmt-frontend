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

import DemandsList from "./DemandsList";
import DemandContextProvider from "../contexts/DemandContextProvider";
import TopMenu from "./TopMenu";

function Home() {
    return (
        <><div><TopMenu></TopMenu></div>
        <div className="container-xl">
            <br />
            <div className="table">
                <div className="table-wrapper">
                    <DemandContextProvider>
                        <DemandsList />
                    </DemandContextProvider>
                </div>
            </div>
        </div></>

    );
}

export default Home;