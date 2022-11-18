// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const AWS = require('aws-sdk')
const documentClient = new AWS.DynamoDB.DocumentClient()

const params = {
  TableName: 'tic-tac-toe',
  Item: {
    gameId: '5b5ee7d8', //make this random from one mill plus
    user1: 'myfirstuser',
    user2: 'theseconduser',
    board: [0,0,0,0,0,0,0,0,0],
    lastMoveBy: 'myfirstuser'
  }
}

documentClient.put(params).promise()
  .then(() => console.log('Game added successfully!'))
  .catch((error) => console.log('Error adding game', error))
