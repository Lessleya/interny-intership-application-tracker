const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
  
  const result = await mongodb.getDb().db().collection('internships').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
}

catch(error) {
  res.status(500).json(error)
}
}; 

const getSingle = async (req, res) => {
  let id = req.param.id 
  if (id) {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('internships').find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });


  }
  else {
    res.status(400).send("You need to provide an ID")
  }
 
};

const createInternship = async (req, res) => {
  const internship = {
    company: req.body.company,
    appDeadline: req.body.appDeadline,
    interntTitle: req.body.interntTitle,
    appSubmitted: req.body.appSubmitted,
    appSubmittedDate: req.body.appSubmittedDate,
    interview: req.body.interview,
    rejected: req.body.rejected,
    skills: req.body.skills,
    priority: req.body.priority,
    referral: req.body.referral


  };
  const response = await mongodb.getDb().db().collection('internships').insertOne(createInternship);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the internship.');
  }
};

const updateInternship = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const contact = {
    company: req.body.company,
    appDeadline: req.body.appDeadline,
    interntTitle: req.body.interntTitle,
    appSubmitted: req.body.appSubmitted,
    appSubmittedDate: req.body.appSubmittedDate,
    interview: req.body.interview,
    rejected: req.body.rejected,
    skills: req.body.skills,
    priority: req.body.priority,
    referral: req.body.referral
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('internships')
    .replaceOne({ _id: userId }, contact);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the internship.');
  }
};

const deleteInternship = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('internships').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the internship.');
  }
};


module.exports = {
  getAll,
  getSingle,
  createInternship,
  updateInternship,
  deleteInternship

};