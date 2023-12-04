// HierarchicalNodes.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/ParentNodes.css'; // Import your CSS file for styling

function ParentNodes() {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    // Fetch parent-child relationships
    axios.get('http://localhost:8000/test_api/parent_of_nodes')
      .then(response => {
        console.log('All Nodes:', response.data);
        const hierarchicalNodes = organizeHierarchy(response.data.nodes);
        setNodes(hierarchicalNodes);
      })
      .catch(error => {
        console.error('Error fetching nodes:', error);
      });
  }, []);

  // Function to organize nodes hierarchically
  const organizeHierarchy = data => {
    const hierarchy = {};

    data.forEach(({ node, relatedNode }) => {
      if (!hierarchy[node.name]) {
        hierarchy[node.name] = {
          parent: null,
          children: [],
        };
      }

      if (!hierarchy[relatedNode.name]) {
        hierarchy[relatedNode.name] = {
          parent: node.name,
          children: [],
        };
      }

      hierarchy[node.name].children.push(relatedNode.name);
    });

    const topNodes = Object.keys(hierarchy).filter(node => hierarchy[node].parent === null);

    return topNodes.map(node => createHierarchy(node, hierarchy));
  };

  // Function to create hierarchical structure
  const createHierarchy = (node, hierarchy) => {
    const children = hierarchy[node].children.map(child => createHierarchy(child, hierarchy));
    return { node, children };
  };

  // Function to render hierarchical nodes
  const renderNodes = (node) => (
    <div key={node.node} className="node">
      <h3>{node.node}</h3>
      {node.children.length > 0 && (
        <div className="children">
          {node.children.map((child) => renderNodes(child))}
        </div>
      )}
    </div>
  );

  // Function to render only top-level parents
  const renderTopLevelParents = () => (
    <div className="parents">
      {nodes.map((node) => {
        if (node.children.length === 0) {
          return renderNodes(node);
        }
        return null;
      })}
    </div>
  );

  // Function to render children under parents
  const renderChildrenUnderParents = () => (
    <div className="children-under-parents">
      {nodes.map((node) => {
        if (node.children.length > 0) {
          return renderNodes(node);
        }
        return null;
      })}
    </div>
  );

  return (
    <div className="container">
      <h1>Hierarchical Relationships</h1>
      <div className="tree">
        {renderTopLevelParents()}
        {renderChildrenUnderParents()}
      </div>
    </div>
  );
}

export default ParentNodes;
