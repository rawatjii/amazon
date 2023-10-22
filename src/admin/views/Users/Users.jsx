import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { getDatabase, ref, set, onValue, remove } from "firebase/database";
import {CDBDataTable} from 'cdbreact';
import { getAllUsers } from '../../../firebase-config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const columns = [
	{
	  label: 'Name',
	  field: 'name',
	  width: 150,
	},
	{
	  label: 'Email',
	  field: 'email',
	  width: 270,
	},
	{
	  label: 'Image',
	  field: 'image',
	  width: 200,
	},
	// {
	// 	label: 'Actions',
	// 	field: 'actions',
	// 	width: 200,
	//   },
  ];

const Users = ()=>{
	// var usersRef;
	// debugger;
	const [userRows, setUserRows] = useState([])
	const notify = (msg) => toast(msg);
	
	useEffect(() => {
		const db = getDatabase();
		const usersRef = ref(db, 'users/');
		
		onValue(usersRef, (snapshot) => {
			const data = snapshot.val();
			
			if (data) {
				const newUserRows = Object.entries(data).map(([key, value]) => ({
					id: key,
					name: value.username,
					image: <img src={value.profile_picture} alt="" width={30}/>,
					email: value.email,
					// actions: <i className='bx bxs-trash' onClick={()=>userDeleteHandler(key)} style={{cursor:'pointer'}}></i>
				}));
		
				setUserRows(newUserRows);
			}
		});

	}, []);

	// const userDeleteHandler = (id)=>{
	// 	const db = getDatabase();
	// 	const userRef = ref(db, `users/${id}`);

	// 	remove(userRef)
	// 	.then(()=>{
	// 		notify('User deleted successfully.')
	// 	})
	// 	.catch((error) => {
	// 		notify('Error deleting User: ' + error.message)
	// 	});
	// }
	

    return(
        <>
            <Header />
            <Sidebar />
            <div className="page-wrapper">
                <div className="page-content">
                    <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                        <div className="breadcrumb-title pe-3">Authentication</div>
                        <div className="ps-3">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb mb-0 p-0">
                                    <li className="breadcrumb-item">
                                        <NavLink to="/admin">
                                            <i className="bx bx-home-alt"></i>
                                        </NavLink>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">Users</li>
                                </ol>
                            </nav>
                        </div>

                    </div>
                
                    <div className="card">
                        <div className="card-body">

							<CDBDataTable
								striped
								bordered
								hover
								// entriesOptions={[5, 20, 25]}
								entries={5}
								pagesAmount={4}
								data={{
									columns:columns,
									rows:userRows
								}}
								sortable={false}
								materialSearch={true}
							/>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default Users;