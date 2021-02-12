import randomDataGenerator from '../../__mocks__/utils';

const memberships = ['green', `bronze`, 'silver', 'gold', 'black'];

const mockMembership = () => {
  const item = {
    owner: 'did:com:1sx6e0euz40salwdczltvjtnwumhr0njxe2mfgl',
    tsp_address: 'did:com:1szp54senekajzq0754g62lcc6e068f8hlw8pcu',
    membership_type: randomDataGenerator.listValue(memberships),
    expiry_at: '4733862',
  };
  return item;
};

export { mockMembership };
