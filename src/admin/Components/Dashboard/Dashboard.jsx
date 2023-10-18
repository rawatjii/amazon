import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';

const Dashboard = ()=>{
    return(
        <>
            <Header />
            <Sidebar />
            
            <div class="page-wrapper">
				<div class="page-content">
					<div class="row row-cols-1 row-cols-lg-4">
						<div class="col">
							<div class="card radius-10 overflow-hidden bg-gradient-cosmic">
								<div class="card-body">
									<div class="d-flex align-items-center">
										<div>
											<p class="mb-0 text-white">Total Orders</p>
											<h5 class="mb-0 text-white">867</h5>
										</div>
										<div class="ms-auto text-white"><i class='bx bx-cart font-30'></i>
										</div>
									</div>
									<div class="progress bg-white-2 radius-10 mt-4" style={{height:'4.5px'}}>
										<div class="progress-bar bg-white" role="progressbar" style={{width: '46%'}}></div>
									</div>
								</div>
							</div>
						</div>
						<div class="col">
							<div class="card radius-10 overflow-hidden bg-gradient-burning">
								<div class="card-body">
									<div class="d-flex align-items-center">
										<div>
											<p class="mb-0 text-white">Total Income</p>
											<h5 class="mb-0 text-white">$52,945</h5>
										</div>
										<div class="ms-auto text-white"><i class='bx bx-wallet font-30'></i>
										</div>
									</div>
									<div class="progress bg-white-2 radius-10 mt-4" style={{height:'4.5px'}}>
										<div class="progress-bar bg-white" role="progressbar" style={{width: '72%'}}></div>
									</div>
								</div>
							</div>
						</div>
						<div class="col">
							<div class="card radius-10 overflow-hidden bg-gradient-Ohhappiness">
								<div class="card-body">
									<div class="d-flex align-items-center">
										<div>
											<p class="mb-0 text-white">Total Users</p>
											<h5 class="mb-0 text-white">24.5K</h5>
										</div>
										<div class="ms-auto text-white"><i class='bx bx-bulb font-30'></i>
										</div>
									</div>
									<div class="progress bg-white-2 radius-10 mt-4" style={{height:'4.5px'}}>
										<div class="progress-bar bg-white" role="progressbar" style={{width: '68%'}}></div>
									</div>
								</div>
							</div>
						</div>
						<div class="col">
							<div class="card radius-10 overflow-hidden bg-gradient-moonlit">
								<div class="card-body">
									<div class="d-flex align-items-center">
										<div>
											<p class="mb-0 text-white">Comments</p>
											<h5 class="mb-0 text-white">869</h5>
										</div>
										<div class="ms-auto text-white"><i class='bx bx-chat font-30'></i>
										</div>
									</div>
									<div class="progress  bg-white-2 radius-10 mt-4" style={{height:'4.5px'}}>
										<div class="progress-bar bg-white" role="progressbar" style={{width: '66%'}}></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* end row */}

					<div class="row row-cols-1 row-cols-lg-3">
						<div class="col d-flex">
							<div class="card radius-10 w-100">
								<div class="card-body">
									<div class="d-flex align-items-center">
										<div>
											<h6 class="font-weight-bold mb-0">Best Selling Products</h6>
										</div>
										<div class="dropdown ms-auto">
											<div class="cursor-pointer text-dark font-24 dropdown-toggle dropdown-toggle-nocaret" data-bs-toggle="dropdown"><i class="bx bx-dots-horizontal-rounded text-option"></i>
											</div>
											<div class="dropdown-menu dropdown-menu-end">
												<a class="dropdown-item" href="javaScript:;">Action</a>
												<a class="dropdown-item" href="javaScript:;">Another action</a>
												<div class="dropdown-divider"></div>	
												<a class="dropdown-item" href="javaScript:;">Something else here</a>
											</div>
										</div>
									</div>
								</div>
									<div class="best-selling-products p-3 mb-3">
										<div class="d-flex align-items-center">
											<div class="product-img">
												<img src="assets/images/icons/ice-cream-cornet.png" class="p-1" alt="" />
											</div>
											<div class="ps-3">
												<h6 class="mb-0 font-weight-bold">Cone Ice Cream</h6>
												<p class="mb-0 text-secondary">$29/Each 56 Orders</p>
											</div>
											<p class="ms-auto mb-0 text-purple">$521.52</p>
										</div>
										<hr/>
										<div class="d-flex align-items-center">
											<div class="product-img">
												<img src="assets/images/icons/wine-glass.png" class="p-1" alt="" />
											</div>
											<div class="ps-3">
												<h6 class="mb-0 font-weight-bold">Wine Glass</h6>
												<p class="mb-0 text-secondary">$30/Each 48 Orders</p>
											</div>
											<p class="ms-auto mb-0 text-purple">$406.87</p>
										</div>
										<hr/>
										<div class="d-flex align-items-center">
											<div class="product-img">
												<img src="assets/images/icons/banana.png" class="p-1" alt="" />
											</div>
											<div class="ps-3">
												<h6 class="mb-0 font-weight-bold">Banana Toy</h6>
												<p class="mb-0 text-secondary">$26/Each 66 Orders</p>
											</div>
											<p class="ms-auto mb-0 text-purple">$685.69</p>
										</div>
										<hr/>
										<div class="d-flex align-items-center">
											<div class="product-img">
												<img src="assets/images/icons/telephone.png" class="p-1" alt="" />
											</div>
											<div class="ps-3">
												<h6 class="mb-0 font-weight-bold">Old Telephone</h6>
												<p class="mb-0 text-secondary">$39/Each 26 Orders</p>
											</div>
											<p class="ms-auto mb-0 text-purple">$913.72</p>
										</div>
										<hr/>
										<div class="d-flex align-items-center">
											<div class="product-img">
												<img src="assets/images/icons/plate.png" class="p-1" alt="" />
											</div>
											<div class="ps-3">
												<h6 class="mb-0 font-weight-bold">Orange Plate</h6>
												<p class="mb-0 text-secondary">$22/Each 34 Orders</p>
											</div>
											<p class="ms-auto mb-0 text-purple">$372.62</p>
										</div>
										<hr/>
										<div class="d-flex align-items-center">
											<div class="product-img">
												<img src="assets/images/icons/telephone.png" class="p-1" alt="" />
											</div>
											<div class="ps-3">
												<h6 class="mb-0 font-weight-bold">Old Telephone</h6>
												<p class="mb-0 text-secondary">$39/Each 26 Orders</p>
											</div>
											<p class="ms-auto mb-0 text-purple">$913.72</p>
										</div>
										<hr/>
										<div class="d-flex align-items-center">
											<div class="product-img">
												<img src="assets/images/icons/banana.png" class="p-1" alt="" />
											</div>
											<div class="ps-3">
												<h6 class="mb-0 font-weight-bold">Banana Toy</h6>
												<p class="mb-0 text-secondary">$26/Each 66 Orders</p>
											</div>
											<p class="ms-auto mb-0 text-purple">$685.69</p>
										</div>
										<hr/>
										<div class="d-flex align-items-center">
											<div class="product-img">
												<img src="assets/images/icons/wine-glass.png" class="p-1" alt="" />
											</div>
											<div class="ps-3">
												<h6 class="mb-0 font-weight-bold">Wine Glass</h6>
												<p class="mb-0 text-secondary">$30/Each 48 Orders</p>
											</div>
											<p class="ms-auto mb-0 text-purple">$406.87</p>
										</div>
										<hr />
										<div class="d-flex align-items-center">
											<div class="product-img">
												<img src="assets/images/icons/ice-cream-cornet.png" class="p-1" alt="" />
											</div>
											<div class="ps-3">
												<h6 class="mb-0 font-weight-bold">Cone Ice Cream</h6>
												<p class="mb-0 text-secondary">$29/Each 56 Orders</p>
											</div>
											<p class="ms-auto mb-0 text-purple">$521.52</p>
										</div>
									</div>
							</div>
						</div>
						<div class="col d-flex">
							<div class="card radius-10 w-100">
								<div class="card-body">
									<div class="d-flex align-items-center">
										<div>
											<h6 class="font-weight-bold mb-0">Recent Reviews</h6>
										</div>
										<div class="dropdown ms-auto">
											<div class="cursor-pointer text-dark font-24 dropdown-toggle dropdown-toggle-nocaret" data-bs-toggle="dropdown"><i class="bx bx-dots-horizontal-rounded text-option"></i>
											</div>
											<div class="dropdown-menu dropdown-menu-end">
												<a class="dropdown-item" href="javaScript:;">Action</a>
												<a class="dropdown-item" href="javaScript:;">Another action</a>
												<div class="dropdown-divider"></div>	
												<a class="dropdown-item" href="javaScript:;">Something else here</a>
											</div>
										</div>
									</div>
								</div>
									<div class="recent-reviews p-3 mb-3">
										<div class="d-flex align-items-center">
											<div class="product-img">
												<img src="assets/images/icons/banana.png" class="p-1" alt="" />
											</div>
											<div class="ps-3">
												<h6 class="mb-0 font-weight-bold">Banana Toy</h6>
											</div>
											<p class="ms-auto mb-0"><i class='bx bxs-star text-warning mr-1'></i> 5.00</p>
										</div>
										<hr/>
										<div class="d-flex align-items-center">
											<div class="product-img">
												<img src="assets/images/icons/telephone.png" class="p-1" alt="" />
											</div>
											<div class="ps-3">
												<h6 class="mb-0 font-weight-bold">Old Telephone</h6>
											</div>
											<p class="ms-auto mb-0"><i class='bx bxs-star text-warning mr-1'></i> 5.00</p>
										</div>
										<hr/>
										<div class="d-flex align-items-center">
											<div class="product-img">
												<img src="assets/images/icons/wine-glass.png" class="p-1" alt="" />
											</div>
											<div class="ps-3">
												<h6 class="mb-0 font-weight-bold">Wine Glass</h6>
											</div>
											<p class="ms-auto mb-0"><i class='bx bxs-star text-warning mr-1'></i> 5.00</p>
										</div>
										<hr/>
										<div class="d-flex align-items-center">
											<div class="product-img">
												<img src="assets/images/icons/plate.png" class="p-1" alt="" />
											</div>
											<div class="ps-3">
												<h6 class="mb-0 font-weight-bold">Orange Plate</h6>
											</div>
											<p class="ms-auto mb-0"><i class='bx bxs-star text-warning mr-1'></i> 5.00</p>
										</div>
										<hr/>
										<div class="d-flex align-items-center">
											<div class="product-img">
												<img src="assets/images/icons/ice-cream-cornet.png" class="p-1" alt="" />
											</div>
											<div class="ps-3">
												<h6 class="mb-0 font-weight-bold">Cone Ice Cream</h6>
											</div>
											<p class="ms-auto mb-0"><i class='bx bxs-star text-warning mr-1'></i> 5.00</p>
										</div>
										<hr/>
										<div class="d-flex align-items-center">
											<div class="product-img">
												<img src="assets/images/icons/telephone.png" class="p-1" alt="" />
											</div>
											<div class="ps-3">
												<h6 class="mb-0 font-weight-bold">Old Telephone</h6>
											</div>
											<p class="ms-auto mb-0"><i class='bx bxs-star text-warning mr-1'></i> 5.00</p>
										</div>
										<hr/>
										<div class="d-flex align-items-center">
											<div class="product-img">
												<img src="assets/images/icons/wine-glass.png" class="p-1" alt="" />
											</div>
											<div class="ps-3">
												<h6 class="mb-0 font-weight-bold">Wine Glass</h6>
											</div>
											<p class="ms-auto mb-0"><i class='bx bxs-star text-warning mr-1'></i> 5.00</p>
										</div>
										<hr/>
										<div class="d-flex align-items-center">
											<div class="product-img">
												<img src="assets/images/icons/plate.png" class="p-1" alt="" />
											</div>
											<div class="ps-3">
												<h6 class="mb-0 font-weight-bold">Orange Plate</h6>
											</div>
											<p class="ms-auto mb-0"><i class='bx bxs-star text-warning mr-1'></i> 5.00</p>
										</div>
									</div>
								
							</div>
						</div>
						<div class="col d-flex">
							<div class="card radius-10 w-100">
								<div class="card-body">
									<div class="d-flex align-items-center">
										<div>
											<h6 class="font-weight-bold mb-0">Support Inbox</h6>
										</div>
										<div class="dropdown ms-auto">
											<div class="cursor-pointer text-dark font-24 dropdown-toggle dropdown-toggle-nocaret" data-bs-toggle="dropdown"><i class="bx bx-dots-horizontal-rounded text-option"></i>
											</div>
											<div class="dropdown-menu dropdown-menu-end">
												<a class="dropdown-item" href="javaScript:;">Action</a>
												<a class="dropdown-item" href="javaScript:;">Another action</a>
												<div class="dropdown-divider"></div>	
												<a class="dropdown-item" href="javaScript:;">Something else here</a>
											</div>
										</div>
									</div>
									</div>
									<div class="support-list p-3 mb-3">
										<div class="d-flex align-items-top">
											<div class="">
												<img src="assets/images/avatars/avatar-1.png" width="45" height="45" class="rounded-circle" alt="" />
											</div>
											<div class="ps-2">
												<h6 class="mb-1 font-weight-bold">Jordan Ntolo <span class="text-primary float-end font-13">2 hours ago</span></h6>
												<p class="mb-0 font-13 text-secondary">My item doesn't ship to correct address. Please check It Proper</p>
											</div>
										</div>
										<hr/>
										<div class="d-flex align-items-top">
											<div class="">
												<img src="assets/images/avatars/avatar-2.png" width="45" height="45" class="rounded-circle" alt="" />
											</div>
											<div class="ps-2">
												<h6 class="mb-1 font-weight-bold">Carolien Bloeme <span class="text-primary float-end font-13">3 hours ago</span></h6>
												<p class="mb-0 font-13 text-secondary">You shipped different color, I need it to be changed</p>
											</div>
										</div>
										<hr/>
										<div class="d-flex align-items-top">
											<div class="">
												<img src="assets/images/avatars/avatar-3.png" width="45" height="45" class="rounded-circle" alt="" />
											</div>
											<div class="ps-2">
												<h6 class="mb-1 font-weight-bold">Lisanne Viscall <span class="text-primary float-end font-13">12 hours ago</span></h6>
												<p class="mb-0 font-13 text-secondary">Can you please refund my money. I don't want to wait anymore</p>
											</div>
										</div>
										<hr/>
										<div class="d-flex align-items-top">
											<div class="">
												<img src="assets/images/avatars/avatar-4.png" width="45" height="45" class="rounded-circle" alt="" />
											</div>
											<div class="ps-2">
												<h6 class="mb-1 font-weight-bold">Sun Jun <span class="text-primary float-end font-13">12 Yesterday</span></h6>
												<p class="mb-0 font-13 text-secondary">Please return my phone. it is not iPhon7. I send you many request.</p>
											</div>
										</div>
										<hr/>
										<div class="d-flex align-items-top">
											<div class="">
												<img src="assets/images/avatars/avatar-5.png" width="45" height="45" class="rounded-circle" alt="" />
											</div>
											<div class="ps-2">
												<h6 class="mb-1 font-weight-bold">Lotila Remo <span class="text-primary float-end font-13">2 days ago</span></h6>
												<p class="mb-0 font-13 text-secondary">Hello, I need admin template product. how can i purchase?</p>
											</div>
										</div>
										<hr/>
										<div class="d-flex align-items-top">
											<div class="">
												<img src="assets/images/avatars/avatar-2.png" width="45" height="45" class="rounded-circle" alt="" />
											</div>
											<div class="ps-2">
												<h6 class="mb-1 font-weight-bold">Carolien Bloeme <span class="text-primary float-end font-13">3 hours ago</span></h6>
												<p class="mb-0 font-13 text-secondary">You shipped different color, I need it to be changed</p>
											</div>
										</div>
										<hr/>
										<div class="d-flex align-items-top">
											<div class="">
												<img src="assets/images/avatars/avatar-3.png" width="45" height="45" class="rounded-circle" alt="" />
											</div>
											<div class="ps-2">
												<h6 class="mb-1 font-weight-bold">Lisanne Viscall <span class="text-primary float-end font-13">12 hours ago</span></h6>
												<p class="mb-0 font-13 text-secondary">Can you please refund my money. I don't want to wait anymore</p>
											</div>
										</div>
										<hr/>
										<div class="d-flex align-items-top">
											<div class="">
												<img src="assets/images/avatars/avatar-4.png" width="45" height="45" class="rounded-circle" alt="" />
											</div>
											<div class="ps-2">
												<h6 class="mb-1 font-weight-bold">Sun Jun <span class="text-primary float-end font-13">12 Yesterday</span></h6>
												<p class="mb-0 font-13 text-secondary">Please return my phone. it is not iPhon7. I send you many request.</p>
											</div>
										</div>
									</div>
								
							</div>
						</div>
					</div>
					{/* end row */}

					<div class="card radius-10">
						<div class="card-header border-bottom-0 bg-transparent">
							<div class="d-flex align-items-center">
								<div>
									<h5 class="font-weight-bold mb-0">Recent Orders</h5>
								</div>
								<div class="ms-auto">
									<button type="button" class="btn btn-white radius-10">View More</button>
								</div>
							</div>
						</div>
						<div class="card-body">
							<div class="table-responsive">
								<table class="table mb-0 align-middle">
									<thead>
										<tr>
											<th>Photo</th>
											<th>Product Name</th>
											<th>Customer</th>
											<th>Product id</th>
											<th>Price</th>
											<th>Status</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>
												<div class="product-img bg-transparent border">
													<img src="assets/images/icons/shoes.png" class="p-1" alt="" />
												</div>
											</td>
											<td>Nike Sports NK</td>
											<td>Mitchell Daniel</td>
											<td>#9668521</td>
											<td>$99.85</td>
											<td><a href="javaScript:;" class="btn btn-sm btn-success radius-30">Delivered</a>
											</td>
										</tr>
										<tr>
											<td>
												<div class="product-img bg-transparent border">
													<img src="assets/images/icons/smartphone.png" class="p-1" alt="" />
												</div>
											</td>
											<td>Redmi Airdts</td>
											<td>Craig Clayton</td>
											<td>#8627523</td>
											<td>$59.35</td>
											<td><a href="javaScript:;" class="btn btn-sm btn-danger radius-30">Cancelled</a>
											</td>
										</tr>
										<tr>
											<td>
												<div class="product-img bg-transparent border">
													<img src="assets/images/icons/mouse.png" class="p-1" alt="" />
												</div>
											</td>
											<td>Magic Mouse 2</td>
											<td>Julia Burke</td>
											<td>#6875954</td>
											<td>$42.68</td>
											<td><a href="javaScript:;" class="btn btn-sm btn-warning radius-30">Pending</a>
											</td>
										</tr>
										<tr>
											<td>
												<div class="product-img bg-transparent border">
													<img src="assets/images/icons/tshirt.png" class="p-1" alt="" />
												</div>
											</td>
											<td>Coton-T-Shirt</td>
											<td>Clark Natela</td>
											<td>#4587892</td>
											<td>$32.78</td>
											<td><a href="javaScript:;" class="btn btn-sm btn-success radius-30">Delivered</a>
											</td>
										</tr>
										<tr>
											<td>
												<div class="product-img bg-transparent border">
													<img src="assets/images/icons/headphones.png" class="p-1" alt="" />
												</div>
											</td>
											<td>Headphones 7</td>
											<td>Robin Mandela</td>
											<td>#5587426</td>
											<td>$29.52</td>
											<td><a href="javaScript:;" class="btn btn-sm btn-success radius-30">Delivered</a>
											</td>
										</tr>
										<tr>
											<td>
												<div class="product-img bg-transparent border">
													<img src="assets/images/icons/mouse.png" class="p-1" alt="" />
												</div>
											</td>
											<td>Magic Mouse 2</td>
											<td>Julia Burke</td>
											<td>#6875954</td>
											<td>$42.68</td>
											<td><a href="javaScript:;" class="btn btn-sm btn-warning radius-30">Pending</a>
											</td>
										</tr>
										<tr>
											<td>
												<div class="product-img bg-transparent border">
													<img src="assets/images/icons/tshirt.png" class="p-1" alt="" />
												</div>
											</td>
											<td>Coton-T-Shirt</td>
											<td>Clark Natela</td>
											<td>#4587892</td>
											<td>$32.78</td>
											<td><a href="javaScript:;" class="btn btn-sm btn-success radius-30">Delivered</a>
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

export default Dashboard;