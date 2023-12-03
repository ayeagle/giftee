import {
  RichGroupGift,
  GroupObject,
  GroupGift,
  CreateGroupObject,
  CreateUserObject,
  UserDetails,
} from "./CreateDataObjects";

let curr_group_data: GroupObject = CreateGroupObject();
let curr_user_data: UserDetails = CreateUserObject();
let all_groups: GroupObject[] = [];

export function isReady() {
  return curr_group_data.group_id != "";
}

export function initGroupObject(new_data: RichGroupGift[], source) {
  localStorage.setItem("group_name", new_data[0].name);

  //console.log(new_data);
  //console.log(new_data);
  //console.log("THIS IS THE NEW DAta");
  //console.log(new_data);
  //console.log(new_data);

  curr_group_data.group_name = new_data[0].name;
  curr_group_data.group_id = new_data[0].id;
  curr_group_data.description = new_data[0].description;
  curr_group_data.group_members = new_data[0].participants;
  curr_group_data.user_ids = new_data[0].user_ids;
  curr_group_data.user_names = new_data[0].user_names;
  curr_group_data.admin_ids = new_data[0].admin_ids;
  curr_group_data.num_users = new_data[0].user_ids.length;
  curr_group_data.year = new_data[0].year;
  curr_group_data.referral_hash = new_data[0].referral_hash;
  curr_group_data.gift_exchange_time = new_data[0].gift_exchange_time;

  curr_group_data.gift_exchange_date = new Date(
    new_data[0].gift_exchange_time * 1000
  ).toLocaleDateString("default");

  //console.log(curr_group_data);
  //console.log(curr_group_data);
  //console.log("THIS IS THE NEW CURR_GROUP_DATA");
  //console.log(curr_group_data);
  //console.log(curr_group_data);

  curr_group_data.invite_link = `giftee.io/invite?refid=${new_data[0].referral_hash}`;

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
  curr_group_data.gifts = temp;
}

export async function getGroupObject() {
  while (!isReady()) {
    await delay(100);
  }

  return curr_group_data;
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

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
