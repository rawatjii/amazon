import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap";
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { getDatabase, ref, set, onValue, remove } from "firebase/database";
import {CDBDataTable} from 'cdbreact';
import { v4 as uuidv4 } from 'uuid';
import { getAllUsers } from '../../../firebase-config';
import { ToastContainer, toast } from 'react-toastify';
import { writeBrands } from '../../../firebase-config';
import 'react-toastify/dist/ReactToastify.css';

const columns = [
	{
	  label: 'Brand Name',
	  field: 'brandName',
	  width: 150,
	},
	{
        label: 'Actions',
        field: 'actions',
        width: 200,
    },
  ];

const Brands = ()=>{
	const [brandRows, setBrandRows] = useState([]);
	const [show, setShow] = useState(false);

	const brandName = useRef('');

	const handleClose = () => setShow(false);
  	const handleShow = () => setShow(true);
	const successNotify = (msg) => toast.success(msg);
	const openModal = (id)=>{
		setShow(true);
	}

	useEffect(()=>{
		const db = getDatabase();
		const brandRef = ref(db, 'brands/')

		onValue(brandRef, (snapshot)=>{
			const data = snapshot.val();

			if(data){
				debugger
				const brandRows = Object.entries(data).map(([key, value])=>{
					return{
						brandName:value.brand,
						actions:[
							<button href='' key={`edit_${key}`} onClick={()=>openModal(value.userId)}>Edit</button>,
							<a href='' key={`remove_${key}`}>Remove</a>
						]
					}
				})

				setBrandRows(brandRows)
			}
		})
	}, [])
	

	const brandSubmitHandler = (e)=>{
		e.preventDefault();
		writeBrands(uuidv4(), brandName.current.value);
		successNotify('Brand Added successfully');
		// id:uuidv4(),
	}
	

    return(
        <>
            <Header />
            <Sidebar />
            <div className="page-wrapper">
                <div className="page-content">
                    <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                        <div className="breadcrumb-title pe-3">CMS</div>
                        <div className="ps-3">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb mb-0 p-0">
                                    <li className="breadcrumb-item">
                                        <NavLink to="/admin">
                                            <i className="bx bx-home-alt"></i>
                                        </NavLink>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">Brands</li>
                                </ol>
                            </nav>
                        </div>

                    </div>
                
                    <div className="card">
                        <div className="card-body">
						<Button variant="primary" onClick={handleShow}>
							Add Brand
						</Button>

							<CDBDataTable
								striped
								bordered
								hover
								// entriesOptions={[5, 20, 25]}
								entries={5}
								pagesAmount={4}
								data={{
									columns:columns,
									rows:brandRows
								}}
								sortable={false}
								materialSearch={true}
							/>
                        </div>
                    </div>


                </div>
            </div>

			<Modal show={show} onHide={handleClose}>
				<form onSubmit={brandSubmitHandler}>
					
				<Modal.Header closeButton>
					<Modal.Title>Add Brand</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<label htmlFor="">Brand</label>
					<input type="text" className='form-control' placeholder='Enter Brand Name' ref={brandName} />
				</Modal.Body>
				<Modal.Footer>
					<Button vraiant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleClose} type='submit'>
						Save Changes
					</Button>
				</Modal.Footer>
				
				</form>
			</Modal>
        </>
    )
}

export default Brands;