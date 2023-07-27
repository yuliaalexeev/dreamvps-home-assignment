export const database = {
  users: [
    { id: "1", username: "yulia", password: "1234" },
    {
      id: "2",
      username: "pokemon10",
      password: "uk301",
    },
  ],

  posts: [
    {
      id: "1",
      content: "Hello! first post",
      time: 1689001603082,
      by: { id: "1", username: "yulia" },
    },
    {
      id: "3",
      content: "Today is a good day!",
      time: 1689001603082,
      by: {
        id: "2",
        username: "pokemon10",
      },
    },
    {
      id: "gfdg",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu nulla at justo finibus iaculis. Suspendisse ac luctus risus, eget placerat justo.",
      time: 1689001603082,
      by: { id: "1", username: "yulia" },
    },
    {
      id: "35f",
      content: "How are you dude?!",
      time: 1690195381136,
      by: {
        id: "2",
        username: "pokemon10",
      },
    },
  ],
};
