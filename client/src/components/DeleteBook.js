import { Modal, Button } from 'react-bootstrap'

export default function DeleteBook({ showDelete, handleCloseDelete, setConfirmDelete }) {

    const handleDelete = () => {
        setConfirmDelete(true)
    }

    return (
        <Modal show={showDelete} onHide={handleCloseDelete} centered>
            <Modal.Body className="text-dark">
                <div style={{fontSize: '20px', fontWeight: '900'}}>
                    Delete Data
                </div>
                <div style={{fontSize: '16px', fontWeight: '500'}} className="mt-2">
                    Are you sure you want to delete this Book?
                </div>
                <div className="text-end mt-5">
                    <Button onClick={handleDelete} size="sm" className="btn-danger me-2" style={{width: '135px'}}>Yes</Button>
                    <Button onClick={handleCloseDelete} size="sm" className="btn-secondary" style={{width: '135px'}}>No</Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}
