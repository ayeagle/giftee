import {
  RichGroupGift,
  GroupObject,
  GroupGift,
  CreateGroupObject,
  CreateUserObject,
  UserDetails,
} from "./CreateDataObjects";

export class GroupData {
  private curr_group_data: GroupObject = CreateGroupObject();
  //   private curr_user_data: UserDetails = CreateUserObject();
  //   private all_groups: GroupObject[] = [];

  constructor(new_data: RichGroupGift[]) {
    this.curr_group_data.group_name = new_data[0].name;
    this.curr_group_data.group_id = new_data[0].id;
    this.curr_group_data.description = new_data[0].description;
    this.curr_group_data.group_members = new_data[0].participants;
    this.curr_group_data.user_ids = new_data[0].user_ids;
    this.curr_group_data.user_names = new_data[0].user_names;
    this.curr_group_data.admin_ids = new_data[0].admin_ids;
    this.curr_group_data.num_users = new_data[0].user_ids.length;
    this.curr_group_data.year = new_data[0].year;
    this.curr_group_data.referral_hash = new_data[0].referral_hash;
    this.curr_group_data.gift_exchange_time = new_data[0].gift_exchange_time;

    this.curr_group_data.gift_exchange_date = new Date(
      new_data[0].gift_exchange_time * 1000
    ).toLocaleDateString("default");
    this.curr_group_data.invite_link = `giftee.io/invite?refid=${new_data[0].referral_hash}`;

    let temp: GroupGift[] = [];

    new_data.map((element, i) => {
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
    this.curr_group_data.gifts = temp;
  }

  isReady() {
    return this.curr_group_data.group_id != "";
  }

  async getGroupObject() {
    while (!this.isReady()) {
      await this.delay(100);
    }

    return this.curr_group_data;
  }

//   async getAllGroups() {
//     return this.all_groups;
//   }

//   updateAllGroups(new_data, source) {
//     this.all_groups = new_data;
//   }

//   async getUserData() {
//     return this.curr_user_data;
//   }

//   async updateUserData(newUserObject) {
//     //////console.log("LOCAL USER DATA INSTANCE IS BEING UPDATED")
//     this.curr_user_data = newUserObject;
//   }

//   isUserReady() {
//     return this.curr_user_data.id != "";
//   }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Getter and Setter for group_name
  get group_name(): string {
    return this.curr_group_data.group_name;
  }

  set group_name(value: string) {
    this.curr_group_data.group_name = value;
  }

  // Getter and Setter for group_id
  get group_id(): string {
    return this.curr_group_data.group_id;
  }

  set group_id(value: string) {
    this.curr_group_data.group_id = value;
  }

  // Getter and Setter for description
  get description(): string {
    return this.curr_group_data.description;
  }

  set description(value: string) {
    this.curr_group_data.description = value;
  }

  // Getter and Setter for group_members
  get group_members(): string[] {
    return this.curr_group_data.group_members;
  }

  set group_members(value: string[]) {
    this.curr_group_data.group_members = value;
  }

  // Getter and Setter for user_ids
  get user_ids(): string[] {
    return this.curr_group_data.user_ids;
  }

  set user_ids(value: string[]) {
    this.curr_group_data.user_ids = value;
  }

  // Getter and Setter for user_names
  get user_names(): string[] {
    return this.curr_group_data.user_names;
  }

  set user_names(value: string[]) {
    this.curr_group_data.user_names = value;
  }

  // Getter and Setter for admin_ids
  get admin_ids(): string[] {
    return this.curr_group_data.admin_ids;
  }

  set admin_ids(value: string[]) {
    this.curr_group_data.admin_ids = value;
  }

  // Getter and Setter for num_users
  get num_users(): number {
    return this.curr_group_data.num_users;
  }

  set num_users(value: number) {
    this.curr_group_data.num_users = value;
  }

  // Getter and Setter for referral_hash
  get referral_hash(): string {
    return this.curr_group_data.referral_hash;
  }

  set referral_hash(value: string) {
    this.curr_group_data.referral_hash = value;
  }

  // Getter and Setter for invite_link
  get invite_link(): string {
    return this.curr_group_data.invite_link;
  }

  set invite_link(value: string) {
    this.curr_group_data.invite_link = value;
  }

  // Getter and Setter for gift_exchange_time
  get gift_exchange_time(): number {
    return this.curr_group_data.gift_exchange_time;
  }

  set gift_exchange_time(value: number) {
    this.curr_group_data.gift_exchange_time = value;
  }

  // Getter and Setter for gift_exchange_date
  get gift_exchange_date(): string {
    return this.curr_group_data.gift_exchange_date;
  }

  set gift_exchange_date(value: string) {
    this.curr_group_data.gift_exchange_date = value;
  }

  // Getter and Setter for year
  get year(): number {
    return this.curr_group_data.year;
  }

  set year(value: number) {
    this.curr_group_data.year = value;
  }

  // Getter and Setter for gifts
  get gifts(): GroupGift[] {
    return this.curr_group_data.gifts;
  }

  set gifts(value: GroupGift[]) {
    this.curr_group_data.gifts = value;
  }
}
