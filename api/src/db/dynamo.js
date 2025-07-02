const AWS = require("aws-sdk");
const client = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });
const Table = process.env.DYNAMO_TABLE || "MyItems";

exports.create = async (data) => {
  const item = { id: Date.now().toString(), ...data };
  await client.put({ TableName: Table, Item: item }).promise();
  return item;
};

exports.getAll = async () => {
  const res = await client.scan({ TableName: Table }).promise();
  return res.Items;
};

exports.get = async (id) => {
  const res = await client.get({ TableName: Table, Key: { id } }).promise();
  return res.Item;
};

exports.update = async (id, data) => {
  const item = { id, ...data };
  await client.put({ TableName: Table, Item: item }).promise();
  return item;
};

exports.delete = async (id) => {
  await client.delete({ TableName: Table, Key: { id } }).promise();
};
