// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

const performMove = async ({ gameId, user, move, mark, board }) => {
 board[move] = mark;
 
  const params = {
    TableName: "turn-based-game",
    Key: {
      gameId: gameId
    },
    UpdateExpression: `SET lastMoveBy = :user, board = :newBoard`,
    ConditionExpression: `(user1 = :user OR user2 = :user) AND lastMoveBy <> :user`,
    ExpressionAttributeValues: {
      ":user": user,
      ":newBoard": board
    },
    ReturnValues: "ALL_NEW"
  };
  try {
    const resp = await documentClient.update(params).promise();
    return resp.Attributes;
  } catch (error) {
    console.log("Error updating item: ", error.message);
    throw new Error('Could not perform move')
  }
};

module.exports = performMove