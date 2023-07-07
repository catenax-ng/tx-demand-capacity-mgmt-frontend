
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

import {AiOutlineStock, AiOutlineLink} from 'react-icons/ai';


function QuickAcessItems() {
  return (
  <>
  <div className="float-left" style={{position: 'absolute', top: '50%',left:5, transform: 'translate(0%, -50%)'}}>
    <a className="btn btn-primary m-1 display-4" href="#"><AiOutlineStock/></a>
    <br />
    <a className="btn btn-primary m-1 h2" href="#"><AiOutlineLink/></a>
</div>
</>
  );
}

export default QuickAcessItems;