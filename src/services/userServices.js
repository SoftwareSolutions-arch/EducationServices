import { User } from '../models/user';
import { Courses } from '../models/course';
import { Placement } from '../models/placement';
import { College } from '../models/college';
import { CollegeLead } from '../models/collegelead';
import { Url } from '../models/urls';
import { Article } from '../models/articles';
import { ArticlesDetails } from '../models/article_details';
import { Posts } from '../models/post';
import { Specialization } from '../models/specialization';
import { Facilities } from '../models/facilities';
import { Review } from '../models/review';
import { Cutoffs } from '../models/cutoff';
import { Fees } from '../models/fees';
import { Branch } from '../models/branch';
import { LoginLog } from '../models/loginlog';
import { Countrys } from '../models/country';
import { States } from '../models/state';
import { Citys } from '../models/city';

var moment = require('moment');
var config = require('../../config');
var BCrypt = require('bcrypt');
var ErrorHelper = require('../helpers/errortypes-helper');
var bPromise = require('bluebird');
var fs = require('fs');
var AWS = require('aws-sdk');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nynbus.inwizards@gmail.com',
    pass: 'qwerty@11'
  }
});
const sendmail = require('sendmail')({
  devPort: false, // Default: False
  devHost: 'localhost', // Default: localhost
  smtpPort: 25, // Default: 25
  smtpHost: -1 // Default: -1 - extra smtp host after resolveMX
});

//***** FinalCallback */
exports.finalCallback = function (req, res, ErrorCode, Status, result, ErrorMessage, authKey) {
  if (authKey) {
    res.json({ "ErrorCode": ErrorCode, Status: Status, "user": result, "ErrorMessage": ErrorMessage, "auth-key": authKey });
  } else {
    res.json({ "ErrorCode": ErrorCode, Status: Status, "user": result, "ErrorMessage": ErrorMessage });
  }
}

// handle CreateUsers Services.
exports.UpdatePassword = function (Id, updateparams, params) {
  return User.findOne({ "_id": Id }).then(function (Item) {
    if (!BCrypt.compareSync(params.currentpassowrd, Item.password)) {
    } else {
      return User.updateOne({ _id: Id }, { $set: updateparams }, { new: true }).then(function (Item) {
        return Item;
      }).catch(function (error) {
        res.json(error);
      })
    }
  }).catch(function (error) {
    console.log("error", error)
  })
}
/*************Service for Reset Password */
exports.ResetPassword = function (Id, updateparams) {
  return User.findOne({ "_id": Id }).then(function (Item) {
    return User.updateOne({ _id: Id }, { $set: updateparams }, { new: true }).then(function (Item) {
      return Item;
    }).catch(function (error) {
      res.json(error);
    })
  }).catch(function (error) {
    console.log("error", error)
  })
}

//**************************************************************************************** */
exports.CreateCourse = function (params) {
  var courseparams = new Courses(params);
  return courseparams.save().then(function (CourseData) {
    return CourseData;
  }).catch(function (error) {
    if (error.name == "ValidationError") {
      var params = Object.keys(error.errors).map(function (key) {
        return {
          "message": error.errors[key].message,
          "path": error.errors[key].message,
          "type": error.errors[key].name
        }
      });
      throw new ErrorHelper.ValidationError("parameter error.", params);
    } else if (error.name == "EmailExist") {
      throw new ErrorHelper.BadRequest(error.message, error);
    } else {
      throw new ErrorHelper.BadRequest("Something went wrong.", error);
    }
  })
}

/*************service for update courses */
exports.updateCourse = function (Id, updateparams) {
  return Courses.findOneAndUpdate({ _id: Id }, { $set: updateparams }, { new: true }).then(function (Item) {
    if (Item) {
      var whereparams = {
        "_id": Item._id
      }
      return Courses.findOne(whereparams).then(function (item) {
        return item;
      })
    } else {
      throw new ErrorHelper.BadRequest("Something went wrong.", "error");
    }
  }).catch(function (error) {
    throw new ErrorHelper.BadRequest("Something went wrong.", error);
  })
}

/***************************** Controller for Get Courses */
exports.getCourseList = function (course_url) {
  return Courses.find({ "course_url": course_url }).then(function (CourseList) {
    if (CourseList) {
      return CourseList;
    } else {
      var CourseList = [];
      return CourseList;
    }
  }).catch(function (error) {
    throw new ErrorHelper.BadRequest("Something went wrong.", error);
  })
}

/***************************** Controller for Get getAllCourseList */
exports.getAllCourseList = function () {
  return Courses.find().limit(200).then(function (CourseList) {
    if (CourseList) {
      return CourseList;
    } else {
      var CourseList = [];
      return CourseList;
    }
  }).catch(function (error) {
    throw new ErrorHelper.BadRequest("Something went wrong.", error);
  })
}

/*************service for get one Askquestion */
exports.DeleteCourseDetails = function (params) {
  return Courses.findByIdAndDelete({ "_id": params._id }).then(function (Result) {
    if (Result) {
      return Result
    } else {
      var Result = [];
      return Result;
    }
  }).catch(err => {
    if (err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({

        message: "id not found...." + req.params.url
      });
    }
    return res.status(500).send({
      message: "Could not delete.... " + req.params.id
    });
  });
}

exports.GetCourseIddetails = function (Id) {
  return Courses.findById({'_id':Id }).then(function (result) {
    if (result) {
      return result;
    } else {
      var result =  [];
      return result;
    }
  }).catch(function (error) {
    return error;
  })
}

//**************************************************************************************** */

/*********************Get Scholarship */
exports.GetAllScholarship = function (scholarship_url) {
  return Url.find({ "scholarship_url": scholarship_url }).then(function (ScholarshipList) {
    if (ScholarshipList) {
      return ScholarshipList;
    } else {
      var ScholarshipList = [];
      return ScholarshipList;
    }
  }).catch(function (error) {
    throw new ErrorHelper.BadRequest("Something went wrong.", error);
  })
}


/***********service for get user list */
exports.getUserList = function () {
  return User.find().then(function (UserList) {
    if (UserList) {
      return UserList;
    } else {
      var UserList = [];
      return UserList;
    }
  }).catch(function (error) {
    throw new ErrorHelper.BadRequest("Something went wrong.", error);
  })
}


//********************************************************************* */

/************** Service for Add Countrys */
exports.AddCountrys = function (countryparams) {
  var countryData = new Countrys(countryparams)
  return countryData.save().then(function (countryItem) {
    return countryItem
  }).catch(function (error) {
    if (error.name == "ValidationError") {
      var params = Object.keys(error.errors).map(function (key) {
        return {
          "message": error.errors[key].message,
          "path": error.errors[key].message,
          "type": error.errors[key].name
        }
      });
      throw new ErrorHelper.ValidationError("Something went wrong.", params);
    } else {
      throw new ErrorHelper.BadRequest("Something went wrong.", error);
    }
  });
}

/************** Service for Add States */
exports.AddStates = function (stateparams) {
  var stateData = new States(stateparams)
  return stateData.save().then(function (stateItem) {
    return stateItem
  }).catch(function (error) {
    if (error.name == "ValidationError") {
      var params = Object.keys(error.errors).map(function (key) {
        return {
          "message": error.errors[key].message,
          "path": error.errors[key].message,
          "type": error.errors[key].name
        }
      });
      throw new ErrorHelper.ValidationError("Something went wrong.", params);
    } else {
      throw new ErrorHelper.BadRequest("Something went wrong.", error);
    }
  });
}

/************** Service for Add Citys */
exports.AddCitys = function (cityparams) {
  console.log("Hello Service")
  var cityData = new Citys(cityparams)
  console.log("Hello Service", cityData)
  return cityData.save().then(function (cityItem) {
    return cityItem
  }).catch(function (error) {
    if (error.name == "ValidationError") {
      var params = Object.keys(error.errors).map(function (key) {
        return {
          "message": error.errors[key].message,
          "path": error.errors[key].message,
          "type": error.errors[key].name
        }
      });
      throw new ErrorHelper.ValidationError("Something went wrong.", params);
    } else {
      throw new ErrorHelper.BadRequest("Something went wrong.", error);
    }
  });
}

//************************************========================================= */

/************** Service for update Countrys */
exports.UpdateCountrys = function (Id, updateparams) {
  return Countrys.find({ _id: Id }).then(function (CountryData) {
    if (CountryData) {
      return Countrys.updateOne({ _id: Id }, { $set: updateparams }, { new: true }).then(function (updateCountryItem) {
        return updateCountryItem;
      })
    } else {
      var updateCountryItem = [];
      return updateCountryItem
    }
  }).catch(function (error) {
    return error;
  })
}

/************** Service for update States */
exports.UpdateStates = function (Id, updateparams) {
  return States.find({ _id: Id }).then(function (StateData) {
    if (StateData) {
      return States.updateOne({ _id: Id }, { $set: updateparams }, { new: true }).then(function (updateStateItem) {
        return updateStateItem;
      })
    } else {
      var updateStateItem = [];
      return updateStateItem;
    }
  }).catch(function (error) {
    return error;
  })
}

/************** Service for update Citys */
exports.UpdateCitys = function (Id, updateparams) {
  return Citys.find({ _id: Id }).then(function (CityData) {
    if (CityData) {
      return Citys.updateOne({ _id: Id }, { $set: updateparams }, { new: true }).then(function (updateCityItem) {
        return updateCityItem;
      })
    } else {
      var updateCityItem = [];
      return updateCityItem
    }
  }).catch(function (error) {
    return error;
  })
}



//************************************========================================= */
/************** Service for update Countrys */
exports.DeleteCountrys = function (Id, updateparams) {
  return Countrys.find({ _id: Id }).then(function (CountryData) {
    if (CountryData) {
      updateparams.status = false;
      return Countrys.updateOne({ _id: Id }, { $set: updateparams }, { new: true }).then(function (updateCountryItem) {
        return updateCountryItem;
      })
    } else {
      var updateCountryItem = [];
      return updateCountryItem
    }
  }).catch(function (error) {
    return error;
  })
}

/************** Service for update States */
exports.DeleteStates = function (Id, updateparams) {
  return States.find({ _id: Id }).then(function (StateData) {
    if (StateData) {
      updateparams.status = false;
      return States.updateOne({ _id: Id }, { $set: updateparams }, { new: true }).then(function (updateStateItem) {
        return updateStateItem;
      })
    } else {
      var updateStateItem = [];
      return updateStateItem;
    }
  }).catch(function (error) {
    return error;
  })
}

/************** Service for update Citys */
exports.DeleteCitys = function (Id, updateparams) {
  return Citys.find({ _id: Id }).then(function (CityData) {
    if (CityData) {
      updateparams.status = false;
      return Citys.updateOne({ _id: Id }, { $set: updateparams }, { new: true }).then(function (updateCityItem) {
        return updateCityItem;
      })
    } else {
      var updateCityItem = [];
      return updateCityItem
    }
  }).catch(function (error) {
    return error;
  })
}


//************************************========================================= */

/************** Service for update Countrys */
exports.GetCountrys = function () {
  return Countrys.find().then(function (CountryData) {
    if (CountryData) {
      return CountryData;
    } else {
      var updateCountryItem = [];
      return updateCountryItem
    }
  }).catch(function (error) {
    return error;
  })
}

/************** Service for update States */
exports.GetStates = function (Id) {
  return States.find({ _id: Id }).then(function (StateData) {
    if (StateData) {
      return StateData;
    } else {
      var updateStateItem = [];
      return updateStateItem;
    }
  }).catch(function (error) {
    return error;
  })
}

/************** Service for update Citys */
exports.GetCitys = function (Id) {
  return Citys.find().then(function (CityData) {
    if (CityData) {
      return CityData;
    } else {
      var updateCityItem = [];
      return updateCityItem;
    }
  }).catch(function (error) {
    return error;
  })
}

/*********************service for create fees */
exports.CreateFees = function (params) {
  var feesparams = new Fees(params);
  return feesparams.save().then(function (Items) {
    return Items;
  }).catch(function (error) {
    return error;
  });
}

/****************Services for get All Fees */
exports.GetAllFees = function () {
  return Fees.find().then(function (Items) {
    return Items;
  }).catch(function (error) {
    return error;
  });
}

/************sevice for create specialization */
exports.CreateSpecialization = function (params) {
  let spcsave = new Specialization(params);
  return spcsave.save().then(function (Item) {
    if (Item) {
      return Item
    } else {
      let spctem = "";
      return spctem
    }
  }).catch(function (error) {
    return error;
  })
}

/*****************Service for Get specialization */
exports.GetAllSpecialization = function () {
  return Specialization.find().then(function (Item) {
    if (Item) {
      return Item;
    } else {
      var Item = "";
    }
  }).catch(function (error) {
    return error;
  })
}

/*******************Services for create Facilities */
exports.CreateFacilities = function (facilities) {
  var SaveParams = new Facilities(facilities);
  return SaveParams.save().then(function (Item) {
    if (Item) {
      return Item;
    } else {
      var Item = "";
      return Item;
    }
  }).catch(function (error) {
    return error;
  })
}

/************service for get all facilities */
exports.GetAllFacilities = function () {
  return Facilities.find().then(function (Item) {
    if (Item) {
      return Item;
    } else {
      var Item = "";
      return Item;
    }
  }).catch(function (error) {
    return error;
  })
}


exports.SearchByLocation = function (Key) {
  if (Key) {
    return College.find({ location: { $in: [Key] } }).then(function (Item) {
      if (Item) {
        return Item
      }
    }).catch(function (error) {
      return error;
    })
  } else {
    return College.find().then(function (Item) {
      if (Item) {
        return Item
      }
    }).catch(function (error) {
      return error;
    })
  }
}

exports.SearchByFees = function (Key) {
  if (Key) {
    return College.find({ fees: { $in: [Key] } }).then(function (Item) {
      if (Item) {
        return Item
      }
    }).catch(function (error) {
      return error;
    })
  } else {
    return College.find().then(function (Item) {
      if (Item) {
        return Item
      }
    }).catch(function (error) {
      return error;
    })
  }
}

exports.SearchBySpecialization = function (Key) {
  if (Key) {
    return Url.find({ "facilitie": { $regex: '.*' + Key + '.*' } }).then(function (Item) {
      if (Item) {
        return Item
      }
    }).catch(function (error) {
      return error;
    })
  } else {
    return College.find().then(function (Item) {
      if (Item) {
        return Item
      }
    }).catch(function (error) {
      return error;
    })
  }
}

exports.SearchByFcility = function (Key) {
  if (Key) {
    return Url.find({ "facilitie": { $regex: '.*' + Key + '.*' } }).then(function (Item) {
      if (Item) {
        return Item
      }
    }).catch(function (error) {
      return error;
    })
  } else {
    return Url.find().then(function (Item) {
      if (Item) {
        return Item
      }
    }).catch(function (error) {
      return error;
    })
  }
}


/*************service for create placement */
exports.CreatePlacement = function (placementparams) {
  let saveplacement = new Placement(placementparams);
  return saveplacement.save().then(function (Item) {
    if (Item) {
      return Item;
    } else {
      var Item = ""
      return Item;
    }
  }).catch(function (error) {
    return error
  })
}

/****************Services for get all placement */
exports.GetAllPlacement = function () {
  return Placement.find().then(function (Result) {
    if (Result) {
      return Result;
    } else {
      var Result = "";
      return Result;
    }
  }).catch(function (error) {
    return error;
  })
}

/*******************Service for create POST***/
exports.CreatePost = function (postparams) {
  let SavePostParams = new Posts(postparams);
  return SavePostParams.save().then(function (Result) {
    if (Result) {
      return Result;
    } else {
      var Result = "";
      return Result;
    }
  }).catch(function (error) {
    return error;
  })
}

exports.GetAllPost = function (params) {
  return Posts.findOne({ "posttype": params.posttype }).then(function (Result) {
    if (Result) {
      return Result;
    } else {
      var Result = "";
      return Result;
    }
  }).catch(function (error) {
    return error;
  })
}

exports.GetArticleByCollege = function (params) {
  return Article.find({ "article_url": params.url_id }).then(function (ArticleData) {
    if (ArticleData) {
      return ArticleData
    } else {
      var ArticleData = [];
      return ArticleData;
    }
  }).catch(function (error) {
    return error;
  })
}

exports.GetArticleDetails = function (params) {
  return ArticlesDetails.find({ "article_detail_url": params.articleid }).then(function (Result) {
    if (Result) {
      return Result
    } else {
      var Result = [];
      return Result;
    }
  }).catch(function (error) {
    return error;
  })
}

/***************Get All Review */
exports.GetAllReview = function (review_url) {
  return Review.find({ "review_url": review_url }).limit(20).then(function (Revieewitem) {
    if (Revieewitem) {
      return Revieewitem
    } else {
      var Revieewitem = "";
      return Revieewitem;
    }
  }).catch(function (error) {
    return error;
  })
}

exports.GetAllArticles = function (article_url) {
  return Article.find({ "article_url": article_url }).limit(20).then(function (ArticleItem) {
    if (ArticleItem) {
      return ArticleItem;
    } else {
      var ArticleItem = "";
      return ArticleItem;
    }
  }).catch(function (error) {
    return error;
  })
}

exports.GetArticleById = function (Id) {
  return Article.findOne({ "articleDetailUrl": Id }).then(function (ArticleItem) {
    if (ArticleItem) {
      return ArticleItem;
    } else {
      var ArticleItem = "";
      return ArticleItem;
    }
  }).catch(function (error) {
    return error;
  })
}

/*************service for create branch */
exports.CreateArticle = function (params) {
  var Articledata = new Article(params)
  return Articledata.save().then(function (Items) {
      return Items
  }).catch(function (error) {
      if (error.name == "ValidationError") {
          var params = Object.keys(error.errors).map(function (key) {
              return {
                  "message": error.errors[key].message,
                  "path": error.errors[key].message,
                  "type": error.errors[key].name
              }
          });
          throw new ErrorHelper.ValidationError("parameter error.", params);
      } else {
          throw new ErrorHelper.BadRequest("Something went wrong.", error);
      }
  })
}

//umang 
exports.UpdateArticles = function (params) {
  return Article.findOneAndUpdate({ articleDetailUrl: params.articleDetailUrl }, { $set: params }, { new: true }).then(function (Item) {
    if (Item) {
      return Item;
    } else {
      var ArticleItem = "";
      return ArticleItem;
    }
  }).catch(function (error) {
    return error;
  })
}

/****************service for get all articles list */
exports.GetAllArticlesList = function () {
  return Article.find().limit(200).then(function (ArticleItem) {
    if (ArticleItem) {
      return ArticleItem;
    } else {
      var ArticleItem = "";
      return ArticleItem;
    }
  }).catch(function (error) {
    return error;
  })
}

/*************service for delete college details */
exports.DeleteArticledetails = function (params) {
  return Article.findByIdAndDelete({ "_id": params._id }).then(function (Result) {
    if (Result) {
      return Result
    } else {
      var Result = [];
      return Result;
    }
  }).catch(err => {
    if (err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({
        message: "id not found...." + req.params.url
      });
    }
    return res.status(500).send({
      message: "Could not delete.... " + req.params.id
    });
  });
}

exports.GetAllCutoffs = function (scholarship_url) {
  return Cutoffs.find({ "scholarship_url": scholarship_url }).limit(60).then(function (CutoffItem) {
    if (CutoffItem) {
      return CutoffItem;
    } else {
      var CutoffItem = "";
      return CutoffItem;
    }
  }).catch(function (error) {
    return error;
  })
}

/***************Store User Services */
exports.StoreCollegeLead = function (params) {
  var SaveParams = new CollegeLead(params)
  return SaveParams.save().then(function (lead) {
    if (lead) {
      return lead;
    } else {
      var lead = "";
      return lead;
    }
  }).catch(function (error) {
    return error;
  })
}

exports.GetAllCourseList = function(){

}
