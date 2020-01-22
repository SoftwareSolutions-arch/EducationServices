// Import contact model';
var BranchsServices = require('../services/BranchServies');


/****************Controller for get Branch */
exports.GetAllBranch = function (req, res) {
    return BranchsServices.getallbranch().then(function (Data) {
        if (Data) {
            res.json({ "Status": 200, "result": Data, "Message": "Branch List." });
        } else {
            var Data = [];
            res.json({ "Status": 200, "result": Data, "Message": "No Branch found." });
        }

    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/****************Controller for create Branch */
exports.CreateBranch = function (req, res) {
    var branchprams = req.body;
    return BranchsServices.CreateBranch(branchprams).then(function (Data) {
        if (Data) {
            res.json({ "Status": 200, "result": Data, "Message": "Branch created successfully." });
        } else {
            var Data = [];
            res.json({ "Status": 200, "result": Data, "Message": "Branch created successfully." });
        }

    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/****************Controller for delete one Branch */
exports.deletebranch = function (req, res) {
    var Id = (req.params.Id) ? req.params.Id : false
    var whereparams = {
        "_id": Id
    }
    return BranchsServices.DeleteBranch(whereparams).then(function (Item) {
        res.json({ "Status": 200, "Message": "Branch  Deleted Suucessfully." });
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

// get Branch List

exports.GetBranchList = function (req, res) {
    var id = req.params.branchid
    console.log("id",id)
    return BranchsServices.GetAllBranchList(id).then(function (Data) {
        if (Data) {
            res.json({ "Status": 200, "Message": "Branch List.", "Data": Data });
        } else {
            res.json({ "Status": 200, "Message": "Branch List.", "Data": "" });
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

exports.GetBranchListbyid = function (req, res) {
    var id = req.params.branchid
    console.log("id",id)
    return BranchsServices.GetAllBranchListbyid(id).then(function (Data) {
        if (Data) {
            res.json({ "Status": 200, "Message": "Branch List.", "Data": Data });
        } else {
            res.json({ "Status": 200, "Message": "Branch List.", "Data": "" });
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

/**************** Controller for Update Branch */
exports.UpdateBranch = function (req, res) {
    var updateparams = req.body
    var Id = req.params.Id
    return BranchsServices.updateBranches(Id, updateparams).then(function (Item) {
        if (Item) {
            res.json({ "Status": 200, "Message": "Branch updated successfully. ", "result": Item });
        } else {
            var Item = [];
            res.json({ "Status": 200, "Message": ". ", "result": Item });
        }
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}


// get Branch List

exports.GetBranchListss = function (req, res) {
    var id = req.params.branchid
    console.log("id",id)
    return BranchsServices.GetAllBranchdetails(id).then(function (Data) {
        if (Data) {
            res.json({ "Status": 200, "Message": "Branch List.", "Data": Data });
        } else {
            res.json({ "Status": 200, "Message": "Branch List.", "Data": "" });
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

/*****************************************************************************************************/

/****************Controller for get Fees */
exports.GetallFees = function (req, res) {
    return BranchsServices.getfees().then(function (Data) {
        if (Data) {
            res.json({ "Status": 200, "result": Data, "Message": "Fees List." });
        } else {
            var Data = [];
            res.json({ "Status": 200, "result": Data, "Message": "No Fees found." });
        }

    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/****************Controller for create Fees */
exports.CreateallFees = function (req, res) {
    var feesparams = req.body;
    return BranchsServices.Createfees(feesparams).then(function (Data) {
        if (Data) {
            res.json({ "Status": 200, "result": Data, "Message": "Fees created successfully." });
        } else {
            var Data = [];
            res.json({ "Status": 200, "result": Data, "Message": "Fees created successfully." });
        }

    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/****************Controller for delete one Fees */
exports.deleteallFees = function (req, res) {
    var Id = (req.params.id) ? req.params.id : false
    var whereparams = {
        "_id": Id
    }
    console.log(whereparams, "whereparams id there")
    return BranchsServices.Deletefees(whereparams).then(function (Item) {
        res.json({ "Status": 200, "Message": "Fees  Deleted Suucessfully." });
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

exports.UpdateallFees = function (req, res) {
    var params = req.body
    return BranchsServices.Updatefees(params).then(function (Item) {
        if (Item) {
            res.json({ "Status": 200, "Message": "Fees update successfully", "result": Item });
        } else {
            var Item = [];
            res.json({ "Status": 200, "Message": "Fees update successfully", "result": Item });
        }
    }).catch(function (error) {
        return error
    })
}

/**************** Controller for Update city ***********************/
exports.UpdateallFees = function (req, res) {
    var updateparams = req.body;
    var id = req.params.id;
    return BranchsServices.Updatefees(id, updateparams).then(function (Item) {
        if (Item) {
            res.json({ "Status": 200, "Message": "Fees updated successfully. ", "result": Item });
        } else {
            var Item = [];
            res.json({ "Status": 200, "Message": "fees Structure", "result": Item });
        }
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

exports.GetFeesById = function (req, res) {
    var params = req.params.id
    return BranchsServices.GetFeesdetailsById(params).then(function (Item) {
        if (Item) {
            res.json({ "Status": 200, "Message": "Fees list", "result": Item });
        } else {
            var Item = [];
            res.json({ "Status": 200, "Message": "Fees list", "result": Item });
        }
    }).catch(function (error) {
        return error
    })
}

//****************************************************************** */


/****************Controller for get leads */
exports.GetAllLeads = function(req, res){
    return BranchsServices.GetallLeadsDetails().then(function (Data) {
        if(Data){
            res.json({ "Status": 200, "result": Data, "Message": "Leads List." });
        }else{
            var Data = [];
            res.json({ "Status": 200, "result": Data, "Message": "No Leads found." });
        }
        
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}
    
/****************Controller for create leads */
exports.CreateLeads = function(req, res){
    var Leadsparams = req.body;
    return BranchsServices.CreateAllLeads(Leadsparams).then(function (Data) {
        if(Data){
            res.json({ "Status": 200, "result": Data, "Message": "Leads created successfully." });
        }else{
            var Data = [];
            res.json({ "Status": 200, "result": Data, "Message": "Leads created successfully." });
        }
        
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/****************Controller for update Leads */
exports.UpdateLeads = function(req, res){
    var userwhereparams = req.params.Id;
    var updateuserparams = req.body;
    return BranchsServices.UpdateLead(userwhereparams, updateuserparams).then(function (Data) {
        res.json({ "Status": 200, "result": Data, "Message": "Leads update successfully." });
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    }); 
}

/****************Controller for get one Leads */
exports.UserDetailList = function (req, res) {
    var Id = (req.params.Id) ? req.params.Id : false
    var whereparams = {
        "_id": Id
    }
    return BranchsServices.GetUserDetails(whereparams).then(function (Item) {
        res.json({ "Status": 200, "Data": Item, "Message": "Leads  Record Found." });
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/****************Controller for delete one Leads */
exports.DeleteLeadRecord = function (req, res) {
    var Id = (req.params.Id) ? req.params.Id : false
    var whereparams = {
        "_id": Id
    }
    return BranchsServices.DeleteLeadDetails(whereparams).then(function (Item) {
        res.json({ "Status": 200, "Message": "Leads  Deleted Suucessfully." });
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/***************************College Types Controller************************************* */


/****************Controller for get collegeTypes */
exports.GetcollegeTypes = function(req, res){
    return BranchsServices.GetcollegeTypesdetails().then(function (Data) {
        if(Data){
            res.json({ "Status": 200, "result": Data, "Message": "College List." });
        }else{
            var Data = [];
            res.json({ "Status": 200, "result": Data, "Message": "No College found." });
        }
        
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/****************Controller for create collegeTypes */
exports.CreatecollegeTypes = function(req, res){
    var Leadsparams = req.body;
    return BranchsServices.CreatecollegeTypesdetails(Leadsparams).then(function (Data) {
        if(Data){
            res.json({ "Status": 200, "result": Data, "Message": "College created successfully." });
        }else{
            var Data = [];
            res.json({ "Status": 200, "result": Data, "Message": "College created successfully." });
        }
        
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/****************Controller for update collegeTypes */
exports.UpdatecollegeTypes = function(req, res){
    var userwhereparams = req.params.Id;
    var updateuserparams = req.body;
    return BranchsServices.updatecollegeTypesdetails(userwhereparams, updateuserparams).then(function (Data) {
        res.json({ "Status": 200, "result": Data, "Message": "College update successfully." });
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    }); 
}

/****************Controller for get one collegeTypes */
exports.GetsingleCollegetypes = function (req, res) {
    var Id = (req.params.Id) ? req.params.Id : false
    var whereparams = {
        "_id": Id
    }
    return BranchsServices.GetCollegetypesDetailList(whereparams).then(function (Item) {
        res.json({ "Status": 200, "Data": Item, "Message": "College Types  Record Found." });
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/****************Controller for delete one collegeTypes */
exports.DeletecollegeTypes = function (req, res) {
    var Id = (req.params.Id) ? req.params.Id : false
    var whereparams = {
        "_id": Id
    }
    return BranchsServices.DeletecollegeTypesdetails(whereparams).then(function (Item) {
        res.json({ "Status": 200, "Message": "college Types Deleted Suucessfully." });
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}


/***************************Branch Types Controller************************************* */


/****************Controller for get BranchTypes */
exports.GetBranchTypes = function(req, res){
    console.log("hello bro")
    return BranchsServices.GetBranchTypesdetails().then(function (Data) {
        if(Data){
            res.json({ "Status": 200, "result": Data, "Message": "Branch List." });
        }else{
            var Data = [];
            res.json({ "Status": 200, "result": Data, "Message": "No Branch found." });
        }
        
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/****************Controller for create BranchTypes */
exports.CreateBranchTypes = function(req, res){
    var Leadsparams = req.body;
    return BranchsServices.CreateBranchTypesdetails(Leadsparams).then(function (Data) {
        if(Data){
            res.json({ "Status": 200, "result": Data, "Message": "Branch created successfully." });
        }else{
            var Data = [];
            res.json({ "Status": 200, "result": Data, "Message": "Branch created successfully." });
        }
        
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/****************Controller for update BranchTypes */
exports.UpdateBranchTypes = function(req, res){
    var userwhereparams = req.params.Id;
    var updateuserparams = req.body;
    return BranchsServices.updateBranchTypesdetails(userwhereparams, updateuserparams).then(function (Data) {
        res.json({ "Status": 200, "result": Data, "Message": "Branch update successfully." });
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    }); 
}

/****************Controller for get one BranchTypes */
exports.GetsingleBranchTypes = function (req, res) {
    console.log("GetBranchtypesDetailList")
    var Id = (req.params.Id) ? req.params.Id : false
    var whereparams = {
        "_id": Id
    }
    console.log("ID",whereparams)
    return BranchsServices.GetBranchtypesDetailList(whereparams).then(function (Item) {
        res.json({ "Status": 200, "Data": Item, "Message": "Branch Types  Record Found." });
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/****************Controller for delete one BranchTypes */
exports.DeleteBranchTypes = function (req, res) {
    var Id = (req.params.Id) ? req.params.Id : false
    var whereparams = {
        "_id": Id
    }

    console.log(whereparams,"whereparamswhereparams")
    return BranchsServices.DeleteBranchTypesdetails(whereparams).then(function (Item) {
        res.json({ "Status": 200, "Message": "Branch Types Deleted Suucessfully." });
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}



/*************************Infrastructure Controller************************************* */


/****************Controller for get InfrastructureTypes */
exports.GetInfrastructure = function(req, res){
    console.log("hello bro")
    return BranchsServices.GetInfrastructuredetails().then(function (Data) {
        if(Data){
            res.json({ "Status": 200, "result": Data, "Message": "Infrastructure List." });
        }else{
            var Data = [];
            res.json({ "Status": 200, "result": Data, "Message":"No Infrastructure found." });
        }
        
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/****************Controller for create InfrastructureTypes */
exports.CreateInfrastructure = function(req, res){
    var Leadsparams = req.body;
    return BranchsServices.CreateInfrastructuredetails(Leadsparams).then(function (Data) {
        if(Data){
            res.json({ "Status": 200, "result": Data, "Message": "Infrastructure created successfully." });
        }else{
            var Data = [];
            res.json({ "Status": 200, "result": Data, "Message": "Infrastructure created successfully." });
        }
        
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/****************Controller for update InfrastructureTypes */
exports.UpdateInfrastructure = function(req, res){
    var userwhereparams = req.params.Id;
    var updateuserparams = req.body;
    return BranchsServices.updateInfrastructuredetails(userwhereparams, updateuserparams).then(function (Data) {
        res.json({ "Status": 200, "result": Data, "Message": "Infrastructure update successfully." });
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    }); 
}

/****************Controller for get one InfrastructureTypes */
exports.GetsingleInfrastructure = function (req, res) {
    var Id = (req.params.Id) ? req.params.Id : false
    var whereparams = {
        "_id": Id
    }
    console.log("ID",whereparams)
    return BranchsServices.GetInfrastructureDetailList(whereparams).then(function (Item) {
        res.json({ "Status": 200, "Data": Item, "Message": "Infrastructure Types  Record Found." });
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/****************Controller for delete one InfrastructureTypes */
exports.DeleteInfrastructure = function (req, res) {
    var Id = (req.params.Id) ? req.params.Id : false
    var whereparams = {
        "_id": Id
    }
    return BranchsServices.DeleteInfrastructuredetails(whereparams).then(function (Item) {
        res.json({ "Status": 200, "Message": "Infrastructure Types Deleted Suucessfully." });
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}


/*************************Exam Controller************************************* */


/****************Controller for get Exam  */
exports.GetExamTypes = function(req, res){
    console.log("hello bro")
    return BranchsServices.GetExamdetails().then(function (Data) {
        if(Data){
            res.json({ "Status": 200, "result": Data, "Message": "Exam List." });
        }else{
            var Data = [];
            res.json({ "Status": 200, "result": Data, "Message":"No Exam found." });
        }
        
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/****************Controller for create ExamTypes */
exports.CreateExamTypes = function(req, res){
    var Leadsparams = req.body;
    return BranchsServices.CreateExamdetails(Leadsparams).then(function (Data) {
        if(Data){
            res.json({ "Status": 200, "result": Data, "Message": "Exam created successfully." });
        }else{
            var Data = [];
            res.json({ "Status": 200, "result": Data, "Message": "Exam created successfully." });
        }
        
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/****************Controller for update ExamTypes */
exports.UpdateExamTypes = function(req, res){
    var userwhereparams = req.params.Id;
    var updateuserparams = req.body;
    return BranchsServices.updateExamdetails(userwhereparams, updateuserparams).then(function (Data) {
        res.json({ "Status": 200, "result": Data, "Message": "Exam update successfully." });
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    }); 
}

/****************Controller for get one ExamTypes */
exports.GetsingleExamTypes = function (req, res) {
    var Id = (req.params.Id) ? req.params.Id : false
    var whereparams = {
        "_id": Id
    }
    console.log("ID",whereparams)
    return BranchsServices.GetExamDetailList(whereparams).then(function (Item) {
        res.json({ "Status": 200, "Data": Item, "Message": "Exam Types  Record Found." });
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/****************Controller for delete one ExamTypes */
exports.DeleteExamTypes = function (req, res) {
    var Id = (req.params.Id) ? req.params.Id : false
    var whereparams = {
        "_id": Id
    }
    return BranchsServices.DeleteExamdetails(whereparams).then(function (Item) {
        res.json({ "Status": 200, "Message": "Exam Types Deleted Suucessfully." });
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}


/*************************Company Controller************************************* */


/****************Controller for get Company  */
exports.GetCompanyTypes = function(req, res){
    console.log("hello bro")
    return BranchsServices.GetCompanydetails().then(function (Data) {
        if(Data){
            res.json({ "Status": 200, "result": Data, "Message": "Company List." });
        }else{
            var Data = [];
            res.json({ "Status": 200, "result": Data, "Message":"No Company found." });
        }
        
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/****************Controller for create CompanyTypes */
exports.CreateExamTypes = function(req, res){
    var Leadsparams = req.body;
    return BranchsServices.CreateCompanydetails(Leadsparams).then(function (Data) {
        if(Data){
            res.json({ "Status": 200, "result": Data, "Message": "Company created successfully." });
        }else{
            var Data = [];
            res.json({ "Status": 200, "result": Data, "Message": "Company created successfully." });
        }
        
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/****************Controller for update Company  */
exports.UpdateCompanyTypes = function(req, res){
    var userwhereparams = req.params.Id;
    var updateuserparams = req.body;
    return BranchsServices.updateCompanydetails(userwhereparams, updateuserparams).then(function (Data) {
        res.json({ "Status": 200, "result": Data, "Message": "Company update successfully." });
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    }); 
}

/****************Controller for get one Company */
exports.GetsingleCompanyTypes = function (req, res) {
    var Id = (req.params.Id) ? req.params.Id : false
    var whereparams = {
        "_id": Id
    }
    console.log("ID",whereparams)
    return BranchsServices.GetCompanyDetailList(whereparams).then(function (Item) {
        res.json({ "Status": 200, "Data": Item, "Message": "Company Types  Record Found." });
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}

/****************Controller for delete one Company */
exports.DeleteCompanyTypes = function (req, res) {
    var Id = (req.params.Id) ? req.params.Id : false
    var whereparams = {
        "_id": Id
    }
    return BranchsServices.DeleteCompanydetails(whereparams).then(function (Item) {
        res.json({ "Status": 200, "Message": "Company Types Deleted Suucessfully." });
    }).catch(function (error) {
        res.status(500).json({ code: 500, succeed: false, message: "Something went wrong.", errorsdata: error });
    });
}