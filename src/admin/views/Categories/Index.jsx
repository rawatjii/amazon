import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap";
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { getDatabase, ref, set, onValue, remove } from "firebase/database";
import {CDBDataTable} from 'cdbreact';
import { v4 as uuidv4 } from 'uuid';
import { getAllUsers, updateBrand, removeCategory, addCategory, getBrandById, getAllCategories } from '../../../firebase-config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const columns = [
	{
	  label: 'Category Name',
	  field: 'categoryName',
	  width: 150,
	},
	{
        label: 'Actions',
        field: 'actions',
        width: 200,
    },
  ];

  const Categories = () => {
	const [categoryRows, setCategoryRows] = useState([]);
	const [show, setShow] = useState(false);
	const [showModal, setShowModal] = useState(false);
  
	const categoryName = useRef('');
	const editBrandName = useRef();
	const editBrandId = useRef()

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
  
	const successNotify = (msg) => toast.success(msg);
	const errorNotify = (msg) => toast.error(msg);
  
	const openModal = async (e, id) => {
	  e.preventDefault();
	  try {
		  setShowModal(true);
		  const brandData = await getBrandById(id);
		  if (editBrandName.current) {
				editBrandId.current.value = brandData.brandId;
			  editBrandName.current.value = brandData.brand;
			}
	  } catch (err) {
		console.log(err);
	  }
	};
  
	const hideModal = () => {
	  setShowModal(false);
	};

	const allCategories = async ()=>{
		try{
			const allCategoriesData = await getAllCategories()
			if(allCategoriesData){
				const categoryRowsData = Object.values(allCategoriesData).map(category=>{
					return {
						categoryName:category.category,
						actions:[
							<Link key={`edit_${category.id}`} to={category.id}>Add Sub Categories</Link>,
							<a key={`remove_${category.id}`} onClick={()=>{removeCategoryHandler(category.id)}} >Remove</a>
						]
					}
				})
				setCategoryRows(categoryRowsData)
				console.log('allCategoriesData',allCategoriesData);
			}else{
				setCategoryRows([])
			}
		}catch(err){
			setCategoryRows([])
		}

	}

	useEffect(()=>{
		allCategories()
	}, [])

	

		// const db = getDatabase();
		// const brandRef = ref(db, 'brands/')

		// onValue(brandRef, (snapshot)=>{
		// 	const data = snapshot.val();

		// 	if(data){
		// 		const brandRows = Object.entries(data).map(([key, value])=>{
		// 			return{
		// 				brandName:value.brand,
		// 				actions:[
		// 					<button key={`edit_${key}`} onClick={(e)=>openModal(e, value.brandId)}>Edit</button>,
		// 					<a key={`remove_${key}`} onClick={()=>removeBrandHandler(value.brandId)}>Remove</a>
		// 				]
		// 			}
		// 		})

		// 		setCategoryRows(brandRows)
		// 	}else{
		// 		setCategoryRows([])
		// 	}
		// })
	

	const categorySubmitHandler = async (e) => {
		e.preventDefault();
		try{
			await addCategory(uuidv4(), categoryName.current.value);
			successNotify('Category Added successfully');

			// Trigger a re-fetch of categories after adding a new category
			allCategories();
			setShow(false);
		}
		catch(err){
			errorNotify(err.message);
		}
	};

	const editBrandHandler = (e)=>{
		e.preventDefault();
		const id = editBrandId.current.value;
		const brandData = {
			brand:editBrandName.current.value,
			brandId:id
		}

		updateBrand(id, brandData);
		successNotify('Brand Edit successfully');
	}

	const removeCategoryHandler = async(id)=>{
		await removeCategory(id);		
		successNotify('Category Deleted successfully');

		// Trigger a re-fetch of categories after adding a new category
		allCategories();
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
                                    <li className="breadcrumb-item active" aria-current="page">Categories</li>
                                </ol>
                            </nav>
                        </div>

                    </div>
                
                    <div className="card">
                        <div className="card-body">
						<Button variant="primary" onClick={handleShow}>
							Add Categories
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
        <form onSubmit={categorySubmitHandler}>
          <Modal.Header closeButton>
            <Modal.Title>Add Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label htmlFor="">Category</label>
            <input type="text" className="form-control" placeholder="Enter Category Name" ref={categoryName} />
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
        <form onSubmit={editBrandHandler}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Brand</Modal.Title>
          </Modal.Header>
          <Modal.Body>
			<input type="hidden" ref={editBrandId} className='form-control' />
            <label htmlFor="">Brand</label>
            <input type="text" className="form-control" placeholder="Enter Brand Name" ref={editBrandName} />
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

export default Categories;