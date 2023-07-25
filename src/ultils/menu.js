import icons from "./icons";
const { MdOutlineLibraryMusic } = icons;

export const sidebarMenu = [
  {
    path: "personal",
    text: "Cá nhân",
    icons: <MdOutlineLibraryMusic size={24} />,
    end: true,
  },
  {
    path: "",
    text: "Khám phá",
    icons: <MdOutlineLibraryMusic size={24} />,
    end: true,
  },
  {
    path: "zing-chart",
    text: "zingchart",
    icons: <MdOutlineLibraryMusic size={24} />,
    end: true,
  },
  {
    path: "follow",
    text: "Theo dõi",
    icons: <MdOutlineLibraryMusic size={24} />,
    end: true,
  },
];
