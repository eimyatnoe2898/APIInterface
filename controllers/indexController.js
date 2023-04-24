const axios = require("axios");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//Load Main Page
const loadMain = (req, res) => {
  //use axios to get the API response
  axios
    .get("https://eventsapi.netkinetix.com/SiteEvent/List")
    .then((result) => {
      console.log(result.data);

      // console.log(data);
      res.render("index", { title: "Home", requestType: "List" , events: result.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

const searchEvent =(req, res) => {
    console.log("Submitted form data: ") ;
    console.log(req.body);
    let seTitle = null; 
    let seEndDate = null;
    let seStartDate = null;

    if(req.body.seTitle != '')
    {
      seTitle = req.body.seTitle;
    }
    if(req.body.seStartDate != '')
    {
      seStartDate = req.body.seStartDate;
    }
    if(req.body.seEndDate != '')
    {
      seEndDate = req.body.seEndDate;
    }
    //use axios to post search to Netkinetix API
    axios
      .post("https://eventsapi.netkinetix.com/SiteEvent/Search", {
        "seTitle": seTitle,
        "seStartDate": seStartDate,
        "seEndDate": seEndDate
      })
      .then(function (response) {
        console.log(response.data);
        res.render("index", { title: "Home", requestType: "Search", events: response.data });

      })
      .catch(function (error) {
        console.log(error);
      });
  };

const addEvent = (req, res) => {
  //call post set to Netkinetix API
  console.log("Submitted form data: ") ;
  console.log(req.body);
  //call axios and get the API response
  axios
  .post("https://eventsapi.netkinetix.com/SiteEvent/Set", {
    "seID": 0,
    "seTitle": req.body.seTitle,
    "seStartDate": req.body.seStartDate,
    "seEndDate": req.body.seEndDate,
    "seLocation": req.body.seLocation,
    "seDescription": req.body.seDescription,
    "seUrl": req.body.seUrl,
    "seActive": req.body.seActive
  })
  .then(function (response) {
    console.log(response.data);
    res.redirect("/");
    // res.render("index", { title: "Home", requestType: "Search", events: response.data });

  })
  .catch(function (error) {
    console.log(error);
  });
};

const showEditForm = (req, res) => {
  //the event the user wants to edit
  const id = req.params.id;

  //call post set to Netkinetix API

  //call axios post search first and get the API response


  //call axios post set later to edit the content
  //use promise to render it to index page
  res.render("index", { title: "", sessionVar: req.session });
};

const editEvent = (req, res) => {
  //the event the user wants to edit
  const eventid = req.params.eventId;
  console.log("Event to edit");
  console.log(eventid);
  //call post set to Netkinetix API
  axios
  .post("https://eventsapi.netkinetix.com/SiteEvent/Search", {
    "seTitle": eventid,
    "seStartDate": null,
    "seEndDate": null
  })
  .then(function (response) {
    console.log(response.data);
    // res.status(200).send(response.data);
    res.send(response.data);

  })
  .catch(function (error) {
    console.log(error);
    // res.status(400).send(error);
    res.send(error);

    

  });
};

module.exports = { loadMain, searchEvent, showEditForm, addEvent, editEvent };
