const fs = require('fs')
const app = require('express')();
const port = process.env.PORT ||8000
const JOB_LISTINGS_FILE = './file.json'

app.get('/GETJobListings/:id', (req, res) => {
    console.log("req: ", req.params);
    const { id } = req.params;
    fs.readFile(JOB_LISTINGS_FILE, (error, data) => {
        if (error) {
            res.status(500).send({
                reply: "SERVER ERROR! couldn't load listings",
                payload: error
            });
        } else {
            if (id === null || id === undefined) {
                res.status(200).send({
                    reply: "listings retrieved!",
                    payload: JSON.parse(data)
                });
            } else {
                const numericId = parseInt(id, 10); // Convert id to a number
                if (!isNaN(numericId)) {
                    const listings = JSON.parse(data);
                    const listing = listings[numericId];
                    if (listing) {
                        res.status(200).send({
                            reply: "listing " + numericId + " retrieved!",
                            payload: listing
                        });
                    } else {
                        res.status(404).send({
                            reply: "listing not found",
                            payload: null
                        });
                    }
                } else {
                    res.status(400).send({
                        reply: "Invalid ID format",
                        payload: null
                    });
                }
            }
        }
    });
});

app.post('/SETJobviewed/:id', (req, res) => {
    const { id } = req.params;
    fs.readFile(JOB_LISTINGS_FILE, (error, data) => {
        if (error) {
            res.status(500).send({
                reply: "SERVER ERROR! couldn't load listings",
                payload: error
            });
        } else {
            const listings = JSON.parse(data);
            const listing = listings[id];
            if (listing) {
                listing.viewed = true;
                fs.writeFile(JOB_LISTINGS_FILE, JSON.stringify(listings), (err) => {
                    if (err) {
                        res.status(500).send({
                            reply: "SERVER ERROR! couldn't update listing",
                            payload: err
                        });
                    } else {
                        res.status(200).send({
                            reply: "viewed "+listing.title,
                            payload: listing
                        });
                    }
                });
            } else {
                res.status(404).send({
                    reply: "listing not found",
                    payload: null
                });
            }
        }
    });
})

app.post('/SETJobApplied/:id', (req, res) => {
    const { id } = req.params;
    fs.readFile(JOB_LISTINGS_FILE, (error, data) => {
        if (error) {
            res.status(500).send({
                reply: "SERVER ERROR! couldn't load listings",
                payload: error
            });
        } else {
            const listings = JSON.parse(data);
            const listing = listings[id];
            if (listing) {
                listing.applied = true;
                fs.writeFile(JOB_LISTINGS_FILE, JSON.stringify(listings), (err) => {
                    if (err) {
                        res.status(500).send({
                            reply: "SERVER ERROR! couldn't update listing",
                            payload: err
                        });
                    } else {
                        res.status(200).send({
                            reply: "applied to "+listing.title,
                            payload: listing
                        });
                    }
                });
            } else {
                res.status(404).send({
                    reply: "listing not found",
                    payload: null
                });
            }
        }
    });
})

app.get('/GETJobListings', (req, res) => {
    fs.readFile(JOB_LISTINGS_FILE, (error, data) => {
        if (error) {
            res.status(500).send({
                reply: "SERVER ERROR! couldn't load listings",
                payload: error
            });
        } else {

                res.status(200).send({
                    reply: "listings retrieved!",
                    payload: JSON.parse(data)
                });
        }
    });
});

app.listen(port,()=>{
    console.log('listening on port '+"http://localhost:"+port);
})

