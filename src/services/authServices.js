import { User } from '../models/user';
import { LoginLog } from '../models/loginlog';
import { Courses } from '../models/course';
import mongoose from 'mongoose';
import { Url } from '../models/urls';
// import { College } from '../models/urls';
import { ShortListCollege } from '../models/shortlistcollege';
import { UserComment } from '../models/usercomment';
import { Question } from '../models/question';
var ErrorHelper = require('../helpers/errortypes-helper');
var successhelper = require('../helpers/success.helper');
var bPromise = require('bluebird');
var moment = require('moment');
var config = require('../../config');
import { Countrys } from '../models/country';
import { States } from '../models/state';
import { Citys } from '../models/city';
// handle CreateUser Services.
exports.CreateUsers = function (userparams) {
  var myData = new User(userparams);
  return myData.save().then(function (item) {
    return item
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
  });
}

/***********Service for Update Users */
exports.UpdateUser = function (Id, updateparams) {
  return User.findOneAndUpdate({ _id: Id }, { $set: updateparams }, { new: true }).then(function (Item) {
    if (Item) {
      var whereparams = {
        "_id": Item._id
      }
      return User.findOne(whereparams).then(function (item) {
        return item;
      })
    } else {
      throw new ErrorHelper.BadRequest("Something went wrong.", "error");
    }
  }).catch(function (error) {
    throw new ErrorHelper.BadRequest("Something went wrong.", error);
  })
}

exports.findUserbyOtp = function (params) {
  return User.findOne(params).then(function (item) {
    return item;
  })
}


/****************Update College */
exports.UpdateCollege = function (collegeparams,id) {
  console.log(id,"collegeparams data come here")
  return Url.findOneAndUpdate({ '_id': id }, { $set: collegeparams }, { new: true }).then(function (Item) {
    return Item;
  }).catch(function (error) { 
    res.json(error);
  });
}

//*** Logout User Functionality */
exports.LogoutUser = function (updateparams) {
  return LoginLog.findOne({ "userid": updateparams.userid, "deviceid": updateparams.deviceid, "islogout": false }).sort({ logindatetime: -1 }).then(function (LoginUserData) {
    if (LoginUserData) {
      updateparams.islogout = true;
      return LoginLog.findOneAndUpdate({ _id: LoginUserData._id }, { $set: updateparams }, { new: true }).then(function (Item) {
        return Item;
      }).catch(function (error) {
        throw new ErrorHelper.BadRequest("Something went wrong.", error);
      })
    } else {
      var Item = "";
      return Item;
    }
  })
}

/****************Service for Create Colleges */
exports.CreateColleges = function (paramsData) {
  console.log("Create College",paramsData)
  var CollegeData = new Url(paramsData);
  return CollegeData.save().then(function (Item) {
    return Item;
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
  });
}

/************service for update get college */
exports.GetDataColleges = function (url) {
  if (url.review_url) {
    var whereparams = {
      "url": url.review_url
    }
  } else if (url.title) {
    var whereparams = {
      "title": { $regex: '.*' + url.title + '.*' }
    }
  } else {
    var whereparams = {}
  }
  return Url.find(whereparams).skip(0).limit(30).then(function (results) {
    if (results) {
      return results;
    } else {
      var Item = [];
      return Item;
    }
  }).catch(function (error) {
    throw new ErrorHelper.BadRequest("Something went wrong.", error);
  })
}

exports.GetAllCollegeData = function () {
  return Url.find().limit(1000).sort({ 'date':'descending' }).then(function (results) {
    if (results) {
      return results;
    } else {
      var Item = [];
      return Item;
    }
  }).catch(function (error) {
    throw new ErrorHelper.BadRequest("Something went wrong.", error);
  })
}

exports.GetCollegeById = function (params) {
  console.log("hello param")
  return Url.findOne({ "_id": params.id }).then(function (results) {
    if (results) {
      return results;
    } else {
      var Item = [];
      return Item;
    }
  }).catch(function (error) {
    throw new ErrorHelper.BadRequest("Something went wrong.", error);
  })
}

/************service for GetCollegeDataByLimit */
exports.GetCollegeDataByLimit = function (skipparams) {
  return Url.find().skip(skipparams).limit(30).then(function (results) {
    if (results) {
      return results;
    } else {
      var Item = [];
      return Item;
    }
  }).catch(function (error) {
    throw new ErrorHelper.BadRequest("Something went wrong.", error);
  })
}

/************service for get GetTop DataCollege */
exports.GetTopDataCollege = function () {
  return Url.find().limit(60).then(function (results) {
    if (results) {
      return results;
    } else {
      var Item = [];
      return Item;
    }
  }).catch(function (error) {
    throw new ErrorHelper.BadRequest("Something went wrong.", error);
  })
}

exports.CreateShortlistColleges = function (params) {
  var saveparams = new ShortListCollege(params);
  return saveparams.save().then(function (result) {
    if (result) {
      return result;
    } else {
      var result = "";
      return result;
    }
  }).catch(function (error) {
    return error;
  })
}

exports.AllShortlistColleges = function (params) {
  return ShortListCollege.find({ "userid": params.userid }).populate('collegeid').then(function (result) {
    if (result) {
      return result;
    } else {
      var result = "";
      return result;
    }
  }).catch(function (error) {
    return error;
  })
}
/*************Service for Search college */
exports.SearchCollege = function (searchparams) {
  return Url.find({ "title": { $regex: '.*' + searchparams + '.*' } }).then(function (items) {
    if (items.length >= 1) {
      return items;
    } else {
      var items = [];
      return items;
    }
  }).catch(function (error) {
    throw new ErrorHelper.BadRequest("Something went wrong.", error);
  });
}

/*************service for get one Askquestion */
exports.Deletecollege = function (params) {
  return Url.findByIdAndDelete({ "_id": params._id }).then(function (Result) {
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

exports.CreateQuestion = function (params) {
  let saveparams = new Question(params)
  return saveparams.save().then(function (QuestionResult) {
    if (QuestionResult) {
      return QuestionResult;
    } else {
      var QuestionResult = "";
      return QuestionResult;
    }
  }).catch(function (error) {
    return error;
  })
}

/************Service for User Answer */
exports.UserCommenting = function (params) {
  let updateparams = {
    "users": {
      "userid": params.UserId,
      "username": params.username,
      "Useremail": params.Useremail
    },
    "answer": params.answer,
    "questionID": params.Id
  }
  var usercommentparams = new UserComment(updateparams)
  return usercommentparams.save().then(function (Item) {
    return Item
  }).catch(function (error) {
    return error;
  })
}

/*************service for GetAllQuestion */
exports.GetAllQuestion = function () {
  return Question.find().limit(50).then(function (Question) {
    if (Question) {
      var result = [];
      return bPromise.all(Question).each(function (Value) {
        result.push({
          "detailText": (Value.detailText) ? Value.detailText : "",
          "foll_views": (Value.foll_views) ? Value.foll_views : "",
          "question_url": (Value.question_url) ? Value.question_url : "",
          "title": (Value.title) ? Value.title : "",
          "url_id": (Value.url_id) ? Value.url_id : ""
        })
      }).then(function () {
        return result;
      })
    } else {
      var Question = "";
      return Question;
    }
  }).catch(function (error) {
    return error
  })
}

exports.GetAllQuestionList = function (params) {
  return Question.find().then(function (Question) {
    if (Question) {
      var result = [];
      return bPromise.all(Question).each(function (Value) {
        result.push({
          "detailText": (Value.detailText) ? JSON.stringify(Value.detailText) : "",
          "foll_views": (Value.foll_views) ? JSON.stringify(Value.foll_views) : "",
          "question_url": (Value.question_url) ? JSON.stringify(Value.question_url) : "",
          "title": (Value.title) ? JSON.stringify(Value.title) : "",
        })
      }).then(function () {
        return result;
      })
    } else {
      var Question = "";
      return Question;
    }
  }).catch(function (error) {
    return error
  })
}

exports.GetAllCountryList = function () {
  var whereparams = {
    "status": true
  }
  return Countrys.find(whereparams).then(function (CountryList) {
    return CountryList
  }).catch(function (error) {
    throw new ErrorHelper.BadRequest(error.message, error);
  })
}

// get all state List
exports.GetAllStateList = function (CountryId) {
  var whereparams = {
    "status": true,
    "country": CountryId
  }
  return States.find(whereparams).then(function (stateList) {
    return stateList
  }).catch(function (error) {
    throw new ErrorHelper.BadRequest(error.message, error);
  })
}

// get all city List
exports.GetAllCityList = function (StateId) {
  var whereparams = {
    "status": true,
    "state": StateId
  }
  return Citys.find(whereparams).then(function (cityList) {
    return cityList
  }).catch(function (error) {
    throw new ErrorHelper.BadRequest(error.message, error);
  })
}