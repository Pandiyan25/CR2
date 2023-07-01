import React from "react";
import "./navbar.css"
function Navbar(){
    return(
        <>
        <nav class="pcoded-navbar menupos-fixed ">
		<div class="navbar-wrapper  ">
			<div class="navbar-content scroll-div " >
				
				<div class="">
					<div class="main-menu-header">
						<img class="img-radius" src="assets/images_amepos/logo-jb.png" alt="logo-client"/>
						<div class="user-details">
							<span class="mb-0 font-weight-bold">Jayanthi Bakery</span>
							<div><small>Powered @ AMEPOS</small></div>
						</div>
					</div>
					
				</div>






				
				<ul class="nav pcoded-inner-navbar ">

					<li class="nav-item"><a href="index.php" class="nav-link "><span class="pcoded-micon"><i class="feather icon-home"></i></span><span class="pcoded-mtext">Dashboard</span></a></li>

					<li class="nav-item"><a href="onlineorders.php" class="nav-link "><span class="pcoded-micon"><i class="feather icon-shopping-cart"></i></span><span class="pcoded-mtext">Online Orders&nbsp;<span>(5)</span></span></a></li>

					


					<li class="nav-item pcoded-hasmenu">
						<a href="#!" class="nav-link "><span class="pcoded-micon"><i class="feather icon-airplay"></i></span><span class="pcoded-mtext">Store Setup</span></a>
						<ul class="pcoded-submenu">
							<li><a href="outlet-setup.php">Outlet Setup</a></li>
							<li><a href="bill-receipt-settings.php">Bill/Receipt Settings</a></li>
							<li><a href="terminal.php">Terminal Settings</a></li>
							<li><a href="printer.php">Printer Settings</a></li>
							<li><a href="online-availability.php">Online Availability</a></li>
						</ul>
					</li>


					<li class="nav-item pcoded-hasmenu">
						<a href="#!" class="nav-link "><span class="pcoded-micon"><i class="feather icon-box"></i></span><span class="pcoded-mtext">Inventory</span></a>
						<ul class="pcoded-submenu">
							<li><a href="category.php">Category</a></li>
							<li><a href="inventory-list.php">Inventory List</a></li>
							<li><a href="minimum-stock.php">Minimum Stock</a></li>
							<li><a href="addons.php">Addons</a></li>
							<li><a href="manage-recipe.php">Receipe Management</a></li>
							<li class="pcoded-hasmenu">
								<a href="#">Production Management</a>
								<ul class="pcoded-submenu">
									<li><a href="create-estimate.php">Create Estimate</a></li>
									<li><a href="review-estimate.php">Review Estimate</a></li>
									<li><a href="quality-check.php">Quality Check</a></li>
								</ul>
							</li>
						</ul>
					</li>


					<li class="nav-item pcoded-hasmenu">
						<a href="#!" class="nav-link "><span class="pcoded-micon"><i class="feather icon-corner-left-down"></i></span><span class="pcoded-mtext">Purchase</span></a>
						<ul class="pcoded-submenu">
							<li><a href="purchase-inventory.php">Purchase Inventory</a></li>
							<li><a href="purchase-report.php">Purchase Report</a></li>
						</ul>
					</li>

					<li class="nav-item pcoded-hasmenu">
						<a href="#!" class="nav-link "><span class="pcoded-micon"><i class="feather icon-settings"></i></span><span class="pcoded-mtext">Settings</span></a>
						<ul class="pcoded-submenu">
							<li><a href="tax-system.php">Tax Mangement</a></li>
							<li><a href="display-price.php">Display Price</a></li>
							<li><a href="tables-tokens.php">Tables & Tokens</a></li>
							<li><a href="e-wallet.php">E-Wallet</a></li>
							<li><a href="mail-reports.php">Mail Reports</a></li>
							<li><a href="time-group.php">Time Group</a></li>
						</ul>
					</li>

					<li class="nav-item pcoded-hasmenu">
						<a href="#!" class="nav-link "><span class="pcoded-micon"><i class="feather icon-user"></i></span><span class="pcoded-mtext">CRM</span></a>
						<ul class="pcoded-submenu">
							<li><a href="sms-watsapp.php">SMS/Watsapp</a></li>
							<li><a href="loyalty-points.php">Loyalty Points</a></li>
						</ul>
					</li>

					

					<li class="nav-item"><a href="stakeholders.php" class="nav-link "><span class="pcoded-micon"><i class="feather icon-users"></i></span><span class="pcoded-mtext">Stake Holders</span></a></li>

					<li class="nav-item pcoded-hasmenu">
						<a href="#!" class="nav-link "><span class="pcoded-micon"><i class="feather icon-clipboard"></i></span><span class="pcoded-mtext">Accounts</span></a>
						<ul class="pcoded-submenu">
							<li><a href="employees-expense.php">Employees Expense</a></li>
							<li><a href="supplier-statement.php">Supplier Statement</a></li>
							<li><a href="supplier-payout.php">Supplier Payout</a></li>
						</ul>
					</li>

					<li class="nav-item"><a href="qrcode.php" class="nav-link "><span class="pcoded-micon"><i class="feather icon-maximize"></i></span><span class="pcoded-mtext">QR Code</span></a></li>

					

					<li class="nav-item"><a href="sales-summary.php" class="nav-link "><span class="pcoded-micon"><i class="feather icon-file-text"></i></span><span class="pcoded-mtext">Reports</span></a></li>

				</ul>
				
				<div class="card text-center">
					<div class="card-block">
						<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
						<i class="feather icon-sunset f-40"></i>
						<h6 class="mt-3">Help?</h6>
						<p>Please contact us on our email for need any support</p>
						<a href="#!" target="_blank" class="btn btn-primary btn-sm text-white m-0">Support</a>
					</div>
				</div>
				
			</div>
		</div>
	</nav>
        </>
    )
}

export default Navbar