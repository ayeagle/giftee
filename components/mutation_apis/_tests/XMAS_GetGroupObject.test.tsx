import XMAS_GetGroupObject from "../XMAS_GetGroupObject";

type TestDataPayload = {
  test_title: string;
  input_data: {
    // group attributes
    group_id?: string;
    xmas_group_name?: string;
    xmas_referral_hash?: string;
    description?: string;
    gift_exchange_time?: number;
    user_ids_array?: string[];
    user_names_array?: string[];
    mode?: string;

    // user attributes
    user_id?: string;
    user_name?: string;
    username?: string;
    email?: string;
    attachedGroups?: string[];

    // gift attributes
    gift_id?: string;
    giftName?: string;
    giftURL?: string;
    giftCost?: number;
    giftDetails?: string;
    taken_value?: boolean;
    giver_id?: string;
    giver_name?: string;

    // other updaters
    token?: string;
    value?: boolean;
  };
  output: {
    main_value: any;
    type: any;
  };
};

// const test_cases: TestDataPayload[] = [
//   {
//     test_title: "this is the test case",
//     input_data: {
//       group_id: "94c1bc75-3aaf-4a67-bcc7-6e5fdffc3ba3",
//     },
//     output: {
//       main_value: 3,
//       type: 'string'
//     },
//   },
// ];

// export default function XMAS_GetGroupObject_test(
//   test_cases: TestDataPayload[]
// ) {
//   for (const t_case of test_cases) {
//     test("adds 1 + 2 to equal 3", () => {
//       const data = XMAS_GetGroupObject(t_case.input_data.group_id);

//       console.dir(data);

//       expect(data).toBe(3);
//     });
//   }
// }
