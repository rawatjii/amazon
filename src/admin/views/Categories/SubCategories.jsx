import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useParams, Link } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap";
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { getDatabase, ref, set, onValue, remove } from "firebase/database";
import {CDBDataTable} from 'cdbreact';
import { v4 as uuidv4 } from 'uuid';
import { getCategoryById, updateSubCategory, removeBrand, removeSubCategory, addSubCategory } from '../../../firebase-config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const columns = [
	{
	  label: 'Sub Category',
	  field: 'subCategory',
	  width: 150,
	},
	{
        label: 'Actions',
        field: 'actions',
        width: 200,
    },
  ];

  const SubCategories = () => {
	const [categoryRows, setCategoryRows] = useState([]);
	const [subCatInput, setSubCatInput] = useState(false);
	const [show, setShow] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const {id} = useParams();
  
	const subCategoryName = useRef('');
	const editCategoryName = useRef();
	const editCategoryId = useRef()

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
  
	const successNotify = (msg) => toast.success(msg);
	const errorNotify = (msg) => toast.error(msg);
  
	const openModal = async (e, subCategoryId) => {
	  e.preventDefault();
	  try {
		  setShowModal(true);
		  const allCategoryData = await getCategoryById(id);
		  if (editCategoryName.current) {
				editCategoryId.current.value = subCategoryId;

				Object.values(allCategoryData.subCategories).map(data=>{
					if(data.id === subCategoryId){
						editCategoryName.current.value = data.category;
					}
				})

			}
	  } catch (err) {
		console.log(err);
	  }
	};
  
	const hideModal = () => {
	  setShowModal(false);
	};

	const allSubCategories = async ()=>{
		try{

			const allCategories = await getCategoryById(id);
			if(allCategories){
				console.log('allCategories',allCategories);
				if(allCategories.hasOwnProperty('subCategories')){
					const categoryRowsData = Object.values(allCategories.subCategories).map(category=>{
						return {
							subCategory:category.category,
							actions:[
								<button key={`edit_${category.id}`} onClick={(e)=>openModal(e, category.id)}>Edit</button>,
								<a key={`remove_${category.id}`} onClick={()=>{removeCategoryHandler(id, category.id)}} >Remove</a>
							]
						}
					})
					setCategoryRows(categoryRowsData)
				}else{
					
					setCategoryRows([])
				}
			}else{
				setCategoryRows([])
			}

		}catch(err){
			console.log(err)
		}
		
	}

	useEffect(()=>{
		allSubCategories()
	}, [])
	

	const subCategorySubmitHandler = async (e) => {
		e.preventDefault();

		if(subCategoryName.current.value === ''){
			setSubCatInput(true);
			return;
		}

		try{
			await addSubCategory(id, uuidv4(), subCategoryName.current.value);
			setShow(false);
			successNotify('Sub Category Added successfully');
			allSubCategories()
		}
		catch(err){
			errorNotify(err.message);
		}
	};

	const editSubCategoryHandler = async(e)=>{
		e.preventDefault();
		const subCategoryId = editCategoryId.current.value;
		const subCategoryData = {
			category:editCategoryName.current.value,
			// brandId:id
		}

		await updateSubCategory(id, subCategoryId, subCategoryData);
		successNotify('Sub Category Updated Successfully');
		allSubCategories()
	}

	const removeCategoryHandler = async(catId, subCatId)=>{
		await removeSubCategory(catId, subCatId);
		successNotify('Sub Category Deleted successfully');
		allSubCategories()
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
									<li className="breadcrumb-item">
                                        <NavLink to="/admin/categories">
                                            Categories
                                        </NavLink>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">Sub Categories</li>
                                </ol>
                            </nav>
                        </div>

                    </div>
                
                    <div className="card">
                        <div className="card-body">
						<Button variant="primary" onClick={handleShow}>
							Add Sub Category
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
									rows:categoryRows
								}}
								sortable={false}
								materialSearch={true}
							/>
                        </div>
                    </div>


                </div>
            </div>

		<Modal show={show} onHide={handleClose}>
			<form onSubmit={subCategorySubmitHandler}>
				<Modal.Header closeButton>
					<Modal.Title>Add Sub Category</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<label htmlFor="">Sub Category</label>
					<input type="text" className="form-control" placeholder="Enter Sub Category" ref={subCategoryName} />
					{subCatInput ? <span className='error'>Please enter sub category</span> : null}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
					Close
					</Button>
					<Button variant="primary" type="submit">
					Save Changes
					</Button>
				</Modal.Footer>
			</form>
		</Modal>

      <Modal show={showModal} onHide={hideModal}>
        <form onSubmit={editSubCategoryHandler}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Sub Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
			<input type="hidden" ref={editCategoryId} className='form-control' />
            <label htmlFor="">Sub Category</label>
            <input type="text" className="form-control" placeholder="Sub Category" ref={editCategoryName} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={hideModal}>
              Close
            </Button>
            <Button variant="primary" onClick={hideModal} type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
        </>
    )
}

export default SubCategories;