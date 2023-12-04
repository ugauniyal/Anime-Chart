let neo4j = require('neo4j-driver');
let { creds } = require("./../config/credentials");
let driver = neo4j.driver("neo4j+s://e6f25329.databases.neo4j.io", neo4j.auth.basic(creds.neo4jusername, creds.neo4jpw));


// Get total number of nodes
exports.get_num_nodes = async function () {
    let session = driver.session();
    const num_nodes = await session.run('MATCH (n) RETURN n', {
    });
    session.close();
    console.log("RESULT", (!num_nodes ? 0 : num_nodes.records.length));
    return (!num_nodes ? 0 : num_nodes.records.length);
};



// Create a character in neo4j database
exports.create_character = async function (name, village) {
    let session = driver.session();
    let character = "No Character Was Created";
    try {
        character = await session.run('MERGE (n:Character {name: $name, village: $village}) RETURN n', {
            name: name,
            village: village
        });
    }
    catch (err) {
        console.error(err);
        return character;
    }
    return character.records[0].get(0).properties.name;
}


// Get all the nodes of a specific relation
exports.getNodesByRelationship = async function (relationshipType) {
    let session = driver.session();
    try {
        const result = await session.run(
            `MATCH (n)-[:${relationshipType}]->(relatedNode) RETURN n, relatedNode`
        );
        const nodes = result.records.map(record => ({
            node: record.get('n').properties,
            relatedNode: record.get('relatedNode').properties
        }));
        return nodes;
    } catch (error) {
        console.error('Error fetching nodes by relationship:', error);
        throw error;
    } finally {
        session.close();
    }
};
