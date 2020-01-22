let router = require('express').Router();
// Import contact controller
var branch = require('../controllers/branchController');
router.route('/createbranch').post(branch.CreateBranch);
router.route('/getbranch').get(branch.GetAllBranch);
router.route('/deletebranch/:Id').delete(branch.deletebranch);
router.route('/branchList/:branchid').get(branch.GetBranchList);
router.route('/updateBranch/:Id').put(branch.UpdateBranch);
router.route('/getbranchbyid/:branchid').get(branch.GetBranchListbyid);
router.route('/branchListdata/:branchid').get(branch.GetBranchListss);

router.route('/getfees').get(branch.GetallFees);
router.route('/createfees').post(branch.CreateallFees);
router.route('/deletefees/:id').delete(branch.deleteallFees);
router.route('/updatefees/:id').put(branch.UpdateallFees);
router.route('/getfeesbyid/:id').get(branch.GetFeesById);

router.route('/getleads').get(branch.GetAllLeads);
router.route('/postleads').post(branch.CreateLeads);
router.route('/updateleads/:Id').put(branch.UpdateLeads);
router.route('/getList/:Id').get(branch.UserDetailList);
router.route('/deletelead/:Id').delete(branch.DeleteLeadRecord);

/****************************Get college Types********************************** */
router.route('/getcollegetypes').get(branch.GetcollegeTypes);
router.route('/postcollegetypes').post(branch.CreatecollegeTypes);
router.route('/updatecollegetypes/:Id').put(branch.UpdatecollegeTypes);
router.route('/getsinglecollegetype/:Id').get(branch.GetsingleCollegetypes);
router.route('/deletecollegetype/:Id').delete(branch.DeletecollegeTypes);


/****************************Get Branch Types********************************** */
router.route('/getbranchtypes').get(branch.GetBranchTypes);
router.route('/postbranchtypes').post(branch.CreateBranchTypes);
router.route('/updatebranchtypes/:Id').put(branch.UpdateBranchTypes);
router.route('/getsinglebranchtype/:Id').get(branch.GetsingleBranchTypes);
router.route('/deletebranchtype/:Id').delete(branch.DeleteBranchTypes);


/****************************Get Infrastructure Types********************************** */
router.route('/getinfrastructure').get(branch.GetInfrastructure);
router.route('/postinfrastructure').post(branch.CreateInfrastructure);
router.route('/updateinfrastructure/:Id').put(branch.UpdateInfrastructure);
router.route('/getinfrastructurebyid/:Id').get(branch.GetsingleInfrastructure);
router.route('/deleteinfrastructure/:Id').delete(branch.DeleteInfrastructure);


/****************************Get Exam Types********************************** */
router.route('/getexamtypes').get(branch.GetExamTypes);
router.route('/postexamtypes').post(branch.CreateExamTypes);
router.route('/updateexamtypes/:Id').put(branch.UpdateExamTypes);
router.route('/getexamtypesbyid/:Id').get(branch.GetsingleExamTypes);
router.route('/deleteexamtypes/:Id').delete(branch.DeleteExamTypes);

/****************************Get Company Types********************************** */
router.route('/getcomapnytypes').get(branch.GetCompanyTypes);
router.route('/postcomapnytypes').post(branch.CreateExamTypes);
router.route('/updatecomapnytypes/:Id').put(branch.UpdateCompanyTypes);
router.route('/getcomapnytypesbyid/:Id').get(branch.GetsingleCompanyTypes);
router.route('/deletecomapnytypes/:Id').delete(branch.DeleteCompanyTypes);


module.exports = router;
