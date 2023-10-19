import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/Sidebar/Sidebar';

const Users = ()=>{
    return(
        <>
            <Header />
            <Sidebar />
            <div class="page-wrapper">
                <div class="page-content">
                    <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                        <div class="breadcrumb-title pe-3">eCommerce</div>
                        <div class="ps-3">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb mb-0 p-0">
                                    <li class="breadcrumb-item">
                                        <NavLink to="/admin">
                                            <i class="bx bx-home-alt"></i>
                                        </NavLink>
                                    </li>
                                    <li class="breadcrumb-item active" aria-current="page">Users</li>
                                </ol>
                            </nav>
                        </div>

                    </div>
                
                    <div class="card">
                        <div class="card-body">

                            <div class="table-responsive">
                                <table class="table mb-0">
                                    <thead class="table-light">
                                        <tr>
                                            <th>Order#</th>
                                            <th>Company Name</th>
                                            <th>Status</th>
                                            <th>Total</th>
                                            <th>Date</th>
                                            <th>View Details</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div class="d-flex align-items-center">
                                                    <div>
                                                        <input class="form-check-input me-3" type="checkbox" value="" aria-label="..." />
                                                    </div>
                                                    <div class="ms-2">
                                                        <h6 class="mb-0 font-14">#OS-000354</h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>Gaspur Antunes</td>
                                            <td><div class="badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3"><i class='bx bxs-circle me-1'></i>FulFilled</div></td>
                                            <td>$485.20</td>
                                            <td>June 10, 2020</td>
                                            <td><button type="button" class="btn btn-primary btn-sm radius-30 px-4">View Details</button></td>
                                            <td>
                                                <div class="d-flex order-actions">
                                                    <a href="javascript:;" class=""><i class='bx bxs-edit'></i></a>
                                                    <a href="javascript:;" class="ms-3"><i class='bx bxs-trash'></i></a>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="d-flex align-items-center">
                                                    <div>
                                                        <input class="form-check-input me-3" type="checkbox" value="" aria-label="..." />
                                                    </div>
                                                    <div class="ms-2">
                                                        <h6 class="mb-0 font-14">#OS-000986</h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>Gaspur Antunes</td>
                                            <td><div class="badge rounded-pill text-info bg-light-info p-2 text-uppercase px-3"><i class='bx bxs-circle align-middle me-1'></i>Confirmed</div></td>
                                            <td>$650.30</td>
                                            <td>June 12, 2020</td>
                                            <td><button type="button" class="btn btn-primary btn-sm radius-30 px-4">View Details</button></td>
                                            <td>
                                                <div class="d-flex order-actions">
                                                    <a href="javascript:;" class=""><i class='bx bxs-edit'></i></a>
                                                    <a href="javascript:;" class="ms-3"><i class='bx bxs-trash'></i></a>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="d-flex align-items-center">
                                                    <div>
                                                        <input class="form-check-input me-3" type="checkbox" value="" aria-label="..." />
                                                    </div>
                                                    <div class="ms-2">
                                                        <h6 class="mb-0 font-14">#OS-000536</h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>Gaspur Antunes</td>
                                            <td><div class="badge rounded-pill text-warning bg-light-warning p-2 text-uppercase px-3"><i class='bx bxs-circle align-middle me-1'></i>Partially shipped</div></td>
                                            <td>$159.45</td>
                                            <td>June 14, 2020</td>
                                            <td><button type="button" class="btn btn-primary btn-sm radius-30 px-4">View Details</button></td>
                                            <td>
                                                <div class="d-flex order-actions">
                                                    <a href="javascript:;" class=""><i class='bx bxs-edit'></i></a>
                                                    <a href="javascript:;" class="ms-3"><i class='bx bxs-trash'></i></a>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default Users;