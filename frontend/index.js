const express = require('express')
var path = require('path');
var bodyParser = require('body-parser');
const app = express();
const port = 3000;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//setup public folder
app.use(express.static('./public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// required module to make calls to a REST API
const axios = require('axios');
const { request } = require('http');

app.get('/',function (req, res) {
    res.render('pages/home')
});

// stocks page
app.get('/stocks',function (req, res) {
    //getting the stock information
    var url = "http://127.0.0.1:5000/api/stock"

    axios.get(url)
    .then((response) => {
        let stocks = response.data

        // the loaded page will include the stocks information
        res.render('pages/stocks', {
            stocks: stocks,
            body: req.body
        });
    });
});

// adding to the stocks page
app.post('/add',function (req, res) {
    //getting the stock information
    var url = "http://127.0.0.1:5000/api/stock"

    var newabbr = req.body.newabbr
    var newname = req.body.newname
    var newprice = req.body.newprice

    axios.post(url, {
        abbreviation: newabbr,
        stockname: newname,
        currentprice: newprice
    })
    .then((response) => {
        let stocks = response.data

        // the loaded page will include the stocks information
        res.render('pages/newstock', {
            stocks: stocks,
            body: req.body
        });
    });
});

// updating a stock on the stock page
app.post('/update',function (req, res) {
    //getting the stock information
    var url = "http://127.0.0.1:5000/api/stock"

    var updnum = req.body.updnum
    var updabbr = req.body.updabbr
    var updname = req.body.updname
    var updprice = req.body.updprice

    axios.put(url, {
        stockid: updnum,
        abbreviation: updabbr,
        stockname: updname,
        currentprice: updprice
    })
    .then((response) => {
        let stocks = response.data

        // the loaded page will include the stocks information
        res.render('pages/newstock', {
            stocks: stocks,
            body: req.body
        });
    });
});

// deleting a stock on the stock page
app.post('/delete',function (req, res) {
    //getting the stock information
    var url = "http://127.0.0.1:5000/api/stock" 

    var delnum = req.body.delnum
    
    axios.delete(url, {
        data: {stockid: delnum}
    })
    .then((response) => {
        let stocks = response.data

        // the loaded page will include the stock information
        res.render('pages/newstock', {
            stocks: stocks,
            body: req.body
        });
    });
});

// bonds page
app.get('/bonds',function (req, res) {
    //getting the bond information
    var url = "http://127.0.0.1:5000/api/bond"

    axios.get(url)
    .then((response) => {
        let bonds = response.data

        // the loaded page will include the bonds information
        res.render('pages/bonds', {
            bonds: bonds,
            body: req.body
        });
    });
});

// adding to the bonds page
app.post('/badd',function (req, res) {
    //getting the bond information
    var url = "http://127.0.0.1:5000/api/bond"

    var bnewabbr = req.body.bnewabbr
    var bnewname = req.body.bnewname
    var bnewprice = req.body.bnewprice

    axios.post(url, {
        abbreviation: bnewabbr,
        bondname: bnewname,
        currentprice: bnewprice
    })
    .then((response) => {
        let bonds = response.data

        // the loaded page will include the bonds information
        res.render('pages/newbond', {
            bonds: bonds,
            body: req.body
        });
    });
});

// updating a bond on the bond page
app.post('/bupdate',function (req, res) {
    //getting the bond information
    var url = "http://127.0.0.1:5000/api/bond"

    var bupdnum = req.body.bupdnum
    var bupdabbr = req.body.bupdabbr
    var bupdname = req.body.bupdname
    var bupdprice = req.body.bupdprice

    axios.put(url, {
        bondid: bupdnum,
        abbreviation: bupdabbr,
        bondname: bupdname,
        currentprice: bupdprice
    })
    .then((response) => {
        let bonds = response.data

        // the loaded page will include the bonds information
        res.render('pages/newbond', {
            bonds: bonds,
            body: req.body
        });
    });
});

// deleting a bond on the bond page
app.post('/bdelete',function (req, res) {
    //getting the bond information
    var url = "http://127.0.0.1:5000/api/bond" 

    var bdelnum = req.body.bdelnum
    
    axios.delete(url, {
        data: {bondid: bdelnum}
    })
    .then((response) => {
        let bonds = response.data

        // the loaded page will include the bonds information
        res.render('pages/newbond', {
            bonds: bonds,
            body: req.body
        });
    });
});

// investor page
app.get('/investors',function (req, res) {
    //getting the investor information
    var url = "http://127.0.0.1:5000/api/investor"

    axios.get(url)
    .then((response) => {
        let investors = response.data

        // the loaded page will include the investor information
        res.render('pages/investors', {
            investors: investors,
            body: req.body
        });
    });
});

// adding to the investor page
app.post('/invadd',function (req, res) {
    //getting the bond information
    var url = "http://127.0.0.1:5000/api/investor"

    var invnewfname = req.body.invnewfname
    var invnewlname = req.body.invnewlname

    axios.post(url, {
        firstname: invnewfname,
        lastname: invnewlname
    })
    .then((response) => {
        let investors = response.data

        // the loaded page will include the investor information
        res.render('pages/newinvestor', {
            investors: investors,
            body: req.body
        });
    });
});

// updating a investor on the investor page
app.post('/invupdate',function (req, res) {
    //getting the bond information
    var url = "http://127.0.0.1:5000/api/investor"

    var invupdnum = req.body.invupdnum
    var updfname = req.body.updfname
    var updlname = req.body.updlname

    axios.put(url, {
        investid: invupdnum,
        firstname: updfname,
        lastname: updlname
    })
    .then((response) => {
        let investors = response.data

        // the loaded page will include the investor information
        res.render('pages/newinvestor', {
            investors: investors,
            body: req.body
        });
    });
});

// deleting a investor on the investor page
app.post('/invdelete',function (req, res) {
    //getting the investor information
    var url = "http://127.0.0.1:5000/api/investor" 

    var invdelnum = req.body.invdelnum
    
    axios.delete(url, {
        data: {investid: invdelnum}
    })
    .then((response) => {
        let investors = response.data

        // the loaded page will include the investor information
        res.render('pages/newinvestor', {
            investors: investors,
            body: req.body
        });
    });
});

app.get('/transaction' ,function(req,res){
    //getting the investor information
    var url = "http://127.0.0.1:5000/api/investor"

    axios.get(url)
    .then((response) => {
        let investors = response.data

        // the loaded page will include the bonds information
        res.render('pages/transaction', {
            investors: investors
        });
    });
});

// viewing an investor's transactions
app.post("/transaction", function(req, res){
    const selectedInvId = req.body.selectedInv;
    
    if (req.body.stock){
        var url = "http://127.0.0.1:5000/api/stock/investor"
    }
    if (req.body.bond){
        var url = "http://127.0.0.1:5000/api/bond/investor"
    }

    axios.get(url, {
        data: {investorid: selectedInvId}
    })
    .then((response) => {
        let transactions = response.data;
        
        res.render('pages/loadedtrans', {
            transactions: transactions,
            selectedInvId: selectedInvId,
            body: req.body
        });
    });
});

// sends the user to a new page verifying that a transaction was made/modified
app.post('/newbondtrans',function (req, res) {
    //getting the bond transaction information
    var url = "http://127.0.0.1:5000/api/bond/transaction"

    const selectedInvestor = req.body.selectedInvestor
    console.log("SELECTED PERSON'S ID IS: " + selectedInvestor);

    var bondtinvestid = selectedInvestor
    var bondtbondid = req.body.bondtbondid
    var bondtquant = req.body.bondtquant

    axios.post(url, {
        investorid: bondtinvestid,
        bondid: bondtbondid,
        quantity: bondtquant
    })
    .then((response) => {
        let bondstransaction = response.data

        // the loaded page will include the bonds transaction information
        res.render('pages/newtrans', {
            bondstransaction: bondstransaction,
            body: req.body
        });
    });
});

// deleting a bond transaction
app.post('/delbondtrans',function (req, res) {
    //getting the bond information
    var url = "http://127.0.0.1:5000/api/bond/transaction" 

    var bondtransnum = req.body.bondtransnum
    
    axios.delete(url, {
        data: {bondtransid: bondtransnum}
    })
    .then((response) => {
        let bondstransaction = response.data

        // the loaded page will include the bonds information
        res.render('pages/newtrans', {
            bondstransaction: bondstransaction,
            body: req.body
        });
    });
});

app.post('/newstocktrans',function (req, res) {
    //getting the stock transaction information
    var url = "http://127.0.0.1:5000/api/stock/transaction"

    const selectedstockInvestor = req.body.selectedstockInvestor
    console.log("SELECTED PERSON'S ID IS: " + selectedstockInvestor);

    var stocktinvestid = selectedstockInvestor
    var stocktstockid = req.body.stocktstockid
    var stocktquant = req.body.stocktquant

    axios.post(url, {
        investorid: stocktinvestid,
        stockid: stocktstockid,
        quantity: stocktquant
    })
    .then((response) => {
        let stockstransaction = response.data

        // the loaded page will include the bonds transaction information
        res.render('pages/newtrans', {
            stockstransaction: stockstransaction,
            body: req.body
        });
    });
});

// deleting a stock transaction
app.post('/delstocktrans',function (req, res) {
    //getting the stock information
    var url = "http://127.0.0.1:5000/api/stock/transaction" 

    var stocktransnum = req.body.stocktransnum
    
    axios.delete(url, {
        data: {stocktransid: stocktransnum}
    })
    .then((response) => {
        let stockstransaction = response.data

        // the loaded page will include the stocks information
        res.render('pages/newtrans', {
            stockstransaction: stockstransaction,
            body: req.body
        });
    });
});


app.get('/portfolio' ,function(req,res){
    //getting the investor information
    var url = "http://127.0.0.1:5000/api/investor"

    axios.get(url)
    .then((response) => {
        let investors = response.data

        // the loaded page will include the bonds information
        res.render('pages/portfolio', {
            investors: investors
        });
    });
});

// viewing an investor's transactions
app.post("/portfolio", function(req, res){
    const realPortselectedInv = req.body.realPortselectedInv;
    
    if (req.body.realPortstock){
        var url = "http://127.0.0.1:5000/api/stock/investor/port"
    }
    if (req.body.realPortbond){
        var url = "http://127.0.0.1:5000/api/bond/investor/port"
    }

    axios.get(url, {
        data: {investorid: realPortselectedInv}
    })
    .then((response) => {
        let portfolio = response.data;
        
        res.render('pages/loadedport', {
            portfolio: portfolio,
            realPortselectedInv: realPortselectedInv,
            body: req.body
        });
    });
});



app.listen(port, () => console.log(`MasterEJS app Started on port ${port}!`));