const express = require('express');
const router = express.Router();
const neo4j_calls = require('./../neo4j_calls/neo4j_api');


// Test api endpoint
router.get('/', async function (req, res, next) {
    res.status(200).send("Root Response from :8080/test_api")
    return 700000;
})


// API to get all the nodes in neo4j instance
router.get('/count_all_nodes', async function (req, res, next) {
    let result = await neo4j_calls.get_num_nodes();
    console.log("RESULT IS", result)
    res.status(200).json({ result })    //Can't send just a Number; encapsulate with {} or convert to String.     
    return { result };
})


// Get all the nodes with Parent_Of relationship.
router.get('/parent_of_nodes', async function (req, res, next) {
    try {
        const relationshipType = "PARENT_OF";
        const nodes = await neo4j_calls.getNodesByRelationship(relationshipType);
        res.status(200).json({ nodes });
    } catch (error) {
        console.error('Error fetching nodes by relationship:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Get all the nodes with Father_Of relationship.
router.get('/child_of_nodes', async function (req, res, next) {
    try {
        const relationshipType = "CHILD_OF";
        const nodes = await neo4j_calls.getNodesByRelationship(relationshipType);
        res.status(200).json({ nodes });
    } catch (error) {
        console.error('Error fetching nodes by relationship:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Get all the nodes with Sensei relationship.
router.get('/sensei_nodes', async function (req, res, next) {
    try {
        const relationshipType = "SENSEI";
        const nodes = await neo4j_calls.getNodesByRelationship(relationshipType);
        res.status(200).json({ nodes });
    } catch (error) {
        console.error('Error fetching nodes by relationship:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Get all the nodes with Sibling relationship.
router.get('/sibling_nodes', async function (req, res, next) {
    try {
        const relationshipType = "SIBLING"; // Change this to your specific relationship type
        const nodes = await neo4j_calls.getNodesByRelationship(relationshipType);
        res.status(200).json({ nodes });
    } catch (error) {
        console.error('Error fetching nodes by relationship:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Get all the nodes with Father_Of relationship.
router.get('/spouse_nodes', async function (req, res, next) {
    try {
        const relationshipType = "SPOUSE"; 
        const nodes = await neo4j_calls.getNodesByRelationship(relationshipType);
        res.status(200).json({ nodes });
    } catch (error) {
        console.error('Error fetching nodes by relationship:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Get all the nodes with Teammate relationship.
router.get('/father_of_nodes', async function (req, res, next) {
    try {
        const relationshipType = "TEAMMATE"; 
        const nodes = await neo4j_calls.getNodesByRelationship(relationshipType);
        res.status(200).json({ nodes });
    } catch (error) {
        console.error('Error fetching nodes by relationship:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




router.post('/neo4j_post', async function (req, res, next) {
    //Passing in "name" parameter in body of POST request
    let { name } = req.body;
    let string = await neo4j_calls.create_user(name);
    res.status(200).send("Character named " + string + " created")
    return 700000;
    //res.status(200).send("test delete")
})

module.exports = router;