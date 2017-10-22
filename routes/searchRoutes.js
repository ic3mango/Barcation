const yelpService = require('../services/yelpService');
const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');

const Bar = mongoose.model('Bar');

async function preYelpResponseHandling(businesses, user, cb) {
  const businessIds = businesses.map(business => business.id);
  const barData = await Bar.find({'yelpId': { $in: businessIds }});
  for (var i=0; i < businesses.length; i++){
    businesses[i].patrons = [];
    businesses[i].userGoing = false;
    businesses[i].image_url = standardizeYelpPhotoDimensions(businesses[i].image_url);

    for (var j=0; j < barData.length; j++) {
      if (businesses[i].id === barData[j].yelpId) {
        const { patrons } = barData[j];
        if (user && patrons.includes(user.twitterName)) {
          businesses[i].userGoing = true;
        }
        businesses[i].patrons.push(...patrons);
      }
    }
  }
  cb(null, businesses);
}

function standardizeYelpPhotoDimensions(imageUrl) {
  return imageUrl.replace("o.jpg", "ms.jpg");
}

module.exports = (app) => {
  app.post('/api/yelp', async (req, res) => {
    const yelpClient = await yelpService();
    const { latitude, longitude, location } = req.body

    // replace with getting terms off req.body
    const searchRequest = {
      term:'bars',
      limit: 20,
      latitude,
      longitude,
      location
    }

    yelpClient.search(searchRequest).then((response) => {
      preYelpResponseHandling(response.jsonBody.businesses, req.user, (err, data) => {
        res.json(data);
      });

    })
    .catch(err => console.log(err));
  });

  app.post('/api/yelp/:yelpId', requireLogin, async(req, res) => {
    const { type: actionType } = req.body;
    let bar = await Bar.findOne({ yelpId: req.params.yelpId });
    if (!bar) {
      bar = new Bar({
      yelpId: req.params.yelpId,
      createDate: Date.now()
      });
    }

    if (bar.patrons && actionType === "remove") {
      bar.patrons.splice(bar.patrons.indexOf(req.user.twitterName), 1);

      const savedBar = await bar.save();
      res.send(savedBar);
    }
    else if (actionType === "add") {
      if (bar.patrons && bar.patrons.includes(req.user.twitterName)) {
        res.status(403).end("You are already on the list");
      }
      bar.patrons = [...bar.patrons, req.user.twitterName];

      const savedBar = await bar.save();
      res.send(savedBar);
    }
    res.status(400).end("Specify 'type' of action in post object");
  });
}
