import icons from "./icons";
const {
  MdOutlineLibraryMusic,
  GrEmptyCircle,
  MdOutlineMultilineChart,
  MdOutlineFeed,
} = icons;

export const sidebarMenu = [
  {
    path: "mymusic",
    text: "Cá nhân",
    icons: <MdOutlineLibraryMusic size={24} />,
    end: true,
  },
  {
    path: "",
    text: "Khám phá",
    icons: <GrEmptyCircle size={24} />,
    end: true,
  },
  {
    path: "zing-chart",
    text: "zingchart",
    icons: <MdOutlineMultilineChart size={24} />,
    end: true,
  },
  {
    path: "follow",
    text: "Theo dõi",
    icons: <MdOutlineFeed size={24} />,
    end: true,
  },
];
