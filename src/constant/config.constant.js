const TYPE_IMAGE = [
  { name: 'partner', path: '../../src/images/partner' },
  { name: 'coreTeam', path: '../../src/images/coreTeam' },
  { name: 'news', path: '../../src/images/news', resize: true, width: 1200, height: 630 },
];

const TYPE_CORE_TEAM = ['EXECUTIVE', 'MANAGER', 'STAFF'];

const CONFIG = {
  PARTNER_CONTACT: 'partner_contact_email_receiver',
};

module.exports = {
  TYPE_IMAGE,
  TYPE_CORE_TEAM,
  CONFIG,
};
