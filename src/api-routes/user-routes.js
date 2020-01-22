let router = require('express').Router();
// Import User controller
var userController = require('../controllers/userController');
var middleware = require('../middlewares/authusers.middleware');
// User routes
router.route('/createcourses').post(userController.CreateCourses);
router.route('/courseslist').post(userController.CoursesList);
router.route('/allcourselist').get(userController.AllCoursesList);
router.route('/deletecourse/:Id').delete(userController.DeleteCourse);
router.route('/getcourseId/:Id').get(userController.GetcourseById);
router.route('/updatecourses/:Id').put(userController.UpdateCourses);


router.route('/userlist').get(userController.UserList);
router.route('/createfees').post(userController.CreateFees);
router.route('/createfacilities').post(userController.CreateFacilities);
router.route('/getfacilities').get(userController.GetAllFacilities);
router.route('/getallfees').get(userController.GetAllFees);
router.route('/createspecialization').post(userController.CreateSpecialization);
router.route('/getspecialization').get(userController.GetSpecialization);

router.route('/userTypeList').get(userController.getUserTypeList);
router.route('/sendOTP').post(userController.sendOTP);
router.route('/VerifyOTP').post(userController.VerifyOTP);
router.route('/resetPassword').post(userController.resetPassword);
router.route('/createplacement').post(userController.CreatePlacement);
router.route('/getplacement').get(userController.GetAllPlacements);
router.route('/getreview').post(userController.GetAllReview);
router.route('/lead').post(userController.CollegeLead);

router.route('/searchbylocation').post(userController.SearchByLocation);
router.route('/searchbyfees').post(userController.SearchByFees);
router.route('/searchbyspecialization').post(userController.SearchBySpecialization);
router.route('/getcollegearticle').post(userController.GetCollegeArticleById);
router.route('/getarticledetails').post(userController.GetArticleDetails);

router.route('/getarticle').post(userController.GetArticles);
router.route('/updatearticle').put(userController.UpdateArticles);
router.route('/getarticlebyid').post(userController.GetArticlesById);
router.route('/getallarticle').get(userController.GetAllArticles);
router.route('/deletearticle/:Id').delete(userController.DeleteArticle);
router.route('/createarticle').post(userController.CreateAllArticle);

router.route('/getcutoffs').post(userController.GetAllCufOffs);
router.route('/getscholarship').post(userController.GetAllScholarship);

router.route('/searchbyfacility').post(userController.SearchByFacility);
router.route('/createpost').post(userController.CreatePost);
router.route('/getPost').post(userController.GetAllPost);

/*******add Country/state/City Route */
router.route('/addCountry').post(userController.AddCountry);
router.route('/addState').post(userController.AddState);
router.route('/addCity').post(userController.AddCity);

/*******get Country/state/City Route */
router.route('/getCountry').get(userController.GetCountry);
router.route('/getState').get(userController.GetState);
router.route('/getCity').get(userController.GetCity);

/*******update Country/state/City Route */
router.route('/updateCountry/:Id').put(userController.UpdateCountry);
router.route('/updateState/:Id').put(userController.UpdateState);
router.route('/updateCity/:Id').put(userController.UpdateCity);

/*******delete Country/state/City Route */
router.route('/deleteCountry/:Id').delete(userController.DeleteCountry);
router.route('/deleteState/:Id').delete(userController.DeleteState);
router.route('/deleteCity/:Id').delete(userController.DeleteCity);

module.exports = router;