import React, { useContext, useState, useMemo, useCallback } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { DemandContext, Demand } from '../contexts/DemandContextProvider';
import EditForm from './EditForm';
import AddForm from './AddForm';
import Pagination from './Pagination';
import DemandsTable from './DemandsTable';
import DemandsSearch from './DemandsSearch';
import DemandsModal from './DemandsModal';

const DemandsList: React.FC = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDemand, setSelectedDemand] = useState<Demand | null>(null);

  const { demands, deleteDemand } = useContext(DemandContext)!;
  const [searchQuery, setSearchQuery] = useState('');
  const [show, setShow] = useState(false); // Add setShow to manage modal visibility
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const demandsPerPage = 20;

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

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

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const filteredDemands = useMemo(() => {
    let sortedDemands = [...demands];

    if (searchQuery !== '') {
      sortedDemands = sortedDemands.filter((demand) =>
        demand.description.toLowerCase().includes(searchQuery.toLowerCase())
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
            <button onClick={() => handleEdit(demand)}>Edit</button>
          </td>
          <td>
            <button onClick={() => handleDeleteDemand(demand.id)}>Delete</button>
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
            <h2>Manage Demands</h2>
          </div>
          <div className="col-sm-6">
            <Button onClick={handleShow} className="btn btn-success" data-toggle="modal">
              <i className="material-icons">&#xE147;</i> <span>Add New Demand</span>
            </Button>
          </div>
        </div>
      </div>

      <DemandsSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <DemandsTable
        sortColumn={sortColumn}
        sortOrder={sortOrder}
        handleSort={handleSort}
        demandItems={demandItems}
      />

      <Pagination
        pages={totalPagesNum}
        setCurrentPage={setCurrentPage}
        currentDemands={slicedDemands}
        demands={filteredDemands}
      />

      <DemandsModal
        show={show}
        handleClose={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Demand</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close Button
          </Button>
        </Modal.Footer>
      </DemandsModal>

      <DemandsModal
        show={showEditModal}
        handleClose={handleCloseEditModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Demand</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDemand && <EditForm theDemand={selectedDemand} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
        </Modal.Footer>
      </DemandsModal>
    </>
  );
};

export default DemandsList;
