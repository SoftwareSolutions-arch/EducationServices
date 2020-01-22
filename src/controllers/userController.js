// Import contact model';
var AuthServices = require('../services/authServices');
var UserServices = require('../services/userServices');
var SendOtp = require('sendotp');
var sendOtp = new SendOtp('271041A3tkxEmFrb5ca730f1');
var bcrypt = require('bcrypt');
var moment = require('moment');
var config = require('../../config');
var fs = require('fs');
var bPromise = require('bluebird');
var errorsControllerHelper = require('../helpers/errors.controller.helper');
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Handle ListUser actions

// get User Profile
exports.GetUserProfile = function (req, res) {
    var whereparams = {
        "_id": req.AuthData._id
    }
    return UserServices.GetProfileData(whereparams).then(function (Data) {
        if (Data) {
            res.json({ "Status": 200, "result": Data, "Message": "User profile data." });
        } else {
            var Data = [];
            res.json({ "Status": 200, "result": Data, "Message": "User profile data." });
        }

    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

exports.UpdatePassword = function (req, res) {
    var updateparams = {
        password: bcrypt.hashSync(req.body.password, 8)
    }
    var params = req.body;
    return UserServices.UpdatePassword(req.AuthData._id, updateparams, params).then(function (Data) {
        if (Data) {
            res.json({ "Status": 200, "Message": "Password updated successfully." });
        } else {
            res.json({ "Status": 500, "Message": "Current password don't match." });
        }
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

exports.sendOTP = function (req, res) {
    var Contrycode = "+91";
    var Phonenumber = (req.body.phonenumber) ? req.body.phonenumber : false;
    var otp = Math.floor(1000 + Math.random() * 9000);
    var whereparams = {
        "contactno": req.body.phonenumber
    }
    return UserServices.GetProfileData(whereparams).then(function (Data) {
        if (Data) {
            /*AWS.config.update({
                accessKeyId: 'AKIA2JPZE4BPCRRGOBTU',
                secretAccessKey: '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',
                region: 'us-east-1'
            });*/
            AWS.config.update({
                accessKeyId: config.accessKeyId,
                secretAccessKey: config.secretAccessKey,
                region: config.region
            });
            var sns = new AWS.SNS({ "region": "us-west-2" });
            var params = {
                Message: otp.toString(),
                MessageStructure: 'text',
                PhoneNumber: Contrycode.toString() + Phonenumber.toString()
            };
            sns.publish(params, function (err, data) {
                if (err) {
                    console.log(err, err.stack); // an error occurred  
                }
                else {
                    var updateparams = {
                        "lastotprequestdatetime": moment(),
                        "lastotp": otp
                    }
                    return AuthServices.UpdateUser(Data._id, updateparams).then(function (Item) {
                        if (Item) {
                            res.json({ "Status": 200, "result": otp, "Message": "OTP sent to your registered mobile number." });
                        }
                    });
                }
            });
        } else {
            return errorsControllerHelper.returnError({
                Succeeded: false,
                Status: 500,
                Message: 'Please enter registered mobile number.',
                Name: 'Please enter registered mobile number.'
            }, res, 500);
        }
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

exports.VerifyOTP = function (req, res) {
    var whereparams = {
        "contactno": req.body.PhoneNumber,
        "lastotp": req.body.lastotp
    }
    return AuthServices.findUserbyOtp(whereparams).then(function (Data) {
        if (Data) {
            if (moment().format("YYYY-MM-DD HH:mm:ss") >= moment(Data.get("lastotprequestdatetime")).add("m", 15).format("YYYY-MM-DD HH:mm:ss")) {
                return errorsControllerHelper.returnError({
                    Succeeded: false,
                    Status: 500,
                    Message: 'OTP has been expired.',
                    Name: 'OTP has been expired.'
                }, res, 500);
            } else {
                var params = {
                    "userid": Data._id,
                    "mobilenumber": Data.contactno
                }
                return AuthServices.UpdateLoginLogData(params).then(function (Data) {
                    res.json({ "Status": 200, "result": { "userId": Data.get("_id") }, "Message": "successful" });
                })

            }
        } else {
            res.json({
                Status: 500,
                succeed: false,
                message: "Wrong Otp."
            })
        }
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

exports.resetPassword = function (req, res) {
    var updateparams = {
        password: bcrypt.hashSync(req.body.password, 8),
        userId: (req.body.userId) ? req.body.userId : false
    }
    if (updateparams.userId) {
        return UserServices.ResetPassword(updateparams.userId, updateparams).then(function (Data) {
            res.json({ "Status": 200, "result": Data, "Message": "Password updated successfully." });
        }).catch(function (error) {
            res.status(500).json({
                Status: 500,
                succeed: false,
                message: "Something went wrong.",
                errorsdata: error
            })
        });
    } else {
        res.json({
            Status: 500,
            succeed: false,
            message: "Please send required parameter."
        })
    }
}

exports.getUserTypeList = function (req, res) {
    return UserServices.GetUsersTypesData().then(function (Item) {
        res.json({ "Status": 200, "Data": Item, "Message": "User Type List." });
    }).catch(function (error) {
        res.status(500).json({
            code: 500,
            succeed: false,
            message: "Something went wrong.",
            errorsdata: error
        })
    });
}

exports.UserDetailList = function (req, res) {
    var Id = (req.params.Id) ? req.params.Id : false
    var whereparams = {
        "_id": Id
    }
    return UserServices.GetUserDetails(whereparams).then(function (Item) {
        res.json({ "Status": 200, "Data": Item, "Message": "User Details List." });
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/*****************controller for Create Courses */
exports.CreateCourses = function (req, res) {
    var courseparams = req.body;
    return UserServices.CreateCourse(courseparams).then(function (Data) {
        res.json({ "Status": 200, "result": Data, "Message": "Course created successfully." });
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/****************Controller for update courses */
exports.UpdateCourses = function (req, res) {
    var userwhereparams = req.params.Id;
    var updateuserparams = req.body;
    return UserServices.updateCourse(userwhereparams, updateuserparams).then(function (Data) {
        res.json({ "Status": 200, "result": Data, "Message": "Course update successfully." });
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/****************Controller for Get Course List */
exports.CoursesList = function (req, res) {
    var params = req.body.review_url
    return UserServices.updatecourses(params).then(function (Data) {
        res.json({ "Status": 200, "result": Data, "Message": "Course List." });
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/****************Controller for AllCoursesList */
exports.AllCoursesList = function (req, res) {
    return UserServices.getAllCourseList().then(function (Data) {
        res.json({ "Status": 200, "result": Data, "Message": "All Course List." });
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/****************Controller for delete College */
exports.DeleteCourse = function (req, res) {
    console.log("hello comp")
    var Id = (req.params.Id) ? req.params.Id : false
    var whereparams = {
        "_id": Id
    }
    return UserServices.DeleteCourseDetails(whereparams).then(function (Item) {
        res.json({ "Status": 200, "Message": "Course  Deleted Suucessfully." });
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

exports.GetcourseById = function (req, res) {
    console.log("Hello David")
    var params = req.params.Id
    return UserServices.GetCourseIddetails(params).then(function (Item) {
        if (Item) {
            res.json({ "Status": 200, "Message": "Course list", "result": Item });
        } else {
            var Item = [];
            res.json({ "Status": 200, "Message": "Course list", "result": Item });
        }
    }).catch(function (error) {
        return error
    })
}

/*************controller for user list */
exports.UserList = function (req, res) {
    return UserServices.getUserList().then(function (Data) {
        res.json({ "Status": 200, "result": Data, "Message": "Course List." });
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/**************** Controller for Add Country */
exports.AddCountry = function (req, res) {
    var params = req.body
    return UserServices.AddCountrys(params).then(function (Item) {
        if (Item) {
            res.json({ "Status": 200, "Message": "Country added successfully. ", "result": Item });
        } else {
            var Item = [];
            res.json({ "Status": 200, "Message": ". ", "result": Item });
        }
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/**************** Controller for Add State */
exports.AddState = function (req, res) {
    var params = req.body
    return UserServices.AddStates(params).then(function (Item) {
        if (Item) {
            res.json({ "Status": 200, "Message": "State added successfully. ", "result": Item });
        } else {
            var Item = [];
            res.json({ "Status": 200, "Message": ". ", "result": Item });
        }
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/**************** Controller for Add city */
exports.AddCity = function (req, res) {
    console.log("Hello user")
    var params = req.body
    return UserServices.AddCitys(params).then(function (Item) {
        if (Item) {
            res.json({ "Status": 200, "Message": "City added successfully. ", "result": Item });
        } else {
            var Item = [];
            res.json({ "Status": 200, "Message": ". ", "result": Item });
        }
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

//**************************************************************======================== */
/**************** Controller for Update Country */
exports.UpdateCountry = function (req, res) {
    var updateparams = req.body;
    var Id = req.params.Id;
    return UserServices.UpdateCountrys(Id, updateparams).then(function (Item) {
        if (Item) {
            res.json({ "Status": 200, "Message": "Country updated successfully. ", "result": Item });
        } else {
            var Item = [];
            res.json({ "Status": 200, "Message": ". ", "result": Item });
        }
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/**************** Controller for Update State */
exports.UpdateState = function (req, res) {
    var updateparams = req.body
    var Id = req.params.Id
    return UserServices.UpdateStates(Id, updateparams).then(function (Item) {
        if (Item) {
            res.json({ "Status": 200, "Message": "State updated successfully. ", "result": Item });
        } else {
            var Item = [];
            res.json({ "Status": 200, "Message": ". ", "result": Item });
        }
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/**************** Controller for Update city ***********************/
exports.UpdateCity = function (req, res) {
    var updateparams = req.body;
    var Id = req.params.Id;
    return UserServices.UpdateCitys(Id, updateparams).then(function (Item) {
        if (Item) {
            res.json({ "Status": 200, "Message": "City updated successfully. ", "result": Item });
        } else {
            var Item = [];
            res.json({ "Status": 200, "Message": ". ", "result": Item });
        }
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}


//**************************************************************==========Delete============== */
/**************** Controller for Delete Country */
exports.DeleteCountry = function (req, res) {
    var updateparams = req.body;
    var Id = req.params.Id;
    return UserServices.DeleteCountrys(Id, updateparams).then(function (Item) {
        if (Item) {
            res.json({ "Status": 200, "Message": "Country delete successfully. ", "result": Item });
        } else {
            var Item = [];
            res.json({ "Status": 200, "Message": ". ", "result": Item });
        }
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/**************** Controller for deleteCountry State */
exports.DeleteState = function (req, res) {
    var updateparams = req.body
    var Id = req.params.Id
    return UserServices.DeleteStates(Id, updateparams).then(function (Item) {
        if (Item) {
            res.json({ "Status": 200, "Message": "State delete successfully. ", "result": Item });
        } else {
            var Item = [];
            res.json({ "Status": 200, "Message": ". ", "result": Item });
        }
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/**************** Controller for deleteCountry city */
exports.DeleteCity = function (req, res) {
    var updateparams = req.body;
    var Id = req.params.Id;
    return UserServices.DeleteCitys(Id, updateparams).then(function (Item) {
        if (Item) {
            res.json({ "Status": 200, "Message": "City delete successfully. ", "result": Item });
        } else {
            var Item = [];
            res.json({ "Status": 200, "Message": ". ", "result": Item });
        }
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}


//**************************************************************==========get============== */
/**************** Controller for Delete Country */
exports.GetCountry = function (req, res) {
    return UserServices.GetCountrys().then(function (Item) {
        if (Item) {
            res.json({ "Status": 200, "Message": "Get country. ", "result": Item });
        } else {
            var Item = [];
            res.json({ "Status": 200, "Message": ". ", "result": Item });
        }
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/**************** Controller for deleteCountry State */
exports.GetState = function (req, res) {
    var Id = req.params.Id
    return UserServices.GetStates(Id).then(function (Item) {
        if (Item) {
            res.json({ "Status": 200, "Message": "Get states. ", "result": Item });
        } else {
            var Item = [];
            res.json({ "Status": 200, "Message": ". ", "result": Item });
        }
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/**************** Controller for deleteCountry city */
exports.GetCity = function (req, res) {
    return UserServices.GetCitys().then(function (Item) {
        if (Item) {
            res.json({ "Status": 200, "Message": "Get city. ", "result": Item });
        } else {
            var Item = [];
            res.json({ "Status": 200, "Message": ". ", "result": Item });
        }
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/**********************Controller Fro create Fees */
exports.CreateFees = function (req, res) {
    let Feeparams = req.body;
    return UserServices.CreateFees(Feeparams).then(function (Item) {
        if (Item) {
            res.json({ "Status": 200, "Message": "Fees Created Successfully", "result": Item });
        } else {
            var Item = [];
            res.json({ "Status": 200, "Message": ". ", "result": Item });
        }
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}


/********************Create facilities */
exports.CreateFacilities = function (req, res) {
    let facilitiesparams = req.body;
    return UserServices.CreateFacilities(facilitiesparams).then(function (Item) {
        if (Item) {
            res.json({ "Status": 200, "Message": "Facilities Created Successfully", "result": Item });
        } else {
            var Item = [];
            res.json({ "Status": 200, "Message": ". ", "result": Item });
        }
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/*************Controller for get all Facilities */
exports.GetAllFacilities = function (req, res) {
    return UserServices.GetAllFacilities().then(function (Item) {
        if (Item) {
            res.json({ "Status": 200, "Message": "All Facilities.", "result": Item });
        } else {
            var Item = [];
            res.json({ "Status": 200, "Message": ". ", "result": Item });
        }
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}
/**************Controller for get all fees */
exports.GetAllFees = function (req, res) {
    return UserServices.GetAllFees().then(function (Item) {
        if (Item) {
            res.json({ "Status": 200, "Message": "All Fees Successfully", "result": Item });
        } else {
            var Item = [];
            res.json({ "Status": 200, "Message": ". ", "result": Item });
        }
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/***************Controller for Specialization */
exports.CreateSpecialization = function (req, res) {
    let specparams = req.body;
    return UserServices.CreateSpecialization(specparams).then(function (Item) {
        if (Item) {
            res.json({ "Status": 200, "Message": "Specialization created successfully", "result": Item });
        } else {
            var Item = [];
            res.json({ "Status": 200, "Message": ". ", "result": Item });
        }
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/*******************Contrller for get Specialization */
exports.GetSpecialization = function (req, res) {
    return UserServices.GetAllSpecialization().then(function (Item) {
        if (Item) {
            res.json({ "Status": 200, "Message": "All GetAllSpecialization", "result": Item });
        } else {
            var Item = [];
            res.json({ "Status": 200, "Message": ". ", "result": Item });
        }
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

exports.SearchByLocation = function (req, res) {
    var searchksy = req.body.location;
    return UserServices.SearchByLocation(searchksy).then(function (Item) {
        if (Item) {
            res.json({ "Status": 200, "Message": "Location By College", "result": Item });
        } else {
            var Item = [];
            res.json({ "Status": 200, "Message": ". ", "result": Item });
        }
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}
/*************************SearchByFees */
exports.SearchByFees = function (req, res) {
    var searchksy = req.body.location;
    return UserServices.SearchByFees(searchksy).then(function (Item) {
        if (Item) {
            res.json({ "Status": 200, "Message": "Fees List", "result": Item });
        } else {
            var Item = [];
            res.json({ "Status": 200, "Message": ". ", "result": Item });
        }
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}
/*********************SearchBySpecialization */
exports.SearchBySpecialization = function (req, res) {
    var searchksy = req.body.location;
    return UserServices.SearchBySpecialization(searchksy).then(function (Item) {
        if (Item) {
            res.json({ "Status": 200, "Message": "Specialization List", "result": Item });
        } else {
            var Item = [];
            res.json({ "Status": 200, "Message": ". ", "result": Item });
        }
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}
/**************************SearchByFacility */
exports.SearchByFacility = function (req, res) {
    var searchksy = req.body.location;
    return UserServices.SearchByFcility(searchksy).then(function (Item) {
        if (Item) {
            res.json({ "Status": 200, "Message": "Facility List", "result": Item });
        } else {
            var Item = [];
            res.json({ "Status": 200, "Message": ". ", "result": Item });
        }
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/****************controller for create placement */
exports.CreatePlacement = function (req, res) {
    let placementparams = req.body;
    return UserServices.CreatePlacement(placementparams).then(function (Item) {
        if (Item) {
            res.json({ "Status": 200, "Message": "Placement create successfully", "result": Item });
        } else {
            var Item = [];
            res.json({ "Status": 200, "Message": ". ", "result": Item });
        }
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/*****************controller for getPlacement */
exports.GetAllPlacements = function (req, res) {
    return UserServices.GetAllPlacement().then(function (Item) {
        if (Item) {
            res.json({ "Status": 200, "Message": "Placement List", "result": Item });
        } else {
            var Item = [];
            res.json({ "Status": 200, "Message": "Placement List", "result": Item });
        }
    }).catch(function (error) {
        return error
    })
}

/*************************for create Post*/
exports.CreatePost = function (req, res) {
    var params = req.body;
    return UserServices.CreatePost(params).then(function (Item) {
        if (Item) {
            res.json({ "Status": 200, "Message": "Post Create successfully.", "result": Item });
        } else {
            var Item = [];
            res.json({ "Status": 200, "Message": "Post Create successfully.", "result": Item });
        }
    }).catch(function (error) {
        return error
    })
}
/*******************************For Get All Post*/
exports.GetAllPost = function (req, res) {
    var params = req.body
    return UserServices.GetAllPost(params).then(function (Item) {
        if (Item) {
            res.json({ "Status": 200, "Message": "Post List", "result": Item });
        } else {
            var Item = [];
            res.json({ "Status": 200, "Message": "Post List", "result": Item });
        }
    }).catch(function (error) {
        return error
    })
}
/******************** GetCollegeArticleById */
exports.GetCollegeArticleById = function (req, res) {
    var params = req.body
    return UserServices.GetArticleByCollege(params).then(function (Item) {
        if (Item) {
            res.json({ "Status": 200, "Message": "Article by college List", "result": Item });
        } else {
            var Item = [];
            res.json({ "Status": 200, "Message": "Article by college List", "result": Item });
        }
    }).catch(function (error) {
        return error
    })
}

/***************************GetCollegeArticleById*****/
exports.GetArticleDetails = function (req, res) {
    var params = req.body
    return UserServices.GetArticleDetails(params).then(function (Item) {
        if (Item) {
            res.json({ "Status": 200, "Message": "Article by college List", "result": Item });
        } else {
            var Item = [];
            res.json({ "Status": 200, "Message": "Article by college List", "result": Item });
        }
    }).catch(function (error) {
        return error
    })
}

/****************Controller for create Fees */
exports.CreateAllArticle = function (req, res) {
    var feesparams = req.body;
    return UserServices.CreateArticle(feesparams).then(function (Data) {
        if (Data) {
            res.json({ "Status": 200, "result": Data, "Message": "Article created successfully." });
        } else {
            var Data = [];
            res.json({ "Status": 200, "result": Data, "Message": "Article created successfully." });
        }

    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}


// umang chopra
exports.UpdateArticles = function (req, res) {
    var params = req.body
    return UserServices.UpdateArticles(params).then(function (Item) {
        if (Item) {
            res.json({ "Status": 200, "Message": "Article update successfully", "result": Item });
        } else {
            var Item = [];
            res.json({ "Status": 200, "Message": "Article update successfully", "result": Item });
        }
    }).catch(function (error) {
        return error
    })
}

/************************** GetAllReview*/
exports.GetAllReview = function (req, res) {
    var params = req.body.review_url
    return UserServices.GetAllReview(params).then(function (Item) {
        if (Item) {
            res.json({ "Status": 200, "Message": "Review list", "result": Item });
        } else {
            var Item = [];
            res.json({ "Status": 200, "Message": "Review list", "result": Item });
        }
    }).catch(function (error) {
        return error
    })
}
/******************************* GetAllScholarship */
exports.GetAllScholarship = function (req, res) {
    var params = req.body.review_url
    return UserServices.GetAllScholarship(params).then(function (Item) {
        if (Item) {
            res.json({ "Status": 200, "Message": "Scholarship list", "result": Item });
        } else {
            var Item = [];
            res.json({ "Status": 200, "Message": "Scholarship list", "result": Item });
        }
    }).catch(function (error) {
        return error
    })
}

/*****************Controller for GetArticles */
exports.GetArticles = function (req, res) {
    console.log("data coming")
    var params = req.body.review_url
    return UserServices.GetAllArticles(params).then(function (Item) {
        if (Item) {
            res.json({ "Status": 200, "Message": "Article list", "result": Item });
        } else {
            var Item = [];
            res.json({ "Status": 200, "Message": "Article list", "result": Item });
        }
    }).catch(function (error) {
        return error
    })
}

/*****************controller for get all articles */
exports.GetAllArticles = function (req, res) {
    return UserServices.GetAllArticlesList().then(function (Item) {
        if (Item) {
            res.json({ "Status": 200, "Message": "Article list", "result": Item });
        } else {
            var Item = [];
            res.json({ "Status": 200, "Message": "Article list", "result": Item });
        }
    }).catch(function (error) {
        return error
    })
}

exports.GetArticlesById = function (req, res) {
    var params = req.body.Id
    return UserServices.GetArticleById(params).then(function (Item) {
        if (Item) {
            res.json({ "Status": 200, "Message": "Article list", "result": Item });
        } else {
            var Item = [];
            res.json({ "Status": 200, "Message": "Article list", "result": Item });
        }
    }).catch(function (error) {
        return error
    })
}

/****************Controller for delete College */
exports.DeleteArticle = function (req, res) {
    console.log("Hello bro")
    var Id = (req.params.Id) ? req.params.Id : false
    var whereparams = {
        "_id": Id
    }
    console.log(whereparams,"whereparams")
    return UserServices.DeleteArticledetails(whereparams).then(function (Item) {
        res.json({ "Status": 200, "Message": "Article  Deleted Suucessfully." });
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

exports.GetAllCufOffs = function (req, res) {
    var params = req.body.review_url
    return UserServices.GetAllCutoffs(params).then(function (Item) {
        if (Item) {
            res.json({ "Status": 200, "Message": "Cutoffs list", "result": Item });
        } else {
            var Item = [];
            res.json({ "Status": 200, "Message": "Cutoffs list", "result": Item });
        }
    }).catch(function (error) {
        return error
    })
}

exports.CollegeLead = function (req, res) {
    var params = req.body;
    return UserServices.StoreCollegeLead(params).then(function (Item) {
        if (Item) {
            res.json({ "Status": 200, "Message": "CollegeLead store successfully", "result": Item });
        } else {
            var Item = [];
            res.json({ "Status": 200, "Message": "CollegeLead store successfully", "result": Item });
        }
    }).catch(function (error) {
        return error
    })
}

// get State List

exports.GetCoursesList = function (req, res) {
    var courseId = req.params.courseId
    return UserServices.GetAllCourseList(courseId).then(function (Data) {
        if (Data) {
            res.json({ "Status": 200, "Message": "course  List.", "Data": Data });
        } else {
            res.json({ "Status": 200, "Message": "course List.", "Data": "" });
        }
    }).catch(function (error) {
        res.status(500).json({
            code: 500,
            succeed: false,
            message: "Something went wrong.",
            errorsdata: error
        })
    })
}