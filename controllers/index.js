const schemas = require('../models/schemas.js')

module.exports = {
    getHome: async (req, res) => {
        let menu = schemas.menu
        let sesh = req.session

        let menuResults = await menu.find({})
        .then((menuData) => {
            res.render('index', {title: "Menu Tracker", data: menuData, search: '', loggedIn: sesh.loggedIn})
        })
    },
    getSearch: async (req, res) => {
        let menu = schemas.menu;
        let q = req.body.searchInputs;
        let menuData = null;
        let sesh = req.session;
        let qry = {name:{$regex: '^' + q, $options: 'i'}};

        if (q != null) {
            let menuResults = await menu.find(qry).then((data) => {
                menuData = data;
            });
        } else {
            q = 'Search';
            let menuResult =  await menu.find({}).then( (data) => {
                menuData = data;
    });
    }

    res.render('index', {title:'Menu App', data:menuData, search:q, loggedIn: sesh.loggedIn});
}

//! 3:29