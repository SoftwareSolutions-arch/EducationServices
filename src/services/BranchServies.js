import { Branch } from '../models/branch';
import { Fees } from '../models/fees';
import { Leads } from '../models/leads';
import { CollegeTypes } from '../models/college_tyeps';
import { BranchType } from '../models/branch_types';
import { Infrastructure } from '../models/infrastructure';
import { ExamType } from '../models/exam_type';
import { Company } from '../models/company';
var ErrorHelper = require('../helpers/errortypes-helper');

/*************service for get branch */
exports.getallbranch = function () {
    return Branch.find().then(function (Items) {
        if (Items) {
            console.log("Items", Items)
            return Items;
        } else {
            var Items = "";
            return Items;
        }
    }).catch(function (error) {
        throw new ErrorHelper.BadRequest("Something went wrong.", error);
    })
}

/*************service for create branch */
exports.CreateBranch = function (params) {
    var branchdata = new Branch(params)
    console.log("Hello",branchdata)
    return branchdata.save().then(function (Items) {
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

/*************service for get one branch */
exports.DeleteBranch = function (params) {
    return Branch.findByIdAndDelete({ "_id": params._id }).then(function (Result) {
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

// get all Branch List
exports.GetAllBranchList = function (id) {
    var whereparams = {
        "status": true,
        "course": id
    }   
    console.log(whereparams,"whereparams")
    return Branch.find(whereparams).populate('course').then(function (BranchList) {
        console.log(BranchList,"BranchList *&")
        return BranchList
    }).catch(function (error) {
        throw new ErrorHelper.BadRequest(error.message, error);
    })
}

// get all Branch List
exports.GetAllBranchListbyid = function (id) {
    return Branch.findById(id).then(function (BranchList) {
        return BranchList
    }).catch(function (error) {
        throw new ErrorHelper.BadRequest(error.message, error);
    })
}

/************** Service for update Branch */
exports.updateBranches = function (Id, updateparams) {
    console.log(updateparams,"updateparams123")
    return Branch.find({ _id: Id }).then(function (BranchData) {
      if (BranchData) {
        return Branch.updateOne({ _id: Id }, { $set: updateparams }, { new: true }).then(function (updateBranchItem) {
          return updateBranchItem;
        })
      } else {
        var updateBranchItem = [];
        return updateBranchItem;
      }
    }).catch(function (error) {
      return error;
    })
}

// // get all Branch List
exports.GetAllBranchdetails = function (id) {
    var whereparams = {
        "status": true,
        "course": id
    }   
    console.log(whereparams,"whereparams")
    return Branch.find(whereparams).populate('course').then(function (BranchList) {
        return BranchList
    }).catch(function (error) {
        throw new ErrorHelper.BadRequest(error.message, error);
    })
}


//*************************************************************************************************** */

/*************service for get branch */
exports.getfees = function () {
    return Fees.find().then(function (Items) {
        if (Items) {
            console.log("Items", Items)
            return Items;
        } else {
            var Items = "";
            return Items;
        }
    }).catch(function (error) {
        throw new ErrorHelper.BadRequest("Something went wrong.", error);
    })
}

/*************service for create branch */
exports.Createfees = function (params) {
    var feesdata = new Fees(params)
    return feesdata.save().then(function (Items) {
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

/*************service for get one fees */
exports.Deletefees = function (params) {
    console.log(params, "params id value")
    return Fees.findByIdAndDelete({ "_id": params._id }).then(function (Result) {
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

/************** Service for update Citys */
exports.Updatefees = function (id, updateparams) {
    return Fees.find({ _id: id }).then(function (fees) {
        if (fees) {
            return Fees.findOneAndUpdate({ _id: id }, { $set: updateparams }, { new: true }).then(function (fees) {
                return fees;
            })
        } else {
            var fees = [];
            return fees
        }
    }).catch(function (error) {
        return error;
    })
}

exports.GetFeesdetailsById = function (id) {
    return Fees.findOne({ "_id": id }).then(function (ArticleItem) {
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

//*************************************************************************************************** */

/*************service for get Leads */
exports.GetallLeadsDetails = function () {
    return Leads.find().then(function (Items) {
        if (Items) {
            console.log("Items", Items)
            return Items;
        } else {
            var Items = "";
            return Items;
        }
    }).catch(function (error) {
        throw new ErrorHelper.BadRequest("Something went wrong.", error);
    })
}

/*************service for create leads */
exports.CreateAllLeads = function (params) {
    var LeadsData = new Leads(params)
    return LeadsData.save().then(function (Items) {
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

/*************service for update leads */
exports.UpdateLead = function (Id, updateparams) {
    return Leads.findOneAndUpdate({ _id: Id }, { $set: updateparams }, { new: true }).then(function (Item) {
        if (Item) {
            var whereparams = {
                "_id": Item._id
            }
            return Leads.findOne(whereparams).then(function (item) {
                return item;
            })
        } else {
            throw new ErrorHelper.BadRequest("Something went wrong.", "error");
        }
    }).catch(function (error) {
        throw new ErrorHelper.BadRequest("Something went wrong.", error);
    })
}

/*************service for get one leads */
exports.GetUserDetails = function (params) {
    return Leads.findOne({ "_id": params._id }).then(function (Result) {
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

/*************service for get one leads */
exports.DeleteLeadDetails = function (params) {
    return Leads.findByIdAndDelete({ "_id": params._id }).then(function (Result) {
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

/********************************College Types Services*******************************/


/*************service for get CollegeTypes */
exports.GetcollegeTypesdetails = function () {
    return CollegeTypes.find().then(function (Items) {
        if (Items) {
            console.log("Items", Items)
            return Items;
        } else {
            var Items = "";
            return Items;
        }
    }).catch(function (error) {
        throw new ErrorHelper.BadRequest("Something went wrong.", error);
    })
}

/*************service for create CollegeTypes */
exports.CreatecollegeTypesdetails = function (params) {
    var CollegeTypesData = new CollegeTypes(params)
    return CollegeTypesData.save().then(function (Items) {
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

/*************service for update CollegeTypes */
exports.updatecollegeTypesdetails = function (Id, updateparams) {
    return CollegeTypes.findOneAndUpdate({ _id: Id }, { $set: updateparams }, { new: true }).then(function (Item) {
        if (Item) {
            var whereparams = {
                "_id": Item._id
            }
            return CollegeTypes.findOne(whereparams).then(function (item) {
                return item;
            })
        } else {
            throw new ErrorHelper.BadRequest("Something went wrong.", "error");
        }
    }).catch(function (error) {
        throw new ErrorHelper.BadRequest("Something went wrong.", error);
    })
}

/*************service for get one CollegeTypes */
exports.GetCollegetypesDetailList = function (params) {
    return CollegeTypes.findOne({ "_id": params._id }).then(function (Result) {
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

/*************service for get one CollegeTypes */
exports.DeletecollegeTypesdetails = function (params) {
    return CollegeTypes.findByIdAndDelete({ "_id": params._id }).then(function (Result) {
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

/********************************Branch Types Services*******************************/


/*************service for get BranchTypes */
exports.GetBranchTypesdetails = function () {
    console.log("Hello sir how are you")
    return BranchType.find().then(function (Items) {
        console.log(Items, "Items")
        if (Items) {
            console.log("Items", Items)
            return Items;
        } else {
            var Items = "";
            return Items;
        }
    }).catch(function (error) {
        throw new ErrorHelper.BadRequest("Something went wrong.", error);
    })
}

/*************service for create BranchTypes */
exports.CreateBranchTypesdetails = function (params) {
    var BranchTypesData = new BranchType(params)
    return BranchTypesData.save().then(function (Items) {
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

/*************service for update BranchTypes */
exports.updateBranchTypesdetails = function (Id, updateparams) {
    return BranchType.findOneAndUpdate({ _id: Id }, { $set: updateparams }, { new: true }).then(function (Item) {
        if (Item) {
            var whereparams = {
                "_id": Item._id
            }
            return BranchType.findOne(whereparams).then(function (item) {
                return item;
            })
        } else {
            throw new ErrorHelper.BadRequest("Something went wrong.", "error");
        }
    }).catch(function (error) {
        throw new ErrorHelper.BadRequest("Something went wrong.", error);
    })
}

/*************service for get one BranchTypes */
exports.GetBranchtypesDetailList = function (params) {
    console.log("Hell oser afs")
    return BranchType.findOne({ "_id": params._id }).then(function (Result) {
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

/*************service for get one BranchTypes */
exports.DeleteBranchTypesdetails = function (params) {
    console.log(params,"_id")
    return BranchType.findByIdAndDelete({ "_id": params._id }).then(function (Result) {
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

/********************************Infrastructure Services*******************************/

/*************service for get Infrastructure */
exports.GetInfrastructuredetails = function () {
    return Infrastructure.find().then(function (Items) {
        console.log(Items, "Items")
        if (Items) {
            console.log("Items", Items)
            return Items;
        } else {
            var Items = "";
            return Items;
        }
    }).catch(function (error) {
        throw new ErrorHelper.BadRequest("Something went wrong.", error);
    })
}

/*************service for create Infrastructure */
exports.CreateInfrastructuredetails = function (params) {
    var InfrastructureData = new Infrastructure(params)
    return InfrastructureData.save().then(function (Items) {
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

/*************service for update Infrastructure */
exports.updateInfrastructuredetails = function (Id, updateparams) {
    return Infrastructure.findOneAndUpdate({ _id: Id }, { $set: updateparams }, { new: true }).then(function (Item) {
        if (Item) {
            var whereparams = {
                "_id": Item._id
            }
            return Infrastructure.findOne(whereparams).then(function (item) {
                return item;
            })
        } else {
            throw new ErrorHelper.BadRequest("Something went wrong.", "error");
        }
    }).catch(function (error) {
        throw new ErrorHelper.BadRequest("Something went wrong.", error);
    })
}

/*************service for get one Infrastructure */
exports.GetInfrastructureDetailList = function (params) {
    console.log("Hell oser afs")
    return Infrastructure.findOne({ "_id": params._id }).then(function (Result) {
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

/*************service for get one Infrastructure */
exports.DeleteInfrastructuredetails = function (params) {
    return Infrastructure.findByIdAndDelete({ "_id": params._id }).then(function (Result) {
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

/********************************Exam Services*******************************/

/*************service for get Exam */
exports.GetExamdetails = function () {
    return ExamType.find().then(function (Items) {
        console.log(Items, "Items")
        if (Items) {
            console.log("Items", Items)
            return Items;
        } else {
            var Items = "";
            return Items;
        }
    }).catch(function (error) {
        throw new ErrorHelper.BadRequest("Something went wrong.", error);
    })
}

/*************service for create Exam */
exports.CreateExamdetails = function (params) {
    var ExamData = new ExamType(params)
    return ExamData.save().then(function (Items) {
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

/*************service for update Exam */
exports.updateExamdetails = function (Id, updateparams) {
    return ExamType.findOneAndUpdate({ _id: Id }, { $set: updateparams }, { new: true }).then(function (Item) {
        if (Item) {
            var whereparams = {
                "_id": Item._id
            }
            return ExamType.findOne(whereparams).then(function (item) {
                return item;
            })
        } else {
            throw new ErrorHelper.BadRequest("Something went wrong.", "error");
        }
    }).catch(function (error) {
        throw new ErrorHelper.BadRequest("Something went wrong.", error);
    })
}

/*************service for get one Exam */
exports.GetExamDetailList = function (params) {
    console.log("Hell oser afs")
    return ExamType.findOne({ "_id": params._id }).then(function (Result) {
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

/*************service for get one Exam */
exports.DeleteExamdetails = function (params) {
    return ExamType.findByIdAndDelete({ "_id": params._id }).then(function (Result) {
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

/********************************Company Services*******************************/


/*************service for get Company */
exports.GetCompanydetails = function () {
    return Company.find().then(function (Items) {
        console.log(Items, "Items")
        if (Items) {
            console.log("Items", Items)
            return Items;
        } else {
            var Items = "";
            return Items;
        }
    }).catch(function (error) {
        throw new ErrorHelper.BadRequest("Something went wrong.", error);
    })
}

/*************service for create Company */
exports.CreateCompanydetails = function (params) {
    var Companyparams = new Company(params)
    return Companyparams.save().then(function (Items) {
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

/*************service for update Company */
exports.updateCompanydetails = function (Id, updateparams) {
    return Company.findOneAndUpdate({ _id: Id }, { $set: updateparams }, { new: true }).then(function (Item) {
        if (Item) {
            var whereparams = {
                "_id": Item._id
            }
            return Company.findOne(whereparams).then(function (item) {
                return item;
            })
        } else {
            throw new ErrorHelper.BadRequest("Something went wrong.", "error");
        }
    }).catch(function (error) {
        throw new ErrorHelper.BadRequest("Something went wrong.", error);
    })
}

/*************service for get one Company */
exports.GetCompanyDetailList = function (params) {
    console.log("Hell oser afs")
    return Company.findOne({ "_id": params._id }).then(function (Result) {
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

/*************service for get one Company */
exports.DeleteCompanydetails = function (params) {
    return Company.findByIdAndDelete({ "_id": params._id }).then(function (Result) {
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