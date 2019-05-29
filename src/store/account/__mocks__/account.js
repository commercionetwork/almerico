import randomDataGenerator from "Store/__mocks__/utils";

const mockAccount = (id = 1) => {
  let item = {
    id,
    name: "commercio.network",
    address: "cosmos1fqzqejwkk898fcslw4z4eeqjzesynvrdvhqz82",
    pub_key: "cosmosvaloper1fqzqejwkk898fcslw4z4eeqjzesynvrdfr5hte",
  };
  return item;
};

export {
  mockAccount
};
