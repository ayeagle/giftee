import  {
  RichGroupGift,
  GroupObject,
  GroupGift,
  CreateGroupObject,
  CreateUserObject, 
  UserDetails
} from "./CreateDataObjects";

let CurrGroupData: GroupObject = CreateGroupObject();
let curr_user_data: UserDetails = CreateUserObject();
let all_groups: GroupObject[] = [];

export function isReady() {
  return CurrGroupData.group_id != "";
}

export function initGroupObject(new_data: RichGroupGift[], source) {
  localStorage.setItem("group_name", new_data[0].name);

  //console.log(new_data);
  //console.log(new_data);
  //console.log("THIS IS THE NEW DAta");
  //console.log(new_data);
  //console.log(new_data);

  CurrGroupData.group_name = new_data[0].name;
  CurrGroupData.group_id = new_data[0].id;
  CurrGroupData.description = new_data[0].description;
  CurrGroupData.group_members = new_data[0].participants;
  CurrGroupData.user_ids = new_data[0].user_ids;
  CurrGroupData.user_names = new_data[0].user_names;
  CurrGroupData.admin_ids = new_data[0].admin_ids;
  CurrGroupData.num_users = new_data[0].user_ids.length;
  CurrGroupData.year = new_data[0].year;
  CurrGroupData.referral_hash = new_data[0].referral_hash;
  CurrGroupData.gift_exchange_time = new_data[0].gift_exchange_time;

  CurrGroupData.gift_exchange_date = new Date(
    new_data[0].gift_exchange_time * 1000
  ).toLocaleDateString("default");

  //console.log(CurrGroupData);
  //console.log(CurrGroupData);
  //console.log("THIS IS THE NEW CurrGroupData");
  //console.log(CurrGroupData);
  //console.log(CurrGroupData);

  CurrGroupData.invite_link = `giftee.io/invite?refid=${new_data[0].referral_hash}`;

  let temp: GroupGift[] = [];

  new_data.map((element, i) => {
    // ////console.log(element)
    temp.push({
      gift_id: element.unique_id,
      requester: element.requester_name,
      requester_id: element.requester_id,

      giver: element.giver_name,
      giver_id: element.giver_id,
      cost: element.cost,
      gift_name: element.gift_name,
      taken: element.taken,
      details: element.details,
      url: element.url,
      year: element.year,
      group_ids: element.group_ids,
    });
  });
  CurrGroupData.gifts = temp;
}

export async function getGroupObject() {
  return CurrGroupData;
}

export async function getAllGroups() {
  return all_groups;
}

export function updateAllGroups(new_data, source) {
  all_groups = new_data;
}

export async function getUserData() {
  return curr_user_data;
}

export async function updateUserData(newUserObject) {
  ////console.log("LOCAL USER DATA INSTANCE IS BEING UPDATED")
  curr_user_data = newUserObject;
}

export function isUserReady() {
  return curr_user_data.id != "";
}
