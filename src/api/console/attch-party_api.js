 var party ={
  party_id: '',
  party_type: '',  // personal | organization
  party_name: '',
};
export const set_party = party => {
  this.party = party;
  localStorage.setItem('attach-party',JSON.stringify(party));
}
 export const get_party = party => {
    return JSON.parse(localStorage.getItem('attach-party'))
 }
