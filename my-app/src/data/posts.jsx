export const dataPosts = [
  {
    id: 1,
    img: require("../images/forrest.jpg"),
    title: "Ліс",
    location: "Ukraine",
    comments: 3,
    likes: 153,
  },
];

export const commentPostArray = {
  id: 1,
  postImage: require("../images/forrest.jpg"),
  title: "Ліс",
  location: "Ukraine",
  comments: 3,
  commentsTexts: [
    {
      id: 10,
      date: "09 червня, 2020",
      time: "08:40",
      userAvatar: require("../images/avatarNo.jpg"),
      text: "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
    },
    {
      id: 11,
      userAvatar: require("../images/avatarYes.jpg"),
      date: "09 червня, 2020",
      time: "09:14",
      text: "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
    },
    {
      id: 12,
      date: "09 червня, 2020",
      time: "09:20",
      userAvatar: require("../images/avatarNo.jpg"),
      text: "Thank you! That was very helpful!",
    },
  ],
};
