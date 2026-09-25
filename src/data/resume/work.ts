/**
 * Conforms to https://jsonresume.org/schema/
 */

export interface StudioJob {
  companyId: string;
  projectIds: string[];
}

const work: StudioJob[] = [
  {
    companyId: '06_ahog',
    projectIds: [ '12_tmnt', '11_dragons', '10_spirit' ]  
  },
  {
    companyId: '05_ceu',
    projectIds: [ '09_ceuProject' ]
  },
  {
    companyId: '04_utad',
    projectIds: [ '08_utadProject' ]  
  },
  {
    companyId: '03_gamelearn',
    projectIds: [ '07_2100', '06_merchants2' ]
  },
  {
    companyId: '02_unusualwonder',
    projectIds: [ '05_futbol4', '04_futbolstars' ]
  },
  {
    companyId: '01_pelta',
    projectIds: [ '03_developers', '02_mercenaries', '01_crownless' ]
  },
];

export default work;
