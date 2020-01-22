// Filename: api-routes.js
let router = require('express').Router();
// Import contact controller
var AuthController = require('../controllers/authController');
var middleware = require('../middlewares/authusers.middleware');

// Contact routes
router.route('/login').post(AuthController.Login);
router.route('/getotpCode').post(AuthController.GetOtpCode);
router.route('/createUser').post(AuthController.CreateUser);
router.route('/createcollege').post(AuthController.CreateCollege);
router.route('/shortlistcollege').post(AuthController.ShortListCollege);
router.route('/getshortlistcollege').post(AuthController.GetAllShortListCollege);

//router.route('/createpost').post(AuthController.CreatePost);
router.route('/searchcollege').post(AuthController.SeacrhCollege);
router.route('/updatecollege').put(AuthController.UpdateCollege);
router.route('/getcollege').post(AuthController.GetDataCollege);
router.route('/getallcollege').get(AuthController.GetAllCollegeData);
router.route('/getcollegeById/:id').get(AuthController.GetCollegeById);
router.route('/getcollegebylimit').post(AuthController.GetCollegeDataByLimit);
router.route('/gettopcollege').get(AuthController.GetTopDataCollege);
router.route('/deletecollege/:Id').delete(AuthController.DeleteCollege);
router.route('/updateuser/:Id').put(AuthController.UpdateUser);
router.route('/user/me').post(middleware.requireAccessKey, middleware.authByEmail, AuthController.FindUser);
router.route('/verifyotp').post(middleware.getTokenDetails, AuthController.VerifyOpt);
router.route('/logoutuser').post(AuthController.LogoutUser);
router.route('/getdashboardData').post(middleware.getTokenDetails, AuthController.GetDashboardData);
router.route('/forgetpassword').post(AuthController.SendMailforForgetPassword);
router.route('/getSubAdminToken/:Id').get(middleware.getSubAdminTokenDetails, AuthController.GetSubAdminToken);
router.route('/createRoles').post(middleware.getTokenDetails, AuthController.CreateRoles);
router.route('/createquestion').post(AuthController.CreateQuestion);
router.route('/getquestion').get(AuthController.AllQuestion);
router.route('/submitanswer').post(AuthController.UserComment);
router.route('/getquestionlist').post(AuthController.AllQuestionList);
router.route('/countrylist').get(AuthController.GetCountryList);
router.route('/statelist/:countryId').get(AuthController.GetStateList);
router.route('/citylist/:stateId').get(AuthController.GetCityList);


// Export API routes
module.exports = router;